let searchInput = document.getElementById('search');
let photographers;
let searchTerm = '';

let resultOfSearch = document.getElementById('resultOfSearch');

//  https://www.youtube.com/watch?v=o6ULZoMrFGg
// API request
// https://www.youtube.com/watch?v=ZCrh59Bvbts
// https://stackoverflow.com/questions/51859358/how-to-read-json-file-with-fetch-in-javascript
// https://www.youtube.com/watch?v=b0dPBK37-M8&t=24s

// connection au fichier json pour lire les données
// remplissage de la page grâce aux données récupérées depuis data.json
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
        // resultOfSearch.innerHTML = (
        //     `
        //      <li class="photographers-items">
        //      <h2 class="photographer-name">${data.photographers[0].name}</h2>
        //      <p class="photographer-tagline">${data.photographers[0].tagline}</h2>
        //      </li>
        //     `
        // );

        console.log(data);
        console.log(data.photographers);
        let affichage = '<ul>';
        for (let photographer of data.photographers) {
            console.log(photographer);
            affichage += `<li>${photographer.name}</li>`;
        }
        affichage += '</ul>';
        resultOfSearch.innerHTML = affichage;
    })


//je vais faire des fonctions pour donner des attributs aux variables de manière factorisée
class photographerToShow {
    constructor(name, id, city, country, tags, tagline, price, portrait) {
        this.name = name
        this.id = id
        this.city = city
        this.country = country
        this.tags = tags
        this.tagline = tagline
        this.price = price
        this.portrait = portrait
    }
    getName() {
        return this.name
    }
    getId() {
        return this.id
    }
    getCity() {
        return this.city
    }
    getCountry() {
        return this.country
    }
    getTags() {
        return this.tags
    }
    getTagline() {
        return this.tagline
    }
    getPrice() {
        return this.price
    }
    getPortrait() {
        return this.portrait
    }
}

const photoPeople = (new photographerToShow())
console.log(photoPeople)

//data.photographers.name.forEach(element => console.log(element));
// remplissage de la page grâce aux données récupérées depuis data.json
const showPhotographers = async() => {
    await fetch();
    // resultOfSearch.innerHTML = (
    //      photographers.filter(photographer => photographer.name.toLowerCase().includes(searchTerm.toLowerCase()))
    //      .map(photographers => (
    //          `
    //           <li class="photographers-items">
    //              <img class="photographer-portrait" src="${photographers[0].portrait}"/>
    //               <h2 class="photographer-name">${photographers[0].name}</h2>
    //            </li>
    //             `
    //      )).join('')
    ///  );
};

// input setup
searchInput.addEventListener('input', (e) => {
    searchTerm = e.target.value;
    console.log(e.target.value);
    showPhotographers();
});

//.then(response => response.json())
//.then(data => resultOfSearch.innerHTML = data.photographers[0].name); //ok!!!!
//.then(json => {
//    this.photographers = json;
//    console.log(json);
//    console.log(this.photographers);
//})
//.then(data => console.log(data.photographers[0].name)); // ouiiiiiiiii