// Libraries
import React, { useState } from 'react'
import { Button, Input, Segment, Header, Divider, Message } from 'semantic-ui-react'
import axios from 'axios'
import { useMutation } from 'react-apollo-hooks'
// Custom hooks
import { useNotification } from '../hooks/index'
// TypeDefs
import editUserSensorEndpoint from '../graphql/mutations/editUserSensorEndpoint'

const SensorUrlForm = ({ sensorsConnected, token }) => {
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

          // Sets new url endpoint to localstorage
          const prevToken = JSON.parse(localStorage.getItem('kaste-user-token'))
          localStorage.removeItem('kaste-user-token')
          const updatedToken = {
            ...prevToken,
            sensorEndpoint: sensorUrlField
          }
          window.localStorage.setItem('kaste-user-token', JSON.stringify(updatedToken))
          setSensorUrlField('')
        }
      }
    } catch (error) {
      setNotification(error.message)
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
            connected at: <br />
            {token.sensorEndpoint}
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