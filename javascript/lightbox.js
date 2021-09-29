// https://grafikart.fr/tutoriels/lightbox-javascript-1224

console.log("lightbox connectée")


class lightbox {
    static init() { // créer un comportement à appliquer à chaque lien
        const links = Array.from(document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]'));
        const gallery = links.map(link => link.getAttribute('href'));
        console.log(links)
            //   console.log(links[0])
            //   console.log(links[0])
            //  console.log(gallery);
        console.log("lightbox ok")

        links.forEach(link => link.addEventListener('click', e => {
            e.preventDefault()
            new lightbox(e.currentTarget.getAttribute('href'), gallery); // récupérer url     
            console.log("lightbox init ok")
        }))
    }

    /**
     * @param {string} url URL de l'image
     * * @param {string[]} images chemins des images de la lightbox
     */
    constructor(url, images) {
        this.element = this.buildDOM(url);
        console.log(this.element)

        this.images = images;
        console.log(images)

        this.loadImage(url);
        this.onKeyUp = this.onKeyUp.bind(this);
        document.body.appendChild(this.element);
        document.addEventListener('keyup', this.onKeyUp);
    }


    /**
     * @param {string} url URL de l'image
     */
    loadImage(url) {
        this.url = null;
        /*
        if (url.indexOf('mp4')) {
            console.log("c'est une vidéo, pas une image!");
        }
        */
        const image = new Image();
        const container = this.element.querySelector('.lightbox__container')
        const loader = document.createElement('div')
        loader.classList.add('lightbox__loader');
        loader.setAttribute("src", "images/loader.svg");
        container.innerHTML = '';
        container.appendChild(loader)
        image.onload = () => {
            container.removeChild(loader);
            container.appendChild(image);
            this.url = url;
        }
        image.src = url;
    }

    onKeyUp(e) {
        if (e.key == 'Escape') {
            this.close(e);
        } else if (e.key == 'ArrowLeft') {
            this.prev(e)
        } else if (e.key == 'ArrowRight') {
            this.next(e)
        }
    }

    // croix qui ferme la lightbox
    close(e) {
        e.preventDefault();
        this.element.classList.add('fadeOut');
        window.setTimeout(() => {
            this.element.parentElement.removeChild(this.element);
        }, 500);
        document.removeEventListener('keyup', this.onKeyUp);
    }

    // on conserve l'url de l'image affichée afin de 
    // pouvoir retrouver la position de cette image dans notre 
    // galerie pour la navigation next et prev.
    /**
     * @param {MouseEvent|KeyboardEvent} e 
     */
    next(e) {
        e.preventDefault()
        let i = this.images.findIndex(image => image === this.url);
        if (i === this.images.length - 1) {
            i = -1 // si on est arrivé à la dernière image, on repart au début
        }
        this.loadImage(this.images[i + 1]);
    }

    /**
     * @param {MouseEvent|KeyboardEvent} e 
     */
    prev(e) {
        e.preventDefault()
        let i = this.images.findIndex(image => image === this.url);
        if (i === 0) {
            i = this.images.length;
        }
        this.loadImage(this.images[i - 1]);
    }


    /**
     * @param {string} url URL de l'image
     * @return {HTMLElement}
     **/
    buildDOM(url) { // retournera un élément html
        const dom = document.createElement('div');
        dom.classList.add('lightbox');
        dom.innerHTML = `<button class="lightbox__close">Fermer</button>
        <button class="lightbox__next">Suivant</button>
        <button class="lightbox__prev">Précédent</button>
        <div class="lightbox__container">
        </div>`
        dom.querySelector('.lightbox__close').addEventListener('click', this.close.bind(this));
        dom.querySelector('.lightbox__next').addEventListener('click', this.next.bind(this));
        dom.querySelector('.lightbox__prev').addEventListener('click', this.prev.bind(this));
        console.log(url);
        return dom;
    }
}



setTimeout(function() {
    lightbox.init();
}, 2000);