// Libraries
import React from 'react'
import { Segment, Comment, Divider } from 'semantic-ui-react'

const ChatMessage = ({ message }) => (

  <Comment>
    <Segment style={{ marginTop: 0, padding: 7 }} compact inverted color='green' secondary>
      <Comment.Content>
        <Comment.Author style={{ color: 'darkgreen' }} as='a'>
          {message.user.name}
        </Comment.Author>
        <Comment.Metadata>
          <div>{new Date(parseInt(message.created)).toLocaleString()}</div>
        </Comment.Metadata>
        <Divider style={{ margin: '4px 0px 4px 0px' }} />
        {message.content}
      </Comment.Content>
    </Segment>
  </Comment>
)

export default ChatMessage