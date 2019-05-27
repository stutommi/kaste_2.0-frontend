import { gql } from 'apollo-boost'

const loginUser = gql`
mutation loginUser(
  $password: String!
  $username: String!
  ) {
  login(
    password: $password
    username: $username
  ) {
    value
    username
  }
}
`

export default loginUser