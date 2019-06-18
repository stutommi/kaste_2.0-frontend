// For window.confirm
let count = 0

// NOTE: after starting to validate endpoints through server with Graphql,
// this test had to be shortened, there for only testing sad path
describe('Settings page', function () {
  before(function () {
    cy.setupDB()
    cy.login()
  })

  it('Shows error with invalid URL', function () {

    cy.on('window:confirm', () => {
      if (count === 0) {
        count++
        return false
      }

      return true
    })

    cy.visit('/')
    cy.get('[data-cy=settings-button]').click()

    cy.contains('Sensor resource URL').should('be.visible')

    cy.get('[data-cy=sensor-url-input]').find('input').type('http://wrongurl/sensors/')
    cy.get('[data-cy=sensor-url-button]').click()
    cy.contains('Sensor endpoint offline or invalid URL').should('be.visible')
  })
})