import 'cypress-graphql-mock'

// Sets testing database up - works with cy.setupDB()
Cypress.Commands.add("setupDB", () => {

  const createUser = (username, name, password) => `
mutation { createUser(
    username: "${username}",
    name: "${name}",
    password: "${password}"
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
  const Queries = [
    createUser("testUser1", "testName1", "testPassword1"),
    createUser("testUser2", "testName2", "testPassword2")
  ]

  cy.request({
    method: 'post',
    body: { query: resetDB },
    url: "http://localhost:4000/graphql"
  })

  Queries.forEach(userQuery => {
    cy.request({
      method: 'post',
      body: { query: userQuery },
      url: "http://localhost:4000/graphql"
    })
  });
})

// Logs user in 
// NOTE: Graphql responses with status 500
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
    value: 'randomString',
    name: 'testName1',
    sensorEndpoint: 'http://testurl/sensors'
  }

  window.localStorage.clear()
  window.localStorage
    .setItem('kaste-user-token', JSON.stringify(token))
})