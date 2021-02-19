import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../lib/password'

const prisma = new PrismaClient()

async function seed() {
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@test.com',
      firstName: 'Admin',
      lastName: 'User',
      isAdmin: true,
      isVerified: true,
    }
  })

  const adminUserSecrets = await prisma.userSecrets.create({
    data: {
      userId: adminUser.id,
      passwordHash: hashPassword('password123')
    }
  })

  console.log({ adminUser, adminUserSecrets })
}

seed()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
