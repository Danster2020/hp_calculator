import React, { useEffect, useState } from 'react'
import { CSN_GOAL, Course } from './data'
import { CircularProgressbar, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const CoursesSummary = (props: { courses: Course[] }) => {

    const [totalNrOfTerms, setnrOfTerms] = useState<number>(0);

    const [totalFinishedPoints, setTotalFinishedPoints] = useState<number>(0);

    useEffect(() => {
        handleNrOfTermsUpdate()
        setTotalFinishedPoints(calcTotalFinishedPoints())
    }, [props.courses]);

    function calcTotalFinishedPoints() {
        console.log("DEBUGGG");
        console.log(props.courses);

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
            <div className='mb-4'>
                <span><span className='text-3xl font-semibold text-sky-300'>{totalFinishedPoints}</span><span className='text-lg text-gray-400 font-semibold'> HP</span></span>
            </div>

            {props.courses.length === 0 ? <div>Inga kurser tillagda.</div> :

                [...Array(totalNrOfTerms)].map((undefined, index: number) => (
                    <section key={index}>

                        <div>
                            <div className='flex justify-between items-center mb-4 p-4 bg-dark_back shadow-lg rounded-lg'>
                                <div>
                                    <h3>År {index + 1}</h3>

                                    <ul>
                                        <li><span className='text-2xl font-semibold text-sky-300'>{calcTermFinishedPoints(index + 1)}</span><span className='text-base text-gray-400 font-semibold'> HP</span></li>
                                    </ul>
                                </div>
                                <div>
                                    <div className='w-20 sm:w-32'>
                                        <CircularProgressbarWithChildren value={calcTermFinishedPoints(index + 1)} maxValue={CSN_GOAL} text={`${CSN_GOAL - calcTermFinishedPoints(index + 1)} HP`} >
                                            <span className='mt-8 sm:mt-12 text-xs sm:text-base font-bold text-gray-500'>CSN</span>
                                        </CircularProgressbarWithChildren>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </section>
                ))
            }


        </>
    )
}


export default CoursesSummary