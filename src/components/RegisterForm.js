// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Segment } from 'semantic-ui-react'
import { useMutation } from 'react-apollo-hooks'
// TypeDefs
import createUser from '../graphql/mutations/createUser'
// Custom hooks
import { useField } from '../hooks/useField'

const RegisterForm = ({ setNotification, setLoginVisible }) => {
  const register = useMutation(createUser)
  const { reset: usernameReset, ...username } = useField('text')
  const { reset: nameReset, ...name } = useField('text')
  const { reset: passwordReset, ...password } = useField('password')

  const handleRegister = async () => {
    try {
      await register({
        variables: {
          username: username.value,
          password: password.value,
          name: name.value
        }
      })
      setNotification('Register succesful')
      usernameReset()
      nameReset()
      passwordReset()
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
          {...username}
          data-cy='username'
          fluid
          icon='user'
          iconPosition='left'
          placeholder='Username'
          autoComplete='new-password'
        />
        <Form.Input
          {...name}
          data-cy='name'
          fluid
          icon='user outline'
          iconPosition='left'
          placeholder='Name'
          autoComplete='new-password'
        />
        <Form.Input
          {...password}
          data-cy='password'
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