// Libraries
import React, { useEffect } from 'react'
import { Header } from 'semantic-ui-react'
// Components
import PlantSensor from './PlantSensor'
import HouseSensor from './HouseSensor'

const SensorView = ({ show, sensorData }) => {

  if (!show) {
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
    <div style={{ height: '90%', overflowY: 'scroll' }}>

      {sensors()}

    </div>
  )
}

export default SensorView