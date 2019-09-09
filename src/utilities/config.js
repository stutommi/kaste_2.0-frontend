let wsUrl = 'ws://localhost:4000/graphql'
let httpUrl = 'http://localhost:4000/graphql'

if (process.env.NODE_ENV === 'production') {
  wsUrl = 'wss://https://kaste.herokuapp.com/graphql'
  httpUrl = 'https://https://kaste.herokuapp.com/graphql'
}

export default { wsUrl, httpUrl }