describe('Sensors page', function () {
  before(function () {
    cy.setupDB()
    cy.clearAndSetUserToken()
  })

  // As in 12th of june, I wasn't able to implement any solution to
  // mock Graphql querys in cypress, so even though it should work
  // outside testing, I can't test it right now.
  it('shows sensor data and but not charts', function () {
    cy.viewport('macbook-15')
    cy.server()
    cy.route('http://testurl/sensors/', 'fixture:sensorData')
    
    cy.visit('/')
    cy.get('[data-cy=sensors-button]').click()
    
    cy.contains(28).should('be.visible')
    cy.contains('fridge').should('be.visible')
    cy.contains('balcony').should('be.visible')
    cy.contains('living_room').should('be.visible')

    cy.get('[data-cy=chart-toggle-button]').click()
    cy.contains('Chart failed to load').should('be.visible')

    cy.get('[data-cy=chart-toggle-button]').click()
    cy.contains('Chart failed to load').should('not.be.visible')

  })
})
