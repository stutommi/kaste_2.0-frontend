// Libraries
import React, { useState } from 'react'
import { Grid, Button, Header, Segment, Icon } from 'semantic-ui-react'
// Components
import SensorValue from './SensorValue'
import Chart from './Chart'

const PlantSensor = ({ sensor }) => {
  const [chartVisible, setChartVisible] = useState(false)
  const [chartTimeRange, setChartTimeRange] = useState('DAY')

  return (
    <Segment
      color='green'
      inverted
      secondary
      style={{ margin: '2px 1px' }}>


      <Header textAlign='center' as='h3'>
        <Icon name='leaf' size='large' />
        Capsicum baccatum
      </Header>

      <Grid textAlign='center' columns={2} >
        <Grid.Row>

          <Grid.Column color={sensor.soil_moisture < 30 ? 'yellow' : null}>
            <SensorValue
              size={'big'}
              value={sensor.soil_moisture + ' %'}
              label={'Soil moisture'}
              icon='theme'
              iconColor={'blue'}
            />
          </Grid.Column>

          <Grid.Column>
            <SensorValue
              size={'big'}
              value={Math.floor(sensor.light) + ' %'}
              label={'Light'}
              icon={'sun'}
              iconColor={'yellow'}
            />
          </Grid.Column>

        </Grid.Row>
        <Grid.Row>

          <Grid.Column>
            <SensorValue
              size={'big'}
              value={sensor.temperature_C + ' ºC'}
              label={'Temperature'}
              icon={'thermometer'}
              iconColor={'red'}
            />
          </Grid.Column>

          <Grid.Column>
            <SensorValue
              size={'big'}
              value={Math.floor(sensor.nutrient) + ' %'}
              label={'Nutrient'}
              icon={'pills'}
              iconColor={'orange'}
            />
          </Grid.Column>

        </Grid.Row>
        <Grid.Row columns='1' style={{ padding: 0 }}>

          <Grid.Column textAlign='center'>
            <Button circular icon={chartVisible ? 'close' : 'chart area'} onClick={() => setChartVisible(!chartVisible)} />
            {
              chartVisible &&
              <>
                <Button circular onClick={() => setChartTimeRange('DAY')}>D</Button>
                <Button circular onClick={() => setChartTimeRange('WEEK')}>W</Button>
                <Button circular onClick={() => setChartTimeRange('MONTH')}>M</Button>
                <Button circular onClick={() => setChartTimeRange('YEAR')}>Y</Button>
              </>
            }
          </Grid.Column>

        </Grid.Row>
        <Grid.Row columns={1} style={{ padding: `${chartVisible ? '5px' : '0px'}` }}>

          <Grid.Column style={{ padding: 0 }}>
            <Segment
              style={{
                display: `${chartVisible ? 'block' : 'none'}`,
                padding: 5,
              }}
            >
              <Chart
                sensor={sensor}
                chartTimeRange={chartTimeRange} />
            </Segment>
          </Grid.Column>

        </Grid.Row>
        <Grid.Row columns={2} style={{ padding: 5 }}>

          <Grid.Column textAlign='left'>
            <SensorValue
              value={sensor.time}
              label={'Updated'}
              size={'small'}
              icon={'time'}
              iconColor={Date.now() - new Date(sensor.time).getTime() > 1000 * 60 * 60 ? 'red' : null}
            />
          </Grid.Column>

          <Grid.Column textAlign='right'>
            <SensorValue
              value={sensor.battery_low + ' %'}
              label={'Battery'}
              size={'small'}
              icon={'battery full'}
              iconColor={sensor.battery_low < 30 ? 'red' : null}
            />
          </Grid.Column>

        </Grid.Row>
      </Grid>
    </Segment>
  )
}

export default PlantSensor