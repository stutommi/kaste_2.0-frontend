describe('Menu buttons appear correctly on', () => {
  beforeEach(function () {
    cy.setupDB()
    cy.login()
    cy.server()
    cy.route('http://testurl/sensors/', 'fixture:sensorData')
    cy.visit('/')
  })

  it('Desktop', function () {
    cy.viewport('macbook-15')

    cy.get('[data-cy=sensors-button]').should('exist')
    cy.get('[data-cy=chat-button]').should('exist')
    cy.get('[data-cy=water-button]').should('have.class', 'disabled')
    cy.get('[data-cy=stop-button]').should('have.class', 'disabled')
    cy.get('[data-cy=livefeed-button]').should('have.class', 'disabled')
    cy.get('[data-cy=settings-button]').should('exist').click()
    cy.get('[data-cy=about-button]').should('exist')
    cy.get('[data-cy=logout-button]').should('exist')

    cy.get('[data-cy=sensor-url-input]')
      .find('input')
      .type('http://testurl/sensors/')
    cy.get('[data-cy=sensor-url-button]').click()

    cy.get('[data-cy=water-button]').should('not.have.class', 'disabled')
    cy.get('[data-cy=stop-button]').should('not.have.class', 'disabled')
    cy.get('[data-cy=livefeed-button]').should('not.have.class', 'disabled')
  })

  it('Mobile', function () {
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

    cy.get('[data-cy=sensor-url-input]')
      .find('input')
      .type('http://testurl/sensors/')
    cy.get('[data-cy=sensor-url-button]').click()

    cy.get('[data-cy=sidebar-button]').click()
    cy.get('[data-cy=water-button]').should('not.have.class', 'disabled')
    cy.get('[data-cy=stop-button]').should('not.have.class', 'disabled')
    cy.get('[data-cy=livefeed-button]').should('not.have.class', 'disabled')
  })


})
