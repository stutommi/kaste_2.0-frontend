// Libraries
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Segment, Grid, Header, Icon, Button } from 'semantic-ui-react'
import moment from 'moment'
import { useMutation } from '@apollo/react-hooks'
// Components
import SensorValue from './SensorValue'
import Chart from './Chart'
// TypeDefs
import clearChartData from '../graphql/mutations/clearChartData'
import chartData from '../graphql/queries/chartData'

const chartFilterDef = ['temperature_C', 'humidity']
const chartFilterCO2 = ['CO2_ppm']

const HouseSensor = ({ sensor }) => {
  const [chartVisible, setChartVisible] = useState(false)
  const [chartTimeRange, setChartTimeRange] = useState('DAY')
  const [measures, setMeasures] = useState(chartFilterDef)
  const [clearChartHistory] = useMutation(clearChartData, {
    // Doesn't update the UI..
    refetchQueries: () => [{
      query: chartData,
      variables: { id: sensor.id, type: "HOUSE", range: chartTimeRange }
    }]
  })

  const handleClearData = () => {
    const confirmation = window.confirm('Are you sure you want to delete all data that this sensor has gathered to DB?')

    if (confirmation === false) {
      return
    }

    clearChartHistory({
      variables: { id: sensor.id },
    })
  }

  return (
    <Segment inverted secondary style={{ margin: '2px 1px', background: 'beige', color: 'black' }}>
      <Header style={{ color: 'black' }} textAlign='center' as='h3'>
        <Icon name='home' color='black' size='large' />
        {sensor.location}
      </Header>

      <Grid textAlign='center' columns={sensor.CO2_ppm ? 3 : 2} >
        <Grid.Row>
          <Grid.Column>
            <SensorValue
              size={'large'}
              value={sensor.temperature_C + ' ºC'}
              label={'Temperature'}
              icon={'thermometer'}
              iconColor={'red'}
            />
          </Grid.Column>

          {
            sensor.CO2_ppm &&
            <Grid.Column style={{ fontSize: 13 }}>
              <strong>
                <span style={{ background: 'lightgray', padding: 5, borderRadius: 5 }}>
                  CO<sup>2</sup>
                </span>
              </strong>
              <span> {sensor.CO2_ppm} ppm</span>
            </Grid.Column>
          }

          <Grid.Column>
            <SensorValue
              size={'large'}
              value={sensor.humidity + ' %'}
              label={'Soil moisture'}
              icon='theme'
              iconColor={'blue'}
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
          <Grid.Column style={{ padding: 0 }}>
            <Button.Group attached='top' style={{ maxWidth: 1300 }}>
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

            {
              sensor.CO2_ppm &&
              <Button.Group attached='bottom'>
                <Button onClick={() => setMeasures(chartFilterDef)}>Temp & Hum</Button>
                <Button onClick={() => setMeasures(chartFilterCO2)}>CO<sup>2</sup></Button>
              </Button.Group>
            }
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={sensor.CO2_ppm ? 1 : 2} style={{ padding: 5 }}>

          <Grid.Column textAlign='left'>

            <SensorValue
              value={moment(sensor.time).fromNow()}
              label={'Updated'}
              size={'small'}
              icon={'time'}
              iconColor={moment() - moment(sensor.time) > 1000 * 60 * 60 ? 'red' : null}
            />
          </Grid.Column>

          {
            sensor.battery_low !== undefined &&
            <Grid.Column textAlign='right'>
              <SensorValue
                label={'Battery'}
                size={'small'}
                icon={'battery full'}
                iconColor={sensor.battery_low === 1 ? 'red' : null}
              />
            </Grid.Column>
          }

        </Grid.Row>
      </Grid>

    </Segment >
  )
}

// Proptypes
HouseSensor.propTypes = {
  sensor: PropTypes.object.isRequired
}

export default HouseSensor