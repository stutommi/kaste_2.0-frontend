// Libraries
import React from 'react'
import { Segment } from 'semantic-ui-react'

// Components
import ChatMessage from './ChatMessage'

const ChatView = ({ show }) => {

  if (!show) {
    return null
  }

  return (
    <Segment>
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
    </Segment>
  )
}

export default ChatView