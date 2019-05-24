// Libraries
import React from 'react'

// Components
import MobileContainer from './MobileContainer'
import DesktopContainer from './DesktopContainer'

const ResponsiveLayout = ({ children, setPage, setUser }) => {

  return (
    <>
      <MobileContainer 
      setUser={setUser}
      setPage={setPage}>
        {children}
      </MobileContainer>

      <DesktopContainer
      setUser={setUser}
      setPage={setPage}>
        {children}
      </DesktopContainer>
    </>
  )
}

export default ResponsiveLayout