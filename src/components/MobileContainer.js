// Libraries
import React, { useState } from 'react'
import { Responsive, Sidebar, Menu, Icon, Segment, Button } from 'semantic-ui-react'

const MobileContainer = ({ children, setPage, logOut, page }) => {
  const [recentlyWatered, setRecentlyWatered] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)

  const handleViewChange = (view) => () => {
    setShowSidebar(false)
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
          <Menu.Item onClick={handleViewChange('Sensors')}>
            <Icon name='info' />
            Sensors
          </Menu.Item>
          <Menu.Item onClick={handleViewChange('Chat')}>
            <Icon name='comments outline' />
            Chat
          </Menu.Item>
          <Menu.Item disabled={recentlyWatered} onClick={handleWatering}>
            <Icon name='exclamation' />
            Water plants
          </Menu.Item>
          <Menu.Item onClick={() => console.log('Reboot rasp')
          }>
            <Icon name='redo' />
            Reboot rasp
          </Menu.Item>
          <Menu.Item onClick={handleViewChange('Settings')}>
            <Icon name='settings' />
            Settings
          </Menu.Item>
          <Menu.Item onClick={handleViewChange('About')}>
            <Icon name='question' />
            About
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher style={{ height: '100%' }} dimmed={showSidebar}>

            <Menu widths={3} inverted pointing color='green' size='large' style={{ height: '10%', marginBottom: 0, borderRadius: 0 }}>
              <Menu.Item onClick={() => setShowSidebar(true)} style={{ alignSelf: 'center' }}>
                <Icon name='sidebar' />
              </Menu.Item>
              <Menu.Item header={true}>
                {page}
              </Menu.Item>
              <Menu.Item position='right' onClick={() => logOut(false)} style={{ alignSelf: 'center' }}>
                <Icon name='logout' />
              </Menu.Item>
            </Menu>


          {children}
        </Sidebar.Pusher>
      </Responsive>
    </>
  )
}

export default MobileContainer