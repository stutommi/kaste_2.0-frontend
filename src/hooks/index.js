// Libraries
import axios from 'axios'
import { useState, useEffect } from 'react'
// Helper functions
import { formatSensorData } from '../utilities/helperFuncs'

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
  const [actions, setActions] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useNotification(null)
  const [intervalId, setIntervalId] = useState(null)

  const getSensorData = async (url) => {
    try {
      const response = await axios.get(url)

      // Format sensor data with helper function
      setSensorData(formatSensorData(response.data.sensors))
      // get actions
      setActions(response.data.actions)
      setIsConnected(true)
    } catch (error) {
      setIsConnected(false)
      setError(error)
    }
  }

  const startFetching = (url) => {
    console.log('fetching...')
    getSensorData(url)
    const id = setInterval(() => {
      console.log('fetching...')
      getSensorData(url)
    }, duration * 1000);
    setIntervalId(id)
  }

  const stopFetching = () => {
    console.log('IntervalId', intervalId)
    clearInterval(intervalId)
    setSensorData(null)
    setIsConnected(false)
    setActions(null)
  }

  const sensorService = {
    startFetching,
    stopFetching
  }


  return [sensorData, actions, sensorService, isConnected, error]
}