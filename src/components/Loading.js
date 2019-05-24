import React from 'react'
import { Segment, Dimmer, Loader } from 'semantic-ui-react'

const Loading = () => (
    <Dimmer active inverted>
      <Loader size='massive' inverted>Loading</Loader>
    </Dimmer>
)

export default Loading