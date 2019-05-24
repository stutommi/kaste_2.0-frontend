import { gql } from 'apollo-boost'

const chatMessages = gql`
{
  messages {
    content
    created
    id
    user {
      name
    }
  }
}
`

export default chatMessages