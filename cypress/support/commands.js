// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

const config = require('../../utils/config')

// eslint-disable-next-line no-unused-vars
Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `http://localhost:${config.PORT}/api/login`, {
    username: 'Lime',
    password: 'green',
  }).then((response) => {
    localStorage.setItem('loggedBlogUser', JSON.stringify(response.body))
    cy.visit(`http://localhost:${config.PORT}`)
  })
})

Cypress.Commands.add(
  'createBlog',
  ({ title = 'title', author = 'author', url = 'url' }) => {
    cy.request({
      url: `http://localhost:${config.PORT}/api/blogs`,
      method: 'POST',
      body: { title, author, url },
      headers: {
        Authorization: `bearer ${
          JSON.parse(localStorage.getItem('loggedBlogUser')).token
        }`,
      },
    })

    cy.visit(`http://localhost:${config.PORT}`)
  }
)
