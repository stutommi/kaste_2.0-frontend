// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
// Components
import SensorUrlForm from './SensorUrlForm'

const SettingsView = ({ show, sensorsConnected, token, setToken, actions, sensorService }) => {
  if (!show) {
    return null
  }

  return (
    <Grid divided='vertically'>
      <Grid.Row>
        <Grid.Column>
          <SensorUrlForm
            sensorsConnected={sensorsConnected}
            token={token}
            actions={actions}
            sensorService={sensorService}
            setToken={setToken} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

// Proptypes
SettingsView.propTypes = {
  show: PropTypes.bool.isRequired,
  sensorsConnected: PropTypes.bool,
  token: PropTypes.object,
  setToken: PropTypes.func.isRequired
}

export default SettingsView