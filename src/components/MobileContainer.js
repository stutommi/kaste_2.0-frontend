// Libraries
import React, { useState, useEffect } from 'react'
import { Responsive, Sidebar, Menu, Icon } from 'semantic-ui-react'

const MobileContainer = ({ children, setPage, logOut, page, actions, token }) => {
  const [recentlyWatered, setRecentlyWatered] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [cameraConnected, setCameraConnected] = useState(false)
  const [raspConnected, setRaspConnected] = useState(false)
  const [wateringConnected, setWateringConnected] = useState(false)

  const handleViewChange = (view) => () => {
    setShowSidebar(false)
    setPage(view)
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

  const handleWatering = () => {
    setRecentlyWatered(true)
    console.log('Watering plants plants')
    setTimeout(() => {
      setRecentlyWatered(false)
      console.log('Watering completed')

    }, 5000)
  }

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
          <Menu.Header as='small' style={{color: 'white'}}>
            <Icon name='user' color='green'/>
            {token.username}
          </Menu.Header>
        }
          <Menu.Item onClick={handleViewChange('Sensors')}>
            <Icon name='info' />
            Sensors
          </Menu.Item>
          <Menu.Item onClick={handleViewChange('Chat')}>
            <Icon name='comments outline' />
            Chat
          </Menu.Item>
          <Menu.Item onClick={handleViewChange('Settings')}>
            <Icon name='settings' />
            Settings
          </Menu.Item>
          <Menu.Item onClick={handleViewChange('About')}>
            <Icon name='question' />
            About
          </Menu.Item>
          <Menu.Item disabled={!cameraConnected} onClick={handleViewChange('Video')}>
            <Icon name='eye' />
            Live Feed
          </Menu.Item>
          <Menu.Item disabled={!wateringConnected || recentlyWatered} onClick={handleWatering}>
            <Icon name='shower' />
            Water plants
          </Menu.Item>
          <Menu.Item disabled={!raspConnected} onClick={() => console.log('Reboot rasp')}>
            <Icon name='redo' />
            Reboot rasp
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher style={{ height: '100%' }} dimmed={showSidebar}>

          <Menu widths={3} inverted pointing color='green' size='large' style={{ height: '50px', marginBottom: 0, borderRadius: 0 }}>
            <Menu.Item onClick={() => setShowSidebar(true)} style={{ alignSelf: 'center' }}>
              <Icon name='sidebar' />
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

export default MobileContainer