// Libraries
import React from 'react'
import { Segment, Comment, Divider } from 'semantic-ui-react'

const ChatMessage = ({ message, currentUser }) => {

  if (!currentUser.me) {
    return null
  }
  // Defines message color by user
  const defSegColor = currentUser.me.name === message.user.name
    ? 'blue'
    : 'green'

  // Defines float side by user
  const defFloatSide = currentUser.me.name === message.user.name
    ? 'left'
    : 'right'

  const segmentStyle = {
    margin: '0 0 5px 0',
    padding: 7,
    float: `${defFloatSide}`,
    clear: 'both'
  }

  return (
    < Comment style={{ marginTop: 7, paddingTop: 7, overflow: 'auto' }}>
        <Segment
          style={segmentStyle} compact inverted color={defSegColor} secondary>
          <Comment.Content>
            <Comment.Author as='a'>
              {message.user.name}
            </Comment.Author>
            <Comment.Metadata>
              <div>{new Date(parseInt(message.created)).toLocaleString()}</div>
            </Comment.Metadata>
            <Divider style={{ margin: '4px 0px 4px 0px' }} />
            {message.content}
          </Comment.Content>
        </Segment>
    </Comment >
  )
}


export default ChatMessage