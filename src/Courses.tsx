import { MouseEvent } from "react";

var courses: Course[] = [];
const CSN_GOAL = 45;

let nr_of_draft_sections = 0; // TODO fix better solution in future.

class Course {
  id: number;
  title: string;
  term: number;
  sections: any;
  total_points: number;
  // finished_points: number;

  constructor(id: any, title: any, term: any, sections: any, total_points: any) {
    this.id = id;
    this.title = title;
    this.term = term;
    this.sections = sections;
    this.total_points = total_points;
    // this.finished_points = calcCourseCompletion(this);
  }
}

class Section {
  id: number;
  title: any;
  points: number;
  finish_term: any;

  constructor(id: number, title: string, points: string, finish_term: number) {
    this.id = id;
    this.title = title;
    this.points = parseFloat(points);
    this.finish_term = finish_term;
  }
}

// ########### Course ###########
function createID(array: string | any[]) {
  let id = 0;
  for (let i = 0; i < array.length; i++) {
    let obj = array[i];

    // if id exist or is greater: become it and add 1.
    if (obj.id >= id) {
      id = obj.id + 1;
    }
  }
  return id;
}


function addCourse() {
  let c_id = createID(courses); // FIXME smth wrong id only 0 every time
  let c_title = (document.getElementById("title")) as HTMLInputElement;
  let c_term = (document.getElementById("term")) as HTMLInputElement;
  let c_sections = addSections();
  let c_total_points = (document.getElementById("course_points")) as HTMLInputElement;
  let new_course = new Course(c_id, c_title, c_term, c_sections, c_total_points);

  // if (c_title == "") {
  //   send_notification("Kursbenämning är tom!", "r")
  //   return;
  // }

  // if (c_total_points == "0" || c_total_points == "") {
  //   send_notification("Kurspoäng får inte vara 0 eller tom!", "r")
  //   return;
  // }

  // if (c_term == "0" || c_term == "") {
  //   send_notification("Läsår får inte vara 0 eller tom!", "r")
  //   return;
  // }

  // courses.push(new_course);
  // console.log(new_course);
  // updateUI();
  // send_notification("kurs tillagd.", "b")
}


function addSections() {
  
}


function Courses() {
    
}

export default Courses;