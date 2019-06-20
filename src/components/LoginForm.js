// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Segment } from 'semantic-ui-react'
import { useMutation } from 'react-apollo-hooks'
// TypeDefs
import loginUser from '../graphql/mutations/loginUser'
import currentUser from '../graphql/queries/currentUser'
// Custom hooks
import { useField } from '../hooks/useField'

const LoginForm = ({ setNotification, setToken }) => {
  const login = useMutation(loginUser)
  // eslint-disable-next-line no-unused-vars
  const { reset: usernameReset, ...username } = useField('text')
  // eslint-disable-next-line no-unused-vars
  const { reset: passwordReset, ...password } = useField('password')


  const handleLogin = async () => {
    try {
      await login({
        update: (client, result) => {
          const token = result.data.login
          setToken(token)
          localStorage.setItem('kaste-user-token', JSON.stringify(token))
        },
        variables: {
          username: username.value,
          password: password.value
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
          {...username}
          data-cy='username'
          fluid
          icon='user'
          iconPosition='left'
          placeholder='Username'
          autoComplete='current-username'
        />
        <Form.Input
          {...password}
          data-cy='password'
          fluid
          icon='lock'
          iconPosition='left'
          placeholder='Password'
          autoComplete='current-password'
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