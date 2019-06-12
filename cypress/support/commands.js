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
    url: "http://localhost:4000/graphql"
  })

  window.localStorage.setItem('kaste-user-token', JSON.stringify(token))
})