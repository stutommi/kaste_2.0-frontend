// Libraries
import React, { useState, useEffect } from 'react'
// Custom hooks
import { useSensors } from './hooks/index'
// Components
import ResponsiveLayout from './components/ResponsiveLayout'
import LoginView from './components/LoginView'
import SensorView from './components/SensorView'
import ChatView from './components/ChatView'
import AboutView from './components/AboutView'
import SettingsView from './components/SettingsView'
import VideoView from './components/VideoView'

const App = () => {
  const [page, setPage] = useState('Chat')
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('kaste-user-token')))
  const [sensorData, actions, sensorService, sensorsConnected, sensorError] = useSensors(60)

  useEffect(() => {
    if (token && token.sensorEndpoint) {
      sensorService.startFetching(token.sensorEndpoint)
    } else {
      sensorService.stopFetching()
    }
  }, [token])

  const logOut = () => {
    setPage('Settings')
    sensorService.stopFetching()
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
          page={page}
          setPage={setPage}
          logOut={logOut}
          actions={actions}
          token={token}
        >

          <SensorView
            sensorData={sensorData}
            show={page === 'Sensors'}
          />

          <ChatView
            show={page === 'Chat'}
          />

          <AboutView
            show={page === 'About'}
          />

          <SettingsView
            show={page === 'Settings'}
            sensorsConnected={sensorsConnected}
            token={token}
            setToken={setToken}
          />

          <VideoView
            show={page === 'Video'}
            token={token}
            actions={actions}
          />
        </ResponsiveLayout>
      }
    </>
  )
}

export default App;

