// Libraries
import React, { useState } from 'react'
import { useQuery } from 'react-apollo-hooks'
import { Line } from 'react-chartjs-2'
import moment from 'moment'
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
        if (moment() - time > 1000*60*60*24) {
          
          return moment.utc(time).local().format('ddd hA')
        }
        
        return moment(time).subtract(3, 'hours').fromNow(true)
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

  console.log('formattedChartData', formattedChartData)

  return formattedChartData
}

const options = {
  layout: {
    padding: {
      bottom: -20
    }
  },
  scales: {
    xAxes: [
      {

        ticks: {
          autoSkip: true,
          maxTicksLimit: 5
        }
      }
    ],
    yAxes: [
      {
        ticks: {
        min: 0,
        max: 100
        }
      }
    ]
  }
}

const Chart = ({ sensor, chartTimeRange }) => {
  const plantData = useQuery(chartData, {
    variables: { id: sensor.id, type: sensor.type.toUpperCase(), range: chartTimeRange },
    fetchPolicy: 'no-cache'
  })

  if (plantData.loading) {
    return <Loading />
  }

  const formattedChartData = formatSensorDataIntoChartData(plantData.data)

  return (
    <Line data={formattedChartData} options={options} legend={{ display: false }} />
  )
}

export default Chart