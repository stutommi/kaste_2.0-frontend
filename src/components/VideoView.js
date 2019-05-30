// Libraries
import React, { useState, useEffect } from 'react'
import { Image } from 'semantic-ui-react'
// Components
import Loading from './Loading'
import ImageError from './ImageError'

const divStyle = {
  height: '90%',
  background: 'black',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const VideoView = ({ show, actions }) => {
  const [imageStatus, setImageStatus] = useState(<Loading />)
  const [displayImage, setDisplayImage] = useState(true)

  useEffect(() => {
    setImageStatus(<Loading />)
    setDisplayImage(true)
  }, [show])

  if (!show) {
    return null
  }
  return (
    <div style={divStyle}>

      {imageStatus}
      {
        actions
          ? <Image
          style={{maxWidth: 800}}
            centered
            src={actions.camera}
            fluid
            hidden={displayImage}
            onLoad={() => setImageStatus(null)}
            onError={() => {
              setImageStatus(<ImageError />)
              setDisplayImage(false)
            }}
          />
          : null
      }
    </div>
  )
}

export default VideoView