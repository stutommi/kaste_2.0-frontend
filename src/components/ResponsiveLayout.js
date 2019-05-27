// Libraries
import React from 'react'

// Components
import MobileContainer from './MobileContainer'
import DesktopContainer from './DesktopContainer'

const ResponsiveLayout = ({ children, setPage, logOut }) => {

  return (
    <>
      <MobileContainer 
      logOut={logOut}
      setPage={setPage}>
        {children}
      </MobileContainer>

      <DesktopContainer
      logOut={logOut}
      setPage={setPage}>
        {children}
      </DesktopContainer>
    </>
  )
}

export default ResponsiveLayout