// Libraries
import React, { useState } from 'react'
import { Responsive, Segment, Menu, Icon } from 'semantic-ui-react'

const DesktopContainer = ({ children, setPage, setUser }) => {
  const [recentlyWatered, setRecentlyWatered] = useState(false)

  // Handles sidebar navigation
  const handleViewChange = (view) => () => {
    setPage(view)
  }

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
        minWidth={Responsive.onlyTablet.minWidth}
      >
        <Menu
          inverted
          icon='labeled'
          color='green'
        >
          <Menu.Item onClick={handleViewChange('SensorView')}>
            <Icon name='info' />
            Sensors
          </Menu.Item>
          <Menu.Item onClick={handleViewChange('ChatView')}>
            <Icon name='comments outline' />
            Chat
          </Menu.Item>
          <Menu.Item disabled={recentlyWatered} onClick={handleWatering}>
            <Icon name='exclamation' />
            Water plants
          </Menu.Item>
          <Menu.Item onClick={() => console.log('Reboot rasp')}>
            <Icon name='redo' />
            Reboot rasp
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item onClick={handleViewChange('AboutView')}>
              <Icon name='question' />
              About
          </Menu.Item>
            <Menu.Item onClick={() => setUser(false)}>
              <Icon name='log out' />
              Log out
          </Menu.Item>
          </Menu.Menu>
        </Menu>
        {children}
      </Responsive>
    </>
  )
}

export default DesktopContainer