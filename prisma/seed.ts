import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../src/auth/password'

const prisma = new PrismaClient()

async function seed() {
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@test.com',
      firstName: 'Admin',
      lastName: 'User',
      hashedPassword: hashPassword('password'),
      role: 'ADMIN'
    }
  })

  console.log({ adminUser })
}

seed()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
