// Libraries
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
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
  const [pending, setPending] = useState(true)
  const [displayImage, setDisplayImage] = useState('block')
  const [reloadImage, setReloadImage] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setPending(true)
    setDisplayImage('block')
  }, [show, reloadImage])

  if (!show || reloadImage) { return null }
  if (error) { return <ImageError setReloadImage={setReloadImage} setError={setError} /> }

  return (
    <div style={divStyle}>

      {pending && <Loading inverted={false} />}

      <Image
        style={{ maxWidth: 800, display: `${displayImage}` }}
        centered
        src={actions.camera}
        fluid
        onLoad={() => setPending(false)}
        onError={() => {
          setError(true)
          setDisplayImage('none')
        }}
      />

    </div>
  )
}

// Proptypes
VideoView.propTypes = {
  show: PropTypes.bool.isRequired,
  actions: PropTypes.object
}

export default VideoView