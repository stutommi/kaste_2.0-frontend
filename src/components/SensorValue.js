// Libraries
import React from 'react'
import { Icon, List } from 'semantic-ui-react'

const SensorValue = ({ value, label, icon }) => {

  return (
    <>
      <List.Item>
        <List.Content style={{ color: 'white' }}>
          <List.Icon name={icon} />
          {value}
        </List.Content>
      </List.Item>
    </>

  )
}

export default SensorValue