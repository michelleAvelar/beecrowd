/// <reference types="cypress"/>

const { faker } = require("@faker-js/faker")

const env = 'baseUrlApi'
Cypress.env('env', env)

describe('User creation - API', () => {
    const email = faker.internet.email()
    const senha = faker.internet.password()
    const nome = faker.person.fullName()

    context('Sucess scenarios in the user creation endpoint', () => {
        let id

        it('TC01 - register user with sucess - User ADM', () => {
            cy.fixture('users/bodyUser.json').then(bodyUser => {
                bodyUser.nome = nome
                bodyUser.email = email
                bodyUser.password = senha
                cy.posts('usuarios', bodyUser)
                    .then((response) => {
                        expect(response.status).to.be.eq(201)
                        expect(response.body.message).to.be.eq('Cadastro realizado com sucesso')
                        expect(response.body._id).to.be.not.null
                        id = response.body._id
                        cy.gets(`usuarios/${id}`)
                            .then((response) => {
                                expect(response.status).to.be.eq(200)
                                expect(response.body.nome).to.be.eq(nome)
                                expect(response.body.email).to.be.eq(email)
                                expect(response.body.password).to.be.eq(senha)
                                expect(response.body.administrador).to.be.eq('true')
                            })
                    })
            })

        })

        it('TC02 - register user with success - normal user', () => {
            cy.fixture('users/bodyUser.json').then(bodyUser => {
                bodyUser.nome = nome
                bodyUser.email = email
                bodyUser.password = senha
                bodyUser.administrador = 'false'
                cy.posts('usuarios', bodyUser)
                    .then((response) => {
                        expect(response.status).to.be.eq(201)
                        expect(response.body.message).to.be.eq('Cadastro realizado com sucesso')
                        expect(response.body._id).to.be.not.null
                        id = response.body._id
                        cy.gets(`usuarios/${id}`)
                            .then((response) => {
                                expect(response.status).to.be.eq(200)
                                expect(response.body.nome).to.be.eq(nome)
                                expect(response.body.email).to.be.eq(email)
                                expect(response.body.password).to.be.eq(senha)
                                expect(response.body.administrador).to.be.eq('false')
                            })
                    })
            })
        })

        afterEach('Delete the user created', () => {
            cy.deleteUser(id)
        })
    })

    context('Edge cases scenarios for user creation', () => {

        it('TC03 - try to create a user with empty body', () => {
            cy.fixture('users/bodyUser.json').then(bodyUser => {
                cy.posts('usuarios', '{}')
                    .then(response => {
                        expect(response.status).to.be.eq(400)
                        expect(response.body.nome).to.be.eq('nome é obrigatório')
                        expect(response.body.email).to.be.eq('email é obrigatório')
                        expect(response.body.password).to.be.eq('password é obrigatório')
                        expect(response.body.administrador).to.be.eq('administrador é obrigatório')
                    })
            })
        })
        it('TC04 - Try to register user with invalid data', () => {
            cy.fixture('users/bodyUser.json').then(bodyUser => {
                bodyUser.nome = true
                bodyUser.email = true
                bodyUser.password = true
                bodyUser.administrador = 1234
                cy.posts('usuarios', bodyUser)
                    .then(response => {
                        expect(response.status).to.be.eq(400)
                        expect(response.body.nome).to.be.eq('nome deve ser uma string')
                        expect(response.body.email).to.be.eq('email deve ser uma string')
                        expect(response.body.password).to.be.eq('password deve ser uma string')
                        expect(response.body.administrador).to.be.eq("administrador deve ser 'true' ou 'false'")
                    })
            })
        })

    })
})