// Libraries
import React, { useState } from 'react'
import { Form, Button, Container, Comment, Header, Menu, Input } from 'semantic-ui-react'
import { useQuery, useMutation, useSubscription, useApolloClient } from 'react-apollo-hooks'
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

  const client = useApolloClient()

  const addMessage = useMutation(createMessage)

  const addedMessage = useSubscription(messageAdded, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      const messageData = client.readQuery({ query: chatMessages })
      const addedMessage = subscriptionData.data.messageAdded

      console.log('SUB', includedIn(messageData.messages, addedMessage.id))
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
    <div >
      <Container>
        {
          loading
            ?
            <Loading />
            :
            <Comment.Group>
              <Header textAlign='center' as='h3' dividing>
                Chat
            </Header>
              {data.messages.map(message => (
                <ChatMessage
                  key={message.id}
                  message={message}
                />
              ))}
            </Comment.Group>
        }
      </Container>
      <Menu fluid color='grey'>
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
