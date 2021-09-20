console.log("filter connecté")

/*
// filtre au clic des tags

const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
const result = words.filter(word => word.length > 6);
console.log(result);
*/
/*
async function tagFilter() {
    const response = await fetch("assets/data.json");
    const data = await response.json();
    return data;
}
*/

/*
// function remplissage de la page grâce aux données récupérées depuis data.json
tagFilter()
    .then(data => {
        console.log(data.media);
        let mediasToFilter = data.media;

        for (let media of mediasToFilter) {
            console.log(media);
            console.log(mediasToFilter);
        }
        let mediasFiltres;
        mediasFiltres = mediasToFilter.filter(function(media) {
            if (media.tags == 'events') {
                console.log("j'ai trouvé la photo nommée " + media.image + " du photographe avec l'id " + media.photographerId);
            }
            console.log(mediasFiltres);
        });
    })*/

/*
// var mediasRecup = data.media;
//  var tri = mediasRecup.filter(function(media) {
//      return media.photographerId == resultPh[0].id;
//   });
////////////////////////
*/

/*
let clickedHashtag;
//let resultOfSearch = document.getElementById("resultOfSearch");
class filtrage {
    static init() { // créer un comportement à appliquer à chaque lien
        const collectHashtags = Array.from(document.querySelectorAll('a[href^="#"]'));

        console.log(collectHashtags)
        console.log(collectHashtags[1].innerHTML);
        console.log("filtrage ok")

        let triage = document.querySelectorAll(".restrict");
        console.log(triage);
        //  console.log(triage[0].outerText); // je dois chercher là dedans qu'il y ait clickedHashtag.substr(1)

        /* collectHashtags.forEach(tag => tag.addEventListener('click', e => {
            e.preventDefault()
            new filtrage(e.currentTarget.getAttribute('href'), collectHashtags); // récupérer url     
            clickedHashtag = e.currentTarget.innerHTML
            console.log(clickedHashtag) // tag sur lequel on a clické
                // return clickedHashtag

            //sentence.includes(word)
            let element

            function resultatTag() {
                triage.forEach(
                    function(currentValue, currentIndex, listObj) {
                        console.log(currentValue + ', ' + currentIndex + ', ' + this);
                    },
                    'myThisArg'
                );
            }
            resultatTag()
            resultOfSearch.innerHTML = element;
        }))
    }
}


setTimeout(function() {
    filtrage.init();
}, 2000);*/