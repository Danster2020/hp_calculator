import React, { useEffect, useState } from 'react'
import { Course } from '../data'
import { Section } from './Sections'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuid } from 'uuid';

const CoursesDisplay = (props: { courses: Course[], handleSectionTermChange: any, handleCourseDelete: any }) => {

    const [mycourses, setMyCourses] = useState<Course[]>(props.courses);
    const [openState, setOpenState] = useState(false);

    function onDelete() {
        setOpenState(false)
    }

    function onSectionChange() {
        setOpenState(true)
    }

    useEffect(() => {
        setMyCourses(props.courses);
        console.log("props.courses changed");

    }, [props.courses]);

    return (
        <>
            {mycourses.length === 0 && <div>Inga kurser tillagda.</div>}
            {mycourses.map((course: Course, courseIndex: number) => (
                <details key={uuid()} open={openState}>

                    <summary>
                        <div>
                            <span className='font-semibold'>{course.title}</span>
                            <br />
                            <span className=''>{course.calcCompletedPoints()} av {course.total_points} HP</span>
                        </div>
                        <div className='summary_icon h-6 w-6 justify-center align-middle text-center' ><FontAwesomeIcon icon="chevron-right" className='block my-1 mx-auto' /></div>
                    </summary>

                    <div className='details_body'>
                        <p>
                            Titel: {course.title} <br />
                            Termin: {course.term} <br />
                            Avklarade poäng: {course.calcCompletedPoints()}
                        </p>
                        <div>
                            {course.sections.map((section: Section, sectionIndex: number) => (
                                <div className='flex flex-col' key={sectionIndex}>
                                    <h4>{section.title}</h4>
                                    <p>Poäng: {section.points} HP</p>
                                    <label htmlFor="section_term">Status</label>
                                    <select onChange={(e) => {
                                        props.handleSectionTermChange(courseIndex, sectionIndex, e.target.value)
                                        // TODO prevent auto closing after change. setOpenState(true)
                                    }} name="section_term" className="section_term" defaultValue={section.finish_term}>
                                        <option value="-1">Ej avklarad</option>
                                        <option value="1">Avklarad år 1</option>
                                        <option value="2">Avklarad år 2</option>
                                        <option value="3">Avklarad år 3</option>
                                        <option value="4">Avklarad år 4</option>
                                        <option value="5">Avklarad år 5</option>
                                    </select>
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                props.handleCourseDelete(course.id)
                                onDelete()
                            }}
                            className="btn btn_small btn_red outline"><FontAwesomeIcon icon="trash" />
                        </button>
                    </div>

                </details>

            ))}

        </>
    )
}

export default CoursesDisplay