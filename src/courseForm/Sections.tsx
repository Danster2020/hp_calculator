import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuid } from 'uuid';


export class Section {
    id: string;
    title: string;
    points: number;
    finish_term: number;

    [key: string]: any; // Index signature

    constructor(title: string, points: number, finish_term: number) {
        this.id = uuid();
        this.title = title;
        this.points = points;
        this.finish_term = finish_term;
    }
}

const Sections = (props: {
    sections: Section[],
    handleDelete: any,
    handleNameChange: any,
    handleTermChange: any,
    handlePointsChange: any
}) => {

    return (
        <>
            {props.sections.map((item: Section, index: number) => (
                <details key={index} id={`section_id_${index}`} className="section_block">
                    <summary>
                        <span>{item.title}</span>
                        <div className='summary_icon' ><FontAwesomeIcon icon="chevron-right" /></div>
                    </summary>
                    <div className="details_body">
                        <label htmlFor="section_name">Benämning</label>
                        <input onChange={(e) => props.handleNameChange(index, e.target.value)}
                            id={`section_name_${index}`}
                            className="section_name"
                            type="text"
                            placeholder="Ex: tenta, labb, projekt.." />

                        <label htmlFor="section_points">Poäng</label>
                        <input
                            onChange={(e) => props.handlePointsChange(index, e.target.value)}
                            id="section_points"
                            className="section_points w-24"
                            type="number"
                            min="0"
                            max="100"
                            step="0.5"
                            defaultValue={item.points} />
                        <label htmlFor="section_term">Status</label>
                        <select onChange={e => props.handleTermChange(index, e.target.value)}
                            id="section_term"
                            name="section_term"
                            className="section_term">
                            <option value="-1">Ej avklarad</option>
                            <option value="1">Avklarad år 1</option>
                            <option value="2">Avklarad år 2</option>
                            <option value="3">Avklarad år 3</option>
                            <option value="4">Avklarad år 4</option>
                            <option value="5">Avklarad år 5</option>
                        </select>
                        <button
                            type="button"
                            onClick={() => props.handleDelete(item.id)}
                            className="btn btn_small btn_red outline"><FontAwesomeIcon icon="trash" />
                        </button>

                    </div>
                </details>
            ))}
        </>
    );
}


export default Sections;
