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
    });

async function printMedias() {
    const response = await fetch("assets/data.json");
    const data = await response.json();
    const resultPh = data.photographers.filter(photographer => photographer.id == photographerPage);

    var mediasRecup = data.media;
    var tri = mediasRecup.filter(function(media) {
        return media.photographerId == resultPh[0].id;
    });
    // console.log(tri); //médias du photographe choisi
    var prenom = resultPh[0].name;
    var lastIndex = prenom.lastIndexOf(" ");
    prenom = prenom.substring(0, lastIndex).replace('-', ' ');
    //  console.log(prenom);
    let affichage2 = '<ul class="portfolioMedias">';

    for (let title of tri) {
        //  console.log(title);
        // console.log(title.image);
        // console.log(title.video);
        affichage2 += `<a href="images/Sample Photos/${prenom}/${title.image}" class="restricted">
        <li class="listOfMedias">`
        if (title.image == undefined) {
            affichage2 += `<video width="320" height="240" autoplay class="photographer-video"> <source src="images/Sample Photos/${prenom}/${title.video}" type="video/mp4"></video>`;

        } else {
            //  console.log(title.image);

            affichage2 += `<img class="photographer-selection" src="images/Sample Photos/${prenom}/${title.image}"/>`;
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