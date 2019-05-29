import { gql } from 'apollo-boost'

const editUserSensorEndpoint = gql`
mutation editUserSensorEndpoint(
  $sensorEndpoint: String!
  ) {
    editUserSensorEndpoint(
    sensorEndpoint: $sensorEndpoint
  ) {
    sensorEndpoint
    name
    username
  }
}
`

export default editUserSensorEndpoint