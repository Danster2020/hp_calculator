import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Sections, { Section } from './Sections';
import { useState } from 'react'
import { v4 as uuid } from 'uuid';
import { Course } from '../data';


const CourseForm = (props: { setCourses: any }) => {

    let empty_sections: Section[] = []
    const [sections, setSections] = useState(empty_sections);

    const submitForm = (e: any) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const payload = Object.fromEntries(formData)

        // gives new IDs after submission
        let sectionsCopy: Section[] = []
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i]
            sectionsCopy[i] = new Section(section.title, section.points, section.finish_term)
        }

        const newCourse = new Course(
            uuid(),
            payload.title.toString(),
            payload.term.toString(),
            sectionsCopy,
            Number(payload.course_points),
        )
        props.setCourses((prevCourses: any) => [...prevCourses, newCourse]);

        console.log(newCourse)
    }

    const handlePropertyChange = (index: number, propertyName: string, newValue: any) => {
        setSections((prevSections) => {
            const updatedSections = [...prevSections];
            updatedSections[index][propertyName] = newValue;
            return updatedSections;
        });
    };

    const handleNameChange = (index: number, newName: string) => {
        handlePropertyChange(index, 'title', newName);
    };

    const handleTermChange = (index: number, newValue: string) => {
        handlePropertyChange(index, 'finish_term', newValue);
    };

    const handlePointsChange = (index: number, newValue: number) => {
        handlePropertyChange(index, 'points', Number(newValue));
    };

    const handleAddSection = () => {
        const newSection = new Section("Moment" + (sections.length + 1), 0, "-1");
        setSections([...sections, newSection]);
    };

    const handleDelete = (id: string) => {
        const newSections = sections.filter(section => section.id !== id)
        setSections(newSections)
    }

    return (
        <>
            <article>
                <form className='' onSubmit={submitForm}>
                    <h3>Kurs</h3>
                    <label htmlFor="title">Kursbenämning</label>
                    <input id="title" name="title" type="text" required />

                    <label htmlFor="course_points">Poäng</label>
                    <input id="course_points" name="course_points" type="number" defaultValue="7.5" />

                    <label htmlFor="term">Läsår</label>
                    <input id="term" name="term" type="number" defaultValue="1" />

                    <div id="sections">
                        <h3>Kursmoment</h3>
                        {sections.length !== 0 ?
                            <Sections
                                sections={sections}
                                handleDelete={handleDelete}
                                handleNameChange={handleNameChange}
                                handleTermChange={handleTermChange}
                                handlePointsChange={handlePointsChange}
                            ></Sections> : <p className='pb-4'>Inga kursmoment tillagda.</p>}
                    </div>
                    <button onClick={handleAddSection} id="" type='button' className="btn btn_small outline"><FontAwesomeIcon icon="plus" /></button>


                    <button className="btn" id="add_course" type='submit'>Lägg till kurs</button>
                </form>
            </article>
        </>
    );
}

export default CourseForm;