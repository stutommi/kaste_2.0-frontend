// Libraries
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Responsive, Menu, Icon } from 'semantic-ui-react'
import axios from 'axios'
// Components
import WateringModal from './WateringModal'

const DesktopContainer = ({ children, setPage, logOut, actions, token, sensorService }) => {
  const [cameraConnected, setCameraConnected] = useState(false)
  const [raspConnected, setRaspConnected] = useState(false)
  const [wateringConnected, setWateringConnected] = useState(false)

  // Handles page navigation
  const handleViewChange = (view) => () => {
    setPage(view)
  }

  // Handles rasp rebooting
  const handleReboot = () => {
    sensorService.stopFetching()
    axios.get(actions.reboot)

    setTimeout(() => {
      sensorService.startFetching(token.sensorEndpoint)
    }, 1000);
  }

  // Check if sensor actions include camera, watering or rasp rebooting functionality
  useEffect(() => {
    if (actions) {
      setCameraConnected(actions.camera !== undefined)
      setRaspConnected(actions.reboot !== undefined)
      setWateringConnected(actions.water !== undefined)
    } else {
      setCameraConnected(false)
      setRaspConnected(false)
      setWateringConnected(false)
    }

  }, [actions])

  return (
    <>
      <Responsive
        style={{ height: '100vh' }}
        minWidth={Responsive.onlyTablet.minWidth}
      >
        <Menu
          style={{ height: 71 }}
          inverted
          icon='labeled'
          color='green'
          fixed='top'
        >

          <Menu.Item
            data-cy='sensors-button'
            onClick={handleViewChange('Sensors')}>
            <Icon name='info' />
            Sensors
          </Menu.Item>

          <Menu.Item
            data-cy='chat-button'
            onClick={handleViewChange('Chat')}>
            <Icon name='comments outline' />
            Chat
          </Menu.Item>

          <WateringModal
            actions={actions}
            wateringConnected={wateringConnected}
            setPage={setPage}
          />

          <Menu.Item
            data-cy='stop-button'
            disabled={!raspConnected}
            onClick={handleReboot}>
            <Icon name='redo' />
            Reboot rasp
          </Menu.Item>

          <Menu.Item
            data-cy='livefeed-button'
            disabled={!cameraConnected}
            onClick={handleViewChange('Video')}>
            <Icon name='eye' />
            Live Feed
          </Menu.Item>

          <Menu.Menu position='right'>
            {token &&
              <Menu.Header as='p' style={{ color: 'white', alignSelf: 'center', margin: '0 10px 0' }}>
                <Icon name='user' />
                {token.username} <br />
                logged in
              </Menu.Header>
            }

            <Menu.Item
              data-cy='settings-button'
              onClick={handleViewChange('Settings')}>
              <Icon name='settings' />
              Settings
            </Menu.Item>

            <Menu.Item
              data-cy='about-button'
              onClick={handleViewChange('About')}>
              <Icon name='question' />
              About
            </Menu.Item>

            <Menu.Item
              data-cy='logout-button'
              onClick={() => logOut(false)}>
              <Icon name='log out' />
              Log out
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        <div style={{ height: 71 }} />
        <div style={{ height: 'calc(100vh - 71px)' }}>
          {children}
        </div>

      </Responsive>
    </>
  )
}

// Proptypes
DesktopContainer.propTypes = {
  children: PropTypes.node.isRequired,
  setPage: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  token: PropTypes.object.isRequired,
  sensorService: PropTypes.object.isRequired,
  actions: PropTypes.object
}

export default DesktopContainer