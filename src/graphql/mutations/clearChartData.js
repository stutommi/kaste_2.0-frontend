import { gql } from 'apollo-boost'

const clearChartData = gql`
mutation clearChartData(
  $id: ID!
  ) {
    clearChartData(
    id: $id
  ) {
    message
  }
}
`

export default clearChartData