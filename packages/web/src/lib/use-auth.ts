import { ApolloQueryResult, gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

type User = {
  username: string
}

interface MeData {
  me: User
}

interface AuthResult {
  error: string,
  loading: boolean,
  refetch: () => Promise<ApolloQueryResult<MeData>>,
  user?: User
}

const ME_QUERY = gql`
  query MeQuery {
    me {
      username
    }
  }
`

interface Props {
  redirectTo?: string
  redirectIfFound?: boolean
}

export const useAuth = ({ redirectTo, redirectIfFound }: Props = {}): AuthResult => {
  const { data, error, loading, refetch } = useQuery<MeData>(ME_QUERY)
  const router = useRouter()

  useEffect(() => {
    if (!redirectTo || loading) return
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !data?.me) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && data?.me)
    ) {
      router.push(redirectTo)
    }
  }, [data, loading, redirectTo, redirectIfFound, router])

  return {
    error: error?.message,
    loading,
    refetch,
    user: data?.me,
  }
}
