import React from 'react'
import { useRouter } from 'next/router'
import AuthLayout from './Auth'
import MainLayout from './Main'

const authRoutes = ['/forgot-password', '/login', '/register']

export const Layout: React.FC = ({ children }) => {
  const router = useRouter()

  if (authRoutes.includes(router.pathname)) {
    return <AuthLayout>{children}</AuthLayout>
  }
  return <MainLayout>{children}</MainLayout>
}
