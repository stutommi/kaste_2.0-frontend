import axios from 'axios'
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

// Handle fetching sensorinformation
// Provide duration as argument (seconds)
export const useSensors = (duration = 60) => {
  const [sensorData, setSensorData] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useNotification(null)

  const getSensorData = async (url) => {
    try {
      const response = await axios.get(url)
      console.log('response', response)
      setSensorData(response.data)
      setIsConnected(true)
    } catch (error) {
      setIsConnected(false)
      setError(error)
    }
  }

  const startFetching = (url) => {
    console.log('fetching...')
    getSensorData(url)
    setInterval(() => {
      console.log('fetching...')
      getSensorData(url)
    }, duration * 1000);
  }

  return [sensorData, startFetching, isConnected, error]
}