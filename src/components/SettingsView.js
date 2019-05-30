// Libraries
import React from 'react'
import { Grid } from 'semantic-ui-react'
// Components
import SensorUrlForm from './SensorUrlForm'

const SettingsView = ({ show, sensorsConnected, token }) => {
  if (!show) {
    return null
  }

  return (
    <Grid divided='vertically'>
      <Grid.Row>
        <Grid.Column>
          <SensorUrlForm
          sensorsConnected={sensorsConnected}
          token={token}/>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default SettingsView