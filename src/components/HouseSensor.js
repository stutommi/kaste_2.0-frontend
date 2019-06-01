// Libraries
import React from 'react'
import { Segment, Statistic } from 'semantic-ui-react'
// Components
import SensorValue from './SensorValue'

const HouseSensor = ({ sensor }) => {

  const colorSegment = () => {
   
  }

  return (
    <Segment color='brown' inverted secondary style={{margin: '2px 1px'}}>


    <SensorValue
        value={sensor.type}
        label={'Type'}
        icon={'home'}
        />

        <SensorValue
        value={sensor.model}
        label={'Model'}
        icon={''}
        />

        <SensorValue
        value={sensor.location}
        label={'Location'}
        icon={''}
        />

        <SensorValue
        value={sensor.humidity}
        label={'Humidity'}
        icon={''}
        />

        <SensorValue
        value={sensor.temperature_C}
        label={'Temperature'}
        icon={'thermometer'}
        />
        
        <SensorValue
        value={sensor.time}
        label={'Updated'}
        />
        
    </Segment>
  )
}

export default HouseSensor