const validateInput = (formElement, inputElement, errorClass, inputErrorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (inputElement.validity.valid) {
    inputElement.classList.remove(inputErrorClass)
    errorElement.classList.remove(errorClass);
  } else {
    inputElement.classList.add(inputErrorClass)
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);    
  }
}

const hasInvalidInput = (inputs) => {
  return inputs.some((inputElement) => {return !inputElement.validity.valid});
}

const toggleButtonState = (button, inputs, inactiveButtonClass) => {
  if (hasInvalidInput(inputs)){
    button.setAttribute('disabled','');
    button.classList.add(inactiveButtonClass);
  } else {
    button.removeAttribute('disabled');
    button.classList.remove(inactiveButtonClass);
  }
}

const setEventListeners = (formElement, uglyObject) => {
  const inputsArray = Array.from(formElement.querySelectorAll(uglyObject.inputSelector));
  const buttonElement = formElement.querySelector(uglyObject.submitButtonSelector);
  toggleButtonState(buttonElement, inputsArray, uglyObject.inactiveButtonClass);
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    buttonElement.setAttribute('disabled','');
    buttonElement.classList.add(uglyObject.inactiveButtonClass);
  })
  inputsArray.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      validateInput(formElement, inputElement, uglyObject.errorClass, uglyObject.inputErrorClass);
      toggleButtonState(buttonElement, inputsArray, uglyObject.inactiveButtonClass);
    });
  });
}

const enableValidation = (uglyObject) => {
  const formsArray = Array.from(document.querySelectorAll(uglyObject.formSelector));
  formsArray.forEach((form) => {
    setEventListeners(form, uglyObject);
  });
}

enableValidation({
  formSelector: '.pop-up__form',
  inputSelector: '.pop-up__input',
  submitButtonSelector: '.pop-up__submit-button',
  inactiveButtonClass: 'pop-up__submit-button_inactive',
  inputErrorClass: 'pop-up__input_invalid',
  errorClass: 'pop-up__input-error_visable'
});