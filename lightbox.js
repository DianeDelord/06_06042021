// https://grafikart.fr/tutoriels/lightbox-javascript-1224

const links = Array.from(
    document.querySelectorAll('img[src$=".jpg"],video[src$=".mp4"]')
);

function buildDOM(url) {
    const dom = document.createElement('div')
    dom.classList.add('lightbox')
    dom.innerHTML = `<button class="lightbox__close">Fermer</button>
        <button class="lightbox__next">Suivant</button>
        <button class="lightbox__prev">Précédent</button>
        <div class="lightbox__container"></div>`
    dom.querySelector('.lightbox__close').addEventListener('click', this.close.bind(this))
    dom.querySelector('.lightbox__next').addEventListener('click', this.next.bind(this))
    dom.querySelector('.lightbox__prev').addEventListener('click', this.prev.bind(this))
    return dom
};
console.log(dom);

// chargement de l'image
function loadImage(url) {
    this.url = null
    const image = new Image()
    const container = this.element.querySelector('.lightbox__container')
    const loader = document.createElement('div')
    loader.classList.add('lightbox__loader')
    container.innerHTML = ''
    container.appendChild(loader)
    image.onload = () => {
        container.removeChild(loader)
        container.appendChild(image)
        this.url = url
    }
    image.src = url
}

//Nous allons conserver l'url de l'image affichée afin de 
// pouvoir retrouver la position de cette image dans notre 
// galerie pour la navigation suivant et précédent.
/**
 * @param {MouseEvent|KeyboardEvent} e 
 */
function next(e) {
    e.preventDefault()
    let i = this.images.findIndex(image => image === this.url)
    if (i === this.images.length - 1) {
        i = -1
    }
    this.loadImage(this.images[i + 1])
}

/**
 * @param {MouseEvent|KeyboardEvent} e 
 */
function prev(e) {
    e.preventDefault()
    let i = this.images.findIndex(image => image === this.url)
    if (i === 0) {
        i = this.images.length
    }
    this.loadImage(this.images[i - 1])
}