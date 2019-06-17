// Libraries
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Segment } from 'semantic-ui-react'
import { useMutation } from 'react-apollo-hooks'
// TypeDefs
import createUser from '../graphql/mutations/createUser'

const RegisterForm = ({ setNotification, setLoginVisible }) => {
  const register = useMutation(createUser)
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async () => {
    try {
      await register({
        variables: {
          username, password, name
        }
      })
      setNotification('Register succesful')
      setLoginVisible(true)
    } catch (error) {
      console.log(error)
      setNotification(error.graphQLErrors[0].message)
    }
  }

  return (
    <Form
      size='large'
      onSubmit={handleRegister}
      autoComplete='new-password'>

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
          autoComplete='new-password'
        />
        <Form.Input
          data-cy='name'
          type="text"
          value={name}
          onChange={({ target }) => setName(target.value)}
          fluid
          icon='user outline'
          iconPosition='left'
          placeholder='Name'
          autoComplete='new-password'
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
          autoComplete='new-password'
        />

        <Button color='brown' size='large' type='submit'>
          Register
        </Button>
      </Segment>
    </Form>
  )
}

RegisterForm.propTypes = {
  setNotification: PropTypes.func.isRequired,
  setLoginVisible: PropTypes.func.isRequired,
}

export default RegisterForm