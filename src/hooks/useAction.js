import { useApolloClient } from 'react-apollo-hooks'

// Fires sensor actions, requires url and mutation as arguments
export const useAction = () => {
  const client = useApolloClient()

  const fireAction = (actionUrl, mutation) => {
    const response = client.mutate({
      mutation: mutation,
      variables: { sensorEndpoint: actionUrl }
    })
    return response
  }

  return fireAction
}