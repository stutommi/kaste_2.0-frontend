// Libraries
import React from 'react'
import { Statistic } from 'semantic-ui-react'

const SensorValue = ({ value, label }) => {

  return (
    <>
      <p>{label}: {value}</p>
    </>

  )
}

export default SensorValue