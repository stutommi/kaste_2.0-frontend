// Libraries
import React from 'react'
import { Button, Container, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'

const LoginView = ({ setUser }) => {
  console.log('LOGINVIEW')
  
  const handleLogin = () => setUser(true)

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
              fluid
              icon='user'
              iconPosition='left'
              placeholder='Username'
              />
              <Form.Input
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
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default LoginView