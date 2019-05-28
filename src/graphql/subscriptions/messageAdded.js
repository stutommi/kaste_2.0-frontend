import { gql } from 'apollo-boost'

const messageAdded = gql`
subscription {
  messageAdded {
    content
    created
    id
    user {
      name
    }
  }
}
`

export default messageAdded