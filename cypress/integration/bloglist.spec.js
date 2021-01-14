describe('bloglist', function () {
  beforeEach(function () {
    cy.visit('http://localhost:8080')
  })
  it('front page can be opened', function () {
    cy.contains('Blogs')
    cy.contains('An application to store and rate blogs.')
  })

  it('login form can be opened', function () {
    cy.contains('login').click()
    cy.get('#username').type('Lime')
    cy.get('#password').type('green')
    cy.get('#login-button').click()
    cy.contains('Lime logged in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('login').click()
      cy.get('#username').type('Lime')
      cy.get('#password').type('green')
      cy.get('#login-button').click()
    })

    it('a new blog can be created', function () {
      cy.contains('create a new blog').click()
      cy.get('input').type('a blog created by cypress')
      cy.contains('save').click()
      cy.contains('a blog created by cypress')
    })
  })
})
