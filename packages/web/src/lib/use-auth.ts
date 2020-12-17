import { gql, useQuery } from '@apollo/client'

type User = {
  username: string
}

interface MeData {
  me: User
}

interface AuthResult {
  error: string,
  loading: boolean,
  user?: User
}

const ME_QUERY = gql`
  query MeQuery {
    me {
      username
    }
  }
`

export const useAuth = (): AuthResult => {
  const { data, error, loading } = useQuery<MeData>(ME_QUERY)
  return {
    error: error?.message,
    loading,
    user: data?.me
  }
}
