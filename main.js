var courses = [];
const CSN_GOAL = 45;

class Course {
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
  constructor(title, points, finish_term) {
    this.title = title;
    this.points = parseFloat(points);
    this.finish_term = finish_term;
  }
}

// ########### Course ###########
function addCourse() {
  c_id = courses.length
  c_title = document.getElementById("title").value;
  c_term = document.getElementById("term").value;
  c_sections = addSections();
  c_total_points = document.getElementById("course_points").value;
  const new_course = new Course(c_id, c_title, c_term, c_sections, c_total_points);
  courses.push(new_course);
  console.log(new_course);
  updateUI();
}

function removeCourse() {

  add_btn = document.getElementById("remove_course");

  if (courses.length > 0) {
    courses.pop();
    updateUI();
  }
}

function calcCourseCompletion(course) {
  sum = 0;

  for (let i = 0; i < course.sections.length; i++) {
    const section = course.sections[i];

    if (section.finish_term != -1) {
      sum += section.points;
    }
  }

  return sum;
}

function calcTermCompletion(course, term_nr) {
  sum = 0;
  for (let i = 0; i < course.sections.length; i++) {
    const section = course.sections[i];

    // if section finished in the same term as term_nr
    if (section.finish_term == term_nr) {
      sum += section.points;
    }
  }

  return sum;
}

function displaySummary() {

  for (let i = 0; i < courses.length; i++) {
    const course = courses[i];

  }

  display_div = document.getElementById("summary_block");
  display_div.innerHTML = (`
  <h3>avklarade poäng: </h3>

  `);
}

// ########### SECTIONS ###########
function appendSection() {
  const display_div = document.querySelector("#sections");
  const html = (`
    <details class="section_block">
    <summary>Moment</summary>
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

function addSections() {
  sections = [];
  section_query_name = document.querySelectorAll('#sections .section_name');
  section_query_points = document.querySelectorAll('#sections .section_points');
  section_query_terms = document.querySelectorAll('#sections .section_term');

  // for every section
  for (let i = 0; i < section_query_name.length; i++) {
    sections.push(new Section(
      section_query_name[i].value,
      section_query_points[i].value,
      section_query_terms[i].value
    ))
  }

  console.log(sections);
  return sections;
}

// ########### UI ###########
function updateUI() {

  var display_div = document.getElementById("course_display");
  display_div.innerHTML = null;

  if (courses.length == 0) {
    display_div.innerHTML = "Inga kurser tillagda...";
  } else {
    for (let index = 0; index < courses.length; index++) {
      var element = courses[index];
      display_div.innerHTML += (`
    
    <details>
      <summary>${element.title} <br><br>
      ${element.finished_points} av ${element.total_points} HP</summary>
        <p>
          Titel: ${element.title} <br>
          Termin: ${element.term} <br>
          Avklarade poäng: ${element.finished_points}
        </p>
    </details>
    
    `)
    }
  }

  //update button
  add_btn = document.getElementById("remove_course");

  if (courses.length > 0) {
    add_btn.style.display = "block";
  } else {
    add_btn.style.display = "none";
  }
}

function exportToJson() {
  const json_data = JSON.stringify(courses)
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
  updateUI();
}

function handleFileSelect(event) {
  const reader = new FileReader()
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


// const sections = [new Section("tenta", 6), new Section("labb", 1.5)]
// const course1 = new Course("diskret matte", 1, sections);
