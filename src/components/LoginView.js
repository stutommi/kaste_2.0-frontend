// Libraries
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Menu, Message, Grid, Header } from 'semantic-ui-react'
// Components
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
// Hooks
import {useNotification} from '../hooks/useNotification'


const LoginView = ({ setToken }) => {
  const [notification, setNotification] = useNotification()
  const [loginVisible, setLoginVisible] = useState(true)

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

      <Grid textAlign='center' style={{ height: '100vh', background: 'lightgreen', margin: 0 }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 250 }}>
          <Header as='h1' color='grey' dividing textAlign='center'>
            Log in to Kaste 2.0
          </Header>

          <Menu widths={2} color='brown'>
            <Menu.Item onClick={() => setLoginVisible(true)}
              active={loginVisible}>
              Login
            </Menu.Item>
            <Menu.Item onClick={() => setLoginVisible(false)}
              active={!loginVisible}>
              Register
            </Menu.Item>
          </Menu>
          {
            loginVisible
              ? <LoginForm
                setNotification={setNotification}
                setToken={setToken}
              />
              : <RegisterForm
                setLoginVisible={setLoginVisible}
                setNotification={setNotification}
              />
          }


          {notification &&
            <Message
              positive={notification === 'Register succesful'}
              negative={notification !== 'Register succesful'} >
              {notification}
            </Message>
          }
        </Grid.Column>
      </Grid>
    </div>
  )
}

// Proptypes
LoginView.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default LoginView