// Libraries
import React, { useState, useEffect } from 'react'
import { useApolloClient } from 'react-apollo-hooks'
// Custom hooks
import useSensors from './hooks/useSensors'
// Components
import ResponsiveLayout from './components/ResponsiveLayout'
import LoginView from './components/LoginView'
import SensorView from './components/SensorView'
import ChatView from './components/ChatView'
import AboutView from './components/AboutView'
import SettingsView from './components/SettingsView'
import VideoView from './components/VideoView'

const App = () => {
  const [page, setPage] = useState('Sensors')
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('kaste-user-token')))
  const [sensorData, actions, sensorService, sensorsConnected, sensorError] = useSensors(30) // update interval (in seconds)
  const client = useApolloClient()

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
    localStorage.clear()
    client.resetStore()
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
          sensorService={sensorService}
        >

          <SensorView
            token={token}
            sensorData={sensorData}
            sensorError={sensorError}
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
            actions={actions}
            sensorService={sensorService}
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

