// Libraries
import React, { useState } from 'react'
import { Responsive, Sidebar, Menu, Icon, Segment, Container, Button } from 'semantic-ui-react'

const MobileContainer = ({ children, setPage, setUser }) => {
  const [recentlyWatered, setRecentlyWatered] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [activeTab, setActiveTab] = useState('Sensors')

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
        style={{ minHeight: '100vh' }}
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
          <Menu.Item onClick={() => console.log('Reboot rasp')
          }>
            <Icon name='redo' />
            Reboot rasp
          </Menu.Item>
          <Menu.Item onClick={handleViewChange('AboutView')}>
            <Icon name='question' />
            About
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={showSidebar}>
          <Segment
            inverted
            textAlign='center'
            style={{ padding: '0em 0em' }}
            vertical>

            <Menu inverted pointing secondary color='green' size='large'>
              <Menu.Item onClick={() => setShowSidebar(true)}>
                <Icon name='sidebar' />
              </Menu.Item>
              <Menu.Item position='right' onClick={() => setUser(false)}>
                <Button primary>
                  log out
                    </Button>
              </Menu.Item>
            </Menu>
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    </>
  )
}

export default MobileContainer