// Libraries
import { useState } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
// Helper functions
import { formatSensorData } from '../utilities/helperFuncs'
// Typedefs
import sensorDatas from '../graphql/queries/sensorData'
// NOTE: Really weirdly, importing as sensorData results in Graphql error

// Handle sensor information fetching
// Provide interval as argument (seconds)
export const useSensors = (duration = 60) => {
  const [sensorData, setSensorData] = useState(null)
  const [actions, setActions] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState(null)
  const [intervalId, setIntervalId] = useState(null)
  const client = useApolloClient()

  const getSensorData = async (url) => {
    try {
      const { data } = await client.query({
        query: sensorDatas,
        variables: { sensorEndpoint: url },
        fetchPolicy: 'no-cache'
      })

      const parsedSensorQuery = JSON.parse(data.sensorData.value)

      // Format sensor data with helper function
      setSensorData(formatSensorData(parsedSensorQuery.sensors))
      // Get actions
      setActions(parsedSensorQuery.actions)
      setIsConnected(true)
      setError(null)

    } catch (error) {
      setIsConnected(false)
      setError(error.message)
      setTimeout(() => {

        getSensorData(url)
      }, 2000)
    }
  }

  const startFetching = (url) => {
    getSensorData(url)
    const id = setInterval(() => {
      getSensorData(url)
    }, duration * 1000)
    setIntervalId(id)
  }

  const stopFetching = () => {
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