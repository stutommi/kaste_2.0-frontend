// Libraries
import React from 'react'
import { render } from '@testing-library/react'
import 'jest-dom/extend-expect'
// Components
import ChatMessage from './ChatMessage'

const currentUser = {
  me: {
    name: 'TestName1'
  }
}

const message = (name) => ({
  user: {
    name: name
  },
  created: Date.now(),
  content: 'Test text content.'
})

describe('ChatMessage', () => {
  test('Renders correctly with correct color', () => {
    const component1 = render(
      <ChatMessage
        currentUser={currentUser}
        message={message('TestName1')}
      />)

    expect(component1.container.querySelector('.segment')).toHaveClass('blue')
    expect(component1.container).toHaveTextContent('Test text content')

    const component2 = render(
      <ChatMessage
        currentUser={currentUser}
        message={message('TestName2')}
      />)

    expect(component2.container.querySelector('.segment')).toHaveClass('green')
    expect(component2.container).toHaveTextContent('Test text content')
  })
})