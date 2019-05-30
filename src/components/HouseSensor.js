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
        value={sensor.humidity}
        label={'Humidity'}
        />

        <SensorValue
        value={sensor.temperature_C}
        label={'Temperature'}
        />
        
    </Segment>
  )
}

export default HouseSensor