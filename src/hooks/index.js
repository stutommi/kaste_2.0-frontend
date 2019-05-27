import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

// Provide duration as argument (seconds)
export const useNotification = (duration = 5) => {
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