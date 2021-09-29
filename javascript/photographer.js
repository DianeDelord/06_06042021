const queryString = window.location.search; //récupérer la fin de l'url générée
//console.log(queryString);
//console.log(window.location.toString()); //url de la page générée

const urlParams = new URLSearchParams(queryString);
const photographerPage = urlParams.get("id"); //récupérer l'id du photographer qui a été sélectionné
//console.log(photographerPage);

// variables
let remplissage = document.getElementById("informations");
let remplissage2 = document.getElementById("mediasDuPhotographe");

// personnalisation du titre du formulaire de contact
let contact = document.getElementById("contact");

fetch("assets/data.json")
    .then(response => {
        if (response.ok) {
            //    console.log("ok");
            return response.json();
        } else {
            //    console.log("erreur avec Jason");
            remplissage.innerHTML = ("erreur de chargement des données")
        }
    })

///// génère la "carte" de présentation du photographe 
.then(data => {
    // console.log(data, data.photographers);
    const resultPh = data.photographers.filter(photographer => photographer.id == photographerPage);
    console.log(resultPh); // infos du photographe
    console.log(photographerPage); // id du photographe choisi
    //  console.log(data.media); // tous les medias
    // console.log(data.photographers); // tous les photographes
    //  console.log(resultPh[0].name); // nom du photographe choisi

    contact.innerText = ("Contactez-moi \n" + (resultPh[0].name));
    console.log(data)
    console.log(data.photographers)
    console.log(data.photographers[0].tags)

    // variables de données
    let photographer_city = resultPh[0].city;
    let photographer_country = resultPh[0].country;
    let photographer_id = resultPh[0].id;
    let photographer_name = resultPh[0].name;
    console.log(photographer_name)

    let photographer_tagline = resultPh[0].tagline;
    let photographer_tags = resultPh[0].tags;

    // creation des éléments HTML du DOM
    let photographerCard_divPhoto = document.createElement("div");
    let photographerCard_div2 = document.createElement("div");
    let photographerCard_photographerInfos = document.createElement("div");
    let photographerCard_h1 = document.createElement("h1");
    let photographerCard_img = document.createElement("img");
    let photographerCard_location = document.createElement("p");
    let photographerCard_tagline = document.createElement("p");
    let photographer_tagsList = document.createElement("p")
    let photographer_tagsA;
    let button_contact;
    let button_contact_div = document.createElement("div");
    button_contact = document.createElement("button")

    photographerCard_divPhoto.setAttribute("id", "photo_identity");
    photographerCard_photographerInfos.setAttribute("id", "photographer_infos");
    photographerCard_div2.setAttribute("id", `${photographer_id}`);
    photographerCard_div2.setAttribute("class", "redirect");
    photographerCard_h1.setAttribute("class", "photographerPersonal_card-name");
    photographerCard_h1.textContent = photographer_name;

    photographerCard_img.setAttribute("class", "photographer-portrait");
    photographerCard_img.setAttribute("src", `images/Sample Photos/Photographers ID Photos/${(toPascalCase(photographer_name) + '.jpg')}`);
    photographerCard_img.setAttribute("alt", `${photographer_name}`);
    photographerCard_location.setAttribute("class", "photographer-city");
    photographerCard_location.textContent = photographer_city + ", " + photographer_country;
    photographerCard_tagline.setAttribute("class", "photographerPersonal_card-tagline");
    photographerCard_tagline.textContent = photographer_tagline;
    photographer_tagsList.setAttribute("class", "photographer_listOfTags");

    button_contact_div.setAttribute("class", "div_contact_button");
    button_contact.setAttribute("id", "contactButton");
    button_contact.setAttribute("class", "btn-signup modal-btn");
    button_contact.textContent = "Contactez-moi";

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
    remplissage.appendChild(photographerCard_div2)
    photographerCard_div2.appendChild(photographerCard_photographerInfos)
    photographerCard_photographerInfos.appendChild(photographerCard_h1)
    photographerCard_photographerInfos.appendChild(photographerCard_location)
    photographerCard_photographerInfos.appendChild(photographerCard_tagline)
    photographerCard_photographerInfos.appendChild(photographer_tagsList)
    photographerCard_div2.appendChild(photographerCard_photographerInfos)

    photographerCard_div2.appendChild(button_contact_div)
    button_contact_div.appendChild(button_contact)

    photographerCard_div2.appendChild(photographerCard_divPhoto)
    photographerCard_divPhoto.appendChild(photographerCard_img)

    //remplissage.innerHTML = affichageResult;
})


//////////// affichage des médias du photographe /////////////
let tri
let prenom
async function printMedias() {
    const response = await fetch("assets/data.json");
    const data = await response.json();
    const resultPh = data.photographers.filter(photographer => photographer.id == photographerPage);

    var mediasRecup = data.media;
    tri = mediasRecup.filter(function(media) {
        return media.photographerId == resultPh[0].id;
    });
    console.log(tri); //médias du photographe choisi

    // passer les medias du photographe choisi pour la lightbox
    window.onload = function() {
        localStorage.setItem("mediasPhotographerSelected", tri)
        console.log(tri);
    }

    prenom = resultPh[0].name;
    var lastIndex = prenom.lastIndexOf(" ");
    prenom = prenom.substring(0, lastIndex).replace('-', ' ');
    //  console.log(prenom);
    let photographerCard_ul = document.createElement("ul");
    photographerCard_ul.setAttribute("class", "portfolioMedias");
    remplissage2.appendChild(photographerCard_ul)

    for (let title of tri) {
        if (title.image == undefined) {
            let photographerCard_li = document.createElement("li");
            photographerCard_li.setAttribute("class", "listOfMedias");
            let photographerCard_a = document.createElement("a");
            photographerCard_a.setAttribute("class", "restricted");
            photographerCard_a.setAttribute("href", `images/Sample Photos/${prenom}/${title.video}`);
            let photographerCard_div = document.createElement("div");
            photographerCard_div.setAttribute("class", "video_container");
            let photographerCard_video = document.createElement("video");
            photographerCard_video.setAttribute("width", "320");
            photographerCard_video.setAttribute("height", "240");
            photographerCard_video.setAttribute("controls", "");
            photographerCard_video.setAttribute("class", "photographer-video");
            let photographerCard_source = document.createElement("source");
            photographerCard_source.setAttribute("src", `images/Sample Photos/${prenom}/${title.video}`);
            photographerCard_source.setAttribute("type", "video/mp4");

            photographerCard_ul.appendChild(photographerCard_li)
            photographerCard_li.appendChild(photographerCard_a)
            photographerCard_li.appendChild(photographerCard_div)
            photographerCard_div.appendChild(photographerCard_video)
            photographerCard_video.appendChild(photographerCard_source)

            let photographerCard_div2 = document.createElement("div");
            photographerCard_div2.setAttribute("class", "label-media");

            // photographerCard_li.appendChild(photographerCard_div)
            //photographerCard_div.appendChild(photographerCard_video)
            // photographerCard_video.appendChild(photographerCard_source)
            let photographerCard_p = document.createElement("p");
            photographerCard_p.setAttribute("class", "photograph-title");
            photographerCard_p.textContent = `${title.title}`
            let photographerCard_p2 = document.createElement("p");
            photographerCard_p2.setAttribute("class", "photograph-numberOfLikes");
            photographerCard_p2.textContent = `${title.likes}` + " "
            let photographerCard_i = document.createElement("i");
            photographerCard_i.setAttribute("class", "far fa-heart");
            photographerCard_i.setAttribute("alt", "likes");
            photographerCard_div.appendChild(photographerCard_video)
            photographerCard_li.appendChild(photographerCard_div2)
            photographerCard_div2.appendChild(photographerCard_p)
            photographerCard_div2.appendChild(photographerCard_p2)
            photographerCard_p2.appendChild(photographerCard_i)
        } else {
            let photographerCard_li = document.createElement("li");
            photographerCard_li.setAttribute("class", "listOfMedias");
            let photographerCard_a = document.createElement("a");
            photographerCard_a.setAttribute("class", "restricted");
            photographerCard_a.setAttribute("href", `images/Sample Photos/${prenom}/${title.image}`);
            let photographerCard_img = document.createElement("img");
            photographerCard_img.setAttribute("class", "photographer-selection");
            photographerCard_img.setAttribute("src", `images/Sample Photos/${prenom}/${title.image}`);

            photographerCard_ul.appendChild(photographerCard_li)
            photographerCard_li.appendChild(photographerCard_a)
            photographerCard_a.appendChild(photographerCard_img)

            let photographerCard_div = document.createElement("div");
            photographerCard_div.setAttribute("class", "label-media");
            photographerCard_li.appendChild(photographerCard_div)
            let photographerCard_p = document.createElement("p");
            photographerCard_p.setAttribute("class", "photograph-title");
            photographerCard_p.textContent = `${title.title}`
            let photographerCard_p2 = document.createElement("p");
            photographerCard_p2.setAttribute("class", "photograph-numberOfLikes");
            photographerCard_p2.textContent = `${title.likes}` + " "
            let photographerCard_i = document.createElement("i");
            photographerCard_i.setAttribute("class", "far fa-heart");
            photographerCard_i.setAttribute("alt", "likes");

            photographerCard_div.appendChild(photographerCard_p)
            photographerCard_div.appendChild(photographerCard_p2)
            photographerCard_p2.appendChild(photographerCard_i)
        }
    }
}
printMedias()

async function ongletRemplissage() {
    const response = await fetch('assets/data.json');
    const data = await response.json();
    return data;
}

let ongletLikesTarif = document.getElementById("ongletLikesTarif");

//  remplissage de l'onglet et gestion des likes : sur les médias et sur le total sur l'onglet
ongletRemplissage()
    .then(data => {
        console.log("onglet remplissage");
        let compteurDeLikes = 0;
        let onglet_likes = document.createElement("p");
        let likes_onglet = document.createElement("i")
        let onglet_price = document.createElement("p");
        console.log(onglet_price);
        let mediaLikes

        //boucle pour ajouter les likes de chaque média au compteur total de likes obtenus par le photographe
        for (let media of data.media) {
            mediaLikes = media.likes
            if (media.photographerId == photographerPage) {
                compteurDeLikes += mediaLikes;
            }
        }

        ////////////// likes du media /////
        let heart_likes = Array.from(document.querySelectorAll(".label-media"))
        heart_likes.forEach(element => {
                element.addEventListener('click', event => {
                    console.log(heart_likes, event)
                    console.log("coeur clické")
                    let heart = element.querySelector(".fa-heart")
                    let numberOfLikesOfTheMedia = parseInt(element.querySelector(".photograph-numberOfLikes").innerText)
                    console.log(numberOfLikesOfTheMedia)

                    // si le coeur est "vide" c'est qu'il n'a pas été clické / liké 
                    // au click = coeur liké => le coeur passe "plein"
                    if (heart.classList.contains("far")) {
                        heart.classList.replace("far", "fas");
                        compteurDeLikes += 1 // ajout +1 au total des likes du photographe dans l'onglet
                        numberOfLikesOfTheMedia += 1 // ajout +1 au total des likes de ce média
                        element.querySelector(".photograph-numberOfLikes").innerHTML = numberOfLikesOfTheMedia + " " + `<i class="fas fa-heart" alt="likes"></i>`
                        console.log(numberOfLikesOfTheMedia)
                        console.log("coeur liké")
                        console.log(compteurDeLikes)
                        onglet_likes.innerHTML = compteurDeLikes + `&#8239; ` + `<i class="fas fa-heart onglet_likesColor" alt="likes" aria-hidden="true"></i>`

                        // si le coeur est "plein" c'est qu'il a déjà été clické / liké 
                        // au click = coeur unliké => le coeur repasse à "vide"
                    } else if (heart.classList.contains("fas")) {
                        heart.classList.replace("fas", "far");
                        console.log("coeur unliké")
                        compteurDeLikes -= 1
                        numberOfLikesOfTheMedia -= 1
                        console.log(numberOfLikesOfTheMedia)
                        element.querySelector(".photograph-numberOfLikes").innerHTML = numberOfLikesOfTheMedia + " " + `<i class="far fa-heart" alt="likes"></i>`
                        onglet_likes.innerHTML = compteurDeLikes + `&#8239; ` + `<i class="fas fa-heart onglet_likesColor" alt="likes" aria-hidden="true"></i>`
                    }
                })
            })
            //////////////////////////////////////

        console.log("le total de likes est : " + compteurDeLikes);
        onglet_likes.setAttribute("class", "numberOfLikes")
        onglet_likes.innerHTML = compteurDeLikes + `&#8239; ` + `<i class="fas fa-heart onglet_likesColor" alt="likes" aria-hidden="true"></i>`
        console.log(onglet_likes);
        console.log(likes_onglet);
        onglet_price.setAttribute("class", "onglet_price")

        for (let photographer of data.photographers) {
            //  console.log(photographer.id);
            if (photographer.id == photographerPage) {
                //   console.log(photographer.price); // tarif journalier du photographe de la page
                onglet_price.textContent = `${photographer.price} €/jour`
            }
        }
        console.log(onglet_price);
        ongletLikesTarif.appendChild(onglet_likes)
        ongletLikesTarif.appendChild(onglet_price)
    })

setTimeout(function() {
    ongletRemplissage()
}, 2000);


////////////////////////////////////////////
// https://stackoverflow.com/questions/4068573/convert-string-to-pascal-case-aka-uppercamelcase-in-javascript
// fonction qui passe une string en PascalCase (pour le titre des photos par exemple)
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

////////// sur la page du photographe, tri dans ses médias au click sur un des tags de sa page
let linkClicked
setTimeout(function filtreTag() {
    let tagsOnThisPage = Array.from(document.querySelectorAll(".lienTag"))
    console.log(tagsOnThisPage)

    tagsOnThisPage.forEach(link => {
        link.addEventListener('click', function filter(link) {
            linkClicked = link.target.innerHTML.substr(1) // ouiiiiiiiii
            console.log(linkClicked) // lien qui a été clické

            let affichage3 = '<ul class="portfolioMedias">';

            for (let tag of tri) {
                //console.log(tag.tags)
                if (tag.tags == linkClicked) {
                    //console.log("j'en ai un " + tag.title)

                    if (tag.image == undefined) {
                        affichage3 += `
                             <li class="listOfMedias">
                             <a class="restricted" href="images/Sample Photos/${prenom}/${tag.video}"> <div class="video_container">
                             <video width="320" height="240"  controls="" class="photographer-video"> <source src="images/Sample Photos/${prenom}/${tag.video}" type="video/mp4"></video></a></div>`;

                    } else {
                        //  console.log(title.image);
                        affichage3 += `
                             <li class="listOfMedias">
                             <a class="restricted" href="images/Sample Photos/${prenom}/${tag.image}">
                             <img class="photographer-selection" src="images/Sample Photos/${prenom}/${tag.image}"/></a>`;
                    }
                    affichage3 += `<div class="label-media">
                    <p class="photograph-title">${tag.title}</p>
                    <p class="photograph-numberOfLikes">${tag.likes}
                    <i class="far fa-heart" alt="likes"></i></p>
                    </div>
                    </li> `;
                }
            }
            affichage3 += '</ul></div>';
            remplissage2.innerHTML = affichage3;
            return linkClicked
        })
    });
    // console.log(tri); //médias du photographe choisi
}, 2000);

////////////////////////////////////////////
// menu déroulant
////////////////////////////////////////////
// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
// tri dans les médias du photographe depuis les données json

function triPopulariteCroissante() { // fonction déclenchée au clic (fonction dans le html)
    console.log("triPopulariteCroissantee")

    let affichage3 = '<ul class="portfolioMedias">';
    let mediasPlusPopulaires = tri.sort(function(a, b) { if (b.likes < a.likes) { return -1; } else { return 1 } })

    for (let media of mediasPlusPopulaires) {
        //  console.log(media)
        if (media.image == undefined) {
            affichage3 += `<li class="listOfMedias"><a href="images/Sample Photos/${prenom}/${media.video}" class="restricted">
                 <div class="video_container">
                 <video width="320" height="240" controls="" class="photographer-video"> <source src="images/Sample Photos/${prenom}/${media.video}" type="video/mp4"></video></div></a>`;

        } else {
            //  console.log(media.image);
            affichage3 += `<li class="listOfMedias"><a href="images/Sample Photos/${prenom}/${media.image}" class="restricted">
                 
                 <img class="photographer-selection" src="images/Sample Photos/${prenom}/${media.image}"/></a>`;
        }
        affichage3 += `<div class="label-media">
        <p class="photograph-title">${media.title}</p>
        <p class="photograph-numberOfLikes">${media.likes}
        <i class="far fa-heart" alt="likes"></i></p>
        </div>
        </li> `;
    }
    affichage3 += '</ul></div>';
    remplissage2.innerHTML = affichage3;
}


function triDateRecenteEnPremier() { // fonction déclenchée au clic (fonction dans le html)
    console.log("triDateRecenteEnPremier")

    let affichage3 = '<ul class="portfolioMedias">';
    let mediasPlusRecent = tri.sort(function(a, b) { if (a.date < b.date) { return -1; } else { return 1 } })

    for (let media of mediasPlusRecent) {
        //  console.log(media)
        if (media.image == undefined) {
            affichage3 += `<li class="listOfMedias"><a href="images/Sample Photos/${prenom}/${media.video}" class="restricted">
                 <div class="video_container">
                 <video width="320" height="240" controls="" class="photographer-video"> <source src="images/Sample Photos/${prenom}/${media.video}" type="video/mp4"></video></div></a>`;

        } else {
            //  console.log(media.image);
            affichage3 += `<li class="listOfMedias"><a href="images/Sample Photos/${prenom}/${media.image}" class="restricted">
                 
                 <img class="photographer-selection" src="images/Sample Photos/${prenom}/${media.image}"/></a>`;
        }
        affichage3 += `<div class="label-media">
        <p class="photograph-title">${media.title}</p>
        <p class="photograph-numberOfLikes">${media.likes}
        <i class="far fa-heart" alt="likes"></i></p>
        </div>
        </li> `;
    }
    affichage3 += '</ul></div>';
    remplissage2.innerHTML = affichage3;
}


function triOrdreAlphabétique() { // fonction déclenchée au clic (fonction dans le html)
    console.log("triOrdreAlphabétique")

    let affichage3 = '<ul class="portfolioMedias">';
    let mediasEnOrdreAlphabetique = tri.sort(function(a, b) { if (a.title < b.title) { return -1; } else { return 1 } })
    console.log(mediasEnOrdreAlphabetique);

    for (let media of mediasEnOrdreAlphabetique) {
        //  console.log(media)
        if (media.image == undefined) {
            affichage3 += `<li class="listOfMedias"><a href="images/Sample Photos/${prenom}/${media.video}" class="restricted">
                 <div class="video_container">
                 <video width="320" height="240" controls="" class="photographer-video"> <source src="images/Sample Photos/${prenom}/${media.video}" type="video/mp4"></video></div></a>`;

        } else {
            //  console.log(media.image);
            affichage3 += `<li class="listOfMedias"><a href="images/Sample Photos/${prenom}/${media.image}" class="restricted">
                 
                 <img class="photographer-selection" src="images/Sample Photos/${prenom}/${media.image}"/></a>`;
        }
        affichage3 += `<div class="label-media">
        <p class="photograph-title">${media.title}</p>
        <p class="photograph-numberOfLikes">${media.likes}
        <i class="far fa-heart" alt="likes"></i></p>
        </div>
        </li> `;
    }
    affichage3 += '</ul></div>';
    remplissage2.innerHTML = affichage3;
}


//////////
////// accessibilité
//// https://www.youtube.com/watch?v=UeQ5T8NbE7A