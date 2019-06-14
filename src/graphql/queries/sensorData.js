import { gql } from 'apollo-boost'

const sensorData = gql`
  query SensorData($sensorEndpoint: String!) {
  sensorData (sensorEndpoint: $sensorEndpoint){
    value
  }
}
`

export default sensorData