// Libraries
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Icon, Menu, Header } from 'semantic-ui-react'
// Custom hooks
import { useAction } from '../hooks/useAction'
// Typedefs
import startWatering from '../graphql/mutations/startWatering'

const WateringModal = ({ actions, wateringConnected, setPage }) => {
  const [showModal, setShowModal] = useState(false)
  const fireAction = useAction()

  const handleWatering = (duration, action) => {
    try {
      setShowModal(false)
      fireAction(action, startWatering)
      setPage('Video')
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <Modal
      centered
      basic
      open={showModal}
      onClose={() => setShowModal(false)}
      trigger={
        <Menu.Item
          data-cy='water-button'
          onClick={() => setShowModal(true)}
          disabled={!wateringConnected}>
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
          <Button
            data-cy='modal-button-1min'
            color='green'
            onClick={() => handleWatering(1, actions.water.oneMin)}>
            1 min
          </Button>
          <Button.Or />
          <Button
            data-cy='modal-button-5min'
            color='green'
            onClick={() => handleWatering(5, actions.water.fiveMin)}>
            5 min
          </Button>
          <Button.Or />
          <Button
            data-cy='modal-button-10min'
            color='green'
            onClick={() => handleWatering(10, actions.water.tenMin)}>
            10 min
          </Button>
        </Button.Group>
        <Button
          data-cy='modal-button-cancel'
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