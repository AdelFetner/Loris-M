

// Función para que el header se esconda/aparezca


let scrollPrevio = window.scrollY;

window.addEventListener("scroll", () => {
    let header = document.getElementById("container-header");
    let scrollActual = window.scrollY;
    if (scrollPrevio > scrollActual) {
        header.style.top = "0";
    } else {
        header.style.top = "-20%"
    }
    scrollPrevio = scrollActual;
})

// Redirecciones

const imageHeader = document.getElementById("header-img");

const imageFooter = document.getElementById("footer-img");


imageHeader.addEventListener("click", () => window.scrollTo(0, 0))

imageFooter.addEventListener("click", () => window.scrollTo(0, 0))


// redirecciones de íconos footer-media

const facebookRedirect = document.getElementById("footer-facebook");

const instagramRedirect = document.getElementById("footer-instagram");

const gMapsRedirect = document.getElementById("footer-gmaps");

facebookRedirect.addEventListener("click", () => open("https://www.facebook.com/LorisMDulceC", ""))

instagramRedirect.addEventListener("click", () => open("https://www.instagram.com/lorismdulcec/", ""))

gMapsRedirect.addEventListener("click", () => open("https://g.page/jardinInfantes?share", ""))

// Form validation

const form = document.getElementById("contact-form");

const name = document.getElementById("form-name");

const email = document.getElementById("form-email");

const phone = document.getElementById("form-phone");

const message = document.getElementById("form-message");

const submit = document.getElementById("form-submit");

const span = document.createElement("span")

// function to save data to local storage when typing

const saveData = (elemento) => {
    const valorElemento = elemento.value.trim()
    const elementName = elemento.name

    // crear objeto con los datos del formulario
    const formData = JSON.parse(localStorage.getItem("formData")) || {}

    // agregar datos al objeto
    formData[elementName] = valorElemento

    // guardar objeto en local storage
    localStorage.setItem("formData", JSON.stringify(formData))
}
// función para aviso de campo correcto

const errorWarning = (elemento, aviso) => {
    elemento.classList.remove("good-try")
    elemento.classList.add("bad-try")

    // Agregar aviso de campo incorrecto
    span.textContent = `${aviso}`
    span.classList.add("form-span-error")
    // Insertar span siguiente al target del event listener
    elemento.after(span)
}
// función para borrar aviso de campo incorrecto
const deleteSpan = (elemento) => {
    elemento.classList.add("good-try")
    elemento.classList.remove("bad-try")

    // conditional para borrar solo el span correspondiente al campo actual
    if (elemento.nextSibling == span && elemento.value) {
        elemento.nextSibling.remove()
    }

    // Function to save data to local storage when typing
    saveData(elemento)

    return true
}

// validación para mostrar aviso en el input

const inputError = (evento) => {
    // variable para que se lea mejor
    const elemento = evento.target

    // recortar el valor del input
    const valorElemento = elemento.value.trim()
    // si el input está vacío
    if (elemento.tagName.toLowerCase() == "input" && !valorElemento || elemento.tagName.toLowerCase() == "textarea" && !valorElemento) {
        errorWarning(elemento, "Te faltó completar este campo")
    }
}

form.addEventListener("focusout", (e) => {
    inputError(e)
})
// Validación de nombre

const nameValidation = () => {
    const valorElemento = name.value.trim()
    // Guard classes
    if (valorElemento.length < 4) {
        errorWarning(name, "El nombre debe tener al menos 4 caracteres")
        return false
    }

    if (valorElemento.length > 25) {
        errorWarning(name, "El nombre no puede tener más de 25 caracteres")
        return false
    }

    return deleteSpan(name)
}
name.addEventListener("keyup", nameValidation)

// Validación de email

const emailValidation = () => {
    const valorElemento = email.value.trim()
    // Guard classes
    if (valorElemento.includes(" ")) {
        errorWarning(email, "El email no puede tener espacios")
        return false
    }
    if (valorElemento.length < 6) {
        errorWarning(email, "El email debe tener al menos 6 caracteres")
        return false
    }
    if (!valorElemento.includes("@") || !valorElemento.includes(".")) {
        errorWarning(email, "El email debe tener un @ y un .")
        return false
    }

    return deleteSpan(email)
}
email.addEventListener("keyup", emailValidation)

// Validación de teléfono

const phoneValidation = () => {
    const valorElemento = phone.value.trim()
    // Guard classes
    // Evitar letras en el input de teléfono pero permitir el +
    if (isNaN(valorElemento) && valorElemento != "+") {
        errorWarning(phone, "El teléfono no puede contener letras")
        return false
    }
    if (valorElemento.length < 6) {
        errorWarning(phone, "El teléfono debe tener al menos 6 caracteres")
        return false
    }
    if (valorElemento.length > 20) {
        errorWarning(phone, "El teléfono no puede tener más de 20 caracteres")
        return false
    }

    return deleteSpan(phone)
}
phone.addEventListener("keyup", phoneValidation)

// Validación de mensaje

const messageValidation = () => {
    const valorElemento = message.value.trim()
    // Guard classes
    if (valorElemento.length < 10) {
        errorWarning(message, "El mensaje debe tener al menos 10 caracteres")
        return false
    }
    if (valorElemento.length > 750) {
        errorWarning(message, "El mensaje no puede tener más de 750 caracteres")
        return false
    }

    return deleteSpan(message)
}
message.addEventListener("keyup", messageValidation)

form.addEventListener("submit", (e) => {
    e.preventDefault()

    // Validar todos los campos
    const isValid = nameValidation() && emailValidation() && phoneValidation() && messageValidation()

    if (isValid) {
        // clear form and local storage after submit
        localStorage.clear()
        form.submit()
            .reset()
        // Modal aviso de envío exitoso

    }
})

// Cargar data del local storage al formulario
window.addEventListener("load", () => {
    const savedData = JSON.parse(localStorage.getItem("formData"))

    if (savedData == null && savedData == undefined) {
        name.value = savedData?.name || ""
        email.value = savedData?.email || ""
        phone.value = savedData?.phone || ""
        message.value = savedData?.message || ""
    }
})