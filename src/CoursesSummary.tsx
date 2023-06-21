import React, { useEffect, useState } from 'react'
import { CSN_GOAL, Course } from './data'

const CoursesSummary = (props: { courses: Course[] }) => {

    // const [mycourses, setMyCourses] = useState<Course[]>(props.courses);
    const [totalNrOfTerms, setnrOfTerms] = useState<number>(0);

    useEffect(() => {
        handleNrOfTermsUpdate()
    }, [props.courses]);

    function calcTotalFinishedPoints() {
        let totalFinishedPoints = 0
        props.courses.forEach(course => {
            totalFinishedPoints += course.calcCompletedPoints()
        });

        return totalFinishedPoints
    }

    // function calcTotalPoints() {
    //     let totalPoints = 0
    //     props.courses.forEach(course => {
    //         totalFinishedPoints += course.calcCompletedPoints()
    //     });

    //     return totalFinishedPoints
    // }

    function calcTermFinishedPoints(term: number) {
        let totalFinishedPoints = 0
        props.courses.forEach(course => {
            totalFinishedPoints += course.calcCompletedTermPoints(term)
        });

        return totalFinishedPoints
    }

    function calcNrOfTerms() {
        let nrOfTerms = 1
        props.courses.forEach(course => {
            if (course.term > nrOfTerms) {
                nrOfTerms = course.term
            }
        });

        return nrOfTerms
    }

    function handleNrOfTermsUpdate() {
        setnrOfTerms(calcNrOfTerms())
        console.log("totalNrOfTerms: " + totalNrOfTerms);
        

    }


    return (
        <>
            <div>
                <h4>HP totalt: {calcTotalFinishedPoints()}</h4>
            </div>

            {props.courses.length === 0 ? <div>Inga kurser tillagda</div> :

                [...Array(totalNrOfTerms)].map((undefined, index: number) => (
                    <section key={index}>
                        <h4>HP år {index + 1}</h4>
                        <ul>
                            <li>Avklarat: {calcTermFinishedPoints(index + 1)} HP</li>
                            <li>Kvar till CSN: {CSN_GOAL - calcTermFinishedPoints(index + 1)} HP</li>
                        </ul>
                    </section>
                ))
            }


        </>
    )
}


export default CoursesSummary