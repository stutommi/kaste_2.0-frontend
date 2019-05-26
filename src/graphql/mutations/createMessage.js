import { gql } from 'apollo-boost'

const createMessage = gql`
mutation createMessage(
  $content: String!
  ) {
  createMessage(
    content: $content
  ) {
    content
    user {
      name
    }
    created
    id
  }
}
`

export default createMessage