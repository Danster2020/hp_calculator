

describe('crud', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('can add a course with two sections', () => {

        cy.addCourse("1")
        cy.get('#course_display').closest("div>span").should('have.text', "Kurs 1")

    })

    // it('can add three courses', () => {

    //     cy.addCourse("1")
    //     cy.addCourse("2")
    //     cy.addCourse("3")

    // })

    // it('can add new todo items', () => {
    //   // We'll store our item text in a variable so we can reuse it
    //   const newItem = 'Feed the cat'

    //   // Let's get the input element and use the `type` command to
    //   // input our new list item. After typing the content of our item,
    //   // we need to type the enter key as well in order to submit the input.
    //   // This input has a data-test attribute so we'll use that to select the
    //   // element in accordance with best practices:
    //   // https://on.cypress.io/selecting-elements
    //   cy.get('[data-test=new-todo]').type(`${newItem}{enter}`)

    //   // Now that we've typed our new item, let's check that it actually was added to the list.
    //   // Since it's the newest item, it should exist as the last element in the list.
    //   // In addition, with the two default items, we should have a total of 3 elements in the list.
    //   // Since assertions yield the element that was asserted on,
    //   // we can chain both of these assertions together into a single statement.
    //   cy.get('.todo-list li')
    //     .should('have.length', 3)
    //     .last()
    //     .should('have.text', newItem)
    // })


})
