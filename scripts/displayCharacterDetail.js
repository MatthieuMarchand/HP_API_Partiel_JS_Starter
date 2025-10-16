const API_CHARACTER_BY_ID = "https://hp-api.onrender.com/api/character/";

const params = new URLSearchParams(window.location.search);
const characterId = params.get("id");

async function displayCharacter() {
  try {
    const response = await fetch(API_CHARACTER_BY_ID + characterId);
    const data = await response.json();
    const character = data[0];

    document.querySelector("h3").innerHTML = character.name;

    document.querySelector("figure").innerHTML = `
        <figure class="perso__left">
            <img src="${character.image}" alt="" srcset="" />
            <figcaption>${character.actor}</figcaption>
        </figure>
    `;

    document.getElementById("house_blason").innerHTML = `
        <img src="./images/logo/${character.house}.png" alt="" srcset="" />
    `;

    document.getElementById("character_information").innerHTML = `
        <table>
            <tbody>
            <tr>
                <td>Gender</td>
                <td>${character.gender}</td>
            </tr>
            <tr>
                <td>Eye</td>
                <td>${character.eyeColour}</td>
            </tr>
            <tr>
                <td>Hair</td>
                <td>${character.hairColour}</td>
            </tr>
            <tr>
                <td>Date of birth</td>
                <td>${character.dateOfBirth}</td>
            </tr>
            <tr>
                <td>Patronus</td>
                <td>${character.patronus}</td>
            </tr>
            </tbody>
        </table>
    `;
  } catch (error) {
    console.error(error);
  }
}

displayCharacter();
