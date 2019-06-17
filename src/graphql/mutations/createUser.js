import { gql } from 'apollo-boost'

const createUser = gql`
mutation createUser(
  $name: String!
  $password: String!
  $username: String!
  ) {
  createUser(
    password: $password
    username: $username
    name: $name
  ) {
    username
    sensorEndpoint
  }
}
`

export default createUser