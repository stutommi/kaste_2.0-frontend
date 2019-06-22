// Libraries
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Segment, Grid, Header, Icon, Button } from 'semantic-ui-react'
import moment from 'moment'
// Components
import SensorValue from './SensorValue'
import Chart from './Chart'

const HouseSensor = ({ sensor }) => {
  const [chartVisible, setChartVisible] = useState(false)
  const [chartTimeRange, setChartTimeRange] = useState('DAY')

  return (
    <Segment inverted secondary style={{ margin: '2px 1px', background: 'beige', color: 'black' }}>
      <Header style={{ color: 'black' }} textAlign='center' as='h3'>
        <Icon name='home' color='black' size='large' />
        {sensor.location}
      </Header>

      <Grid textAlign='center' columns={2} >
        <Grid.Row>

          <Grid.Column color={sensor.soil_moisture < 30 ? 'yellow' : null}>
            <SensorValue
              size={'large'}
              value={sensor.humidity + ' %'}
              label={'Soil moisture'}
              icon='theme'
              iconColor={'blue'}
            />
          </Grid.Column>

          <Grid.Column>
            <SensorValue
              size={'large'}
              value={sensor.temperature_C + ' ºC'}
              label={'Temperature'}
              icon={'thermometer'}
              iconColor={'red'}
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
                margin: '0 auto',
                display: `${chartVisible ? 'block' : 'none'}`,
                padding: 5,
                maxWidth: 1300
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
              value={moment(sensor.time).fromNow()}
              label={'Updated'}
              size={'small'}
              icon={'time'}
              iconColor={moment() - moment(sensor.time) > 1000 * 60 * 60 ? 'red' : null}
            />
          </Grid.Column>

          <Grid.Column textAlign='right'>
            <SensorValue
              label={'Battery'}
              size={'small'}
              icon={'battery full'}
              iconColor={sensor.battery_low === 1 ? 'red' : null}
            />
          </Grid.Column>

        </Grid.Row>
      </Grid>

    </Segment>
  )
}

// Proptypes
HouseSensor.propTypes = {
  sensor: PropTypes.object.isRequired
}

export default HouseSensor