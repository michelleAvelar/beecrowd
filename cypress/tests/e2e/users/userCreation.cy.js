/// <reference types="cypress"/>

import userCreationSelectors from "../../../selectors/users/userCreation"
import loginSelectors from "../../../selectors/login/login"
import { faker } from "@faker-js/faker"

const env = 'baseUrl'
Cypress.env('env', env)

describe('User Creation - Web', () => {

    const email = faker.internet.email()
    const password = faker.internet.password()
    const name = faker.person.fullName()
    let id

    context('User registration success scenarios - Web', () => {
        before(() => {
            cy.visit('/cadastrarusuarios')
        })

        it('TC01 - Successfully creating a user', () => {
            cy.createUserUI(name, email, password)
            cy.get('form').submit()
            cy.get(userCreationSelectors.successAlertSelector).should('have.text', userCreationSelectors.successAlertText)
            cy.contains('h1', name).should('be.visible')
        })

        after('Deleting created user', () => {
            cy.getQs(`email=${email}`)
                .then((response) => {
                    id = response.body.usuarios[0]._id
                    cy.deleteUser(id)
                })
        })
    })

    context('User registration failure scenarios - Web', () => {
        beforeEach(() => {
            cy.visit('/cadastrarusuarios')
        })

        it('TC02 -  Creating a user without filling in fields', () => {
            cy.get('form').submit()
            cy.get('span').should('have.text', userCreationSelectors.nameIsRequiredText + loginSelectors.emailIsRequiredText + loginSelectors.passwordIsRequiredText)
        })

    })
})
