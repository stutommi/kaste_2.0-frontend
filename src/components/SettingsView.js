// Libraries
import React from 'react'
import { Grid, Segment, Header } from 'semantic-ui-react'
// Components
import SensorUrlForm from './SensorUrlForm'

const SettingsView = ({ show }) => {
  if (!show) {
    return null
  }

  return (
    <Grid divided='vertically'>
      <Grid.Row>
        <Grid.Column>
          <SensorUrlForm />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default SettingsView