////////////////////////////////////////////////////////////////////////////
////////////////////////// MODALE //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

// DOM Elements
const modalBtn = document.querySelectorAll(".modal-btn");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", opening));

// launch modal form
function launchModal() {
    opening();
    // formValidator.style.display = "block";
    // validationMessage.style.display = "none";
    // closeFormButton.style.display = "none";
}

// fermeture de la fenêtre formulaire
const modalCloseBtn = document.querySelector("close");
modalCloseBtn.addEventListener("click", closeModal);

function closeModal() {
    modalbg.style.display = "none";
}

//////////////////////////////////////
//// vérification du formulaire /////
//////////////////////////////////////

// l'id du formulaire pour vérifier la validation au submit 
let formValidator = document.getElementById("reserve");

// variables pour récupérer les saisies dans les champs 
let firstInput = document.getElementById("first");
let secondInput = document.getElementById("last");
let emailInput = document.getElementById("email");
let birth = document.getElementById("birthdate");
let quantityInput = document.getElementById("quantity"); //nombre de tournois
let city = document.getElementsByTagName("location"); //radio button ville https://www.youtube.com/watch?v=MBUc-hfxB2s
let conditions = document.getElementById("checkbox1"); //conditions d'utilisation
let radios = document.getElementsByName("location"); //radio buttons pour la ville choisie

// variables pour mettre des messages d'erreur
let missingTextInputFirst = document.getElementById("validationFieldFirst");
let missingTextInputSecond = document.getElementById("validationFieldSecond");
let missingEmailInput = document.getElementById("emailValidationField");
let missingBirthdateInput = document.getElementById("birthdateValidationField");
let missingQuantityInput = document.getElementById("quantityValidationField"); //nombre de tournois
let missingRadioButtonChecked = document.getElementById("radioButtonValidationField"); //radio button ville
let missingConditions = document.getElementById("conditionsValidationField"); //conditions d'utilisation

// modale quand tout est ok - inscription validée!
let closeForm = document.getElementsByClassName("modal-body");
let validationMessage = document.getElementById("modal-body__validation");
validationMessage.style.display = "none";
let closeFormButton = document.getElementById("modal-body__validation__button");
closeFormButton.style.display = "none";

// validation des champs grâce à des regEx
let verifyTextInput = /^[a-zA-Z-\s]{2,}$/;
let verifyEmailInput = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let verifyNumberInput = /^[0-9]{1,2}$/; // validation du nombre de tournois
let verifyDateInput = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

// je désactive le bouton de soumission en attendant que le formulaire soit rempli corectement
let buttoned = document.getElementsByTagName("button")[2];
buttoned.disabled = true;

//prénom
let firstInputValidated = false;
firstInput.onchange = function(e) {
    e.preventDefault();
    if ((firstInput.value == "") || (verifyTextInput.test(firstInput.value) == false)) {
        missingTextInputFirst.innerHTML = "Vous devez saisir au moins deux caractères, les chiffres et caractères spéciaux ne sont pas acceptés.";
        firstInputValidated = false;
        firstInput.style.borderColor = "#fe142f";
    } else {
        missingTextInputFirst.innerHTML = "";
        firstInputValidated = true;
        firstInput.style.borderColor = "#ccc";
        valider();
    }
    console.log("champs prénom " + firstInputValidated);
};

//nom
let secondInputValidated = false;
secondInput.onchange = function(e) {
    e.preventDefault();
    if ((secondInput.value == "") || (verifyTextInput.test(secondInput.value) == false)) {
        missingTextInputSecond.innerHTML = "Vous devez saisir au moins deux caractères, les chiffres et caractères spéciaux ne sont pas acceptés.";
        secondInputValidated = false;
        secondInput.style.borderColor = "#fe142f";
    } else {
        missingTextInputSecond.innerHTML = "";
        secondInputValidated = true;
        secondInput.style.borderColor = "#ccc";
        valider();
    }
    console.log("champs nom " + secondInputValidated);
};

//email
let emailInputValidated = false;
emailInput.onchange = function(e) {
    e.preventDefault();
    if ((emailInput.value == "") || (verifyEmailInput.test(emailInput.value) == false)) {
        missingEmailInput.innerHTML = "Vous devez saisir une adresse mail valide.";
        emailInputValidated = false;
        emailInput.style.borderColor = "#fe142f";
    } else {
        missingEmailInput.innerHTML = "";
        emailInputValidated = true;
        emailInput.style.borderColor = "#ccc";
        valider();
    }
    console.log("champs email " + emailInputValidated);
};

//date naissance
let birthValidated = false;
birth.onchange = function(e) {
    e.preventDefault();
    if ((birth.value == "") || (verifyDateInput.test(birth.value)) == false) {
        missingBirthdateInput.innerHTML = "Vous devez saisir votre date de naissance au format jj/mm/aaaa.";
        birthValidated = false;
        birth.style.borderColor = "#fe142f";
    } else {
        missingBirthdateInput.innerHTML = "";
        birthValidated = true;
        birth.style.borderColor = "#ccc";
        valider();
    }
    console.log("champs date de naissance " + birthValidated);
};

//nombre tournois
let quantityInputValidated = false;
quantityInput.onchange = function(e) {
    e.preventDefault();
    if ((quantityInput.value == "") || (verifyNumberInput.test(quantityInput.value)) == false) {
        missingQuantityInput.innerHTML = "Vous devez saisir un chiffre.";
        quantityInputValidated = false;
        quantityInput.style.borderColor = "#fe142f";
    } else {
        missingQuantityInput.innerHTML = "";
        quantityInputValidated = true;
        quantityInput.style.borderColor = "#ccc";
        valider();
    }
    console.log("champs nombre de tournois " + quantityInputValidated);
};

//ville
// vidéos qui m'a permis de trouver une solution!! https://www.youtube.com/watch?v=tWJxQqMYJJE
let cityValidated = false;

radios.forEach(radio => {
    radio.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!radio.checked) {
            missingRadioButtonChecked.innerHTML = ("merci de choisir une ville");
        } else {
            missingRadioButtonChecked.innerHTML = ("");
            cityValidated = true;
            //return cityValidated = true;
        }
    })
})

radios[0].onclick = valider;
radios[1].onclick = valider;
radios[2].onclick = valider;
radios[3].onclick = valider;
radios[4].onclick = valider;
radios[5].onclick = valider;
console.log("champs ville " + cityValidated);


//conditions
let conditionsValidated = true;
console.log("conditions " + conditionsValidated);

conditions.addEventListener('click', (e) => {
    if (!conditions.checked) {
        conditionsValidated = false;
        missingConditions.innerHTML = ("Vous devez lire et accepter les conditions.");
        console.log("conditions " + conditionsValidated);
    } else {
        conditionsValidated = true;
        missingConditions.innerHTML = ("");
        console.log("conditions " + conditionsValidated);
        valider();
    }
});
console.log("conditions " + conditionsValidated);

// je stocke le résultat de la validation de champs dans un tableau
var myArray = [firstInputValidated, secondInputValidated, emailInputValidated, birthValidated, quantityInputValidated, conditionsValidated];
console.log("tableau vérif " +
    firstInputValidated, secondInputValidated, emailInputValidated, birthValidated, quantityInputValidated, conditionsValidated);

// fonction qui parcourt le tableau préalablement rempli contenant le résultat de la validation des champs
// si les champs sont valides, le bouton d'envoi est visible (disabled = false), 
// sinon il reste désactivé
// source https://stackoverflow.com/questions/11719961/javascript-remove-disabled-attribute-from-html-input
function valider() {
    for (var i = 0; i < (myArray.length - 1); i++) {
        if (firstInputValidated && secondInputValidated && emailInputValidated &&
            birthValidated && quantityInputValidated && cityValidated && conditionsValidated) {
            buttoned.disabled = false;
        } else if ((myArray[i]).value == false) {
            console.log((myArray[i]));
            buttoned.disabled = true;
        }
    }
    console.log("tableau vérif " +
        firstInputValidated, secondInputValidated, emailInputValidated, birthValidated, quantityInputValidated, conditionsValidated);
}

// je réactive le bouton d'envoi quand les inputs sont ok
// validation du formulaire au click sur bouton submit
formValidator.addEventListener("submit", function(e) {
    e.preventDefault();

    if (firstInputValidated && secondInputValidated && emailInputValidated &&
        birthValidated && quantityInputValidated && cityValidated && conditionsValidated) {

        console.log("formulaire : tout est ok");
        document.getElementById("reserve").reset(); //réinitialiser le formulaire?
        console.log(formValidator);

        formValidator.style.display = "none"; // on ne voit plus le formulaire
        validationMessage.style.display = "block"; // le message de validation devient visible
        closeFormButton.style.display = "block"; // le bouton close du formulaire validé apparaît

        closeFormButton.addEventListener("click", (closeModal));
        firstInputValidated = false; // réinitialisation de la validation des variables
        secondInputValidated = false;
        emailInputValidated = false;
        birthValidated = false;
        quantityInputValidated = false;
        cityValidated = false;
        buttoned.disabled = true;
    }
});

function opening() {
    modalBtn.innerHTML = (
        `
<div class="bground">
<div class="content">
    <span class="close"></span>
    <div class="modal-body">
        <form id="reserve" name="reserve" action="#" method="POST">
            <!-- prénom -->
            <div class="formData">
                <label for="first">Prénom</label><br>
                <input class="text-control" type="text" id="first" name="first" /><br>
                <small id="validationFieldFirst"></small>
            </div>

            <!-- nom -->
            <div class="formData">
                <label for="last">Nom</label><br>
                <input class="text-control" type="text" id="last" name="last" /><br>
                <small id="validationFieldSecond"></small>
            </div>

            <!-- email -->
            <div class="formData">
                <label for="email">E-mail</label><br>
                <input class="text-control" type="text" id="email" name="email" /><br>
                <small id="emailValidationField"></small>
            </div>

            <!-- date de naissance -->
            <div class="formData">
                <label for="birthdate">Date de naissance</label><br>
                <input class="text-control" type="text" id="birthdate" name="birthdate" /><br>
                <small id="birthdateValidationField"></small>
            </div>

            <!-- nombre de tournois -->
            <div class="formData">
                <label for="quantity">À combien de tournois GameOn avez-vous déjà participé&nbsp;?</label><br>
                <input type="text" class="text-control" id="quantity" name="quantity"><br>
                <small id="quantityValidationField"></small>
            </div>

            <!-- villes -->
            <p class="text-label">Quelle ville ?</p>
            <div class="formData">
                <input class="checkbox-input" type="radio" id="location1" name="location" value="New York" />
                <label class="checkbox-label" for="location1">
          <span class="checkbox-icon"></span>
          New York</label>
                <input class="checkbox-input" type="radio" id="location2" name="location" value="San Francisco" />
                <label class="checkbox-label" for="location2">
            <span class="checkbox-icon"></span>
            San Francisco</label>
                <input class="checkbox-input" type="radio" id="location3" name="location" value="Seattle" />
                <label class="checkbox-label" for="location3">
            <span class="checkbox-icon"></span>
            Seattle</label >
          <input class="checkbox-input" type="radio"
            id="location4" name="location" value="Chicago" />
          <label class="checkbox-label" for="location4">
            <span class="checkbox-icon"></span>
            Chicago</label >
          <input class="checkbox-input" type="radio"
            id="location5" name="location" value="Boston" />
          <label class="checkbox-label" for="location5">
            <span class="checkbox-icon"></span>
            Boston</label >
          <input class="checkbox-input" type="radio"
            id="location6" name="location" value="Portland" />
          <label class="checkbox-label" for="location6">
            <span class="checkbox-icon"></span>
            Portland</label >
            <small id="radioButtonValidationField"></small>
          </div>


            <!-- conditions -->
          <div class="formData">
            <input class="checkbox-input" type="checkbox"
              id="checkbox1" checked />
            <label class="checkbox2-label" for="checkbox1" >
              <span class="checkbox-icon"></span>
              J'ai lu et accepté les conditions d'utilisation.
            </label>
                <small id="conditionsValidationField"></small>
                <br>
                <input class="checkbox-input" type="checkbox" id="checkbox2" />
                <label class="checkbox2-label" for="checkbox2">
            <span class="checkbox-icon"></span>
              Je souhaite être prévenu des prochains évènements.
            </label>
                <br>
            </div>

            <!-- bouton submit -->
            <button type="submit" class="btn-submit button">C'est parti</button>
        </form>

        <div id="modal-body__validation">Merci,<br/>votre réservation a été reçue&nbsp;!</div>
        <button type="button" id="modal-body__validation__button">Fermer</button>
    </div>
</div>
</div>
`)
};

const modalbg = document.querySelector(".bground");
const formData = document.querySelectorAll(".formData");