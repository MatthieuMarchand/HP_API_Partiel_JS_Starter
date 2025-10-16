const CHARACTER_LIMIT = 12;
const API_ALL_CHARACTERS = "https://hp-api.onrender.com/api/characters";

const CharactersHTML = document.getElementById("characters");

async function getCharacters() {
  try {
    const response = await fetch(API_ALL_CHARACTERS);
    const characters = await response.json();
    return characters
      .slice(0, CHARACTER_LIMIT)
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error(error.message);
  }
}

function displayCharacters(characters) {
  CharactersHTML.innerHTML = "";
  characters.forEach((character) => {
    if (!character.image) return;

    const characterDiv = document.createElement("div");
    if (character.house) {
      characterDiv.classList.add(character.house.toLowerCase());
    }

    characterDiv.innerHTML = `
        <img src="${character.image}" alt="Portrait of ${character.name}" />
        <p>${character.name}</p>
    `;

    CharactersHTML.appendChild(characterDiv);
  });
}

function filterByHouse(house, characters) {
  if (house === "all") {
    return characters;
  }
  return characters.filter(
    (character) =>
      character.house && character.house.toLowerCase() === house.toLowerCase()
  );
}

async function init() {
  const characters = await getCharacters();

  const houseButtons = document.querySelectorAll(".house-blason");
  houseButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const house = btn.dataset.house;
      const filteredCharacters = filterByHouse(house, characters);
      displayCharacters(filteredCharacters);
    });
  });

  displayCharacters(characters);
}

init();
