// Libraries
import React from 'react'
import { render } from '@testing-library/react'
import 'jest-dom/extend-expect'
// Components
import InfoSection from './InfoSection'

describe('InfoSection', () => {
  test('renders correctly', () => {
    const component = render(
      <InfoSection
        header={'Test header'}>
        This is a test paragraph
      </InfoSection>

    )

    expect(component.container).toHaveTextContent('This is a test paragraph')
    expect(component.container).toHaveTextContent('Test header')
  })
})