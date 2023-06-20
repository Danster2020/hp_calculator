import React from 'react'
import { Section } from './courseForm/Sections';

export class Course {
    id: string;
    title: string;
    term: number;
    sections: Section[];
    total_points: number;

    [key: string]: any; // Index signature

    constructor(id: string, title: string, term: any, sections: Section[], total_points: number) {
        this.id = id;
        this.title = title;
        this.term = term;
        this.sections = sections;
        this.total_points = total_points;
    }

    setSection(sectionID: number, updatedSection: Section) {
        for (let i = 0; i < this.sections.length; i++) {
            let section = this.sections[i];
            if (section.id === sectionID) {
                section = updatedSection
            }
        }
    }

    calcCompletedPoints() {
        let completedPoints = 0

        // for each section in course sections
        for (let i = 0; i < this.sections.length; i++) {
            const section = this.sections[i];
            if (section.finish_term !== "-1") {
                completedPoints += section.points
            }
        }
        return completedPoints
    }


}

export let courses: Course[] = [];


export default function data() {
}
