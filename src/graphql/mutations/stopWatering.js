import { gql } from 'apollo-boost'

const stopWatering = gql`
mutation stopWatering(
  $sensorEndpoint: String!
  ) {
    stopWatering(
    sensorEndpoint: $sensorEndpoint
  ) {
    message
  }
}
`

export default stopWatering