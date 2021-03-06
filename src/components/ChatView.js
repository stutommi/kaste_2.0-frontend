// Libraries
import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks'
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
import { useField } from '../hooks/useField'
// Helper functions
import { includedIn } from '../utilities/helperFuncs'

const ChatView = ({ show }) => {
  const { data, loading } = useQuery(chatMessages)
  const userQuery = useQuery(currentUser)
  const { reset: resetMessageInput, ...messageInput } = useField('text')
  const [addMessage] = useMutation(createMessage)
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
        client.writeQuery({
          query: chatMessages,
          data: { messages: [...messageData.messages, subscriptionData.data.messageAdded] },
          id: 1,
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
        "content": messageInput.value
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
                {
                  data.messages !== undefined
                    ?
                    data.messages.map(message => (
                      <ChatMessage
                        key={message.id}
                        message={message}
                        currentUser={userQuery.data}
                      />
                    ))
                    : null
                }
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
