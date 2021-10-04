// remplir dynamiquement ma page
let resultOfSearch = document.getElementById('resultOfSearch');

/////////////////////////////////////
//////////// scroll ////////////////
// https://www.w3schools.com/jsref/event_onscroll.asp
// https://stackoverflow.com/questions/31223341/detecting-scroll-direction

// quand on scrolle, le topLink apparaît
let topLink = document.querySelector("#topLink");

function scrollAppear() {
    var lastScroll = 0;
    window.onscroll = function() {
        let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

        if (currentScroll > 0 && lastScroll <= currentScroll) {
            lastScroll = currentScroll;
            topLink.setAttribute('class', 'show');
            //console.log("toplink down");
        } else {
            lastScroll = currentScroll;
            topLink.setAttribute('class', 'hide');
            //console.log("toplink up");
        }
    };
}
scrollAppear();

/////////////////////////////////////
/////////////////////////////////////


// connection au fichier json pour lire les données
fetch("assets/data.json")
    .then(response => {
        if (response.ok) {
            //console.log("ok");
            return response.json();
        } else {
            console.log("erreur avec Jason");
            resultOfSearch.innerHTML = ("erreur de chargement des données");
        }
    })
    .then((data) => {
        // console.log(data);
        // console.log(data.photographers);
        return data;
    });

// fonction asynchrone https://dmitripavlutin.com/javascript-fetch-async-await/
async function createPhotographerCard2() {
    const response = await fetch("assets/data.json");
    const data = await response.json();
    return data;
}
var createEachCard
class CardPhotographer {
    constructor(city, country, id, name, portrait, price, tagline, tags) {
        this.city = city;
        this.country = country;
        this.id = id;
        this.name = name;
        this.portrait = portrait;
        this.price = price;
        this.tagline = tagline;
        this.tags = tags;
    }

    get createTheCard() {
        return this.createCard()
    }
    createCard() {
        createEachCard = `<a href="/photographer.html?id=` + this.id + `" id="` + this.id + `" class="restrict" aria-label="` + this.name + `"> 
        <li class="photographers-items"> <section> <img class="photographer-portrait" alt="${this.name}" src="images/Sample Photos/Photographers ID Photos/${this.portrait}">
       </section> <section> <h2 class="photographer-name">${this.name}</h2> <p class="photographer-city">${this.city}, ${this.country}</p> <p class="tagline">${this.tagline}</p>
    <p class="photographerPrice">${this.price}€/jour</p> <div class="photographer_listOfTags">`;
        // boucle pour récupérer un à un les tags du photographe vu que le nombre de tags varie d'un photographe à l'autre
        this.tags.forEach((element) => {
            createEachCard +=
                `<h5 class="generatedTags" title="ce photographe est spécialisé dans les photos sur le thème ${element}" >#${element}</h5>`;
        });
        createEachCard += `</div> </section> </li> </a>`;
        return createEachCard
    }
}

// function remplissage de la page grâce aux données récupérées depuis data.json => POO
createPhotographerCard2()
    .then(data => {
        //console.log(data)
        console.log(data.photographers)
        let createAffichage = `<ul id="selected-items">`
        console.log(resultOfSearch) // 

        let newPhotographer
        for (let photographer of data.photographers) {
            newPhotographer = new CardPhotographer(photographer.city, photographer.country, photographer.id, photographer.name, photographer.portrait, photographer.price, photographer.tagline, photographer.tags).createTheCard
            createAffichage += newPhotographer
            console.log(photographer.city)
        }
        console.log(newPhotographer)
        createAffichage += '</ul>'
        resultOfSearch.innerHTML = createAffichage

        console.log(createAffichage) // là le code est ok
        console.log(resultOfSearch) // 
    })

let linkClicked
let tagsOnThisPage
async function filtreTag() {
    const response = await fetch("assets/data.json");
    const data = await response.json();
    return data;
}

////////////////////////////////////////////
////////////////////////////////////////////
let arrayOfResult = []

filtreTag()
    .then(data => {
        tagsOnThisPage = Array.from(document.getElementsByClassName('tag')) // tableau de tous les tags du bandeau
            // console.log(tagsOnThisPage) // tableau de tous les tags du bandeau
        const photographersRecup = data.photographers;

        tagsOnThisPage.forEach(link => {
            link.addEventListener('click', function filter(link) { // j'écoute chaque lien tag, et s'il est clické
                arrayOfResult.length = 0;
                console.log(arrayOfResult)
                linkClicked = link.target.innerHTML.substr(1).toLowerCase() // tag sur lequel on a clické sans le #
                console.log(linkClicked) // tag sur lequel on a clické sans le #

                // boucle pour chercher dans les tags des photogrpahes
                // les photographes dont le tag correspond au tag clické sont stockés dans un tableau
                for (let eachPhotographer of photographersRecup) {
                    //console.log(eachPhotographer)
                    for (let tag of eachPhotographer.tags) {
                        if (tag == linkClicked) {
                            console.log("j'ai trouvé " + linkClicked + " chez " + eachPhotographer.name)
                            arrayOfResult.push(eachPhotographer)
                            console.log(tag)
                        }
                    }
                }
                var select = resultOfSearch;
                let createAffichageFiltred = `<ul id="selected-items">`

                console.log(arrayOfResult)
                arrayOfResult.forEach(eachPhotographer => {
                    let newPhotographer = new CardPhotographer(eachPhotographer.city, eachPhotographer.country, eachPhotographer.id, eachPhotographer.name, eachPhotographer.portrait, eachPhotographer.price, eachPhotographer.tagline, eachPhotographer.tags).createTheCard
                    createAffichageFiltred += newPhotographer
                })
                createAffichageFiltred += '</ul>'
                select.innerHTML = createAffichageFiltred
            })
        })
    });


/////////////////////////////////////
/////////////////////////////////////
// ressources qui m'ont été utiles
/////////////////////////////////////
/////////////////////////////////////

// create url //
// https://www.youtube.com/watch?v=6BozpmSjk-Y

// https://www.youtube.com/watch?v=o6ULZoMrFGg
// API request
// https://www.youtube.com/watch?v=ZCrh59Bvbts
// https://stackoverflow.com/questions/51859358/how-to-read-json-file-with-fetch-in-javascript
// https://www.youtube.com/watch?v=b0dPBK37-M8&t=24s

// fonction asynchrone https://dmitripavlutin.com/javascript-fetch-async-await/

////////////////////////////////////////////
// https://stackoverflow.com/questions/4068573/convert-string-to-pascal-case-aka-uppercamelcase-in-javascript
/*function toPascalCase(string) {
    return `${string}`
        .replace(new RegExp(/[-_]+/, 'g'), ' ')
        .replace(new RegExp(/[^\w\s]/, 'g'), '')
        .replace(
            new RegExp(/\s+(.)(\w+)/, 'g'),
            ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
        )
        .replace(new RegExp(/\s/, 'g'), '')
        .replace(new RegExp(/\w/), s => s.toUpperCase());
}*/