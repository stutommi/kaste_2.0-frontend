// Libraries
import React, { useState } from 'react'
import { Form, Button, Container, Comment, Header, Menu, Input } from 'semantic-ui-react'
import { useQuery, useMutation, useApolloClient } from 'react-apollo-hooks'
// TypeDefs
import chatMessages from '../graphql/queries/chatMessages'
import createMessage from '../graphql/mutations/createMessage'
// Components
import ChatMessage from './ChatMessage'
import Loading from './Loading'
// Helper functions
import { includedIn } from '../utilities/helperFuncs'

const ChatView = ({ show }) => {
  const { data, loading } = useQuery(chatMessages)
  const [messageInput, setMessageInput] = useState('')

  const client = useApolloClient()

  const addMessage = useMutation(createMessage, {
    update: (store, response) => {

      const messageData = store.readQuery({ query: chatMessages })
      const addedMessage = response.data.createMessage
      console.log('messageData', messageData)
      if (!includedIn(messageData.messages, addedMessage.id)) {
        messageData.messages.push(addedMessage)
        console.log('1')
        // ERRORIA HEITTÄÄ
        client.writeQuery({
          query: chatMessages,
          data: messageData,
          id: 1
        })
        console.log('2')
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
            onKeyPress={({key}) => {
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
