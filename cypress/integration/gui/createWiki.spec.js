const faker = require('faker')

describe('Create new page', () => {
  const project = { name: faker.datatype.uuid() }

  beforeEach(() => {
    cy.api_deleteProjects()
    cy.login()
    cy.api_createProject(project)
    cy.visit(`${Cypress.env('user_name')}/${project.name}/wikis/home?view=create`)
  })

  it('successfully', () => {
    const wikiContent = faker.random.words(4)

    cy.get('#wiki_content').type(wikiContent)
    cy.contains('Create page').click()

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}${Cypress.env('user_name')}/${project.name}/-/wikis/home`)
    cy.get('[data-testid=wiki_page_content]').should('contain', wikiContent)
  })
})
