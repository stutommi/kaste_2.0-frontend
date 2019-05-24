// Libraries
import React from 'react'
import { Message } from 'semantic-ui-react'

const ChatMessage = ({message}) => (
  <>
  {/* Time needs to be fixed... */}
    <span>{new Date(parseInt(message.created)).toUTCString()} - </span>
    <span>{message.user.name}:</span>
    <Message style={{ marginTop: 0 }} floating>
      {message.content}
    </Message>
  </>
)

export default ChatMessage