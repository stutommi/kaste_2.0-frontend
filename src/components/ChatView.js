// Libraries
import React, { useState } from 'react'
import { Button, Container, Comment, Header, Menu, Input } from 'semantic-ui-react'
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
      console.log('TÄÄLLÄ')
      
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
          id:1
        })
        console.log('2')
      }

    }
  })

  const handleSubmit = () => {
    console.log(messageInput)

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
          <Input fluid value={messageInput} onChange={({ target }) => setMessageInput(target.value)} />
        </Menu.Item>
        <Menu.Item position='right'>
          <Button primary onClick={handleSubmit}>
            Send
        </Button>
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default ChatView
