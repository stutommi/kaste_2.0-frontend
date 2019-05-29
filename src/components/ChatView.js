// Libraries
import React, { useState, useRef, useEffect } from 'react'
import { useQuery, useMutation, useSubscription } from 'react-apollo-hooks'
import { Container, Button, Comment, Header, Menu, Input } from 'semantic-ui-react'
// TypeDefs
import chatMessages from '../graphql/queries/chatMessages'
import createMessage from '../graphql/mutations/createMessage'
import messageAdded from '../graphql/subscriptions/messageAdded'
// Components
import ChatMessage from './ChatMessage'
import Loading from './Loading'
// Helper functions
import { includedIn } from '../utilities/helperFuncs'

const ChatView = ({ show }) => {
  const { data, loading } = useQuery(chatMessages)
  const [messageInput, setMessageInput] = useState('')
  const el = useRef(null)

  useEffect(() => {
    if (!el.current) { return }
    el.current.scrollIntoView({ block: 'end', behavior: 'smooth' })
  })

  const addMessage = useMutation(createMessage)

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
      }
    }
  })

  // Prevents empty messages
  const handleSubmit = () => {
    if (messageInput.length < 1) {
      return
    }

    addMessage({
      variables: {
        "content": messageInput
      }
    })

    setMessageInput('')
  }

  if (!show) {
    return null
  }

  return (
    <div style={{ height: '90%' }}>
      <Container style={{ height: '90%', overflowY: 'scroll' }}>
        {
          loading
            ?
            <Loading />
            :
            <Comment.Group>
              {data.messages.map(message => (
                <ChatMessage
                  key={message.id}
                  message={message}
                />
              ))}
            </Comment.Group>
        }
        <div id={'el'} ref={el}></div>
      </Container>
      <Menu fluid color='grey' style={{ marginBottom: 0, marginTop: 0, height: '10%' }}>
        <Menu.Item style={{ width: '70%' }}>
          <Input
            fluid
            value={messageInput}
            onChange={({ target }) => setMessageInput(target.value)}
            onKeyPress={({ key }) => {
              if (key === 'Enter') {
                handleSubmit()
              }
            }}
          />
        </Menu.Item>
        <Menu.Item position='right'>
          <Button primary type='submit' onClick={handleSubmit}>
            Send
        </Button>
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default ChatView
