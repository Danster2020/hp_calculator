import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Course } from './data';
import { v4 as uuid } from 'uuid';
import { Section } from './courseForm/Sections';
import toast from 'react-hot-toast';

export const Header = (props: { courses: Course[], handleUploadedCourses(uCourses: Course[]): void }) => {

    const [courses, setCourses] = useState<Course[]>([])

    useEffect(() => {
        props.handleUploadedCourses(courses);
    }, [courses]);

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
        toast.success("Kurser sparade.")
    }

    function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files && e.target.files[0];
        let failedReadingFile = false


        if (file) {
            const reader = new FileReader();
            let parsedCoursesData = null
            reader.onload = (event) => {
                const fileContents = event.target?.result;
                if (fileContents) {

                    try {
                        parsedCoursesData = JSON.parse(fileContents as string);

                        const parsedCourses = parsedCoursesData.map((courseData: any) => {
                            // Recreate the Course instances using parsed data. This is needed
                            // to run object specific functions.

                            // recreate sections
                            const sections = courseData.sections.map((sectionData: any) => {
                                return new Section(sectionData.title, sectionData.points, Number(sectionData.finish_term));
                            });

                            const { id, title, term, total_points } = courseData;

                            // recreate course
                            return new Course(uuid(), title, Number(term), sections, Number(total_points));
                        });
                        setCourses(parsedCourses);
                        toast.success("Kurser tillagda.")
                    } catch (error) {
                        toast.error("Kunde inte läsa in kurser.")
                    }
                }
            };


            reader.readAsText(file);
        }
    }

    return (
        <header className="fixed w-full top-0 z-10">
            {process.env.NODE_ENV === "development" &&
                <div className='flex justify-center font-bold bg-yellow-500'>DEV</div>
            }
            <div className='relative flex justify-between p-4 bg-dark_surf'>
                <h1 className="text-white">HP-Kalkylatorn</h1>

                <div className='self-center space-x-6 sm:mr-4 text-white'>
                    <label className='m-0' htmlFor="fileInput"><FontAwesomeIcon icon="upload" className='cursor-pointer w-6 h-6' /></label>
                    <input onChange={(e) => handleFileUpload(e)} className='m-0' type="file" id="fileInput" name="filename" accept=".txt,.json" hidden />
                    <button onClick={() => exportToJson(props.courses)}>
                        <FontAwesomeIcon icon="floppy-disk" className='w-6 h-6' />
                    </button>
                </div>
            </div>
        </header>


    )
}
