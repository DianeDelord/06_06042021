const queryString = window.location.search; //récupérer la fin de l'url générée
//console.log(queryString);
//console.log(window.location.toString()); //url de la page générée

const urlParams = new URLSearchParams(queryString);
const photographerPage = urlParams.get("id"); //récupérer l'id du photographer qui a été sélectionné
//console.log(photographerPage);

// variables
let remplissage = document.getElementById("informations"); // pour la carte de présentation du photographe
let remplissage2 = document.getElementById("mediasDuPhotographe"); // pour l'affichage des médias du photographe

// personnalisation du titre du formulaire de contact
let contact = document.getElementById("contact");


// factory pattern - constructors pour l'affichage des médias
let createEachMediaVideo
let createEachMediaImage
class createMediasVideoCard {
    constructor(date, id, likes, photographerId, price, tags, title, video) {
        this.date = date;
        this.id = id;
        this.likes = likes;
        this.photographerId = photographerId;
        this.price = price;
        this.tags = tags;
        this.title = title;
        this.video = video;
    }
    get createTheMediasVideoCard() {
        return this.createMediasVideo()
    }
    createMediasVideo() {
        createEachMediaVideo = `<li class="listOfMedias ${this.tags}">
        <a class="restricted" href="images/Sample Photos/${prenom}/${this.video}"><div class="video_container">
        <video width="320" height="240" controls="" class="photographer-video" aria-label="${this.title}">
        <source src="images/Sample Photos/${prenom}/${this.video}" type="video/mp4">
        </video></div></a><div class="label-media"><p class="photograph-title">${this.title}</p>
        <p class="photograph-numberOfLikes">${this.likes} <i class="far fa-heart" alt="likes" aria-hidden="true"></i></p></div></li>`;
        return createEachMediaVideo
    }
}

class createMediasImageCard {
    constructor(date, id, image, likes, photographerId, price, tags, title) {
        this.date = date;
        this.id = id;
        this.image = image;
        this.likes = likes;
        this.photographerId = photographerId;
        this.price = price;
        this.tags = tags;
        this.title = title;
    }
    get createTheMediaImageCard() {
        return this.createMediaImage()
    }
    createMediaImage() {
        createEachMediaImage = `<li class="listOfMedias ${this.tags}">
        <a class="restricted" href="images/Sample Photos/${prenom}/${this.image}">
        <img class="photographer-selection" src="images/Sample Photos/${prenom}/${this.image}" aria-label="${this.title}">
        </a>
        <div class="label-media"><p class="photograph-title">${this.title}</p>
        <p class="photograph-numberOfLikes">${this.likes} <i class="far fa-heart" alt="likes" aria-hidden="true"></i></p></div></li>`;
        return createEachMediaImage
    }
}

// fetch pour récupérer les datas sur le json
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
    contact.innerText = ("Contactez-moi \n" + (resultPh[0].name));

    // variables de données
    let photographer_city = resultPh[0].city;
    let photographer_country = resultPh[0].country;
    let photographer_id = resultPh[0].id;
    let photographer_name = resultPh[0].name;
    let photographer_portrait = resultPh[0].portrait;
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
    photographerCard_img.setAttribute("src", `images/Sample Photos/Photographers ID Photos/${photographer_portrait}`);
    photographerCard_img.setAttribute("alt", `${photographer_name}`);
    photographerCard_location.setAttribute("class", "photographer-city");
    photographerCard_location.textContent = photographer_city + ", " + photographer_country;
    photographerCard_tagline.setAttribute("class", "photographerPersonal_card-tagline");
    photographerCard_tagline.textContent = photographer_tagline;
    photographer_tagsList.setAttribute("class", "photographer_listOfTags");

    button_contact_div.setAttribute("class", "div_contact_button");
    button_contact.setAttribute("id", "contactButton");
    button_contact.setAttribute("class", "btn-signup modal-btn");
    button_contact.setAttribute("type", "button");
    button_contact.setAttribute("aria-controls", "dialog");
    button_contact.setAttribute("aria-haspopup", "dialog");
    button_contact.textContent = "Contactez-moi";

    for (let i = 0; i < photographer_tags.length; i++) {
        photographer_tagsA = document.createElement("a");
        photographer_tagsA.setAttribute("class", "lienTag");
        photographer_tagsA.setAttribute("href", `#${photographer_tags[i]}`);
        //photographer_tagsA.setAttribute("onclick", `filterByTag(${photographer_tags[i]}")`);
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
    }

    prenom = resultPh[0].name;
    var lastIndex = prenom.lastIndexOf(" ");
    prenom = prenom.substring(0, lastIndex).replace('-', ' ');
    //  console.log(prenom);
    createMedias()
}
printMedias()

//////////// affichage des médias du photographe /////////////
function createMedias() {
    let photographerCard_ul = `<ul class="portfolioMedias">`;
    let newMediasPrinted

    for (let title of tri) {
        if (title.image == undefined) {
            newMediasPrinted = new createMediasVideoCard(title.date, title.id, title.likes, title.photographerId, title.price, title.tags, title.title, title.video).createTheMediasVideoCard
            photographerCard_ul += newMediasPrinted
        } else {
            newMediasPrinted = new createMediasImageCard(title.date, title.id, title.image, title.likes, title.photographerId, title.price, title.tags, title.title).createTheMediaImageCard
            photographerCard_ul += newMediasPrinted
        }
    }
    photographerCard_ul += '</ul>'
    remplissage2.innerHTML = photographerCard_ul
}

async function ongletRemplissage() {
    const response = await fetch('assets/data.json');
    const data = await response.json();
    const data2 = await createMedias()
    return data;
}
let ongletLikesTarif = document.getElementById("ongletLikesTarif");

///////  remplissage de l'onglet et gestion des likes : sur les médias et sur le total sur l'onglet
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
                        element.querySelector(".photograph-numberOfLikes").innerHTML = numberOfLikesOfTheMedia + " " + `<i class="far fa-heart" alt="likes"></i>`
                        onglet_likes.innerHTML = compteurDeLikes + `&#8239; ` + `<i class="fas fa-heart onglet_likesColor" alt="likes" aria-hidden="true"></i>`
                    }
                })
            })
            //////////////////////////////////////

        console.log("le total de likes est : " + compteurDeLikes);
        onglet_likes.setAttribute("class", "numberOfLikes")
        onglet_likes.innerHTML = compteurDeLikes + `&#8239; ` + `<i class="fas fa-heart onglet_likesColor" alt="likes" aria-hidden="true"></i>`
        onglet_price.setAttribute("class", "onglet_price")

        for (let photographer of data.photographers) {
            //  console.log(photographer.id);
            if (photographer.id == photographerPage) {
                //   console.log(photographer.price); // tarif journalier du photographe de la page
                onglet_price.textContent = `${photographer.price} €/jour`
            }
        }
        ongletLikesTarif.appendChild(onglet_likes)
        ongletLikesTarif.appendChild(onglet_price)
    })



////////// sur la page du photographe, tri dans ses médias au click sur un des tags de sa page
let linkClicked
setTimeout(function filtreTag() {
    let tagsOnThisPage = Array.from(document.querySelectorAll(".lienTag"))
    let mediasOnThisPage = Array.from(document.querySelectorAll(".listOfMedias"))
    console.log(tagsOnThisPage)
    console.log(mediasOnThisPage)

    tagsOnThisPage.forEach(link => {
        link.addEventListener('click', function filter(link) {

            linkClicked = link.target.innerHTML.substr(1) // ouiiiiiiiii
            console.log(linkClicked) // lien qui a été clické

            // au lieu de récupérer dans les datas, récupérer dans les medias déjà affichés
            let affichage3 = '<ul class="portfolioMedias">';
            let newMediasPrinted
            for (let tag of tri) {
                if (tag.tags == linkClicked) {
                    if (tag.image == undefined) {
                        newMediasPrinted = new createMediasVideoCard(tag.date, tag.id, tag.likes, tag.photographerId, tag.price, tag.tags, tag.title, tag.video).createTheMediasVideoCard
                        affichage3 += newMediasPrinted
                    } else {
                        newMediasPrinted = new createMediasImageCard(tag.date, tag.id, tag.image, tag.likes, tag.photographerId, tag.price, tag.tags, tag.title).createTheMediaImageCard
                        affichage3 += newMediasPrinted
                    }
                }
            }
            affichage3 += '</ul>'
            remplissage2.innerHTML = affichage3
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
let newMediasPrinted

function triPopulariteCroissante() { // fonction déclenchée au clic (fonction dans le html)
    console.log("triPopulariteCroissantee")

    let affichage3 = '<ul class="portfolioMedias">';
    let mediasPlusPopulaires = tri.sort(function(a, b) { if (b.likes < a.likes) { return -1; } else { return 1 } })

    for (let media of mediasPlusPopulaires) {
        //  console.log(media)
        if (media.image == undefined) {
            newMediasPrinted = new createMediasVideoCard(media.date, media.id, media.likes, media.photographerId, media.price, media.tags, media.title, media.video).createTheMediasVideoCard
            affichage3 += newMediasPrinted
        } else {
            newMediasPrinted = new createMediasImageCard(media.date, media.id, media.image, media.likes, media.photographerId, media.price, media.tags, media.title).createTheMediaImageCard
            affichage3 += newMediasPrinted
        }
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
            newMediasPrinted = new createMediasVideoCard(media.date, media.id, media.likes, media.photographerId, media.price, media.tags, media.title, media.video).createTheMediasVideoCard
            affichage3 += newMediasPrinted
        } else {
            newMediasPrinted = new createMediasImageCard(media.date, media.id, media.image, media.likes, media.photographerId, media.price, media.tags, media.title).createTheMediaImageCard
            affichage3 += newMediasPrinted
        }
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
            newMediasPrinted = new createMediasVideoCard(media.date, media.id, media.likes, media.photographerId, media.price, media.tags, media.title, media.video).createTheMediasVideoCard
            affichage3 += newMediasPrinted
        } else {
            newMediasPrinted = new createMediasImageCard(media.date, media.id, media.image, media.likes, media.photographerId, media.price, media.tags, media.title).createTheMediaImageCard
            affichage3 += newMediasPrinted
        }
    }
    affichage3 += '</ul></div>';
    remplissage2.innerHTML = affichage3;
}


//////////
////// accessibilité
//// https://www.youtube.com/watch?v=UeQ5T8NbE7A