// Libraries
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Grid, Button, Header, Segment, Icon } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import moment from 'moment'
// Components
import SensorValue from './SensorValue'
import Chart from './Chart'
// TypeDefs
import clearChartData from '../graphql/mutations/clearChartData'
import chartData from '../graphql/queries/chartData'

const columnStyle = { padding: 0, margin: 0 }

const chartFilterTempLight = ['temperature_C', 'light_lux']
const chartFilterSoilCond = ['soil_moisture', 'ec_mS_cm']

const PlantSensor = ({ sensor }) => {
  const [chartVisible, setChartVisible] = useState(false)
  const [chartTimeRange, setChartTimeRange] = useState('DAY')
  const [measures, setMeasures] = useState(chartFilterSoilCond)
  const [clearChartHistory] = useMutation(clearChartData, {
    // Doesn't update the UI..
    refetchQueries: () => [{
      query: chartData,
      variables: { id: sensor.id, type: "PLANT", range: chartTimeRange }
    }]
  })

  const handleClearData = () => {
    const confirmation = window.confirm('Are you sure you want to delete all data that this sensor has gathered to DB?')

    if (confirmation === false) {
      return
    }

    clearChartHistory({
      variables: { id: sensor.id }
    })
  }

  return (
    <Segment
      color='green'
      inverted
      secondary
      style={{ margin: '2px 1px' }}>

      <Header textAlign='center' as='h3'>
        <a
          style={{ color: 'inherit' }}
          href={`https://en.wikipedia.org/wiki/${sensor.name.replace(/[0-9]/g, '')}`}
          target='_blank'
          rel="noopener noreferrer">
          <Icon name='leaf' size='large' />
        </a>
        {sensor.name}
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
              value={sensor.light_lux + ' klx'}
              label={'Light'}
              icon={'sun'}
              iconColor={'yellow'}
            />
          </Grid.Column>

          <Grid.Column style={columnStyle}>
            <SensorValue
              size={'large'}
              value={sensor.ec_mS_cm + ' mS'}
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
            <Button style={{ display: chartVisible ? 'inline-block' : 'none' }}
              data-cy='chart-clearData-button'
              circular icon={'trash alternate'}
              onClick={handleClearData}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row
          columns={1}
          centered
          style={{
            display: `${chartVisible ? 'block' : 'none'}`,
            padding: 5
          }}>

          <Grid.Column textAlign='center' style={{ padding: 0, maxWidth: 1300 }}>
            <Button.Group attached='top'>
              <Button onClick={() => setChartTimeRange('DAY')}>D</Button>
              <Button onClick={() => setChartTimeRange('WEEK')}>W</Button>
              <Button onClick={() => setChartTimeRange('MONTH')}>M</Button>
              <Button onClick={() => setChartTimeRange('YEAR')}>Y</Button>
            </Button.Group>


            <Segment style={{ margin: '0 auto', padding: 5 }}>
              <Chart
                sensor={sensor}
                chartTimeRange={chartTimeRange}
                chartFilter={measures} />
            </Segment>

            <Button.Group attached='bottom'>
              <Button onClick={() => setMeasures(chartFilterSoilCond)}>Moist & Nutr</Button>
              <Button onClick={() => setMeasures(chartFilterTempLight)}>Temp & Light</Button>
            </Button.Group>
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