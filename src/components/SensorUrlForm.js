// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import { Button, Input, Segment, Header, Divider, Message, Grid } from 'semantic-ui-react'
import { useMutation } from 'react-apollo-hooks'
// Custom hooks
import {useField} from '../hooks/useField'
import {useNotification} from '../hooks/useNotification'
import {useAction} from '../hooks/useAction'
// TypeDefs
import editUserSensorEndpoint from '../graphql/mutations/editUserSensorEndpoint'
import reboot from '../graphql/mutations/reboot'
import validateSensorEndpoint from '../graphql/mutations/validateSensorEndpoint'
// Helper functions
import { handleSensorEndpointUpdateForToken } from '../utilities/helperFuncs'

const SensorUrlForm = ({ sensorsConnected, token, setToken, actions, sensorService }) => {
  const {reset: resetSensorUrl ,...sensorUrl} = useField('text')
  const [notification, setNotification] = useNotification()
  const editSensorEndpoint = useMutation(editUserSensorEndpoint)
  const fireAction = useAction()

  // Handles connection to sensor endpoint
  const handleConnect = async () => {
    try {
      const { data } = await fireAction(sensorUrl.value, validateSensorEndpoint)

      if (data.validateSensorEndpoint.message === 'Valid endpoint') {
        const confirmation = window.confirm('Would you like to receive information about these sensors?')
        
        if (confirmation) {
          editSensorEndpoint({
            variables: {
              sensorEndpoint: sensorUrl.value
            }
          })

          // For localstorage and app
          handleSensorEndpointUpdateForToken(sensorUrl.value, setToken)
          // Clears url field
          resetSensorUrl()
        }
      }
    } catch (error) {
      setNotification('Sensor endpoint offline or invalid URL')
    }
  }

  // Clears sensor url from DB for the current user
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

  // Reboots sensor endpoint computer
  const handleReboot = async () => {
    const confirmation = window.confirm('WARNING: Endpoint computer might not recover correctly from reboot!')

    if (confirmation) {
      fireAction(actions.reboot, reboot)

      sensorService.stopFetching()

      // Waits that computer has had time to shutdown
      setTimeout(() => {
        sensorService.startFetching(token.sensorEndpoint)
      }, 5000)
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
        {...sensorUrl}
        data-cy='sensor-url-input'
        fluid
        placeholder='Enter URL...'
        action={
          <Button
            data-cy='sensor-url-button'
            loading={false}
            onClick={handleConnect}>
            Connect
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
  setToken: PropTypes.func.isRequired,
  sensorService: PropTypes.object.isRequired,
  actions: PropTypes.object
}

export default SensorUrlForm