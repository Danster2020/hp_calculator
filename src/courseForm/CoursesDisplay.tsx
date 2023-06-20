import React, { useEffect, useState } from 'react'
import { Course } from '../data'
import { Section } from './Sections'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CoursesDisplay = (props: { courses: Course[], handleSectionTermChange: any, handleCourseDelete: any }) => {

    const [mycourses, setMyCourses] = useState<Course[]>(props.courses);

    useEffect(() => {
        setMyCourses(props.courses);
    }, [props.courses]);

    return (
        <>
            {mycourses.length == 0 && <div>Inga kurser tillagda.</div>}
            {mycourses.map((course: Course, courseIndex: number) => (
                <details key={courseIndex}>
                    <summary>{course.title} <br />
                        {course.calcCompletedPoints()} av {course.total_points} HP
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
                                    <select onChange={(e) => props.handleSectionTermChange(courseIndex, sectionIndex, e.target.value)} name="section_term" className="section_term" defaultValue={section.finish_term}>
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
                            onClick={() => props.handleCourseDelete(course.id)}
                            className="btn btn_small btn_red outline"><FontAwesomeIcon icon="trash" />
                        </button>
                    </div>

                </details>

            ))}

        </>
    )
}

export default CoursesDisplay