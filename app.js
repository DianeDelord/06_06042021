let searchInput = document.getElementById('search');
//let photographers;
let searchTerm = '';

let resultOfSearch = document.getElementById('resultOfSearch');
let selection;
let affichage2;

// https://www.youtube.com/watch?v=o6ULZoMrFGg
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
            resultOfSearch.innerHTML = ("erreur de chargement des données");
        }
    })
    .then((data) => {
        console.log(data, data.photographers);
        for (let photographer of data.photographers) {
            //console.log(photographer.tags);
            for (let tag of photographer.tags) {
                //console.log(tag);
            }
        }
    });


// fonction asynchrone https://dmitripavlutin.com/javascript-fetch-async-await/
async function createPhotographerCard() {
    const response = await fetch("assets/data.json");
    const data = await response.json();
    return data;
};

// function remplissage de la page grâce aux données récupérées depuis data.json
createPhotographerCard()
    .then(data => {
        let affichage = '<ul id="selected-items">';
        for (let photographer of data.photographers) { //href= "/photographer.html"
            affichage += `<a id="${photographer.id}" class = "restrict" href= "/photographer.html?id=${photographer.id}">
        <li class="photographers-items">
        <img class="photographer-portrait" src="images/Sample Photos/Photographers ID Photos/${(toPascalCase(photographer.name) + '.jpg')}" alt="${photographer.name}/>
         <h2 class="photographer-name">${photographer.name}</h2> 
        <p class="photographer-city">${photographer.city}, ${photographer.country} </p><p class="tagline">${photographer.tagline} </p> 
        <p class="photographerPrice">${photographer.price}€/jour </p> 
        <p class="listOfTags"> ${photographer.tags}</p>  
        </li> </a>`;
        }
        affichage += '</ul>';
        resultOfSearch.innerHTML = affichage;
        return;
    })


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


// filtre au clic des tags

const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
const result = words.filter(word => word.length > 6);
console.log(result);

async function tagFilter() {
    const response = await fetch("assets/data.json");
    const data = await response.json();
    return data;
};

// function remplissage de la page grâce aux données récupérées depuis data.json
tagFilter()
    .then(data => {
        let filtrePortrait = document.getElementById("filtrePortrait");
        console.log(data.media);
        let mediasToFilter = data.media;

        for (let media of mediasToFilter) {
            console.log(media);
            console.log(mediasToFilter);
        };

        mediasFiltres = mediasToFilter.filter(function(media) {
            if (media.tags == 'events') {
                console.log("j'ai trouvé la photo nommée " + media.image + " du photographe avec l'id " + media.photographerId);
            }
            console.log(mediasFiltres);
        });
    })

// var mediasRecup = data.media;
//  var tri = mediasRecup.filter(function(media) {
//      return media.photographerId == resultPh[0].id;
//   });