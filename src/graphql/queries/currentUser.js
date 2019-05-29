import { gql } from 'apollo-boost'

const currentUser = gql`
{
  me {
    name
    username
    id
    sensorEndpoint
  }
}
`

export default currentUser