// Libraries
import React from 'react'
import { render } from '@testing-library/react'
import 'jest-dom/extend-expect'
// Components
import AboutView from './AboutView'

describe('AboutView', () => {
  test('renders correctly view', () => {
    const component = render(<AboutView show={true} />)

    expect(component.container).toHaveTextContent('About Kaste 2.0')
    expect(component.container).toHaveTextContent('Client')
    expect(component.container).toHaveTextContent('Server')
  })

  test('renders null', () => {
    const component = render(<AboutView show={false} />)

    expect(component.container).not.toHaveTextContent('About Kaste 2.0')
  })
})