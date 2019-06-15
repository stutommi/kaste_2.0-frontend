export const includedIn = (set, object) =>
  set.map(p => p.id).includes(object.id)

// Sensor data comes in two objects. they need to be merged into one one array
export const formatSensorData = (sensorData) => {
  const values = Object.values(sensorData)
  const flattenedArray = values.reduce((acc, cur) => cur.concat(acc))
  // Some sensors might show empty values because they're not online yet
  // so they need to be filtered out.
  const filteredArray = flattenedArray.filter(sensor => sensor.model !== '')

  if (filteredArray.length === 0) {
    throw new Error('Sensors loading')
  }

  return filteredArray
}

// Sets new url endpoint to localstorage
export const handleSensorEndpointUpdateForToken = (sensorUrlField, setToken) => {
  const currentToken = JSON.parse(localStorage.getItem('kaste-user-token'))
  localStorage.removeItem('kaste-user-token')

  const updatedToken = {
    ...currentToken,
    sensorEndpoint: sensorUrlField
  }

  window.localStorage.setItem('kaste-user-token', JSON.stringify(updatedToken))
  setToken(updatedToken)
}


export default { includedIn, formatSensorData, handleSensorEndpointUpdateForToken }