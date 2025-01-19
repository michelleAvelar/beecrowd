/// <reference types="cypress"/>
import loginSelectors from "../../../selectors/login/login"

const env = 'baseUrl'
Cypress.env('env', env)

const { faker } = require("@faker-js/faker")

describe('Login Scenarios - Web', () => {

    const email = faker.internet.email()
    const password = faker.internet.password()
    const name = faker.person.fullName()
    let id

    context('Login Success Scenarios - Web', () => {
        before(() => {
            cy.createUser(email, password, name).then((idUser) => {
                id = idUser
            })
            cy.visit('/')
        })

        it('TC01 - Logging in successfully - Valid credentials', () => {
            cy.login(email, password)
            cy.get('form').submit()
            cy.contains('h1', name).should('be.visible')
        })

        after('Deleting created user', () => {
            cy.deleteUser(id)
        })
    })

    context('Login Failure Scenarios - Web', () => {
        beforeEach(() => {
            cy.visit('/')
        })

        it('TC01 - Logging in with invalid credentials', () => {
            cy.login(email, password)
            cy.get('form').submit()
            cy.get('span').should('have.text', loginSelectors.emailOrPasswordInvalidText)
        })

        it('TC02 - Logging in with email in another format', () => {
            cy.login(name, password)
            cy.get('form').submit()
            cy.get('span').should('have.text', loginSelectors.emailShouldBeValidText)
        })

        it('TC03 - Logging in without providing credentials', () => {
            cy.get('form').submit()
            cy.get('span').should('have.text', loginSelectors.emailIsRequiredText + loginSelectors.passwordIsRequiredText)
        })
    })
})
