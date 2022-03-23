Cypress.Commands.add('login', (
  username = Cypress.env('user_name'),
  password = null,
  { cacheSession = true } = {}
) => {
  const login = () => {
    let loginId
    let pw

    if (password) {
      loginId = username
      pw = password
    } else {
      loginId = username
      pw = Cypress.env('user_password')
    }

    cy.visit('users/sign_in')

    cy.get("[data-qa-selector='login_field']").type(loginId)
    cy.get("[data-qa-selector='password_field']").type(pw, { log: false })
    cy.get("[data-qa-selector='sign_in_button']").click()
  }

  if (cacheSession) {
    cy.session([username, password], login)
  } else {
    login()
  }
})

Cypress.Commands.add('gui_createAccessToken', name => {
  cy.visit('/-/profile/personal_access_tokens')

  cy.get('#personal_access_token_name').type(name)
  cy.get('#personal_access_token_scopes_api').check()
  cy.get('#new_personal_access_token > .gl-mt-3 > .gl-button').click()
})

Cypress.Commands.add('gui_createProject', project => {
  cy.visit('projects/new#blank_project')

  cy.get('#project_name').type(project.name)
  cy.get('#project_description').type(project.description)
  cy.get('#project_initialize_with_readme').check()
  cy.get('#blank-project-pane > #new_project > .btn-confirm').click()
})

Cypress.Commands.add('gui_createIssue', (project, issue) => {
  cy.visit(`${Cypress.env('user_name')}/${project.name}/issues/new`)

  cy.get('.qa-issuable-form-title').type(issue.title)
  cy.get('#issue_description').type(issue.description)
  cy.contains('Create issue').click()
})

Cypress.Commands.add('gui_createPublicGroup', group => {
  cy.visit('groups/new#create-group-pane')

  cy.get('#group_name').type(group.name)
  cy.get('#group_visibility_level_20').check()
  cy.get('.col-sm-12 > .btn-confirm').click()
})

Cypress.Commands.add('gui_createSubgroup', (groupId, subgroup) => {
  cy.visit(`groups/new?parent_id=${groupId}#create-group-pane`)

  cy.get('#group_name').type(subgroup.name)
  cy.get('.col-sm-12 > .btn-confirm').click()
})

Cypress.Commands.add('gui_createGroupLabel', (group, label) => {
  cy.visit(`groups/${group.path}/-/labels/new`)

  cy.get('.qa-label-title').type(label.title)
  cy.contains('Create label').click()
})

Cypress.Commands.add('gui_createProjectMilestone', (project, milestone) => {
  cy.visit(`${Cypress.env('user_name')}/${project.name}/-/milestones/new`)

  cy.get('#milestone_title').type(milestone.title)
  cy.get('.btn-confirm').click()
})

Cypress.Commands.add('gui_labelIssueWith', label => {
  cy.get('.labels-select-wrapper > :nth-child(1) > .gl-line-height-20 > [data-testid=edit-button] > .gl-button-text').click()
  cy.contains(label.name).click()
  cy.get('body').click()
})

Cypress.Commands.add('gui_commentOnIssue', comment => {
  cy.get('[data-testid=comment-field]').type(comment)
  cy.get('#__BVID__88__BV_button_ > .gl-new-dropdown-button-text').click()
})

Cypress.Commands.add('gui_logout', () => {
  cy.get('.qa-user-avatar').click()
  cy.contains('Sign out').click()
})

Cypress.Commands.add('gui_addMilestoneOnIssue', milestone => {
  cy.get('[data-testid=milestone-edit] > .gl-display-flex > [data-testid=edit-button]').click()
  cy.contains(milestone.title).click()
})

Cypress.Commands.add('gui_createFile', file => {
  cy.get('#file_name').type(file.name)
  cy.get('#editor').type(file.content)
  cy.get('.qa-commit-button').click()
})
