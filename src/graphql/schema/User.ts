import { objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.email()
    t.model.firstName()
    t.model.lastName()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.role()
  },
})
