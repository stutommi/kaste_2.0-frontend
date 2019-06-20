// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import { Popup, Icon, Grid } from 'semantic-ui-react'

const PopupLink = ({ name, githubUrl, linkedInUrl, email }) => (
  <Popup
    trigger={<span style={{ color: 'blue' }}>{name}</span>}
    flowing
    hoverable
    hideOnScroll>
    <Grid centered divided columns={3}>
      <Grid.Column textAlign='center'>
        <a href={githubUrl} target='_blank' rel='noopener noreferrer'>
          <Icon color='black' size='large' name='github' />
        </a>
      </Grid.Column>
      <Grid.Column textAlign='center'>
        <a href={linkedInUrl} target='_blank' rel='noopener noreferrer'>
          <Icon color='blue' size='large' name='linkedin' />
        </a>
      </Grid.Column>
      <Grid.Column textAlign='center'>
        <Popup
          trigger={
            <a href={`mailto:${email}?Subject=About%20Kaste 2.0`}>
              <Icon color='green' size='large' name='at' />
            </a>}>
          tommi.teetee@hotmail.com
        </Popup>

      </Grid.Column>
    </Grid>
  </Popup>
)

PopupLink.propTypes = {
  name: PropTypes.string.isRequired,
  githubUrl: PropTypes.string.isRequired,
  linkedInUrl: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
}

export default PopupLink