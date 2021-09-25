/// <reference types="Cypress" />

const imagem = {
    descricao: 'Descricao de teste',
    titulo: 'Imagem de teste',
    url: 'aaaaaa',
    _id: 'iddeteste'
}

const imagem2 = { ...imagem }
imagem2.titulo = 'Imagem para Cadastro'
imagem2.descricao = 'descrição qualquer'
imagem2._id = 'idqualquer'

describe('Grupo de testes', () => {
    it('Teste de Cadastro', () => {
        cy.intercept({
            method: 'GET',
            url: '/v1/fotos'
        }, {
            statusCode: 200,
            body: [imagem]
        })

        cy.visit('http://127.0.0.1:8080')
        cy.get('.imagem-responsiva').should('have.length', 1)

        cy.get('[data-cy=Cadastro]').click()
        cy.get('.corpo > :nth-child(2) > :nth-child(3)').should('contain', 'Incluindo')
        cy.get('#titulo').type('1')
        cy.get('[data-cy=tituloDaImagem]').should('contain', '1')
        cy.get('[data-cy=titulo_erro]').should('be.visible')
        cy.get('[data-cy=titulo_erro]').should('contain', 'O campo título deve conter pelo menos 3 caracteres.')
        cy.get('#titulo').type('111111111111111111111111111111111111111111')
        cy.get('[data-cy=titulo_erro]').should('contain', 'O campo título não deve ter mais que 30 caracteres.')
        cy.get('#titulo').clear()

        cy.get('#titulo').type(imagem2.titulo)
        cy.get('[data-cy=tituloDaImagem]').should('contain', imagem2.titulo)
        cy.get('[data-cy=url]').type(imagem2.url)
        cy.get('.imagem-responsiva', {timeout: 25000}).should('be.visible')
        cy.get('#descricao').type(imagem2.descricao)

        cy.intercept({
            method: 'POST',
            url: '/v1/fotos'
        }, {
            statusCode: 201,
            body: 'idqualquer'
        })
        cy.get('[data-cy=gravar]').click()
        cy.get('[data-cy=titulo_erro]').should('not.be.visible')

        cy.intercept({
            method: 'GET',
            url: '/v1/fotos'
        }, {
            statusCode: 200,
            body: [imagem, imagem2]
        })

        cy.get('.router-link-active > .botao').click()
    });

    it('Teste de filtro', () => {
        cy.intercept({
            method: 'GET',
            url: '/v1/fotos'
        }, {
            statusCode: 200,
            body: [imagem, imagem2]
        })
        cy.visit('http://127.0.0.1:8080')
        cy.get('.filtro').type('teste')
        cy.get('.imagem-responsiva').should('have.length', 1)
        cy.get('.filtro').clear()
        cy.get('.imagem-responsiva').should('have.length', 2)
    })
    it('Teste de edição de imagem', () => {
        cy.intercept({
            method: 'GET',
            url: '/v1/fotos'
        }, {
            statusCode: 200,
            body: [imagem, imagem2]
        })
        
        cy.visit('http://127.0.0.1:8080')

        cy.intercept({
            method: 'GET',
            url: '/v1/fotos/' + imagem2._id
        }, {
            statusCode: 200,
            body: imagem2
        })
        imagem2.titulo = 'Imagem para cadastro 2'
        cy.get(':nth-child(2) > .painel > div > a > [data-cy=alterar]').click()
        cy.get('#titulo').clear()
        cy.get('#titulo').type(imagem2.titulo)

        cy.intercept({
            method: 'PUT',
            url: '/v1/fotos/' + imagem2._id
        }, {
            statusCode: 200,
            body: ''
        })


        cy.get('[data-cy=gravar]').click()
    })
    it('Teste de remoção de imagem', () => {
        cy.intercept({
            method: 'GET',
            url: '/v1/fotos'
        }, {
            statusCode: 200,
            body: [imagem, imagem2]
        })

        cy.visit('http://127.0.0.1:8080')

        cy.intercept({
            method: 'DELETE',
            url: `/v1/fotos/${imagem2._id}`
        }, {
            statusCode: 200
        })
        cy.get(':nth-child(2) > .painel > div > [data-cy=apagar]').click()
        cy.get('p.centralizado').should('be.visible')
        cy.get('p.centralizado').should('contain', 'Foto removida com sucesso')
    })
})

