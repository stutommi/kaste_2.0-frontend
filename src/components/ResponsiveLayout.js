// Libraries
import React from 'react'

// Components
import MobileContainer from './MobileContainer'
import DesktopContainer from './DesktopContainer'

const ResponsiveLayout = ({ children, setPage, setUser }) => {
  console.log('children responsivelayout', children)

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