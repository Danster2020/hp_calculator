import CourseForm from './courseForm/CourseForm';
import CoursesDisplay from './courseForm/CoursesDisplay';
import { Course } from './data';
import { useState } from 'react';
import CoursesSummary from './CoursesSummary';
import { Header } from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Footer } from './Footer';
import { Toaster, toast } from 'react-hot-toast';




function Main() {
    const [courses, setCourses] = useState<Course[]>([]);

    const handlePropertyChange = (courseIndex: number, SectionIndex: number, propertyName: string, newValue: any) => {
        setCourses((prevCourses) => {
            const updatedCourses = [...prevCourses];
            updatedCourses[courseIndex].sections[SectionIndex][propertyName] = newValue;
            console.log(courses);
            return updatedCourses;
        });
    };

    const handleSectionTermChange = (courseIndex: number, SectionIndex: number, newValue: number) => {
        handlePropertyChange(courseIndex, SectionIndex, 'finish_term', Number(newValue));
    };

    const handleCourseDelete = (courseID: string) => {
        const updatedCourses = courses.filter(course => course.id !== courseID)
        setCourses(updatedCourses)
        toast.success("Kurs raderad.")
    };

    function handleUploadedCourses(uCourses: Course[]) {
        console.log("uCourses");
        console.log(uCourses);
        setCourses(uCourses)
        console.log("uCourses");
        console.log(uCourses);

    }

    return <>

        <Toaster />

        <Header courses={courses} handleUploadedCourses={handleUploadedCourses}></Header>

        <main className="mx-auto max-w-xl mt-20 px-2 py-5 text-blue-100">
            <CourseForm setCourses={setCourses}></CourseForm>

            <article className="">
                <h2>Sammanfattning</h2>
                <div className="summary_block">
                    <CoursesSummary courses={courses} ></CoursesSummary>
                </div>
            </article>

            <article className="">
                <h2>Kurser</h2>
                <div id="course_display">
                    <CoursesDisplay courses={courses} handleSectionTermChange={handleSectionTermChange} handleCourseDelete={handleCourseDelete}></CoursesDisplay>
                </div>
            </article>
        </main>

        <Footer></Footer>
    </>
}

export default Main;