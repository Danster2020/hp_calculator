import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Sections from './Sections'

const submitForm = (e: any) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const payload = Object.fromEntries(formData)

    console.log(payload);
    console.log(payload.title);
}


function CourseForm() {
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
                        <Sections></Sections>
                    </div>
                    <button id="append_section_btn" className="btn btn_small outline"><FontAwesomeIcon icon="plus" /></button>


                    <button className="btn" id="add_course" type='submit'>Lägg till kurs</button>
                </form>
            </article>
        </>
    );
}

export default CourseForm;