// Libraries
import React, { useState, useEffect } from 'react'
import axios from 'axios'

// Components
import ResponsiveLayout from './components/ResponsiveLayout'
import LoginView from './components/LoginView'
import SensorView from './components/SensorView'
import ChatView from './components/ChatView'
import AboutView from './components/AboutView'

const App = () => {
  const [page, setPage] = useState('SensorView')
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('kaste-user-token')))

  useEffect(() => {
    axios.get('http://86.115.57.126:8001/ws/pasila_sensors')
    .then( response => console.log(response)
    )
}, [])

const logOut = () => {
  setToken(null)
  localStorage.removeItem('kaste-user-token')
}

return (
  <>
    {!token
      ?
      <LoginView
        setToken={setToken} />
      :
      <ResponsiveLayout
        setPage={setPage}
        logOut={logOut}
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

