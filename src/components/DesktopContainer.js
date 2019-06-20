// Libraries
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Responsive, Menu, Icon } from 'semantic-ui-react'
// Components
import WateringModal from './WateringModal'
// Custom hooks
import {useAction} from '../hooks/useAction'
// Typedefs
import stopWatering from '../graphql/mutations/stopWatering'

const DesktopContainer = ({ children, setPage, logOut, actions, token }) => {
  const [cameraConnected, setCameraConnected] = useState(false)
  const [wateringConnected, setWateringConnected] = useState(false)
  const fireAction = useAction()

  // Handles page navigation
  const handleViewChange = (view) => () => {
    setPage(view)
  }

  // Stops watering
  const handleStopWatering = () => {
    fireAction(actions.water.waterstop, stopWatering)
  }

  // Check if sensor actions include camera or watering functionality
  useEffect(() => {
    if (actions) {
      setCameraConnected(actions.camera !== undefined)
      setWateringConnected(actions.water !== undefined)
    } else {
      setCameraConnected(false)
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
            disabled={!wateringConnected}
            onClick={handleStopWatering}>
            <Icon name='stop circle' />
            Stop Watering
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