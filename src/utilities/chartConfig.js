// Libraries
import moment from 'moment'

const returnColor = (measure) => {
  switch (measure) {
  case 'temperature_C':
    return 'rgba(219, 40, 40, 0.8)'
  case 'ec_mS_cm':
    return 'rgba(242, 113, 28, 0.8)'
  case 'light_lux':
    return 'rgba(251, 189, 8, 0.8)'
  case 'humidity':
    return 'rgba(33, 133, 208, 0.8)'
  case 'soil_moisture':
    return 'rgba(33, 133, 208, 0.8)'
  case 'CO2_ppm':
    return 'rgba(0, 0, 0, 0.8)'
  default: break
  }
}

const returnAxisId = (m) => {
  if (m === 'light_lux' || m === 'ec_mS_cm' || m === 'humidity') {
    return 'y-axis-2'
  }
  return 'y-axis-1'
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
            yAxisID: returnAxisId(cur),
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
  const returnUnit = () => {
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
  const returnYLabel = (measure) => {
    switch (measure) {
    case 'temperature_C':
      return 'ºC'
    case 'light_lux':
      return 'klx'
    case 'ec_mS_cm':
      return 'mS'
    case 'CO2_ppm':
      return 'ppm'
    case 'soil_moisture':
      return '%'
    case 'humidity':
      return '%'
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
        suggestedMin: chartFilter[0] === 'soil_moisture' ? 0 : undefined,
        max: chartFilter[0] === 'soil_moisture' ? 100 : undefined,
        callback: (value, index) => index === 0 ? value + returnYLabel(chartFilter[0]) : value,
        fontColor: returnColor(chartFilter[0])
      },
      gridLines: {
        drawBorder: false,
      }
    }

    const yAxisRight = {
      id: 'y-axis-2',
      position: 'right',
      ticks: {
        suggestedMin: chartFilter[1] === 'humidity' ? 20 : undefined,
        max: chartFilter[1] === 'humidity' ? 100 : undefined,
        callback: (value, index) => index === 0 ? value + returnYLabel(chartFilter[1]) : value,
        fontColor: returnColor(chartFilter[1])
      },
      gridLines: {
        drawBorder: false,
        display: false
      }
    }

    if (chartFilter[0] === 'temperature_C' || chartFilter[0] === 'soil_moisture') {
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
            unit: returnUnit(),
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