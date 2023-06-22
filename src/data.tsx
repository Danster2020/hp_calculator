import { Section } from './courseForm/Sections';

export const CSN_GOAL = 45

export class Course {
    id: string;
    title: string;
    total_points: number;
    term: number;
    sections: Section[];

    [key: string]: any; // Index signature

    constructor(id: string, title: string, term: number, sections: Section[], total_points: number) {
        this.id = id;
        this.title = title;
        this.term = term;
        this.sections = sections;
        this.total_points = total_points;
    }

    setSection(sectionID: string, updatedSection: Section) {
        for (let i = 0; i < this.sections.length; i++) {
            let section = this.sections[i];
            if (section.id === sectionID) {
                section = updatedSection
            }
        }
    }

    calcCompletedPoints() {
        let completedPoints = 0

        this.sections.forEach(section => {
            if (Number(section.finish_term) !== -1) {
                completedPoints += section.points
            }
        });


        return completedPoints
    }

    calcCompletedTermPoints(term: number) {
        let completedPoints = 0

        this.sections.forEach(section => {
            if (Number(section.finish_term) === term) {
                completedPoints += section.points
            }
        });

        return completedPoints
    }


}



export default function data() {
}
