describe('Log out', function () {
  before(function () {
    cy.setupDB()
  })
  beforeEach(function () {
    cy.login()
  })

  it('logout succesful with desktop', function () {
    cy.viewport('macbook-15')
    cy.visit('/')
    cy.get('[data-cy=logout-button]').click()
    cy.contains('Log in to Kaste 2.0').should('be.visible')
  })

  it('logout succesful with mobile', function () {
    cy.viewport('iphone-5')
    cy.visit('/')

  })
})