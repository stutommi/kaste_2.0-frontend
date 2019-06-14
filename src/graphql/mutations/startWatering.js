import { gql } from 'apollo-boost'

const startWatering = gql`
mutation startWatering(
  $sensorEndpoint: String!
  ) {
    startWatering(
    sensorEndpoint: $sensorEndpoint
  ) {
    message
  }
}
`

export default startWatering