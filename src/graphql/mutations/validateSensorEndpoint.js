import { gql } from 'apollo-boost'

const validateSensorEndpoint = gql`
mutation validateSensorEndpoint(
  $sensorEndpoint: String!
  ) {
    validateSensorEndpoint(
    sensorEndpoint: $sensorEndpoint
  ) {
    message
  }
}
`

export default validateSensorEndpoint