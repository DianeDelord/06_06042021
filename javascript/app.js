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
        let currentScroll = document.documentElement.scrollTop || document.body.scrollTop; // Get Current Scroll Value

        if (currentScroll > 0 && lastScroll <= currentScroll) {
            lastScroll = currentScroll;
            topLink.setAttribute('class', 'show');
            console.log("toplink down");
        } else {
            lastScroll = currentScroll;
            topLink.setAttribute('class', 'hide');
            console.log("toplink up");
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
/*
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

*/


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


// create url //
// https://www.youtube.com/watch?v=6BozpmSjk-Y


// ressources qui m'ont été utiles
// https://www.youtube.com/watch?v=o6ULZoMrFGg
// API request
// https://www.youtube.com/watch?v=ZCrh59Bvbts
// https://stackoverflow.com/questions/51859358/how-to-read-json-file-with-fetch-in-javascript
// https://www.youtube.com/watch?v=b0dPBK37-M8&t=24s


// fonction asynchrone https://dmitripavlutin.com/javascript-fetch-async-await/
async function createPhotographerCard2() {
    const response = await fetch("assets/data.json");
    const data = await response.json();
    return data;
}

// function remplissage de la page grâce aux données récupérées depuis data.json
createPhotographerCard2()
    .then(data => {
        console.log(data)
        console.log(data.photographers)
        console.log(data.photographers[0].city)

        let resultOfSearch = document.getElementById("resultOfSearch");
        let photographerCard_ul = document.createElement("ul");
        resultOfSearch.appendChild(photographerCard_ul)

        for (let photographer of data.photographers) {
            console.log(photographer);

            // variables de données
            let photographer_city = photographer.city;
            let photographer_country = photographer.country;
            let photographer_id = photographer.id;
            let photographer_name = photographer.name;
            let photographer_portrait = photographer.portrait;
            let photographer_price = photographer.price;
            let photographer_tagline = photographer.tagline;
            let photographer_tags = photographer.tags;

            // creation des éléments HTML du DOM
            let photographerCard_a = document.createElement("a");
            let photographerCard_li = document.createElement("li");
            let photographerCard_img = document.createElement("img");
            let photographerCard_h2 = document.createElement("h2");
            let photographerCard_location = document.createElement("p");
            let photographerCard_tagline = document.createElement("p");
            let photographerCard_price = document.createElement("p");
            let photographer_tagsList = document.createElement("p")

            photographerCard_ul.setAttribute("id", "selected-items");
            photographerCard_a.setAttribute("id", `${photographer_id}`);
            photographerCard_a.setAttribute("class", "restrict");
            photographerCard_a.setAttribute("href", `/photographer.html?id=${photographer_id}`);
            photographerCard_li.setAttribute("class", "photographers-items");
            photographerCard_img.setAttribute("class", "photographer-portrait");
            photographerCard_img.setAttribute("src", `images/Sample Photos/Photographers ID Photos/${(toPascalCase(photographer_name) + '.jpg')}`);
            photographerCard_img.setAttribute("alt", `${photographer_name}`);
            photographerCard_h2.setAttribute("class", "photographer-name");
            photographerCard_h2.textContent = photographer_name;
            photographerCard_location.setAttribute("class", "photographer-city");
            photographerCard_location.textContent = photographer_city + ", " + photographer_country;
            photographerCard_tagline.setAttribute("class", "tagline");
            photographerCard_tagline.textContent = photographer_tagline;
            photographerCard_price.setAttribute("class", "photogrpaherPrice");
            photographerCard_price.textContent = photographer_price + "€/jour";
            photographerCard_price.setAttribute("class", "photographerPrice");
            photographer_tagsList.setAttribute("class", "photographer_listOfTags");


            console.log(photographerCard_ul);
            console.log(photographer_portrait);
            console.log(photographer_tags);

            let photographer_tagsA

            for (let i = 0; i < photographer_tags.length; i++) {
                photographer_tagsA = document.createElement("a");
                photographer_tagsA.setAttribute("class", "lienTag");
                let eachTag = document.createElement("h5");
                eachTag.setAttribute("class", "generatedTags")
                eachTag.textContent = `#${photographer_tags[i]}`;
                photographer_tagsA.appendChild(eachTag);
                photographer_tagsList.appendChild(photographer_tagsA);

                console.log(photographer_tagsA);
                console.log(i);
                console.log(eachTag);
            }

            photographerCard_ul.appendChild(photographerCard_a)
            photographerCard_a.appendChild(photographerCard_li)
            photographerCard_li.appendChild(photographerCard_img)
            photographerCard_li.appendChild(photographerCard_h2)
            photographerCard_li.appendChild(photographerCard_location)
            photographerCard_li.appendChild(photographerCard_tagline)
            photographerCard_li.appendChild(photographerCard_price)
            photographerCard_li.appendChild(photographer_tagsList)
                // photographer_tagsList.appendChild(photographer_tagsA)
        }
        //initialiseDOM()


        /*
                    function card
                    // tags du photographe
                    const createHashtag = document.createElement("section");
                        createHashtag.setAttribute("class", "tagline")
                        for (let i = 0; i < photographer.length; i++) {
                            const photographerTags = photographer["photographers"][i]["tags"];
            
                            for (let t = 0; t < photographerTags.length; t++) {
            
                                const tagLink = document.createElement("a");
                                const span = document.createElement("h4");
                                span.textContent = `#${photographer.tagline[t].toLowerCase()}`;
                                document.createElement("article").classList.add(`${photographer.tagline[t].toLowerCase()}`);
                                document.createElement("section").appendChild(tagLink);
                                tagLink.appendChild(span);
                                console.log("photographecoucou");
            
                            }
            
                        }*/
    })