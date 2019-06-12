// Sets testing database up - works with cy.setupDB()
Cypress.Commands.add("setupDB", () => {
  const createUser = `
mutation { createUser(
    username: "testUser",
    name: "testName",
    password: "testPassword"
  ){
    id
    name
    username
    messages {
      created
    }
    passwordHash
    sensorEndpoint
  }
}`

  const resetDB = `
mutation {
  resetDB {
    message
  }
}
`

  cy.request({
    method: 'post',
    body: { query: resetDB },
    url: "http://localhost:4000/graphql"
  })
  cy.request({
    method: 'post',
    body: { query: createUser },
    url: "http://localhost:4000/graphql"
  })
})

// Logs user in 
Cypress.Commands.add("login", () => {

  const login = `
  mutation {
    login(username: "testUser", password: "testPassword") {
      value
      username
      sensorEndpoint
    }
  }
  `

  const token = cy.request({
    method: 'post',
    body: { query: login },
    url: 'http://localhost:4000/graphql'
  })

  window.localStorage.setItem('kaste-user-token', JSON.stringify(token))
})

// Sets token to localstorage with testUser information (INCLUDING SENSORENDPOINT)
Cypress.Commands.add('clearAndSetUserToken', () => {
  const token = {
    value:'randomString',
    name:'testName',
    sensorEndpoint: 'http://testurl/sensors/'
  }

  window.localStorage.clear()
  window.localStorage
    .setItem('kaste-user-token', JSON.stringify(token))
})

// GraphQL mock from https://github.com/cypress-io/cypress-documentation/issues/122#issuecomment-409839089
// by yaliv 2th August 2018
// --------------------------------------
// Mock GraphQL requests with stubs.
// --------------------------------------
Cypress.Commands.add('mockGraphQL', stubs => {
  cy.on('window:before:load', win => {
    cy.stub(win, 'fetch', (...args) => {
      console.log('Handling fetch stub', args)
      const [url, request] = args
      const postBody = JSON.parse(request.body)
      let promise

      if (url.indexOf('api') !== -1) {
        stubs.some(stub => {
          if (postBody.operationName === stub.operation) {
            console.log('STUBBING', stub.operation)
            promise = Promise.resolve({
              ok: true,
              text() {
                return Promise.resolve(JSON.stringify(stub.response))
              }
            })
            return true
          }
          return false
        })
      }

      if (promise) {
        return promise
      }

      console.log('Could not find a stub for the operation.')
      return false
    })
  })
})