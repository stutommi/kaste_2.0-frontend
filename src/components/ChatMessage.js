// Libraries
import React from 'react'
import { Segment,  Comment } from 'semantic-ui-react'

const ChatMessage = ({ message }) => (

  <Comment>
    <Comment.Content>
      <Comment.Author as='a'>
        {message.user.name}
      </Comment.Author>
      <Comment.Metadata>
        <div>{new Date(parseInt(message.created)).toUTCString()}</div>
      </Comment.Metadata>
      <Segment style={{marginTop: 0, padding: 7}} compact inverted color='green' secondary>
          {message.content}
      </Segment>
    </Comment.Content>
  </Comment>
)

export default ChatMessage