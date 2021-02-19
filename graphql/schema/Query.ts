import { queryType } from 'nexus'
import { User } from './User'

export const Query = queryType({
  definition(t) {
    t.field('me', {
      type: User,
      resolve(_root, _args, ctx) {
        if (!ctx.session?.id) return null
        return ctx.prisma.user.findUnique({
          where: { id: ctx.session.id }
        })
      }
    })
  },
})
