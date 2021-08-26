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
        console.log(data, data.photographers);
        let affichage = '<ul class="selected-items">';

        // fonction pour factoriser le nom du fichier .jpg 
        for (let photographer of data.photographers) {
            console.log(photographer);

            let urlSrc = (toPascalCase(photographer.name) + '.jpg');
            console.log(urlSrc);
        }


        for (let photographer of data.photographers) {
            console.log(photographer);
            // ajouter du code dans le DOM grâce aux variables de manière factorisée
            affichage += `<li class="photographers-items">
            <img class="photographer-portrait" src="images/Sample Photos/Photographers ID Photos/${(toPascalCase(photographer.name) + '.jpg')}"/>
            <h2 class="photographer-name">${photographer.name}</h2>  
            <p class="photographer-city">${photographer.city}<hr>${photographer.tagline}
            <hr>${photographer.price}<hr>${photographer.tags}</p>               
            </li>`;
        }
        affichage += '</ul>';
        resultOfSearch.innerHTML = affichage;
    })

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
let den = "jean michel dUPuis";
console.log(toPascalCase(den));


// renvoie : "Test"
//data.photographers.name.forEach(element => console.log(element));
// remplissage de la page grâce aux données récupérées depuis data.json
//const showPhotographers = async() => {
//   await fetch();
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
//};

// input setup
//searchInput.addEventListener('input', (e) => {
//    searchTerm = e.target.value;
//    console.log(e.target.value);
//    showPhotographers();
//});