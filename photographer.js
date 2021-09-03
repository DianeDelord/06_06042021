const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const photographerPage = urlParams.get("id")

console.log(photographerPage);

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
        const resultPh = data.photographers.filter(photographer => photographer.id == photographerPage);
        console.log(resultPh);
        return;
    });


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

let remplissage = document.getElementById("informations");

let affichageResult = '<ul id="selected-items">';

affichageResult += `<a id="${photographer.id}" class = "restrict" href= "/photographer.html?id=${photographer.id}">
        <li class="photographers-items">
        <img class="photographer-portrait" src="images/Sample Photos/Photographers ID Photos/${(toPascalCase(photographer.name) + '.jpg')}"/>
         <h2 class="photographer-name">${photographer.name}</h2> 
        <p class="photographer-city">${photographer.city}, ${photographer.country} </p><p class="tagline">${photographer.tagline} </p> 
        <p class="photographerPrice">${photographer.price}€/jour </p> 
        <p class="listOfTags"> ${photographer.tags}</p>  
        </li> </a>`;

affichageResult += '</ul>';
resultOfSearch.innerHTML = affichageResult;