////////////////////////////////////////////////////////////////////////////
////////////////////////// MODALE //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////


setTimeout(function() {
    // DOM Elements
    const modalbg = document.querySelector(".bground");
    const modalBtn = document.querySelectorAll(".modal-btn");

    // launch modal event
    modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

    // launch modal form
    function launchModal() {
        console.log("modale ")
        modalbg.style.display = "block";
        formValidator.style.display = "block";
        validationMessage.style.display = "none";
        closeFormButton.style.display = "none";
    }

    // fermeture de la fenêtre formulaire
    const modalCloseBtn = document.getElementsByClassName("close");
    modalCloseBtn[0].addEventListener("click", closeModal);

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
    let message = document.getElementById("message");

    // variables pour mettre des messages d'erreur
    let missingTextInputFirst = document.getElementById("validationFieldFirst");
    let missingTextInputSecond = document.getElementById("validationFieldSecond");
    let missingEmailInput = document.getElementById("emailValidationField");
    let missingMessage = document.getElementById("messageValidationField");

    // modale quand tout est ok - inscription validée!
    let validationMessage = document.getElementById("modal-body__validation");
    validationMessage.style.display = "none";
    let closeFormButton = document.getElementById("modal-body__validation__button");
    closeFormButton.style.display = "none";

    // validation des champs grâce à des regEx
    let verifyTextInput = /^[a-zA-Z-\s]{2,}$/;
    let verifyEmailInput = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // je désactive le bouton de soumission en attendant que le formulaire soit rempli corectement
    let buttoned = document.getElementById("submit");

    //prénom
    let firstInputValidated = false;
    firstInput.onchange = function(e) {
        e.preventDefault();
        if ((firstInput.value == "") || (verifyTextInput.test(firstInput.value) == false)) {
            missingTextInputFirst.innerHTML = "Vous devez saisir au moins deux caractères, les chiffres et caractères spéciaux ne sont pas acceptés.";
            firstInputValidated = false;
            firstInput.style.borderColor = "red";
            buttoned.style.backgroundColor = "#757575"; //pas ok
        } else {
            missingTextInputFirst.innerHTML = "";
            firstInputValidated = true;
            firstInput.style.borderColor = "#DB8876";
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
            secondInput.style.borderColor = "red";
            buttoned.style.backgroundColor = "#757575"; //pas ok
        } else {
            missingTextInputSecond.innerHTML = "";
            secondInputValidated = true;
            secondInput.style.borderColor = "#DB8876";
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
            emailInput.style.borderColor = "red";
            buttoned.style.backgroundColor = "#757575"; //pas ok
        } else {
            missingEmailInput.innerHTML = "";
            emailInputValidated = true;
            emailInput.style.borderColor = "#DB8876";
            valider();
        }
        console.log("champs email " + emailInputValidated);
    };

    //message
    let messageValidated = false;
    message.addEventListener('change', (e) => {
        e.preventDefault();
        if ((message.value == "") || ((/\w{10,}/).test(message.value) == false)) {
            missingMessage.innerHTML = "Veuillez saisir un message.";
            messageValidated = false;
            message.style.borderColor = "red";
            buttoned.style.backgroundColor = "#757575"; //pas ok
        } else {
            missingMessage.innerHTML = "";
            messageValidated = true;
            message.style.borderColor = "#DB8876";
            valider();
        }
        console.log("champs message " + messageValidated);
    });


    // je stocke le résultat de la validation de champs dans un tableau
    var myArray = [firstInputValidated, secondInputValidated, emailInputValidated, messageValidated];
    console.log("tableau vérif " +
        firstInputValidated, secondInputValidated, emailInputValidated, messageValidated);

    // fonction qui parcourt le tableau préalablement rempli contenant le résultat de la validation des champs
    function valider() {
        for (var i = 0; i < (myArray.length - 1); i++) {
            if (firstInputValidated && secondInputValidated && emailInputValidated &&
                messageValidated) {
                buttoned.style.backgroundColor = "#901C1C"; // ok
            } else if ((myArray[i]).value == false) {
                console.log((myArray[i]));
                buttoned.style.backgroundColor = "#757575"; //pas ok
            }
        }
        console.log("tableau vérif " +
            firstInputValidated, secondInputValidated, emailInputValidated, messageValidated);
    }

    // je réactive le bouton d'envoi quand les inputs sont ok
    // validation du formulaire au click sur bouton submit
    formValidator.addEventListener("submit", function(e) {
        e.preventDefault();

        if (firstInputValidated && secondInputValidated && emailInputValidated && messageValidated) {

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
            messageValidated = false;
            buttoned.style.backgroundColor = "#757575"; //pas ok
        }
    });

}, 2000);