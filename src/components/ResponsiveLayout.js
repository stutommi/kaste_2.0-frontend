// Libraries
import React from 'react'
import PropTypes from 'prop-types'
// Components
import MobileContainer from './MobileContainer'
import DesktopContainer from './DesktopContainer'

const ResponsiveLayout = ({ children, setPage, logOut, page, actions, token, sensorService }) => {

  return (
    <>
      <MobileContainer
        logOut={logOut}
        page={page}
        actions={actions}
        setPage={setPage}
        token={token}
        sensorService={sensorService}>
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

// Proptypes
ResponsiveLayout.propTypes = {
  children: PropTypes.node.isRequired,
  setPage: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired,
  token: PropTypes.object.isRequired,
  sensorService: PropTypes.object.isRequired,
  actions: PropTypes.object
}

export default ResponsiveLayout