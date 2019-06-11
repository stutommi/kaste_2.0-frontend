// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Segment, Button } from 'semantic-ui-react'

const ImageError = ({ setReloadImage }) => {
  return (
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
        circular
        icon='redo'
        onClick={async () => {
          await setReloadImage(true)
          setReloadImage(false)
        }}>


      </Button>
    </div>
  )
}

// Proptypes
ImageError.propTypes = {
  setReloadImage: PropTypes.func.isRequired
}

export default ImageError