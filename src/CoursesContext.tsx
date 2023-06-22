import { createContext } from "react";
import { Course } from "./data";



let courses: Course[] = [];

export const CoursesContext = createContext(courses)