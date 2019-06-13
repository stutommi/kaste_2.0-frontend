describe('Chat Page', function () {
  before(function () {
    cy.setupDB()
  })

  // Note: I had to to through the login process in this test, because
  // logging straight ahead using command results in status code 500 
  // from server when app queries for messages and current user.
  // This doesn't happen when logging in and I'm not totally sure
  // Why that happens. might be because of app's login refetches
  // current user query, which I'm currently unable to reproduce
  // in cypress. But the cause might be something else also..

  it('succesfully sends and displays messages on desktop and mobile', function () {
    cy.viewport('macbook-15')
    cy.visit('/')

    cy.get('[data-cy=username]').find('input').type('testUser1')
    cy.get('[data-cy=password]').find('input').type('testPassword1{enter}')

    cy.get('[data-cy=chat-button]').click()
    cy.get('[data-cy=message]').should('not.exist')

    cy.get('[data-cy=chat-input]').find('input')
      .type('This is a test message from first user.{enter}')

    cy.get('[data-cy=message]').should('exist')
    cy.get('div.segment').should('have.class', 'blue')

    cy.get('[data-cy=logout-button]').click()

    cy.viewport('iphone-5')

    cy.get('[data-cy=username]').find('input').type('testUser2')
    cy.get('[data-cy=password]').find('input').type('testPassword2{enter}')

    cy.get('[data-cy=sidebar-button]').click()
    cy.get('[data-cy=chat-button]').click()

    cy.get('div.segment').should('have.class', 'green')

    cy.get('[data-cy=chat-input]').find('input')
      .type('This is a test message from second user.{enter}')

    cy.wait(2000)
    cy.get('[data-cy=message] > div').eq(1).should('have.class', 'blue')
  })
})
