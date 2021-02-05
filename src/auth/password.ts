import crypto from 'crypto'

export const hashPassword = (password: string): string => {
  const salt = crypto.randomBytes(16).toString('hex')
  const derivedKey = crypto.scryptSync(password, salt, 64)

  return `${salt}:${derivedKey.toString('hex')}`
}

export const validatePassword = (password: string, hashedPassword: string): boolean => {
  const [salt, key] = hashedPassword.split(':')
  const derivedKey = crypto.scryptSync(password, salt, 64)

  return key === derivedKey.toString('hex')
}
