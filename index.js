// Función para que el header se esconda/aparezca

let scrollPrevio = window.scrollY;
window.onscroll = function () {
    let scrollActual = window.scrollY;
    if (scrollPrevio > scrollActual) {
        document.getElementById("container-header").style.top = "0";
    } else {
        document.getElementById("container-header").style.top = "-20%"
    }
    scrollPrevio = scrollActual;
}

// Redirecciones

let imageHeader = document.querySelector("#header-img")

let imageFooter = document.querySelector("#footer-img")


imageHeader.onclick = () => {
    open("#", "_self")
};

imageFooter.onclick = () => {
    open("#", "_self")
};

// redirecciones de íconos footer-media

let facebookRedirect = document.querySelector("#footer-facebook")

let instagramRedirect = document.querySelector("#footer-instagram")

let gMapsRedirect = document.querySelector("#footer-gmaps")

facebookRedirect.onclick = () => {
    open("https://www.facebook.com/LorisMDulceC/")
};

instagramRedirect.onclick = () => {
    open("https://www.instagram.com/lorismdulcec/")
};

gMapsRedirect.onclick = () => {
    open("https://g.page/jardinInfantes?share")
};
