let searchInput = document.getElementById('search');
let photographers;
let searchTerm = '';

let resultOfSearch = document.getElementById('resultOfSearch');
let recupId;

//  https://www.youtube.com/watch?v=o6ULZoMrFGg
// API request
// https://www.youtube.com/watch?v=ZCrh59Bvbts
// https://stackoverflow.com/questions/51859358/how-to-read-json-file-with-fetch-in-javascript
// https://www.youtube.com/watch?v=b0dPBK37-M8&t=24s

// connection au fichier json pour lire les données
fetch("assets/data.json")
    .then(response => {
        if (response.ok) {
            console.log("ok");
            return response.json();
        } else {
            console.log("erreur avec Jason");
            resultOfSearch.innerHTML = ("erreur de chargement des données")
        }
    })
    .then((data) => {
        console.log(data, data.photographers)
    });

// fonction asynchrone https://dmitripavlutin.com/javascript-fetch-async-await/
async function createPhotographerCard() {
    const response = await fetch("assets/data.json");
    const data = await response.json();
    return data;
};

// function remplissage de la page grâce aux données récupérées depuis data.json
createPhotographerCard().then(data => {
    let affichage = '<ul id="selected-items">';
    for (let photographer of data.photographers) {
        console.log(data.photographers);
        affichage += `<div id="${photographer.id}" class = "restrict" onclick="location.href= '/photographer/${photographer.name}.html'">
        <li class="photographers-items">
        <img class="photographer-portrait" src="images/Sample Photos/Photographers ID Photos/${(toPascalCase(photographer.name) + '.jpg')}"/>
         <h2 class="photographer-name">${photographer.name}</h2> 
        <p class="photographer-city">${photographer.city}, ${photographer.country} <hr>${photographer.tagline} <hr>${photographer.price}€/jour <hr> </p> <p class="listOfTags"> <a class="cardTag" href="#">#${photographer.tags[0]} </a>, <a class="cardTag" href="#">#${photographer.tags[1]}</a>, <a class="cardTag" href="#">#${photographer.tags[2]}</a>, <a class="cardTag" href="#">#${photographer.tags[3]}</a> </p>  
        </li> </div>`;
    }
    affichage += '</ul>';
    resultOfSearch.innerHTML = affichage;
});

////////////////////////////////////////////
// https://stackoverflow.com/questions/4068573/convert-string-to-pascal-case-aka-uppercamelcase-in-javascript
function toPascalCase(string) {
    return `${string}`
        .replace(new RegExp(/[-_]+/, 'g'), ' ')
        .replace(new RegExp(/[^\w\s]/, 'g'), '')
        .replace(
            new RegExp(/\s+(.)(\w+)/, 'g'),
            ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
        )
        .replace(new RegExp(/\s/, 'g'), '')
        .replace(new RegExp(/\w/), s => s.toUpperCase());
}

//////////////////////////////////////////////////
// input setup
//searchInput.addEventListener('input', (e) => {
//    searchTerm = e.target.value;
//    console.log(e.target.value);
//    showPhotographers();
//});

// create url //
// https://www.youtube.com/watch?v=6BozpmSjk-Y