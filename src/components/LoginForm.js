// Libraries
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Segment } from 'semantic-ui-react'
import { useMutation } from 'react-apollo-hooks'
// TypeDefs
import loginUser from '../graphql/mutations/loginUser'
import currentUser from '../graphql/queries/currentUser'

const LoginForm = ({ setNotification, setToken }) => {
  const login = useMutation(loginUser)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      await login({
        update: (client, result) => {
          const token = result.data.login
          setToken(token)
          localStorage.setItem('kaste-user-token', JSON.stringify(token))
        },
        variables: {
          username, password
        },
        refetchQueries: [{ query: currentUser }]
      })
    } catch (error) {
      setNotification(error.graphQLErrors[0].message)
    }
  }

  return (
    <Form size='large' onSubmit={handleLogin}>
      <Segment stacked raised>
        <Form.Input
          data-cy='username'
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          fluid
          icon='user'
          iconPosition='left'
          placeholder='Username'
        />
        <Form.Input
          data-cy='password'
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
    </Form>
  )
}

LoginForm.propTypes = {
  setNotification: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
}


export default LoginForm