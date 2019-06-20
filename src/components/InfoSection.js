import React from 'react'
import PropTypes from 'prop-types'

const InfoSection = ({ header, children }) => (
  <>
    <h4>
      <strong>
        {header}
      </strong>
    </h4>
    <p>
      {children}
    </p>
  </>
)

export default InfoSection

InfoSection.propTypes = {
  header: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}