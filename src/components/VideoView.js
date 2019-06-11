// Libraries
import React, { useState, useEffect } from 'react'
import { Image } from 'semantic-ui-react'
// Components
import Loading from './Loading'
import ImageError from './ImageError'

const divStyle = {
  height: '100%',
  background: 'black',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const VideoView = ({ show, actions }) => {
  const [imageStatus, setImageStatus] = useState(<Loading />)
  const [displayImage, setDisplayImage] = useState('block')
  const [reloadImage, setReloadImage] = useState(false)

  useEffect(() => {
    setImageStatus(<Loading inverted={false}/>)
    setDisplayImage('block')
  }, [show, reloadImage])

  if (!show || reloadImage) {
    return null
  }
  return (
    <div style={divStyle}>

      {imageStatus}
      {
        actions
          ? <Image
            style={{ maxWidth: 800, display: `${displayImage}` }}
            centered
            src={actions.camera}
            fluid
            onLoad={() => setImageStatus(null)}
            onError={() => {
              setImageStatus(<ImageError setReloadImage={setReloadImage} />)
              setDisplayImage('none')
            }}
          />
          : null
      }
    </div>
  )
}

export default VideoView