import type { NextApiRequest, NextApiResponse } from 'next'
import { serialize, parse } from 'cookie'

const TOKEN_NAME = 'token'
const SECOND = 1
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60

export const MAX_AGE = HOUR * 8 // 8 hours

export const setTokenCookie = (res: NextApiResponse, token: string): void => {
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

export const removeTokenCookie = (res: NextApiResponse): void => {
  const cookie = serialize(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/',
  })

  res.setHeader('Set-Cookie', cookie)
}

export const parseCookies = (req: NextApiRequest): Record<string, string> => {
  // For API Routes we don't need to parse the cookies.
  if (req.cookies) return req.cookies

  // For pages we do need to parse the cookies.
  const cookie = req.headers?.cookie
  return parse(cookie || '')
}

export const getTokenCookie = (req: NextApiRequest): string => {
  const cookies = parseCookies(req)
  return cookies[TOKEN_NAME]
}
