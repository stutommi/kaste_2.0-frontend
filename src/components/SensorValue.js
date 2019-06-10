// Libraries
import React from 'react'
import { Icon, List } from 'semantic-ui-react'

const SensorValue = ({ value, label, icon, iconColor, size }) => {
  return (
    <div>
      <Icon name={icon} size={size} color={iconColor ? iconColor : null} />
      <span style={{
        fontSize: `${size === 'big' ? '28px' : '11px'}`,
        verticalAlign: 'middle'
      }}>
        {value}
      </span>
    </div>
  )
}

export default SensorValue