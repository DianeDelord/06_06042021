// remplir dynamiquement ma page
let resultOfSearch = document.getElementById('resultOfSearch');

/////////////////////////////////////
//////////// scroll ////////////////
// https://www.w3schools.com/jsref/event_onscroll.asp
// https://stackoverflow.com/questions/31223341/detecting-scroll-direction
// quand on scrolle, le topLink apparaît
let topLink = document.querySelector("#topLink");

function scrollDetect() {
    var lastScroll = 0;
    window.onscroll = function() {
        let currentScroll = document.documentElement.scrollTop || document.body.scrollTop; // Get Current Scroll Value

        if (currentScroll > 0 && lastScroll <= currentScroll) {
            lastScroll = currentScroll;
            topLink.setAttribute('class', 'show');
            console.log(" toplink down");
        } else {
            lastScroll = currentScroll;
            topLink.setAttribute('class', 'hide');
            console.log(" toplink up");
        }
    };
}
scrollDetect();

/////////////////////////////////////
/////////////////////////////////////



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
        console.log(data);
        console.log(data.photographers);
        return data;
    });

// fonction asynchrone https://dmitripavlutin.com/javascript-fetch-async-await/
async function createPhotographerCard() {
    const response = await fetch("assets/data.json");
    const data = await response.json();
    return data;
}

// function remplissage de la page grâce aux données récupérées depuis data.json
createPhotographerCard()
    .then(data => {
        // variables de données

        for (let photographer of data.photographers) {
            console.log(photographer);

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
        }
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
}

// function remplissage de la page grâce aux données récupérées depuis data.json
tagFilter()
    .then(data => {
        console.log(data.media);
        let mediasToFilter = data.media;

        for (let media of mediasToFilter) {
            console.log(media);
            console.log(mediasToFilter);
        }
        let mediasFiltres;
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


// ressources qui m'ont été utiles
// https://www.youtube.com/watch?v=o6ULZoMrFGg
// API request
// https://www.youtube.com/watch?v=ZCrh59Bvbts
// https://stackoverflow.com/questions/51859358/how-to-read-json-file-with-fetch-in-javascript
// https://www.youtube.com/watch?v=b0dPBK37-M8&t=24s





/* 

   let photographerCity = photographer.city;
            let photographerCountry = photographer.country;
            let photographerId = photographer.id;
            let photographerName = photographer.name;
            let photographerPortrait = photographer.portrait;
            let photographerPrice = photographer.price;
            let photographerTagline = photographer.tagline;
            let photographerTags = photographer.tags;

            return {
                photographerCity,
                photographerCountry,
                photographerId,
                photographerName,
                photographerPortrait,
                photographerPrice,
                photographerTagline,
                photographerTags,
                createCard,
            }
            function createCard(photographer) {
                // creation des éléments HTML du DOM
                let photographerCard_ul = document.createElement("ul");
                let photographerCard_a = document.createElement("a");
                let photographerCard_li = document.createElement("li");
                let photographerCard_img = document.createElement("img");
                let photographerCard_h2 = document.createElement("h2");
                let photographerCard_p = document.createElement("p");

                photographerCard_ul.setAttribute("id", "selected-items");
                photographerCard_ul.appendChild(resultOfSearch);
                photographerCard_a.setAttribute("id", `${photographerId}`);
                photographerCard_a.setAttribute("class", "restrict");
                photographerCard_a.setAttribute("href", `/photographer.html?id=${photographerId}`);
                photographerCard_li.setAttribute("class", "photographers-items");
                photographerCard_img.setAttribute("class", "photographer-portrait");
                photographerCard_img.setAttribute("src", `images/Sample Photos/Photographers ID Photos/${(toPascalCase(photographerName) + '.jpg')}`);
                photographerCard_img.setAttribute("alt", `${photographerName}`);
                photographerCard_h2.setAttribute("class", "photographer-name");
                photographerCard_h2.textContent = `photographerName`;
                photographerCard_p.setAttribute("class", "photographer-city");
                photographerCard_p.textContent = photographerCity + ", " + photographerCountry;
                photographerCard_p.textContent = (photographerPortrait + ", " + photographerPrice + ", " + photographerTagline + ", " + photographerTags);
                return {
                    photographerCard_ul,
                    photographerCard_a,
                    photographerCard_li,
                    photographerCard_img,
                    photographerCard_h2,
                    photographerCard_p,
                }
            }

            */