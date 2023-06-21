import React from 'react'
import { CSN_GOAL, Course } from './data'

const CoursesSummary = (props: { courses: Course[] }) => {

    function calcTotalFinishedPoints() {
        let totalFinishedPoints = 0
        props.courses.forEach(course => {
            totalFinishedPoints += course.calcCompletedPoints()
        });

        return totalFinishedPoints
    }

    function calcTermFinishedPoints(term: number) {
        let totalFinishedPoints = 0
        props.courses.forEach(course => {
            totalFinishedPoints += course.calcCompletedTermPoints(term)
            term++
        });

        return totalFinishedPoints
    }

    function calcNrOfTerms() {
        let nrOfTerms = 0
        props.courses.forEach(course => {
            if (course.term > nrOfTerms) {
                nrOfTerms = course.term
            }
        });

        return nrOfTerms
    }

    return (
        <>
            <div>
                <h4>HP totalt: {calcTotalFinishedPoints()}</h4>
            </div>

            {props.courses.length === 0 ? <div>Inga kurser tillagda</div> :
            
            
            [...Array(calcNrOfTerms())].map((term: number, index: number) => (
            <section key={index}>
                <h4>HP år {term}</h4>
                <p>Avklarat: {calcTermFinishedPoints(term)} HP</p>
                <p>Kvar till CSN: {CSN_GOAL - calcTermFinishedPoints(term)} HP</p>
            </section>
            ))}


        </>
    )
}

export default CoursesSummary