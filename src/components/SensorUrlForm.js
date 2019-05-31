// Libraries
import React, { useState } from 'react'
import { Button, Input, Segment, Header, Divider, Message } from 'semantic-ui-react'
import axios from 'axios'
import { useMutation } from 'react-apollo-hooks'
// Custom hooks
import { useNotification } from '../hooks/index'
// TypeDefs
import editUserSensorEndpoint from '../graphql/mutations/editUserSensorEndpoint'
// Helper functions
import { handleSensorEndpointUpdateForToken } from '../utilities/helperFuncs'

const SensorUrlForm = ({ sensorsConnected, token, setToken }) => {
  const [sensorUrlField, setSensorUrlField] = useState('')
  const [notification, setNotification] = useNotification()
  const editSensorEndpoint = useMutation(editUserSensorEndpoint)

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

  return (
    <Segment>
      <Header>
        Sensor resource URL
       </Header>
      <small style={{ color: 'gray' }}>
        Provide an endpoint URL where sensor output comes from
       </small>
      <Input
        value={sensorUrlField}
        onChange={({ target }) => setSensorUrlField(target.value)}
        fluid
        placeholder='Enter URL...'
        action={
          <Button loading={false} onClick={handleConnect}>connect</Button>
        }
      />
      {
        sensorsConnected
          ?
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
          :
          <Segment color={'red'}>
            not connected
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

export default SensorUrlForm