export interface AuthToken {
  id: string
}

export interface User {
  _id?: string
  username: string
  hashedPassword: string
}

export interface LoginPayload {
  username: string
  password: string
}

export interface SignupPayload {
  username: string
  password: string
}

export interface AuthPayload {
  token: string,
}

export interface IMongoDataSource<T> {
  findById: (ids: string[]) => Promise<T[]>,
  findOneById: (id: string) => Promise<T>,
  find: (query: Record<string, unknown>) => Promise<T[]>,
  findOne: (query: Record<string, unknown>) => Promise<T | null>,
  insert: (query: Record<string, unknown>) => Promise<T>,
  update: (id: string, query: Record<string, unknown>) => Promise<void>,
  delete: (id: string) => Promise<void>,
}

export type DataSources = {
  users: IMongoDataSource<User>
}

export interface Context {
  dataSources: DataSources
  userId?: string
}
