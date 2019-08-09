import { gql } from 'apollo-boost'

const chartData = gql`
  query ChartData($id: Int!, $type: HousePlant!, $range: DayWeekMonthYear!) {
  chartData(id: $id, type: $type, range: $range) {
    time
    light_lux
    ec_mS_cm
    soil_moisture
    temperature_C
    humidity
    CO2_ppm
  }
}
`

export default chartData