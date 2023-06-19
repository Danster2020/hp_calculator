import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
// import { def_section } from "./CourseForm";


export class Section {
    id: number;
    title: any;
    points: number;
    finish_term: any;

    constructor(id: number, title: string, points: number, finish_term: number) {
        this.id = id;
        this.title = title;
        this.points = points;
        this.finish_term = finish_term;
    }
}

const Sections = (props: { sections: Section[], handleDelete: any, handleNameChange: any }) => {


    // const [section_name, setName] = useState("MOMENT");
    

    return (
        <>
            {props.sections.map((item: Section, index: number) => (
                <details key={index} id={`section_id#${index}`} className="section_block">
                    <summary>{item.title}</summary>
                    <div className="details_body">
                        <label htmlFor="section_name">Benämning</label>
                        <input onChange={(e) => props.handleNameChange(index, e.target.value)} id={`section_name_${index}`} className="section_name" type="text" placeholder="Ex: tenta, labb, projekt.." />

                        <label htmlFor="section_points">Poäng</label>
                        <input id="section_points" className="section_points" type="number" defaultValue={item.points} />

                        <label htmlFor="section_term">Status</label>
                        <select name="section_term" className="section_term">
                            <option value="-1">Ej avklarad</option>
                            <option value="1">Avklarad år 1</option>
                            <option value="2">Avklarad år 2</option>
                            <option value="3">Avklarad år 3</option>
                            <option value="4">Avklarad år 4</option>
                            <option value="5">Avklarad år 5</option>
                        </select>
                        <button onClick={() => props.handleDelete(item.id)} className="btn btn_small btn_red outline"><FontAwesomeIcon icon="trash" /></button>

                    </div>
                </details>
            ))}
        </>
    );
}


export default Sections;
