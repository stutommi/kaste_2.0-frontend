// Libraries
import React from 'react'

// Components
import MobileContainer from './MobileContainer'
import DesktopContainer from './DesktopContainer'

const ResponsiveLayout = ({ children, setPage, logOut, page, actions, token }) => {

  return (
    <>
      <MobileContainer
        logOut={logOut}
        page={page}
        actions={actions}
        setPage={setPage}
        token={token}>
        {children}
      </MobileContainer>

      <DesktopContainer
        logOut={logOut}
        setPage={setPage}
        actions={actions}>
        {children}
      </DesktopContainer>
    </>
  )
}

export default ResponsiveLayout