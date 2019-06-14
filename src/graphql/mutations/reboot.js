import { gql } from 'apollo-boost'

const reboot = gql`
mutation reboot(
  $sensorEndpoint: String!
  ) {
    reboot(
    sensorEndpoint: $sensorEndpoint
  ) {
    message
  }
}
`

export default reboot