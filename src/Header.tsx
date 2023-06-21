import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Course } from './data';

export const Header = (props: {courses: Course[]}) => {

    function exportToJson(InputCourses: Course[]) {
        let json_data = JSON.stringify(InputCourses, null, 2)
        console.log(json_data);
        download(json_data, 'HP-points.json', 'text/plain');
    }

    function download(content: any, fileName: string, contentType: any) {
        var a = document.createElement("a");
        var file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }

    return (
        <header className="flex justify-between p-4 bg-dark_surf">
            <h1 className="text-white">HP Kalkylator</h1>
            <div className='justify-end self-center sm:mr-4 text-white'>
                <button onClick={() => exportToJson(props.courses)}>
                    <FontAwesomeIcon icon="floppy-disk" className='text-xl' />
                </button>
            </div>
        </header>
    )
}
