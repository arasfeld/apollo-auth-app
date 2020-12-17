import { useApolloClient } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const SignOut: React.FC = () => {
  const client = useApolloClient()
  const router = useRouter()
  
  useEffect(() => {
    localStorage.removeItem('token')
    client.resetStore().then(() => {
      router.push('/')
    })
  }, [client, router])

  return <div>Signing out...</div>
}

export default SignOut
