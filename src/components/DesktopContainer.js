// Libraries
import React from 'react'
import { Responsive } from 'semantic-ui-react'

const DesktopContainer = ({ children }) => {

  return (
    <>
      <Responsive
        minWidth={Responsive.onlyTablet.minWidth}
      >
        <p>desktopcontainer!</p>
        {children}
      </Responsive>
    </>
  )
}

export default DesktopContainer