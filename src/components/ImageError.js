// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Segment, Button } from 'semantic-ui-react'

const divStyle = {
  height: '100%',
  background: 'black',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const ImageError = ({ setReloadImage, setError }) => {
  return (
    <div style={divStyle}>
      <div style={{ textAlign: 'center' }}>
        <Icon name='frown' inverted color='grey' size='massive' />

        <Segment
          color='red'
          inverted
          secondary
          compact>
          <p style={{ color: 'white' }}>Image failed to load...</p>
        </Segment>

        <Button
          data-cy='error-button'
          circular
          icon='redo'
          onClick={async () => {
            setError(false)
            await setReloadImage(true)
            setReloadImage(false)
          }}>
        </Button>
      </div>
    </div>
  )
}

// Proptypes
ImageError.propTypes = {
  setReloadImage: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired
}

export default ImageError