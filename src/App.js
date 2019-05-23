// Libraries
import React, { useState } from 'react';
// import axios from 'axios'

// Components
import ResponsiveLayout from './components/ResponsiveLayout'
import LoginView from './components/LoginView'
import SensorView from './components/SensorView'
import ChatView from './components/ChatView'
import AboutView from './components/AboutView'

const App = () => {
  const [page, setPage] = useState('SensorView')
  // const [sensors, setSensors] = useState(null)
  const [user, setUser] = useState(true)

  // useEffect(() => {
  //   axios.get('http://86.115.57.126:8001/ws/pasila_sensors')
  //     .then(response => console.log(response)
  //     )
  // }, [])

  return (
    <>
      {!user
        ?
        <LoginView 
        setUser={setUser}/>
        :
        <ResponsiveLayout
        setPage={setPage}
        setUser={setUser}
        >

          <SensorView
          show={page === 'SensorView'}
          />

          <ChatView
          show={page === 'ChatView'}
          />

          <AboutView
          show={page === 'AboutView'}
          />

        </ResponsiveLayout>
      }
    </>
  )
}

export default App;

