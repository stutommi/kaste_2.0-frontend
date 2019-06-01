// Libraries
import React from 'react'
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
export default ImageError