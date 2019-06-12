describe('Login view', function () {
  beforeEach(function () {
    cy.setupDB()
  })
  
  it('Desktop login is succesful', function () {
    cy.viewport('macbook-15')
    cy.visit('/')
    cy.contains('Log in to Kaste 2.0').should('be.visible')

    cy.get('[data-cy=username]').find('input').type('testUser{enter}')
    cy.contains('invalid username or password').should('be.visible')

    cy.get('[data-cy=password]').find('input').type('testPassword{enter}')

    cy.contains('testUser logged in').should('be.visible')
  })

  it('Mobile login is succesful', function () {
    cy.viewport('iphone-5')
    cy.visit('/')
    cy.contains('Log in to Kaste 2.0').should('be.visible')

    cy.get('[data-cy=username]').find('input').type('testUser{enter}')
    cy.contains('invalid username or password').should('be.visible')

    cy.get('[data-cy=password]').find('input').type('testPassword{enter}')
    
    cy.get('[data-cy=sidebar-button]').click()
    cy.contains('testUser').should('be.visible')
  })
})
