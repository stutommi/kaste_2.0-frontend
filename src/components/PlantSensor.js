// Libraries
import React, { useState } from 'react'
import { Sidebar, Image, Grid, Button, Header, Segment, Icon, List } from 'semantic-ui-react'
// Components
import SensorValue from './SensorValue'
import Chart from './Chart'

const PlantSensor = ({ sensor }) => {
  const [chartVisible, setChartVisible] = useState(false)

  const colorSegment = () => {

  }

  return (
    <Segment
      color='green'
      inverted
      secondary
      style={{ margin: '2px 1px' }}>


      <Header textAlign='left' as='h3'>
        <Icon name='leaf' size='large' />
        Capsicum baccatum
      </Header>



      <List divided horizontal>
        <SensorValue
          value={sensor.soil_moisture + ' %'}
          label={'Soil moisture'}
          icon='theme'
        />

        <SensorValue
          value={sensor.light + ' %'}
          label={'Light'}
          icon={'sun'}
        />

        <SensorValue
          value={sensor.temperature_C + ' ºC'}
          label={'Temperature'}
          icon={'thermometer'}
        />

        <SensorValue
          value={sensor.nutrient + ' %'}
          label={'Nutrient'}
          icon={'meh'}
        />
        <SensorValue
          value={sensor.time}
          label={'Updated'}
          icon={'time'}
        />

        <SensorValue
          value={sensor.battery_low + ' %'}
          label={'Battery'}
          icon={'battery full'}
        />
      </List>

      <Button circular icon='chart area' onClick={() => setChartVisible(!chartVisible)}>
      </Button>

      <Segment
        style={{ display: `${chartVisible ? 'block' : 'none'}`, padding: 5 }}
      >
        <Chart />
      </Segment>

    </Segment>
  )
}

export default PlantSensor