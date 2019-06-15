// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import { Segment } from 'semantic-ui-react'
// Components
import PlantSensor from './PlantSensor'
import HouseSensor from './HouseSensor'


const SensorView = ({ show, sensorData, sensorError, token }) => {

  if (!show) {
    return null
  }

  const notifyStatus = () => {

    if (sensorError === 'Sensors loading') {
      return <Segment
      secondary
      inverted
      color='green'
      textAlign='center'>
      Sensors loading
    </Segment>
    }
    console.log(sensorError)
    
    if (!token.sensorEndpoint || sensorError === 'GraphQL error: Request failed with status code 404') {
      return (
        <Segment
          secondary
          inverted
          color='red'
          textAlign='center'>
          {!token.sensorEndpoint
            ? 'Not connected to any sensor endpoint'
            : 'Rasp offline or starting from reboot'
          }
        </Segment>
      )
    }
    return null
  }

  const sensors = () =>
    sensorData
      ? sensorData.map(sensor =>
        sensor.type === 'plant'
          ? <PlantSensor key={sensor.id} sensor={sensor} />
          : <HouseSensor key={sensor.id} sensor={sensor} />)
      : null

  return (
    <div style={{ height: '100%', overflowY: 'scroll' }}>
      {sensorError || !token.sensorEndpoint
        ? notifyStatus()
        : sensors()
      }
    </div>
  )
}

// Proptypes
SensorView.propTypes = {
  show: PropTypes.bool.isRequired,
  sensorData: PropTypes.array,
  sensorError: PropTypes.string,
  token: PropTypes.object
}

export default SensorView