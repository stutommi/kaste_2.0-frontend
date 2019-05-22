// Libraries
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Header } from 'semantic-ui-react'

// Components
import AppMenu from './components/Menu.js'

const App = () => {
  const [page, setPage] = useState('chat')
  const [sensors, setSensors] = useState(null)
  console.log('sensors', sensors)

  useEffect(() => {
    axios.get('http://86.115.57.126:8001/ws/pasila_sensors')
      .then(response => console.log(response)
      )
  }, [])

  return (
    <>
    <AppMenu 
    page={page}
    />


      <Header as='h1'>sensorData test</Header>
      {sensors && sensors.map(sensor =>
        <div key={sensor.id}>
          <p>{sensor.id}</p>
          <p>{sensor.type}</p>
          <p>{sensor.temp}</p>
          <p>{sensor.moisture}</p>
        </div>
      )
      }
    </>
  )
}

export default App;

