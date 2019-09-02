// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'
import { Line } from 'react-chartjs-2'
import { Segment } from 'semantic-ui-react'
// TypeDefs
import chartData from '../graphql/queries/chartData'
// Components
import Loading from './Loading'
// Utils
import { formatSensorDataIntoChartData, options } from '../utilities/chartConfig'

const Chart = ({ sensor, chartTimeRange, chartFilter }) => {
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
    return (
      <Segment color='red' inverted secondary>
        Chart failed to load
      </Segment>
    )
  }

  const formattedChartData = formatSensorDataIntoChartData(plantData.data, chartFilter)
  return (
    <Line
      data={formattedChartData}
      options={options(chartTimeRange, chartFilter)}
      redraw={true}
    />
  )
}

// Proptypes
Chart.propTypes = {
  chartFilter: PropTypes.array.isRequired,
  sensor: PropTypes.object.isRequired,
  chartTimeRange: PropTypes.string.isRequired
}

export default Chart