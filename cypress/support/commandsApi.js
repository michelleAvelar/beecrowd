/// <reference types="cypress"/>

const env = Cypress.env('baseUrlApi')

Cypress.Commands.add('gets', (endpoint) => {
    cy.request({
        method: 'GET',
        url: env + endpoint,
        failOnStatusCode: false,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'accept': 'application/json',
        }
    })
})

Cypress.Commands.add('getQs', (querystring = '') => {
    cy.request({
        method: 'GET',
        url: env + `/usuarios${querystring ? `?${querystring}` : ''}`,
        failOnStatusCode: false,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'accept': 'application/json',
        },
    })
})


Cypress.Commands.add('posts', (endpoint, objetoJson) => {
    cy.request({
        method: 'POST',
        url: env + endpoint,
        failOnStatusCode: false,
        body: objetoJson,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'accept': 'application/json',
        }
    })
})

Cypress.Commands.add('deletes', (endpoint) => {
    cy.request({
        method: 'DELETE',
        url: env + endpoint,
        failOnStatusCode: false,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'accept': 'application/json',
        }
    })
})

Cypress.Commands.add('createUser', (email, password, name) => {
    cy.fixture('users/bodyUser.json').then(bodyUser => {
        bodyUser.nome = name
        bodyUser.email = email
        bodyUser.password = password
        cy.request({
            method: 'POST',
            url: env + '/usuarios',
            failOnStatusCode: false,
            body: bodyUser,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'accept': 'application/json',
            }
        }).then((response) => {
            expect(response.status).to.be.eq(201)
            expect(response.body.message).to.be.eq('Cadastro realizado com sucesso')
            expect(response.body._id).to.be.not.null
            return cy.wrap = response.body._id
        })
    })
})

Cypress.Commands.add('deleteUser', (idUser) => {
    cy.request({
        method: 'DELETE',
        url: env + `/usuarios/${idUser}`,
        failOnStatusCode: false,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'accept': 'application/json',
        }
    }).then((response) => {
        expect(response.status).to.be.eq(200)
        expect(response.body.message).to.be.eq('Registro excluído com sucesso')
    })
})
