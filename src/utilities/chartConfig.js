// Libraries
import moment from 'moment'

const returnColor = (measure) => {
  switch (measure) {
  case 'temperature_C':
    return 'rgba(219, 40, 40, 1)'
  case 'ec_mS_cm':
    return 'rgba(242, 113, 28, 1)'
  case 'light_lux':
    return 'rgba(251, 189, 8, 1)'
  case 'humidity':
    return 'rgba(33, 133, 208, 1)'
  case 'soil_moisture':
    return 'rgba(33, 133, 208, 1)'
  case 'CO2_ppm':
    return 'rgba(0, 0, 0, 1)'
  default: break
  }
}

export const formatSensorDataIntoChartData = ({ chartData }, chartFilter) => {

  const formattedChartData = Object.keys(chartData)
    .reduce((acc, cur) => {
      if (cur === '__typename' || chartData[cur] === null) {
        return acc
      }

      if (cur === 'time') {
        acc.labels = chartData[cur].map(time => {
          moment.relativeTimeThreshold('h', 25)
          return moment(time).subtract(3, 'hours')
        })
        return acc
      }

      if (chartFilter.includes(cur)) {
        acc.datasets.push(
          {
            label: cur,
            fill: false,
            lineTension: 0.1,
            backgroundColor: returnColor(cur),
            borderColor: returnColor(cur),
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: returnColor(cur),
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: returnColor(cur),
            pointHoverBorderColor: returnColor(cur),
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            yAxisID: cur === 'soil_moisture' || cur === 'humidity' ? 'y-axis-2' : 'y-axis-1',
            data: chartData[cur]
          }

        )
      }
      return acc
    }, { labels: [], datasets: [] })
  return formattedChartData
}

export const options = (range, chartFilter) => {

  // define unit value based on range
  const unit = () => {
    switch (range) {
    case 'DAY':
      return 'minute'
    case 'WEEK':
      return 'hour'
    case 'MONTH':
      return 'day'
    case 'YEAR':
      return 'day'
    default:
      break
    }
  }

  // define label based on chartFilter
  const returnYLabel = () => {
    switch (chartFilter[0]) {
    case 'temperature_C':
      return 'ºC'
    case 'light_lux':
      return 'klx'
    case 'ec_mS_cm':
      return 'mS'
    case 'CO2_ppm':
      return 'ppm'
    default:
      break
    }
  }

  // define yAxes
  const yAxes = () => {
    
    const yAxisLeft = {
      id: 'y-axis-1',
      position: 'left',
      ticks: {
        suggestedMin: 0,
        callback: (value, index) => index === 0 ? value + returnYLabel() : value,
        fontColor: returnColor(chartFilter[0])
      },
      gridLines: {
        drawBorder: false,
      }
    }

    const yAxisRight = {
      id: 'y-axis-2',
      position: 'right',
      display: chartFilter[0] === 'temperature_C' ? true : false,
      ticks: {
        suggestedMin: 0,
        max: 100,
        callback: (value, index) => index === 0 ? value + '%' : value,
        fontColor: 'rgba(33, 133, 208, 1)'
      },
      gridLines: {
        drawBorder: false,
        display: false
      }
    }

    if (chartFilter[0] === 'temperature_C') {
      return [yAxisLeft, yAxisRight]
    } else {
      return [yAxisLeft]
    }
  }

  // define options
  const optionsObj = {
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            unit: unit(),
            displayFormats: {
              minute: 'HH:mm',
              hour: 'dd HH:mm',
              day: 'DD.M',

            },
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 6,
            maxRotation: 0
          }
        }
      ],
      yAxes: yAxes()
    },
    legend: {
      display: false
    }
  }

  // return options object
  return optionsObj
}