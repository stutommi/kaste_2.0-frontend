// Libraries
import React from 'react'

const SensorView = ({ show }) => {

  if (!show) {
    return null
  }

  return (
    <>
      <p>SENSORVIEW 1</p>
      <p>SENSORVIEW 2</p>
      <p>SENSORVIEW 3</p>
      <p>SENSORVIEW 4</p>
    </>
  )
}

export default SensorView