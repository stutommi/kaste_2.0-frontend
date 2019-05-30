export const includedIn = (set, object) =>
  set.map(p => p.id).includes(object.id)

// Sensor data comes in two objects. they need to be mergedinto one one array
export const formatSensorData = (sensorData) => {
  const values = Object.values(sensorData)
  const flattenedArray = values.reduce((acc, cur) => cur.concat(acc))
  return flattenedArray
}

export default { includedIn, formatSensorData }