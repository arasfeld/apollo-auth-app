import { DataSource, DataSourceConfig } from 'apollo-datasource'
import { InMemoryLRUCache, KeyValueCache } from 'apollo-server-caching'
import DataLoader from 'dataloader'
import { Collection, ObjectID } from 'mongodb'
import { Context, IMongoDataSource } from './types'

const idToString = (id: string | ObjectID): string => id instanceof ObjectID ? id.toHexString() : id
const createDataLoader = <T>(collection: Collection) => new DataLoader<string, T>(
  keys => collection.find({ _id: { $in: keys.map(key => new ObjectID(key)) } }).toArray()
    .then(documents => {
      const keyMap = documents.reduce((map, doc) => ({ ...map, [idToString(doc._id)]: doc }), {})
      return keys.map(key => keyMap[idToString(key)] || new Error(`No result for ${idToString(key)}`))
    })
)

export class MongoDataSource<T> extends DataSource implements IMongoDataSource<T> {
  private readonly collection: Collection
  private readonly loader: DataLoader<string, T>
  private cache: KeyValueCache

  constructor(collection: Collection) {
    super()
    this.cache = new InMemoryLRUCache()
    this.collection = collection
    this.loader = createDataLoader<T>(collection)
  }

  initialize = ({ cache }: DataSourceConfig<Context>): void => {
    this.cache = cache || new InMemoryLRUCache()
  }

  private cacheKey = (id: string | ObjectID): string => `mongo-${this.collection.collectionName}-${idToString(id)}`

  find = async (query: Record<string, unknown>): Promise<T[]> => this.collection.find<T>(query).toArray()

  findById = (ids: string[]): Promise<T[]> =>
    Promise.all(ids.map(id => this.findOneById(id)))

  findOne = async (query: Record<string, unknown>): Promise<T | null> => this.collection.findOne<T>(query)

  findOneById = async (id: string): Promise<T> => {
    const key = this.cacheKey(id)
    const cacheDoc = await this.cache.get(key)
    if (cacheDoc) return JSON.parse(cacheDoc)
    const doc = await this.loader.load(id)
    this.cache.set(key, JSON.stringify(doc))
    return doc
  }

  insert = async (query: Record<string, unknown>): Promise<T> => {
    const result = await this.collection.insertOne(query)
    return result.ops.shift()
  }

  update = async (id: string, query: Record<string, unknown>): Promise<void> => {
    await this.collection.updateOne({ _id: id }, query)
    this.loader.clear(id)
    await this.cache.delete(this.cacheKey(id))
  }

  delete = async (id: string): Promise<void> => {
    await this.collection.deleteOne({ _id: id })
    this.loader.clear(id)
    await this.cache.delete(this.cacheKey(id))
  }
}