import { gql } from 'apollo-boost'

const chartData = gql`
  query ChartData($id: Int!, $type: HousePlant!, $range: DayWeekMonthYear!) {
  chartData(id: $id, type: $type, range: $range) {
    time
    light
    nutrient
    soilMoisture
    temperatureC
    humidity
  }
}
`

export default chartData