// Libraries
import React from 'react'
import { Segment, Statistic } from 'semantic-ui-react'
// Components
import SensorValue from './SensorValue'

const PlantSensor = ({ sensor }) => {

  const colorSegment = () => {
    
  }

  return (
    <Segment color='green' inverted secondary style={{margin: '2px 1px'}}>

        <SensorValue
        value={sensor.type}
        label={'Type'}
        />

        <SensorValue
        value={sensor.model}
        label={'Model'}
        />

        <SensorValue
        value={sensor.location}
        label={'Location'}
        />

        <SensorValue
        value={sensor.nutrient}
        label={'Nutrient'}
        />

        <SensorValue
        value={sensor.light}
        label={'Light'}
        />

        <SensorValue
        value={sensor.temperature_C}
        label={'Temperature'}
        />

        <SensorValue
        value={sensor.soil_moisture}
        label={'Soil moisture'}
        />

        <SensorValue
        value={sensor.time}
        label={'Updated'}
        />

        <SensorValue
        value={sensor.battery_low}
        label={'Battery'}
        />

    </Segment>
  )
}

export default PlantSensor