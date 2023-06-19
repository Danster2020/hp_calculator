import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Sections, { Section } from './Sections';
import { useState } from 'react'


// export let sections_array: Section[] = []

const CourseForm = () => {

    const submitForm = (e: any) => {
        e.preventDefault()
    
        const formData = new FormData(e.target)
        const payload = Object.fromEntries(formData)
    
        console.log(payload);
    
    }

    const [sections, setSections] = useState([new Section(0, "Moment1", 0, -1)]);

    const handleNameChange = (index: number, newName: string) => {
        setSections((prevSections) => {
          const updatedSections = [...prevSections];
          updatedSections[index].title = newName;
          return updatedSections;
        });
      };

    const handleAddSection = () => {
        const newSection = new Section(sections.length, "Moment" + (sections.length + 1), 0, -1);
          setSections([...sections, newSection]);
    };

    const handleDelete = (id: number) => {
        const newSections = sections.filter(section => section.id !== id)
        setSections(newSections)
    }

    return (
        <>
            <article>
                <form className='' onSubmit={submitForm}>
                    <h3>Kurs</h3>
                    <label htmlFor="title">Kursbenämning</label>
                    <input id="title" name="title" type="text" />

                    <label htmlFor="course_points">Poäng</label>
                    <input id="course_points" name="course_points" type="number" defaultValue="7.5" />

                    <label htmlFor="term">Läsår</label>
                    <input id="term" name="term" type="number" defaultValue="1" />

                    <div id="sections">
                        <h3>Kursmoment</h3>
                        {sections.length != 0 ? <Sections sections={sections} handleDelete={handleDelete} handleNameChange={handleNameChange} ></Sections> : <p className='pb-4'>Inga kursmoment tillagda.</p>}
                    </div>
                    <button onClick={handleAddSection} id="append_section_btn" className="btn btn_small outline"><FontAwesomeIcon icon="plus" /></button>


                    <button className="btn" id="add_course" type='submit'>Lägg till kurs</button>
                </form>
            </article>
        </>
    );
}

export default CourseForm;