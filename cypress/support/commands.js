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

    cy.get('#title').type(`Kurs ${number}`)

    // add section
    cy.get('.btn_pill').contains('Nytt moment').click();

    // section 1
    cy.get('details').contains('Moment 1').click();
    cy.get('#section_name_0').type("Tenta")
    cy.get('.details_body>.section_term').select('1')

    // section 2
    cy.get('.btn_pill').contains('Nytt moment').click();
    cy.get('details').contains('Moment 2').click();
    cy.get('#section_name_1').type("Projekt")
    cy.get('#section_id_1>.details_body>.section_points').type("{backspace}")
    cy.get('#section_id_1>.details_body>.section_points').type("2.5")
    cy.get('#section_id_1>.details_body>.section_term').select('1')

    cy.get('button').contains('Lägg till kurs').click();
})

