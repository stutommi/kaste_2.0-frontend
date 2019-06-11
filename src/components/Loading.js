// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import { Dimmer, Loader } from 'semantic-ui-react'

const Loading = ({ inverted }) => (
  <Dimmer inverted={inverted} active>
    <Loader size='massive'>Loading</Loader>
  </Dimmer>
)

// Proptypes
Loading.propTypes = {
  inverted: PropTypes.bool.isRequired
}

export default Loading