// Libraries
import React from 'react'
import { Segment } from 'semantic-ui-react'
// Components
import PlantSensor from './PlantSensor'
import HouseSensor from './HouseSensor'


const SensorView = ({ show, sensorData, sensorError }) => {

  if (!show) {
    return null
  }

  const notifyStatus = () => {

    return (
      <Segment
        secondary
        inverted
        color='red'
        textAlign='center'
      >
        Not connected to any sensor endpoint
      </Segment>
    )
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

      {sensorError
        ? notifyStatus()
        : sensors()
      }


    </div>
  )
}

export default SensorView