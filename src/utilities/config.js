let wsUrl = 'ws://localhost:4000/graphql'
let httpUrl = 'http://localhost:4000/graphql'

if (process.env.NODE_ENV === 'production') {
  wsUrl = 'wss://lit-forest-54340.herokuapp.com/graphql'
  httpUrl = 'https://lit-forest-54340.herokuapp.com/graphql'
}

export default { wsUrl, httpUrl }