import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getLoginSession, Session } from '../lib/session'

export type Context = {
  prisma: PrismaClient
  req: NextApiRequest
  res: NextApiResponse
  session?: Session
}

const prisma = new PrismaClient()

export const createContext = async ({ req, res }: Context): Promise<Context> => {
  const session = await getLoginSession(req)
  return {
    prisma,
    req,
    res,
    session,
  }
}
