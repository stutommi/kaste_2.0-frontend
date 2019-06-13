// Note: Only tests that the button disables
// for a correct time after click

describe('Watering', function () {
  beforeEach(function () {
    cy.clearAndSetUserToken()
    cy.server()
    cy.route('http://testurl/sensors/', 'fixture:sensorData').as('sensorData')
    cy.visit('/')

  })

  it('Shows watering modal and disables button on water', function () {
    cy.clock()
    cy.viewport('macbook-15')
    cy.wait('@sensorData')

    // Cancel watering
    cy.get('[data-cy=water-button]').click()
    cy.get('[data-cy=modal-button-cancel]').click()

    // 1 min watering
    cy.get('[data-cy=water-button]').click()
    cy.get('[data-cy=modal-button-1min]').click()
    cy.get('[data-cy=water-button]').should('have.class', 'disabled')

    cy.clock().tick(1000 * 60)
    cy.get('[data-cy=water-button]').should('not.have.class', 'disabled')

    cy.viewport('iphone-5')

    // 5 min watering
    cy.get('[data-cy=sidebar-button]').click()
    cy.get('[data-cy=water-button]').click()
    cy.get('[data-cy=modal-button-5min]').click()
    cy.get('[data-cy=water-button]').should('have.class', 'disabled')

    cy.clock().tick(1000 * 60 * 5)
    cy.get('[data-cy=sidebar-button]').click()
    cy.get('[data-cy=water-button]').should('not.have.class', 'disabled')

    // 10 min watering
    cy.get('[data-cy=water-button]').click()
    cy.get('[data-cy=modal-button-10min]').click()
    cy.get('[data-cy=water-button]').should('have.class', 'disabled')

    cy.clock().tick(1000 * 60 * 10)
    cy.get('[data-cy=sidebar-button]').click()
    cy.get('[data-cy=water-button]').should('not.have.class', 'disabled')

    
  })
})
