import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useAuth } from '../context/auth-context'

const Logout: React.FC = () => {
  const { logout } = useAuth()
  const router = useRouter()
  
  useEffect(() => {
    logout().then(() => {
      router.push('/')
    })
  }, [logout, router])

  return <div>Logging out...</div>
}

export default Logout
