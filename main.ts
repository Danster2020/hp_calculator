
var courses = [];
const CSN_GOAL = 45;

let nr_of_draft_sections = 0; // TODO fix better solution in future.

class Course {
  id: number;
  title: string;
  term: number;
  sections: any;
  total_points: number;
  finished_points: number;

  constructor(id, title, term, sections, total_points) {
    this.id = id;
    this.title = title;
    this.term = term;
    this.sections = sections;
    this.total_points = total_points;
    this.finished_points = calcCourseCompletion(this);
  }
}

class Section {
  id: number;
  title: any;
  points: number;
  finish_term: any;

  constructor(id, title, points, finish_term) {
    this.id = id;
    this.title = title;
    this.points = parseFloat(points);
    this.finish_term = finish_term;
  }
}

// ########### Course ###########
function addCourse() {
  let c_id = createID(courses);
  let c_title = (<HTMLInputElement>document.getElementById("title")).value;
  let c_term = (<HTMLInputElement>document.getElementById("term")).value;
  let c_sections = addSections();
  let c_total_points = (<HTMLInputElement>document.getElementById("course_points")).value;
  let new_course = new Course(c_id, c_title, c_term, c_sections, c_total_points);
  courses.push(new_course);
  console.log(new_course);
  updateUI();
}

function createID(array) {
  let id = 0;
  for (let i = 0; i < array.length; i++) {
    let obj = array[i];

    // if id exist or is greater: become it and add 1.
    if (obj.id >= id) {
      let id = obj.id + 1;
    }
  }
  return id;
}

function popCourseAtIndex(id) {

  for (let i = 0; i < courses.length; i++) {
    var course = courses[i];

    // console.log("course id: " + course.id + " target id: " + id)

    if (course.id == id) {
      let removed_element = courses.splice(i, 1);
      console.log("removed id: " + removed_element[0].id)
      return;
    }
  }
}

function removeCourse(id) {
  popCourseAtIndex(id)
  updateUI();
}

// returns the course obj
function getCourse(id) {
  for (let i = 0; i < courses.length; i++) {
    let course = courses[i];

    if (course.id == id) {
      return course;
    }
  }
  return null;
}

function updateFinishTerm(element_id, course_id, term_index) {
  let course = getCourse(course_id);
  let new_value = (<HTMLInputElement>document.getElementById(element_id)).value;
  course.sections[term_index].finish_term = new_value;
  console.log("New value: " + new_value);
  course.finished_points = calcCourseCompletion(course); // need to update points
  updateUI();
}

function displayCourses() {
  var display_div = document.getElementById("course_display");
  display_div.innerHTML = null;

  if (courses.length == 0) {
    display_div.innerHTML = "Inga kurser tillagda...";
  } else {
    // for every course
    for (let index = 0; index < courses.length; index++) {
      var course = courses[index];
      let sections_div = "";
      // for every section in that course
      for (let j = 0; j < course.sections.length; j++) {
        let section = course.sections[j];


        let placeholder_text = `selected="selected"`;
        let saved_option = [];
        if (section.finish_term == -1) {
          saved_option[0] = placeholder_text;
        } else {
          saved_option[section.finish_term] = placeholder_text;
        }

        sections_div += (`
        <h4>${section.title}</h4>
        <p>Poäng: ${section.points} HP</p>
        <label for="section_term">Status</label>
        <select id="${course.id}:${j}" name="section_term" class="section_term" onchange="updateFinishTerm(this.id, ${course.id}, ${j})" value="${section.finish_term}">
            <option ${saved_option[0]} value="-1">Ej avklarad</option>
            <option ${saved_option[1]} value="1">Avklarad år 1</option>
            <option ${saved_option[2]} value="2">Avklarad år 2</option>
            <option ${saved_option[3]} value="3">Avklarad år 3</option>
            <option ${saved_option[4]} value="4">Avklarad år 4</option>
            <option ${saved_option[5]} value="5">Avklarad år 5</option>
        </select>
        `)
      }

      // display course
      display_div.innerHTML += (`
        <details>
          <summary>${course.title} <br><br>
          ${course.finished_points} av ${course.total_points} HP
          </summary>
            <p>
              Titel: ${course.title} <br>
              Termin: ${course.term} <br>
              Avklarade poäng: ${course.finished_points}
            </p>
            <div>
              ${sections_div}
            </div>
            <button class="btn_medium btn_red outline" id="remove_course" onclick="removeCourse(${course.id})">Radera</button>
        </details>
    `)
    }
  }
}

function calcCourseCompletion(course) {
  let sum = 0;

  for (let i = 0; i < course.sections.length; i++) {
    let section = course.sections[i];

    if (section.finish_term != -1) {
      sum += section.points;
    }
  }

  return sum;
}

function calcTermCompletion(course, term_nr) {
  let sum = 0;
  for (let i = 0; i < course.sections.length; i++) {
    let section = course.sections[i];

    // if section finished in the same term as term_nr
    if (section.finish_term == term_nr) {
      sum += section.points;
    }
  }

  return sum;
}

// calculates total finished points for the selected term
function calcTotalTermCompletion(term_nr) {
  let nr_of_terms = getNrOfTerms();
  let term_total_points = 0

  // for every course
  for (let i = 0; i < courses.length; i++) {

    let course = courses[i];
    term_total_points += calcTermCompletion(course, term_nr);
  }

  return term_total_points;
}

function calcTotalHpPoints() {
  let nr_of_terms = getNrOfTerms();
  let total_points = 0

  // for every course
  for (let term = 0; term < nr_of_terms + 1; term++) {
    total_points += calcTotalTermCompletion(term);
  }

  console.log("Total HP points for " + nr_of_terms + " terms: " + total_points)
  return total_points;
}

function getNrOfTerms() {
  let nr_of_terms = 0;

  // for every course
  for (let i = 0; i < courses.length; i++) {
    let course = courses[i];

    // console.log("course " + course)

    // for every section
    for (let i = 0; i < course.sections.length; i++) {
      let section = course.sections[i];
      console.log("section.finish_term " + section.finish_term)
      if (section.finish_term > nr_of_terms) {
        nr_of_terms = section.finish_term;
      }
    }
  }

  return nr_of_terms;
}


function displaySummary() {

  let nr_of_terms = getNrOfTerms();
  console.log("nr " + nr_of_terms);
  let html = "";
  html += (`
    <div>
      <h4>HP totalt: ${calcTotalHpPoints()}</h4>
    </div>
  `);
  let display_div = document.getElementById("summary_block")
  display_div.innerHTML = html;

  // for every term
  for (let i = 0; i < nr_of_terms; i++) {

    let term_nr = i + 1;
    html += (`
      <section>
        <h4>HP år ${term_nr}</h4>
        <p>Avklarat: ${calcTotalTermCompletion(term_nr)} HP</p>
        <p>Kvar till CSN: ${CSN_GOAL - calcTotalTermCompletion(term_nr)} HP</p>
      </section>
    `);
    console.log("debug: " + html)
    display_div.innerHTML = html;
  }
}

// ########### SECTIONS ###########
function appendSection() {

  nr_of_draft_sections++;

  let display_div = document.querySelector("#sections");
  let html = (`
    <details id="section_id${nr_of_draft_sections - 1}" class="section_block">
    <summary>Moment ${nr_of_draft_sections}</summary>
    <div>
        <label for="section_name">Benämning</label>
        <input id="section_name" class="section_name" type="text" placeholder="Ex: tenta, labb, projekt..">

        <label for="section_points">Poäng</label>
        <input id="section_points" class="section_points" type="number">
        
        <label for="section_term">Status</label>
        <select name="section_term" class="section_term">
            <option value="-1">Ej avklarad</option>
            <option value="1">Avklarad år 1</option>
            <option value="2">Avklarad år 2</option>
            <option value="3">Avklarad år 3</option>
            <option value="4">Avklarad år 4</option>
            <option value="5">Avklarad år 5</option>
        </select>
    </div>
    </details>
`);

  display_div.insertAdjacentHTML("beforeend", html); // adds html before end of div
}

function decrementSection() {

  if (nr_of_draft_sections < 1) {
    console.log("no section to delete");
    return;
  }

  let tag = document.getElementById("section_id" + (nr_of_draft_sections - 1));
  console.log("tag: " + "section_id" + nr_of_draft_sections)
  tag.remove();
  nr_of_draft_sections--;
}

function addSections() {
  let sections = [];
  let section_query_name = document.querySelectorAll('#sections .section_name');
  let section_query_points = document.querySelectorAll('#sections .section_points');
  let section_query_terms = document.querySelectorAll('#sections .section_term');

  // for every section
  for (let i = 0; i < section_query_name.length; i++) {
    sections.push(new Section(
      null,
      (<HTMLInputElement>section_query_name[i]).value,
      (<HTMLInputElement>section_query_points[i]).value,
      (<HTMLInputElement>section_query_terms[i]).value
    ))
  }

  console.log(sections);
  return sections;
}

// ########### UI ###########
function updateUI() {

  displayCourses();
  displaySummary();
}

function exportToJson() {
  let json_data = JSON.stringify(courses, null, 2)
  console.log(json_data);
  download(json_data, 'HP-points.txt', 'text/plain');
}

function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

function init() {
  document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
  appendSection();
  updateUI();
}

function handleFileSelect(event) {
  let reader = new FileReader()
  reader.onload = handleFileLoad;
  reader.readAsText(event.target.files[0])
}

function handleFileLoad(event) {
  console.log(event);
  // document.getElementById('fileContent').textContent = event.target.result;
  courses = JSON.parse(event.target.result)
  updateUI();
}

init();


