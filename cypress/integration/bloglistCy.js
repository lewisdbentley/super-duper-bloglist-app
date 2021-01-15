const config = require('./utils/config')

describe('bloglist', function () {
  beforeEach(function () {
    cy.request('POST', `http://localhost:${config.PORT}/api/tests/reset`)
    const user = {
      name: 'Lewis Bentley',
      username: 'Lime',
      password: 'green',
    }
    cy.request('POST', 'http://localhost:5000/api/users/', user)
    cy.visit(`http://localhost:${config.PORT}'`)
  })

  it('front page can be opened', function () {
    cy.contains('Blogs')
    cy.contains('An application to store and rate blogs.')
  })

  it('user can log in', function () {
    cy.contains('login').click()
    cy.get('#username').type('Lime')
    cy.get('#password').type('green')
    cy.get('#login-button').click()
    cy.contains('Lime logged in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'Lime', password: 'green' })
    })

    it('a new blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('https://www.cypress.io/')
      cy.contains('save').click()
      cy.contains('a blog created by cypress')
    })

    describe('and several blogs exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'a blog cypress',
          author: 'cypress',
          url: 'www',
        })
        cy.createBlog({
          title: 'another blog cypress',
          author: 'cypress',
          url: 'www',
        })
      })

      it('show button reveals options', function () {
        cy.contains('another blog cypress').contains('show').click()
        cy.contains('another blog cypress')
          .parent()
          .find('div')
          .should('contain', 'hide')
          .should('contain', 'like')
      })

      it('like button increases likes', function () {
        cy.contains('another blog cypress')
          .parent()
          .find('div')
          .find('#likes')
          .should('have.text', '0')
        cy.contains('another blog cypress').contains('show').click()
        cy.contains('another blog cypress')
          .parent()
          .find('div')
          .contains('like')
          .click()
        cy.contains('another blog cypress')
          .parent()
          .find('div')
          .find('#likes')
          .should('have.text', '1')
      })
    })
  })
})
