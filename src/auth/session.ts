import type { NextApiRequest, NextApiResponse } from 'next'
import Iron from '@hapi/iron'
import { MAX_AGE, setTokenCookie, getTokenCookie } from './cookies'

export type Session = {
  id: number
  createdAt: number
  maxAge: number
}

const SECRET = process.env.SECRET

export const setLoginSession = async (res: NextApiResponse, id: number): Promise<void> => {
  // Create a session object with a max age that we can validate later
  const obj = { id, createdAt: Date.now(), maxAge: MAX_AGE }
  const token = await Iron.seal(obj, SECRET, Iron.defaults)

  setTokenCookie(res, token)
}

export const getLoginSession = async (req: NextApiRequest): Promise<Session | null> => {
  const token = getTokenCookie(req)
  if (!token) return null

  const session: Session = await Iron.unseal(token, SECRET, Iron.defaults)
  const expiresAt = session.createdAt + session.maxAge * 1000

  // Validate the expiration date of the session
  if (Date.now() > expiresAt) {
    throw new Error('Session expired')
  }

  return session
}
