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
    let photographer_city = data.photographers[0].city;
    let photographer_country = data.photographers[0].country;
    let photographer_id = data.photographers[0].id;
    let photographer_name = data.photographers[0].name;
    let photographer_tagline = data.photographers[0].tagline;
    let photographer_tags = data.photographers[0].tags;

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
        let eachTag = document.createElement("h5");
        eachTag.setAttribute("class", "generatedTags")
        eachTag.textContent = `#${photographer_tags[i]}`;
        photographer_tagsA.appendChild(eachTag);
        photographer_tagsList.appendChild(photographer_tagsA);
    }

    // photographerCard_div.appendChild(photographerCard_div2)
    photographerCard_div2.appendChild(photographerCard_photographerInfos)
    photographerCard_photographerInfos.appendChild(photographerCard_location)
    photographerCard_photographerInfos.appendChild(photographerCard_tagline)
    photographerCard_photographerInfos.appendChild(photographer_tagsList)
    photographerCard_div2.appendChild(photographerCard_photographerInfos)

    photographerCard_div2.appendChild(button_contact_div)
    button_contact_div.appendChild(button_contact)

    photographerCard_div2.appendChild(photographerCard_divPhoto)
    photographerCard_divPhoto.appendChild(photographerCard_img)




    //remplissage.innerHTML = affichageResult;
    remplissage.appendChild(photographerCard_div2)


})









/*
.then((data) => {
    // console.log(data, data.photographers);
    const resultPh = data.photographers.filter(photographer => photographer.id == photographerPage);
    // console.log(resultPh); // infos du photographe
    //  console.log(photographerPage); // id du photographe choisi
    //  console.log(data.media); // tous les medias
    // console.log(data.photographers); // tous les photographes
    //  console.log(resultPh[0].name); // nom du photographe choisi

    contact.innerText = ("Contactez-moi \n" + (resultPh[0].name));

    let affichageResult = '<div class = "photographerPersonal_Page">';
    affichageResult += `<div id="${photographerPage}" class = "redirect">
             <div class="photographerPersonal_card">                
              <h1 class="photographerPersonal_card-name">${resultPh[0].name}</h1> 
              <p class="photographerPersonal_card-city">${resultPh[0].city}, ${resultPh[0].country} </p>
              <p class="photographerPersonal_card-tagline">${resultPh[0].tagline} </p> 
              <p class="photographerPersonal_card-listOfTags"> ${resultPh[0].tags}</p>  </div>                  
              <img class="photographer-portrait" src="images/Sample Photos/Photographers ID Photos/${(toPascalCase(resultPh[0].name) + '.jpg')}"/>
              `;

    affichageResult += '</div>';
    remplissage.innerHTML = affichageResult;

    return data, resultPh;
});*/

async function printMedias() {
    const response = await fetch("assets/data.json");
    const data = await response.json();
    const resultPh = data.photographers.filter(photographer => photographer.id == photographerPage);

    var mediasRecup = data.media;
    var tri = mediasRecup.filter(function(media) {
        return media.photographerId == resultPh[0].id;
    });
    console.log(tri); //médias du photographe choisi


    // passer les medias du photographe choisi pour la lightbox
    window.onload = function() {
        localStorage.setItem("mediasPhotographerSelected", tri)
        console.log(tri);
    }


    var prenom = resultPh[0].name;
    var lastIndex = prenom.lastIndexOf(" ");
    prenom = prenom.substring(0, lastIndex).replace('-', ' ');
    //  console.log(prenom);
    let affichage2 = '<ul class="portfolioMedias">';

    for (let title of tri) {
        //  console.log(title);
        // console.log(title.image);     ///// . href= "/photographer.html?id=${photographerPage}">
        // console.log(title.video);
        // affichage2 += `<a href="images/Sample Photos/${prenom}/${title.image}" class="restricted">
        // <li class="listOfMedias">`
        if (title.image == undefined) {
            affichage2 += `<a href="images/Sample Photos/${prenom}/${title.video}" class="restricted">
             <li class="listOfMedias">
             <video width="320" height="240" autoplay class="photographer-video"> <source src="images/Sample Photos/${prenom}/${title.video}" type="video/mp4"></video>`;

        } else {
            //  console.log(title.image);

            affichage2 += `<a href="images/Sample Photos/${prenom}/${title.image}" class="restricted">
             <li class="listOfMedias">
             <img class="photographer-selection" src="images/Sample Photos/${prenom}/${title.image}"/>`;
        }
        // affichage2 += `<img class="photographer-selection" src="images/Sample Photos/${prenom}/${title.image}"/>`

        affichage2 += `<div class="label-media">
        <p class="photograph-title">${title.title}</p>
        <p class="photograph-numberOfLikes">${title.likes}</p>
        <i class="fas fa-heart"></i>
        </div>
        </li></a> `;

        // pour la lightbox
        // srcImgLightbox.setAttribute("src", `images/Sample Photos/${prenom}/${title.image}`);
        // srcImgLightbox.setAttribute("alt", "");  // à compléter        

    }
    // if undefined 
    affichage2 += '</ul></div>';
    remplissage2.innerHTML = affichage2;

}
printMedias()

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

let ongletLikesTarif = document.getElementById("ongletLikesTarif");

async function ongletRemplissage() {
    const response = await fetch('assets/data.json');
    const data = await response.json();
    return data;
}

// function remplissage de la page grâce aux données récupérées depuis data.json
ongletRemplissage()
    .then(data => {
        //console.log(data.media);
        let compteurDeLikes = 0;
        let ongletDatas = '<p>';
        for (let media of data.media) {
            let mediaLikes = media.likes
                //  console.log(mediaLikes);
            if (media.photographerId == photographerPage) {
                compteurDeLikes += mediaLikes;
            }
            // console.log("et hop, le total est : " + compteurDeLikes);

        }
        ongletDatas += `${compteurDeLikes} <i class="fas fa-heart">`;
        ongletDatas += `<p>€/jour</p> `;
        for (let photographer of data.photographers) {
            //console.log(photographer.id);
            if (photographer.id == photographerPage) {
                //  console.log(media.photographerId);
            }
            // return photographer
        }
        ongletDatas += '</p>';
        ongletLikesTarif.innerHTML = ongletDatas;
        return;
    })

ongletRemplissage()