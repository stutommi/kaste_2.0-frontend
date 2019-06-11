

const createUser = `
mutation createUser(
  $username: String!,
  $name: String!,
  $password: String!
){
  createUser(
    username: $username,
    name: $name,
    password: $password
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

describe('Login view', function () {
  beforeEach(function () {
    cy.request({
      url: 'http://localhost:4000/graphql',
      body: { createUser: createUser },
      variables: {
        username: "testUser",
        name: "Matti Meikäläinen",
        password: "testPassword"
      }
    }).then(res => {
      cy.log(res)
    })
  })

  it('succesfully loads', function () {
    cy.visit('/')

  })
})
