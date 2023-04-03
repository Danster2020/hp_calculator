var courses = [];

class Section {

  constructor(title, points) {
    this.title = title;
    this.points = points;
  }
}

class Course {

  constructor(title, term, sections) {
    this.id = 0;
    this.title = title;
    this.term = term;
    this.sections = sections;
  }
}

function addCourse() {
  c_title = document.getElementById("title").value;
  c_term = document.getElementById("term").value;
  c_sections = "";
  const new_course = new Course(c_title, c_term, c_sections);
  courses.push(new_course);
  console.log(new_course);
  showCourses();
}

function showCourses() {

  var display_div = document.getElementById("course_display");
  display_div.innerHTML = null;

  for (let index = 0; index < courses.length; index++) {
    var element = courses[index];
    display_div.innerHTML += (`
    
    <details>
      <summary>${element.title}</summary>
        <p>
          Namn: ${element.title} <br>
          Termin: ${element.term}
        </p>
    </details>
    
    `)
  }
}

function exportToJson() {
  const json_data = JSON.stringify(courses)
  console.log(json_data);
  download(json_data, 'HP-points.txt', 'text/plain');
}

function importJson() {
  // TODO
}

function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], {type: contentType});
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

function init() {
  document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
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
  showCourses();
}

init();


// const sections = [new Section("tenta", 6), new Section("labb", 1.5)]
// const course1 = new Course("diskret matte", 1, sections);
