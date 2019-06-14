import { useApolloClient } from 'react-apollo-hooks'

// Fires sensoractions, requires url and mutation as arguments
const useAction = () => {
  const client = useApolloClient()

  const fireAction = (actionUrl, mutation) => {    
    client.mutate({
      mutation: mutation,
      variables: {sensorEndpoint: actionUrl}
    })
  }

  return fireAction
}

export default useAction