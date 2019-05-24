// Libraries
import React from 'react'
import { Segment } from 'semantic-ui-react'
import { useQuery } from 'react-apollo-hooks'

// TypeDefs
import chatMessages from '../graphql/queries/chatMessages'

// Components
import ChatMessage from './ChatMessage'
import Loading from './Loading'

const ChatView = ({ show }) => {
  const { data, loading } = useQuery(chatMessages)
console.log('data', data)
  if (!show) {
    return null
  }

  return (
    <Segment placeholder styles={{height: 1000}}>
      {
        loading
          ?
          <Loading />
          :
          data.messages.map(message => (
            <ChatMessage
            key={message.id}
            message={message}
            />
          ))
      }
    </Segment>
  )
}

export default ChatView