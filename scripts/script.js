const CHARACTER_LIMIT = 12;
const API_HOGWARTS_STUDENTS =
  "https://hp-api.onrender.com/api/characters/students";

const CharactersHTML = document.getElementById("characters");

async function getHogwartsStudents() {
  try {
    const response = await fetch(API_HOGWARTS_STUDENTS);
    const students = await response.json();
    return students.slice(0, CHARACTER_LIMIT);
  } catch (error) {
    console.error(error.message);
  }
}

async function displayStudents() {
  const students = await getHogwartsStudents();

  students.forEach((student) => {
    const studentDiv = document.createElement("div");
    if (student.house) {
      studentDiv.classList.add(student.house.toLowerCase());
    }

    studentDiv.innerHTML = `
        <img src="${student.image}" alt="Portrait of ${student.name}" />
        <p>${student.name}</p>
    `;

    CharactersHTML.appendChild(studentDiv);
  });
}

displayStudents();
