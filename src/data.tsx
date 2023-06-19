import React from 'react'
import { Section } from './courseForm/Sections';

export class Course {
    id: string;
    title: string;
    term: number;
    sections: Section[];
    total_points: number;
    finished_points: number;

    [key: string]: any; // Index signature

    constructor(id: string, title: string, term: any, sections: Section[], total_points: number, finished_points: number) {
        this.id = id;
        this.title = title;
        this.term = term;
        this.sections = sections;
        this.total_points = total_points;
        this.finished_points = finished_points;
    }
}

export let courses: Course[] = [];


export default function data() {
}
