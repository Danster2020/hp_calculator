import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CourseForm from './courseForm/CourseForm';
import CoursesDisplay from './courseForm/CoursesDisplay';
import { Course } from './data';
import { useEffect, useState } from 'react';

function Main() {
    const [courses, setCourses] = useState<Course[]>([]);

    // const handlePropertyChange = (index: number, propertyName: string, newValue: any) => {
    //     setCourses((prevCourses) => {
    //         const updatedCourses = [...prevCourses];
    //         updatedCourses[index].sections[index][propertyName] = newValue;
    //         return updatedCourses;
    //     });
    // };

    const handlePropertyChange = (courseIndex: number, SectionIndex: number, propertyName: string, newValue: any) => {
        setCourses((prevCourses) => {
            const updatedCourses = [...prevCourses];
            updatedCourses[courseIndex].sections[SectionIndex][propertyName] = newValue;
            console.log("prop changed");
            console.log("courses: " + courses);
            return updatedCourses;
        });
    };

    const handleSectionTermChange = (courseIndex: number, SectionIndex: number, newValue: string) => {
        handlePropertyChange(courseIndex, SectionIndex, 'finish_term', newValue);
    };

    return <>
        <header className="p-4 bg-dark_surf">
            <h1 className="text-white">HP Kalkylator</h1>
        </header>

        <main className="mx-auto max-w-xl mt-10 px-2 py-5 text-blue-100">

            <article className="">
                <details>
                    <summary className="">Importera/exportera</summary>
                    <h3>Exportera</h3>
                    <button id="export_btn">Exportera</button>
                    <h3>Importera</h3>
                    <input type="file" id="fileInput" name="filename" accept=".txt,.json" />
                </details>
            </article>

            <CourseForm setCourses={setCourses}></CourseForm>

            <article className="">
                <h2>Sammanfattning</h2>
                <div id="summary_block">

                </div>
            </article>

            <article className="">
                <h2>Kurser</h2>
                <div id="course_display">
                    <CoursesDisplay courses={courses} handleSectionTermChange={handleSectionTermChange}></CoursesDisplay>
                </div>
            </article>

            <footer>v0.1.0</footer>

        </main>
    </>
}

export default Main;