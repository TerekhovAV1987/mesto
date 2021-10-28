function showInputError(formElement, inputElement, errorMessage, classElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(classElement.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(classElement.errorClass);
};

function hideInputError(formElement, inputElement, classElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(classElement.inputErrorClass);
    errorElement.classList.remove(classElement.errorClass);
    errorElement.textContent = '';
};



function setEventListener(formElement, classElement) {
    const inputList = Array.from(formElement.querySelectorAll(classElement.inputSelector));
    const buttonElement = formElement.querySelector(classElement.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, classElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, classElement);
            toggleButtonState(inputList, buttonElement, classElement);
        });
    });
}

function checkInputValidity(formElement, inputElement, classElement) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, classElement);
    } else {
        hideInputError(formElement, inputElement, classElement);
    }
};

function toggleButtonState(inputList, buttonElement, classElement) {
    if(hasInvalidInput(inputList)) {
        buttonElement.classList.add(classElement.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(classElement.inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

function enableValidation(classElement) {
    const forms = Array.from(document.querySelectorAll(classElement.formSelector));
    forms.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListener(formElement, classElement);
    });
}


enableValidation({
    formSelector: '.popup-content',
    inputSelector: '.popup-content__form',
    submitButtonSelector: '.popup-content__save',
    inactiveButtonClass: 'popup-content__save_invalid',
    inputErrorClass: 'popup-content__form_invalid',
    errorClass: 'popup-content__error',
});