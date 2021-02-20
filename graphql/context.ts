import type { NextApiRequest, NextApiResponse } from 'next'
import type { PrismaClient } from '@prisma/client'
import { getLoginSession, Session } from '../lib/session'
import prisma from '../prisma/client'

export type Context = {
  prisma: PrismaClient
  req: NextApiRequest
  res: NextApiResponse
  session?: Session
}

export const createContext = async ({ req, res }: Context): Promise<Context> => {
  const session = await getLoginSession(req)
  return {
    prisma,
    req,
    res,
    session,
  }
}
