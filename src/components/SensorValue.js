// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'

const SensorValue = ({ value, icon, iconColor, size }) => {
  return (
    <div>
      <Icon name={icon} size={size} color={iconColor ? iconColor : null} />
      <span style={{
        fontSize: `${size === 'large' ? '13px' : '11px'}`,
        verticalAlign: 'middle'
      }}>
        {value}
      </span>
    </div>
  )
}

// Proptypes
SensorValue.propTypes = {
  value: PropTypes.any,
  icon: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
  size: PropTypes.string.isRequired,
}

export default SensorValue