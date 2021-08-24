let searchInput = document.getElementById('search');
let photographers;
let searchTerm = '';

console.log("coucou");

let resultOfSearch = document.getElementById('resultOfSearch');

//  https://www.youtube.com/watch?v=o6ULZoMrFGg
var id = ('data.json');
console.log(id);


// API request
// https://www.youtube.com/watch?v=ZCrh59Bvbts
let fetchPhotographers = async() => {
    photographers = await fetch(
        "./assets/FishEyeData.json").then(res => res.json());
    console.log(photographers);
};

console.log(photographers);

let showPhotographers = async() => {
    await fetchPhotographers();

    resultOfSearch.innerHTML = (
        photographers
        .filter(photographer => photographer.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(photographer => (
            `
            <li class="photographers-items">
                <img class="photographer-portrait" src="${photographer.portrait}"/>
                <h2 class="photographer-name">${photographer.name}</h2>
            </li>
            `


        )).join('')
    );
};
showPhotographers();

// input setup
searchInput.addEventListener('input', (e) => {
    searchTerm = e.target.value;
    console.log(e.target.value);
    showPhotographers();
});