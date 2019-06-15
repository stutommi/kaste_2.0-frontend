describe('Menu buttons appear correctly (FLAKY)', () => {
  beforeEach(function () {
    cy.setupDB()
    cy.login()
    cy.server()
    cy.route('http://testurl/sensors/', 'fixture:sensorData')
    cy.visit('/')
  })

  // NOTE: Test very flaky, cypress browser doesn't render
  // mobile view correctly half of the time
  it('On mobile', function () {
    cy.viewport('iphone-5')
    
    cy.get('[data-cy=logout-button]').should('exist')
    cy.get('[data-cy=sidebar-button]').click()

    cy.get('[data-cy=sensors-button]').should('exist')
    cy.get('[data-cy=chat-button]').should('exist')
    cy.get('[data-cy=water-button]').should('have.class', 'disabled')
    cy.get('[data-cy=stop-button]').should('have.class', 'disabled')
    cy.get('[data-cy=livefeed-button]').should('have.class', 'disabled')
    cy.get('[data-cy=about-button]').should('exist')
    cy.get('[data-cy=settings-button]').should('exist').click()
  })

  it('On desktop', function () {
    cy.viewport('macbook-15')

    cy.get('[data-cy=sensors-button]').should('exist')
    cy.get('[data-cy=chat-button]').should('exist')
    cy.get('[data-cy=water-button]').should('have.class', 'disabled')
    cy.get('[data-cy=stop-button]').should('have.class', 'disabled')
    cy.get('[data-cy=livefeed-button]').should('have.class', 'disabled')
    cy.get('[data-cy=settings-button]').should('exist').click()
    cy.get('[data-cy=about-button]').should('exist')
    cy.get('[data-cy=logout-button]').should('exist')
  })



})
