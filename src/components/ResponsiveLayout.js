// Libraries
import React from 'react'

// Components
import MobileContainer from './MobileContainer'
import DesktopContainer from './DesktopContainer'

const ResponsiveLayout = ({ children }) => {
  console.log('children responsivelayout', children)

  return (
    <>
      <p>ResponsiveLayout</p>
      <MobileContainer>
        {children}
      </MobileContainer>

      <DesktopContainer>
        {children}
      </DesktopContainer>
    </>
  )
}

export default ResponsiveLayout