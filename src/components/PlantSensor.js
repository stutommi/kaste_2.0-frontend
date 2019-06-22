// Libraries
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Grid, Button, Header, Segment, Icon } from 'semantic-ui-react'
import moment from 'moment'
// Components
import SensorValue from './SensorValue'
import Chart from './Chart'

const columnStyle = { padding: 0, margin: 0 }

const PlantSensor = ({ sensor }) => {
  const [chartVisible, setChartVisible] = useState(false)
  const [chartTimeRange, setChartTimeRange] = useState('DAY')

  return (
    <Segment
      color='green'
      inverted
      secondary
      style={{ margin: '2px 1px' }}>

      {/* Hard coded for now, fix coming... */}
      <Header textAlign='center' as='h3'>
        <a
          style={{ color: 'inherit' }}
          href={`https://en.wikipedia.org/wiki/${'Capsicum baccatum'}`}
          target='_blank'
          rel="noopener noreferrer">
          <Icon name='leaf' size='large' />
        </a>
        Capsicum baccatum
      </Header>

      <Grid textAlign='center' columns={4} >
        <Grid.Row>

          <Grid.Column
            style={columnStyle}
            color={sensor.soil_moisture < 10 ? 'red' : null}>
            <SensorValue
              size={'large'}
              value={sensor.soil_moisture + ' %'}
              label={'Soil moisture'}
              icon='theme'
              iconColor={'blue'}
            />
          </Grid.Column>

          <Grid.Column style={columnStyle}>
            <SensorValue
              size={'large'}
              value={Math.floor(sensor.light) + ' %'}
              label={'Light'}
              icon={'sun'}
              iconColor={'yellow'}
            />
          </Grid.Column>

          <Grid.Column style={columnStyle}>
            <SensorValue
              size={'large'}
              value={Math.floor(sensor.nutrient) + ' %'}
              label={'Nutrient'}
              icon={'pills'}
              iconColor={'orange'}
            />
          </Grid.Column>

          <Grid.Column style={columnStyle}>
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
            <Button
              data-cy='chart-toggle-button'
              circular icon={chartVisible ? 'close' : 'chart area'}
              onClick={() => setChartVisible(!chartVisible)} />
            {
              chartVisible &&
              <>
                <Button compact circular onClick={() => setChartTimeRange('DAY')}>D</Button>
                <Button compact circular onClick={() => setChartTimeRange('WEEK')}>W</Button>
                <Button compact circular onClick={() => setChartTimeRange('MONTH')}>M</Button>
                <Button compact circular onClick={() => setChartTimeRange('YEAR')}>Y</Button>
              </>
            }
          </Grid.Column>

        </Grid.Row>
        <Grid.Row columns={1} centered style={{ padding: `${chartVisible ? '5px' : '0px'}` }}>

          <Grid.Column textAlign='center' style={{ padding: 0 }}>
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

// Proptypes
PlantSensor.propTypes = {
  sensor: PropTypes.object.isRequired
}

export default PlantSensor