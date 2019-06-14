import React, { useState } from 'react'

// Provide duration as argument (seconds)
const useNotification = (duration = 5) => {
  const [text, setText] = useState(null)

  const reset = () => setText(null)

  const set = (text) => {
    setText(text)
    setTimeout(() => {
      reset()
    }, duration * 1000)
  }

  return [text, set]
}

export default useNotification