// Libraries
import React, { useState } from 'react'
import { Message, Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import { useMutation } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'
// Typedefs
import loginUser from '../graphql/mutations/loginUser'
// Hooks
import { useNotification } from '../hooks/index'


const LoginView = ({ setToken }) => {
  const login = useMutation(loginUser)
  const [notification, setNotification] = useNotification()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      const result = await login({
        variables: {
          username, password
        }
      })

      const token = result.data.login
      console.log('token', token)
      setToken(token)
      localStorage.setItem('kaste-user-token', JSON.stringify(token))

    } catch (error) {
      setNotification(error.graphQLErrors[0].message)
    }
  }

  return (
    <div className='login-form'>
      <style> {`
  body > div,
  body > div > div,
  body > div > div > div.login-form {
    height: 100%;
  }
          `}
      </style>
      <Grid textAlign='center' style={{ height: '100%', background: 'lightgreen' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 250 }}>
          <Header as='h1' color='grey' dividing textAlign='center'>
            Log in to Kaste 2.0
          </Header>
          <Form size='large' onSubmit={handleLogin}>
            <Segment stacked raised>
              <Form.Input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
                fluid
                icon='user'
                iconPosition='left'
                placeholder='Username'
              />
              <Form.Input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
              />

              <Button color='brown' size='large' type='submit'>
                Log in
              </Button>
            </Segment>
            {notification &&
              <Message negative>
                {notification}
              </Message>
            }
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default LoginView