import React, { useState } from 'react'
import { Button, Header, Icon, Image, Menu, Segment, Sidebar, Responsive } from 'semantic-ui-react'
const getWidth = () => {
  const isSSR = typeof window === 'undefined'
console.log(isSSR)

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}
console.log(getWidth())


const AppMenu = ({ page }) => {
  const [visible, setVisible] = useState(false)

  const handleHideClick = () => setVisible(false)
  const handleShowClick = () => setVisible(true)
  const handleSidebarHide = () => setVisible(false)


  if (page !== 'menu') {
    return null
  }

return (
  <div>
    <Button.Group>
      <Button disabled={visible} onClick={handleShowClick}>
        Show sidebar
          </Button>
      <Button disabled={!visible} onClick={handleHideClick}>
        Hide sidebar
          </Button>
    </Button.Group>

    <Sidebar.Pushable as={Segment}>
      <Sidebar
        as={Menu}
        animation='overlay'
        icon='labeled'
        inverted
        onHide={handleSidebarHide}
        vertical
        visible={visible}
        width='thin'
      >
        <Menu.Item as='a'>
          <Icon name='home' />
          Wikipedia
            </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='gamepad' />
          Games
            </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='camera' />
          Channels
            </Menu.Item>
      </Sidebar>

      <Sidebar.Pusher>
        <Segment basic>
          <Header as='h3'>Application Content</Header>
          <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
        </Segment>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  </div>
)
}

export default AppMenu