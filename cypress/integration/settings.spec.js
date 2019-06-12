// For window.confirm
let count = 0

describe('Settings page', function () {
  before(function () {
    cy.setupDB()
  })

  beforeEach(function () {
    cy.login()
  })

  it('Connects to sensor endpoint', function () {
    cy.server()
    cy.route('http://testurl/sensors/', 'fixture:sensorData')

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
    cy.contains('Network Error').should('be.visible')

    cy.get('[data-cy=sensor-url-input]').find('input').clear().type('http://testurl/sensors/')
    cy.get('[data-cy=sensor-url-button]').click()


    cy.get('[data-cy=sensor-url-input]').find('input').clear().type('http://testurl/sensors/')

    cy.get('[data-cy=sensor-url-button]').click()

    cy.contains('connected at:').should('be.visible')
    cy.contains('Endpoint status: Online').should('be.visible')
  })
})