import type { NextApiRequest, NextApiResponse } from 'next'
import Iron from '@hapi/iron'
import { serialize } from 'cookie'

const SECOND = 1
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24
const MAX_AGE = DAY * 30
const TOKEN_NAME = 'token'

if (!process.env.SECRET) {
  throw new Error('Missing required configuration: process.env.SECRET')
}

export type Session = {
  id: number
  createdAt: number
  maxAge: number
}

export const setLoginSession = async (res: NextApiResponse, id: number): Promise<void> => {
  // Create a session object with a max age that we can validate later
  const obj = { id, createdAt: Date.now(), maxAge: MAX_AGE }
  const token = await Iron.seal(obj, process.env.SECRET, Iron.defaults)

  const cookie = serialize(TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  })

  res.setHeader('Set-Cookie', cookie)
}

export const getLoginSession = async (req: NextApiRequest): Promise<Session | null> => {
  const token = req.cookies[TOKEN_NAME]
  if (!token) return null

  const session: Session = await Iron.unseal(token, process.env.SECRET, Iron.defaults)
  const expiresAt = session.createdAt + session.maxAge * 1000

  // Validate the expiration date of the session
  if (Date.now() > expiresAt) {
    throw new Error('Session expired')
  }

  return session
}

export const clearLoginSession = (res: NextApiResponse): void => {
  const cookie = serialize(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/',
  })

  res.setHeader('Set-Cookie', cookie)
}
