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

// fonction asynchrone https://dmitripavlutin.com/javascript-fetch-async-await/
async function createPhotographerCard2() {
    const response = await fetch("assets/data.json");
    const data = await response.json();
    return data;
}

// function remplissage de la page grâce aux données récupérées depuis data.json POO
createPhotographerCard2()
    .then(data => {
        console.log(data)
        console.log(data.photographers)
        console.log(data.photographers[0].city)

        let photographerCard_ul = document.createElement("ul");
        resultOfSearch.appendChild(photographerCard_ul)

        for (let photographer of data.photographers) {
            console.log(photographer);

            // variables de données
            let photographer_city = photographer.city;
            let photographer_country = photographer.country;
            let photographer_id = photographer.id;
            let photographer_name = photographer.name;
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
            let photographer_tagsA

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
            photographerCard_price.setAttribute("class", "photographerPrice");
            photographerCard_price.textContent = photographer_price + "€/jour";
            photographerCard_price.setAttribute("class", "photographerPrice");
            photographer_tagsList.setAttribute("class", "photographer_listOfTags");

            console.log(photographer_tags);

            for (let i = 0; i < photographer_tags.length; i++) {
                photographer_tagsA = document.createElement("a");
                photographer_tagsA.setAttribute("class", "lienTag");
                photographer_tagsA.setAttribute("href", `#${photographer_tags[i]}`);
                let eachTag = document.createElement("h5");
                eachTag.setAttribute("class", "generatedTags")
                eachTag.textContent = `#${photographer_tags[i]}`;
                photographer_tagsA.appendChild(eachTag);
                photographer_tagsList.appendChild(photographer_tagsA);
            }

            photographerCard_ul.appendChild(photographerCard_a)
            photographerCard_a.appendChild(photographerCard_li)
            photographerCard_li.appendChild(photographerCard_img)
            photographerCard_li.appendChild(photographerCard_h2)
            photographerCard_li.appendChild(photographerCard_location)
            photographerCard_li.appendChild(photographerCard_tagline)
            photographerCard_li.appendChild(photographerCard_price)
            photographerCard_li.appendChild(photographer_tagsList)
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

let linkClicked
let tagsOnThisPage
async function filtreTag() {
    const response = await fetch("assets/data.json");
    const data = await response.json();
    return data;
}

filtreTag()
    .then(data => {
        tagsOnThisPage = Array.from(document.querySelectorAll(".tag")) // tableau de tous les tags du bandeau
        console.log(tagsOnThisPage) // tableau de tous les tags du bandeau

        var photographersRecup = data.photographers;

        let photographerCard_ul = document.createElement("ul");
        photographerCard_ul.setAttribute("id", "selected-items");

        tagsOnThisPage.forEach(link => {
            link.addEventListener('click', function filter(link) { // j'écoute chaque lien, et s'il est clické
                createPhotographerCard2()
                linkClicked = link.target.innerHTML.substr(1).toLowerCase() // tag sur lequel on a clické sans le #
                console.log(linkClicked)


                for (let eachPhotographer of photographersRecup) { // pour chaque photographe de la bdd
                    for (let tag of eachPhotographer.tags) { // pour chaque tag de chaque photographe
                        // console.log(tag)


                        if (tag == linkClicked) { // si le tag du photographe correspond au tag clické
                            console.log("j'ai trouvé " + linkClicked + " chez " + eachPhotographer.name)
                            console.log(eachPhotographer)


                            // creation des éléments HTML du DOM
                            let photographerCard_a = document.createElement("a");
                            let photographerCard_li = document.createElement("li");
                            let photographerCard_img = document.createElement("img");
                            let photographerCard_h2 = document.createElement("h2");
                            let photographerCard_location = document.createElement("p");
                            let photographerCard_tagline = document.createElement("p");
                            let photographerCard_price = document.createElement("p");
                            let photographer_tagsList = document.createElement("p")
                            let photographer_tagsA

                            // variables de données
                            let photographer_city = eachPhotographer.city;
                            let photographer_country = eachPhotographer.country;
                            let photographer_id = eachPhotographer.id;
                            let photographer_name = eachPhotographer.name;
                            let photographer_price = eachPhotographer.price;
                            let photographer_tagline = eachPhotographer.tagline;
                            let photographer_tags = eachPhotographer.tags;

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
                            photographerCard_price.setAttribute("class", "photographerPrice");
                            photographerCard_price.textContent = photographer_price + "€/jour";
                            photographerCard_price.setAttribute("class", "photographerPrice");
                            photographer_tagsList.setAttribute("class", "photographer_listOfTags");

                            for (let i = 0; i < photographer_tags.length; i++) {
                                photographer_tagsA = document.createElement("a");
                                photographer_tagsA.setAttribute("class", "lienTag");
                                photographer_tagsA.setAttribute("href", `#${photographer_tags[i]}`);
                                let eachTag = document.createElement("h5");
                                eachTag.setAttribute("class", "generatedTags")
                                eachTag.textContent = `#${photographer_tags[i]}`;
                                photographer_tagsA.appendChild(eachTag);
                                photographer_tagsList.appendChild(photographer_tagsA);
                            }

                            photographerCard_ul.appendChild(photographerCard_a)
                            photographerCard_a.appendChild(photographerCard_li)
                            photographerCard_li.appendChild(photographerCard_img)
                            photographerCard_li.appendChild(photographerCard_h2)
                            photographerCard_li.appendChild(photographerCard_location)
                            photographerCard_li.appendChild(photographerCard_tagline)
                            photographerCard_li.appendChild(photographerCard_price)
                            photographerCard_li.appendChild(photographer_tagsList)

                        }
                    }
                }
                console.log(photographerCard_ul)

                let ulToReplace = document.getElementById("selected-items")
                console.log(resultOfSearch)
                console.log(ulToReplace)
                resultOfSearch.replaceChild(photographerCard_ul, ulToReplace)
                console.log(resultOfSearch)

            });
        });
    })









// create url //
// https://www.youtube.com/watch?v=6BozpmSjk-Y


// ressources qui m'ont été utiles
// https://www.youtube.com/watch?v=o6ULZoMrFGg
// API request
// https://www.youtube.com/watch?v=ZCrh59Bvbts
// https://stackoverflow.com/questions/51859358/how-to-read-json-file-with-fetch-in-javascript
// https://www.youtube.com/watch?v=b0dPBK37-M8&t=24s

// fonction asynchrone https://dmitripavlutin.com/javascript-fetch-async-await/