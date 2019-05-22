// Libraries
import React, { useState } from 'react'
import { Responsive, Sidebar, Menu, Icon, Segment, Container, Button } from 'semantic-ui-react'

const MobileContainer = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false)
  const [user, setUser] = useState(false)

  return (
    <>
      <Responsive
        maxWidth={Responsive.onlyMobile.maxWidth}
        as={Sidebar.Pushable}
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
          <Menu.Item as='a'>
            <Icon name='info' />
            sensors
          </Menu.Item>
          <Menu.Item as='a'>
            <Icon name='comments outline' />
            Chat
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={showSidebar}>
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 250, padding: '1em 0em' }}
            vertical>
            <Container>
              <Menu inverted pointing secondary size='large'>
                <Menu.Item onClick={() => setShowSidebar(true)}>
                  <Icon name='sidebar' />
                </Menu.Item>
                <Menu.Item position='right' onClick={() => setUser(!user)}>
                  {user
                    ?
                    <Button inverted>
                      log in
                    </Button>
                    :
                    <Button inverted>
                      log out
                    </Button>
                  }

                </Menu.Item>
              </Menu>
            </Container>
            <h2>mobile container!</h2>
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    </>
  )
}

export default MobileContainer