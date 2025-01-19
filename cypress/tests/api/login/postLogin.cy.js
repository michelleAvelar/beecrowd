/// <reference types="cypress"/>

const { faker } = require("@faker-js/faker")

const env = 'baseUrlApi'
Cypress.env('env', env)

describe('Login', () => {
    const email = faker.internet.email()
    const password = faker.internet.password()
    const name = faker.person.fullName()
    let id

    context('Login endpoint success scenarios', () => {

        before('Creating new user for success test', () => {
            cy.createUser(email,password,name).then((idUser) => {
                id = idUser
            })
        })

        it('TC01 - Log in successfully - valid credentials', () => {
            cy.fixture('login/bodyLogin.json').then(bodyLogin => {
                bodyLogin.email = email
                bodyLogin.password = password
                cy.posts('login', bodyLogin)
                    .then(response => {
                        expect(response.status).to.be.eq(200)
                        expect(response.body.message).to.be.eq('Login realizado com sucesso')
                        expect(response.body.authorization).to.be.not.null
                    })
            })
        })

        after('Deleting created user', () => {
            cy.deleteUser(id)
        })
    })

    context('Login endpoint failure scenarios', () => {

        it('TC02 - Login with error - non-existent username/password', () => {
            cy.fixture('login/bodyLogin.json').then(bodyLogin => {
                bodyLogin.email = faker.internet.email()
                bodyLogin.password = faker.internet.password()
                cy.posts('login', bodyLogin)
                    .then(response => {
                        expect(response.status).to.be.eq(401)
                        expect(response.body.message).to.be.eq('Email e/ou senha inválidos')
                    })

            })
        })

        it('TC03 - Login with error - no email field', () => {
            cy.fixture('login/bodyLogin.json').then(bodyLogin => {
                delete bodyLogin.email
                bodyLogin.password = faker.internet.password()
                cy.posts('login', bodyLogin)
                    .then(response => {
                        expect(response.status).to.be.eq(400)
                        expect(response.body.email).to.be.eq('email é obrigatório')
                    })

            })
        })
        
        it('TC04 - Login with error - no password field', () => {
            cy.fixture('login/bodyLogin.json').then(bodyLogin => {
                bodyLogin.email = faker.internet.email()
                delete bodyLogin.password
                cy.posts('login', bodyLogin)
                    .then(response => {
                        expect(response.status).to.be.eq(400)
                        expect(response.body.password).to.be.eq('password é obrigatório')
                    })

            })
        })
    })
})