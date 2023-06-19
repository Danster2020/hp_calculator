import React, { useEffect, useState } from 'react'
import { Course } from '../data'
import { Section } from './Sections'

const CoursesDisplay = (props: { courses: Course[] }) => {

    const [mycourses, setMyCourses] = useState<Course[]>(props.courses);

    const handleTermChange = (courseIndex: number, sectionIndex: number, newValue: string) => {

        const updatedCourses = props.courses;
        updatedCourses[courseIndex].sections[sectionIndex].finish_term = newValue;
        setMyCourses(updatedCourses)

        // setMyCourses((prevCourses: Course[]) => {
        //     const updatedCourses = [...prevCourses];
        //     updatedCourses[courseIndex].sections[sectionIndex].finish_term = newValue;
        //     return updatedCourses;
        // });

        console.log(props.courses);
        
    };

    return (
        <>
            {props.courses.length == 0 && <div>Inga kurser tillagda.</div>}
            {props.courses.map((course: Course, courseIndex: number) => (
                <details key={courseIndex}>
                    <summary>{course.title} <br />
                        {course.finished_points} av {course.total_points} HP
                    </summary>
                    <p>
                        Titel: {course.title} <br />
                        Termin: {course.term} <br />
                        Avklarade poäng: {course.finished_points}
                    </p>
                    <div>
                        {course.sections.map((section: Section, sectionIndex: number) => (
                            <div key={sectionIndex}>
                                <h4>{section.title}</h4>
                                <p>Poäng: {section.points} HP</p>
                                <label htmlFor="section_term">Status</label>
                                <select onChange={(e) => handleTermChange(courseIndex, sectionIndex, e.target.value)} name="section_term" className="section_term" defaultValue={section.finish_term}>
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
                    <button className="btn_medium btn_red outline">Radera</button>
                </details>

            ))}

        </>
    )
}

export default CoursesDisplay