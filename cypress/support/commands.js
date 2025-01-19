import loginSelectors from '../selectors/login/login'
import userCreationSelectors from '../selectors/users/userCreation'

Cypress.Commands.add('login', (email, password) => {
    cy.get(loginSelectors.emailTestId).type(email)
    cy.get(loginSelectors.passwordTestId).type(password)
})

Cypress.Commands.add('createUserUI', (name, email, password) => {
    cy.get(userCreationSelectors.nameTestId).type(name)
    cy.get(loginSelectors.emailTestId).type(email)
    cy.get(userCreationSelectors.passwordTestId).type(password)
    cy.get(userCreationSelectors.checkboxTestId).check()
})