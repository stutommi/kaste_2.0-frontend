import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'

const labels = ['7h', '6h', '5h', '4h', '3h', '2h', '1h','cur']
const plantDatasets = [

]

// For testing
const initialState = {
  labels: labels,
  datasets: [
    {
      label: 'moisture',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40, 100]
    },
    {
      label: 'light',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(12,42,192,0.4)',
      borderColor: 'rgba(12,42,192,0.4)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(32,32,222,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [12, 23, 34, 54, 42, 55, 12, 53]
    },

  ]
}


const Chart = () => {


  return (
    <Line
    height={175}
    data={initialState}/>
  )
}

export default Chart