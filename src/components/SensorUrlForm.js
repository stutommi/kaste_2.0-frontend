// Libraries
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Input, Segment, Header, Divider, Message, Grid } from 'semantic-ui-react'
import axios from 'axios'
import { useMutation } from 'react-apollo-hooks'
// Custom hooks
import useNotification from '../hooks/useNotification'
import useAction from '../hooks/useAction'
// TypeDefs
import editUserSensorEndpoint from '../graphql/mutations/editUserSensorEndpoint'
import reboot from '../graphql/mutations/reboot'
// Helper functions
import { handleSensorEndpointUpdateForToken } from '../utilities/helperFuncs'

const SensorUrlForm = ({ sensorsConnected, token, setToken, actions, sensorService }) => {
  const [sensorUrlField, setSensorUrlField] = useState('')
  const [notification, setNotification] = useNotification()
  const editSensorEndpoint = useMutation(editUserSensorEndpoint)
  const fireAction = useAction()

  const handleConnect = async () => {
    try {
      const response = await axios.get(sensorUrlField)
      const isValidUrl = Object.keys(response.data).includes('sensors')

      if (isValidUrl) {
        const confirmation = window.confirm('Would you like to receive information about these sensors?')

        if (confirmation) {
          editSensorEndpoint({
            variables: {
              sensorEndpoint: sensorUrlField
            }
          })

          // For localstorage
          handleSensorEndpointUpdateForToken(sensorUrlField, setToken)
          // For app
          setSensorUrlField('')
        }
      }
    } catch (error) {
      setNotification(error.message)
    }
  }

  const handleClearUrl = () => {
    const confirmation = window.confirm('Are you sure? Clearing sensor resource url cuts access to all information and functionality.')

    if (confirmation) {
      editSensorEndpoint({
        variables: {
          sensorEndpoint: ''
        }
      })

      handleSensorEndpointUpdateForToken('', setToken)
    }
  }

  const handleReboot = async () => {
    const confirmation = window.confirm('WARNING: Endpoint computer might not recover correctly from reboot!')

    if (confirmation) {
      fireAction(actions.reboot ,reboot)

      sensorService.stopFetching()
      sensorService.startFetching(token.sensorEndpoint)
    }

  }

  return (
    <Segment>
      <Header>
        Sensor resource URL
      </Header>
      <small style={{ color: 'gray' }}>
        Provide an endpoint URL where sensor output comes from
      </small>
      <Input
        data-cy='sensor-url-input'
        value={sensorUrlField}
        onChange={({ target }) => setSensorUrlField(target.value)}
        fluid
        placeholder='Enter URL...'
        action={
          <Button
            data-cy='sensor-url-button'
            loading={false}
            onClick={handleConnect}>Connect
          </Button>
        }
      />
      {
        token.sensorEndpoint
          ?
          <>
            <Segment color={'green'}>
              <Header as='h3'>
                connected at:
              </Header>
              {token.sensorEndpoint}
              <Button
                fluid
                style={{ marginTop: 10 }}
                onClick={handleClearUrl}>
                clear
              </Button>
            </Segment>
            <Segment
              inverted
              secondary
              color={sensorsConnected ? 'green' : 'red'}>
              <Grid divided columns={2} textAlign='center'>
                <Grid.Row verticalAlign='middle'>
                  <Grid.Column>
                    Endpoint status: {sensorsConnected ? 'Online' : 'Offline'}
                  </Grid.Column>
                  <Grid.Column>
                    <Button
                      disabled={!sensorsConnected}
                      onClick={handleReboot}
                      icon='redo'
                      content='Reboot' />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </>
          :
          <Segment color={'red'}>
            Not connected
          </Segment>
      }
      <Divider />
      {notification &&
        <Message color='red'>
          {notification}
        </Message>
      }
    </Segment>
  )
}

// Proptypes
SensorUrlForm.propTypes = {
  sensorsConnected: PropTypes.bool.isRequired,
  token: PropTypes.object.isRequired,
  setToken: PropTypes.func.isRequired
}

export default SensorUrlForm