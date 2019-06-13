// Only testing sad path

describe('Live feed Page', function () {
  beforeEach(function () {
    cy.clearAndSetUserToken()
    cy.server()
    cy.route('http://testurl/sensors/', 'fixture:sensorData').as('sensorData')
    cy.visit('/')

  })

  it('Shows error with retry button when not able to load image', function () {
    cy.wait('@sensorData')

    cy.get('[data-cy=livefeed-button]').click()
    cy.contains('Image failed to load...').should('be.visible')
    cy.get('[data-cy=error-button]').click()
  })
})
