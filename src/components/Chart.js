// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-apollo-hooks'
import { Line } from 'react-chartjs-2'
import moment from 'moment'
import { Segment } from 'semantic-ui-react'
// Type defs
import chartData from '../graphql/queries/chartData'
// Components
import Loading from './Loading'

const formatSensorDataIntoChartData = ({ chartData }) => {

  const formattedChartData = Object.keys(chartData)
    .reduce((acc, cur) => {
      if (cur === '__typename' || chartData[cur] === null) {
        return acc
      }

      if (cur === 'time') {
        acc.labels = chartData[cur].map(time => {

          // If sensor data older than 1 day, format differently
          if (moment() - time > 1000 * 60 * 60 * 24) {
            return moment.utc(time).local()
          }

          moment.relativeTimeThreshold('h', 25)
          return moment(time).subtract(3, 'hours')
        })

        return acc
      }

      const returnLineColor = (measure) => {
        switch (measure) {
          case 'temperatureC':
            return 'rgba(250, 64, 61, 0.7)'
          case 'nutrient':
            return 'rgba(250, 158, 61, 0.7)'
          case 'light':
            return 'rgba(246, 250, 61, 0.7)'
          case 'humidity':
            return 'rgba(61, 152, 250, 0.7)'
          case 'soilMoisture':
            return 'rgba(61, 152, 250, 0.7)'
          default: break
        }
      }

      acc.datasets.push(
        {
          label: cur,
          fill: false,
          lineTension: 0.1,
          backgroundColor: returnLineColor(cur),
          borderColor: returnLineColor(cur),
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: returnLineColor(cur),
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: returnLineColor(cur),
          pointHoverBorderColor: returnLineColor(cur),
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: chartData[cur]
        }

      )

      return acc
    }, { labels: [], datasets: [] })

  return formattedChartData
}

const options = (range) => {

  // define unit value based on range
  const unit = () => {
    switch (range) {
      case 'DAY':
        return 'minute'
      case 'WEEK':
        return 'hour'
      case 'YEAR':
        return 'day'
      default:
        break
    }
  }

  // return options object
  return {
    layout: {
      padding: {
        bottom: -20,
      }
    },
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            unit: unit(),
            displayFormats: {
              minute: 'HH:mm',
              hour: 'dd HH:mm'
            },
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 6
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            suggestedMin: 0,
            max: 100
          }
        }
      ]
    }
  }
}

const Chart = ({ sensor, chartTimeRange }) => {
  const plantData = useQuery(chartData, {
    variables: { id: sensor.id, type: sensor.type.toUpperCase(), range: chartTimeRange },
    fetchPolicy: 'no-cache'
  })

  if (plantData.loading) {
    return (
      <div style={{ minHeight: 'calc(89vw / 2)' }}>
        <Loading inverted={true} />
      </div>
    )
  }

  if (Object.keys(plantData.data).length === 0) {
    return <Segment
      color='red'
      inverted
      secondary>
      Chart failed to load
    </Segment>
  }
  const formattedChartData = formatSensorDataIntoChartData(plantData.data)

  return (
    <Line
      data={formattedChartData}
      options={options(chartTimeRange)}
      legend={{ display: false }} />
  )
}

// Proptypes
Chart.propTypes = {
  sensor: PropTypes.object.isRequired,
  chartTimeRange: PropTypes.string.isRequired
}

export default Chart