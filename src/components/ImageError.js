// Libraries
import React from 'react'
import { Icon, Segment } from 'semantic-ui-react'

const ImageError = () => {
  return (
    <div style={{textAlign: 'center'}}>
      <Icon name='frown' inverted color='grey' size='massive'/>
      <Segment
        color='red'
        inverted
        secondary
        compact>
        <p style={{ color: 'white' }}>Image failed to load...</p>
      </Segment>
    </div>
  )
}
export default ImageError