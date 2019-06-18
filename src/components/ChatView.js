// Libraries
import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useQuery, useMutation, useSubscription } from 'react-apollo-hooks'
import { Container, Icon, Comment, Menu, Input } from 'semantic-ui-react'
// TypeDefs
import chatMessages from '../graphql/queries/chatMessages'
import currentUser from '../graphql/queries/currentUser'
import createMessage from '../graphql/mutations/createMessage'
import messageAdded from '../graphql/subscriptions/messageAdded'
// Components
import ChatMessage from './ChatMessage'
import Loading from './Loading'
// Custom hooks
import {useField} from '../hooks/useField'
// Helper functions
import { includedIn } from '../utilities/helperFuncs'

const ChatView = ({ show }) => {
  const { data, loading } = useQuery(chatMessages)
  const userQuery = useQuery(currentUser)
  const {reset: resetMessageInput, ...messageInput} = useField('text')
  const addMessage = useMutation(createMessage)
  const el = useRef(null)

  useEffect(() => {
    scrollToBottom()
  }, [show])


  // eslint-disable-next-line no-unused-vars
  const addedMessage = useSubscription(messageAdded, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      const messageData = client.readQuery({ query: chatMessages })
      const addedMessage = subscriptionData.data.messageAdded

      if (!includedIn(messageData.messages, addedMessage.id)) {
        messageData.messages.push(addedMessage)

        client.writeQuery({
          query: chatMessages,
          data: messageData,
          id: 1
        })
        el.current.scrollIntoView({ block: 'end', behavior: 'smooth' })
      }
    }
  })

  const scrollToBottom = () => {
    if (!el.current) { return }
    el.current.scrollIntoView({ block: 'end' })
  }

  const handleSubmit = () => {
    // Prevents empty messages
    if (messageInput.length < 1) {
      return
    }

    addMessage({
      variables: {
        "content": messageInput
      }
    })
    resetMessageInput()
  }

  if (!show) {
    return null
  }

  return (
    <div style={{ height: '100%' }}>
      <div style={{
        height: 'calc(100% -  60px)',
        overflowY: 'scroll',
      }}>
        <Container>
          {
            loading || userQuery.loading
              ?
              <Loading inverted={true} />
              :
              <Comment.Group>
                {data.messages.map(message => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    currentUser={userQuery.data}
                  />
                ))}
              </Comment.Group>
          }
          <div id={'el'} ref={el}></div>
        </Container>
      </div>

      <Menu fluid color='grey' style={{ marginBottom: 0, marginTop: 0, height: '60px' }}>
        <Menu.Item style={{ width: '80vw' }}>
          <Input
          {...messageInput}
            data-cy='chat-input'
            fluid            
            onKeyPress={({ key }) => {
              if (key === 'Enter') {
                handleSubmit()
              }
            }}
            onFocus={scrollToBottom}
          />
        </Menu.Item>
        <Menu.Item
          style={{ width: '20vw', justifyContent: 'center' }}
          onClick={handleSubmit}>
          <Icon
            name='send'
            inverted
            circular
            color='green' />
        </Menu.Item>
      </Menu>
    </div >
  )
}

// Proptypes
ChatView.propTypes = {
  show: PropTypes.bool.isRequired
}

export default ChatView
