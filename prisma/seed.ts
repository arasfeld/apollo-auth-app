import { PrismaClient } from '@prisma/client'

async function seed() {
  const prisma = new PrismaClient()

  // create admin user
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@test.com',
      firstName: 'Admin',
      lastName: 'User',
      hashedPassword: 'password', // TODO: hash this
      role: 'ADMIN'
    }
  })

  console.log('user:', adminUser)
}
