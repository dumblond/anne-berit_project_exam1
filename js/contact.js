const form = document.querySelector("#contact-form");
const nameField = document.querySelector("#name");
const nameError = document.querySelector("#name-error");
const emailField = document.querySelector("#email");
const emailError = document.querySelector("#email-error");
const messageField = document.querySelector("#message");
const messageError = document.querySelector("#message-error");
const resultField = document.querySelector("#form-result");

function validateContactForm(event) {
    
    event.preventDefault();

    const nameIsValid = validateLength(nameField.value, 3);
    const emailIsValid = validateEmail(emailField.value);
    const messageIsValid = validateLength(messageField.value, 10);

    nameError.style.display = nameIsValid ? "none" : "block";
    emailError.style.display = emailIsValid ? "none" : "block";
    messageError.style.display = messageIsValid ? "none" : "block";

    if (nameIsValid && emailIsValid && messageIsValid) {
        resultField.innerHTML = message("Thank you, we will be in touch &#128522");
        setTimeout(function() {
            resultField.innerHTML = "";
        }, 10000);
        form.reset(); 
        return true;
    }
}

form.addEventListener("submit", validateContactForm);

function validateLength(value, len) {
    if (value.trim().length >= len) {
        return true;
    } else {
        return false;
    }
}

function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    return regEx.test(email);
}