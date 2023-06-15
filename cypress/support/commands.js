/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }


Cypress.Commands.add('addCourse', (number) => {

    cy.get('#title').type(`kurs${number}`)

    // section 1
    cy.get('#sections>details').eq(0).click()
    cy.get('#section_id0>.details_body>#section_name').type("tenta")
    cy.get('#section_id0>.details_body>#section_points').type("5")
    cy.get('#section_id0>.details_body>.section_term').select('1')

    // section 2
    cy.get('#append_section_btn').click()
    cy.get('#sections>details').eq(1).click()
    cy.get('#section_id1>.details_body>#section_name').type("projekt")
    cy.get('#section_id1>.details_body>#section_points').type("2.5")
    cy.get('#section_id1>.details_body>.section_term').select('1')

    cy.get('#add_course').click()

})

