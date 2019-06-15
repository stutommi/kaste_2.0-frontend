// Libraries
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Responsive, Sidebar, Menu, Icon } from 'semantic-ui-react'
// Components
import WateringModal from './WateringModal'
// Custom hooks
import useAction from '../hooks/useAction'
// Typedefs
import stopWatering from '../graphql/mutations/stopWatering'


const MobileContainer = ({ children, setPage, logOut, page, actions, token, sensorService }) => {
  const [showSidebar, setShowSidebar] = useState(false)
  const [cameraConnected, setCameraConnected] = useState(false)
  
  const [wateringConnected, setWateringConnected] = useState(false)
  const fireAction = useAction()

  // Handles page navigation
  const handleViewChange = (view) => () => {
    setShowSidebar(false)
    setPage(view)
  }

  // Stops watering
  const handleStopWatering = () => {
    setShowSidebar(false)
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
        maxWidth={Responsive.onlyMobile.maxWidth}
        as={Sidebar.Pushable}
        style={{ height: '100vh' }}
      >
        <Sidebar
          as={Menu}
          animation='push'
          inverted
          onHide={() => setShowSidebar(false)}
          vertical
          visible={showSidebar}
          icon='labeled'
          width='thin'
        >
          {token &&
            <Menu.Header as='small' style={{ color: 'white' }}>
              <Icon name='user' color='green' />
              {token.username}
            </Menu.Header>
          }
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
            data-cy='livefeed-button'
            disabled={!cameraConnected}
            onClick={handleViewChange('Video')}>
            <Icon name='eye' />
            Live Feed
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
        </Sidebar>

        <Sidebar.Pusher style={{ height: '100%' }} dimmed={showSidebar}>

          <Menu widths={3} inverted pointing color='green' size='large' style={{ height: '50px', marginBottom: 0, borderRadius: 0 }}>
            <Menu.Item onClick={() => setShowSidebar(true)} style={{ alignSelf: 'center' }}>
              <Icon data-cy='sidebar-button' name='sidebar' />
            </Menu.Item>
            <Menu.Item header={true}>
              {page}
            </Menu.Item>
            <Menu.Item position='right' onClick={() => logOut()} style={{ alignSelf: 'center' }}>
              <Icon name='log out' />
            </Menu.Item>
          </Menu>

          <div style={{ height: 'calc(100vh - 50px)' }}>
            {children}
          </div>

        </Sidebar.Pusher>
      </Responsive>
    </>
  )
}

// Proptypes
MobileContainer.propTypes = {
  children: PropTypes.node.isRequired,
  setPage: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired,
  token: PropTypes.object.isRequired,
  sensorService: PropTypes.object.isRequired,
  actions: PropTypes.object
}

export default MobileContainer