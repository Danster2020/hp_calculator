import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CourseForm from './courseForm/CourseForm';

function Main() {
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

            <CourseForm></CourseForm>

            <article className="">
                <h2>Sammanfattning</h2>
                <div id="summary_block">

                </div>
            </article>

            <article className="">
                <h2>Kurser</h2>
                <div id="course_display">
                    {/* courses are inserted here */}
                </div>
            </article>

            <footer>v0.1.0</footer>

        </main>
    </>
}

export default Main;