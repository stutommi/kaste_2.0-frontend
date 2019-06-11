// Libraries
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Icon, Menu, Header } from 'semantic-ui-react'
import axios from 'axios'

const WateringModal = ({ actions, wateringConnected, setPage }) => {
  const [showModal, setShowModal] = useState(false)
  const [recentlyWatered, setRecentlyWatered] = useState(false)

  const handleWatering = (duration, action) => {
    setRecentlyWatered(true)
    console.log('Watering plants plants: ', duration)
    try {
      setShowModal(false)
      axios.get(action)
      setPage('Video')
    } catch (error) {
      console.error(error.message)
    }

    setTimeout(() => {
      setRecentlyWatered(false)
      console.log('Watering completed')

    }, duration * 1000 * 60)
  }

  return (
    <Modal
      centered
      basic
      open={showModal}
      onClose={() => setShowModal(false)}
      trigger={
        <Menu.Item
          onClick={() => setShowModal(true)}
          disabled={!wateringConnected || recentlyWatered}>
          <Icon name='shower' />
          Water Plants
        </Menu.Item>
      }
      style={{
        textAlign: 'center'
      }}>
      <Icon name='shower' size='massive' />
      <Header content='Choose watering duration:' icon='clock' />
      <Modal.Actions style={{ textAlign: 'center', marginTop: 15 }}>
        <Button.Group>
          <Button color='green' onClick={() => handleWatering(1, actions.water.oneMin)}>
            1 min
          </Button>
          <Button.Or />
          <Button color='green' onClick={() => handleWatering(5, actions.water.fiveMin)}>
            5 min
          </Button>
          <Button.Or />
          <Button color='green' onClick={() => handleWatering(10, actions.water.tenMin)}>
            10 min
          </Button>
        </Button.Group>
        <Button
          color='red'
          onClick={() => setShowModal(false)}
          style={{ marginTop: 20 }}>
          cancel
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

// Proptypes
WateringModal.propTypes = {
  actions: PropTypes.object,
  wateringConnected: PropTypes.bool.isRequired,
  setPage: PropTypes.func.isRequired
}

export default WateringModal