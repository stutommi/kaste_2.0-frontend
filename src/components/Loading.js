import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

const Loading = ({inverted}) => (
    <Dimmer inverted={inverted} active>
      <Loader size='massive'>Loading</Loader>
    </Dimmer>
)

export default Loading