import { objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.email()
    t.model.firstName()
    t.model.lastName()
    t.model.isVerified()
    t.model.isAdmin()
    t.model.createdAt()
    t.model.updatedAt()
  },
})
