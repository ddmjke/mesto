const validateInput = (formElement, inputElement, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (inputElement.validity.valid) {
    errorElement.classList.remove(errorClass);
  } else {
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);    
  }
}

const hasInvalidInput = (inputs) => {
  return inputs.some((inputElement) => {return !inputElement.validity.valid;})
}

const toggleButtonState = (button, inputs, inactiveButtonClass) => {
  if (hasInvalidInput(inputs)){
    button.classList.add(inactiveButtonClass);
  } else {
    button.classList.remove(inactiveButtonClass);
  }
}

const setEventListeners = (formElement, uglyObject) => {
  const inputsArray = Array.from(formElement.querySelectorAll(uglyObject.inputSelector));
  const buttonElement = formElement.querySelector(uglyObject.submitButtonSelector);
  toggleButtonState(buttonElement, inputsArray, uglyObject.inactiveButtonClass);
  inputsArray.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      validateInput(formElement, inputElement, uglyObject.errorClass);
      toggleButtonState(buttonElement, inputsArray, uglyObject.inactiveButtonClass);
    })
  })
}

const enableValidation = (uglyObject) => {
  const formsArray = Array.from(document.querySelectorAll(uglyObject.formSelector));
  formsArray.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, uglyObject);
  })
}

enableValidation({
  formSelector: '.pop-up__form',
  inputSelector: '.pop-up__input',
  submitButtonSelector: '.pop-up__submit-button',
  inactiveButtonClass: 'pop-up__submit-button_inactive',
  inputErrorClass: 'pop-up__input-error',
  errorClass: 'pop-up__input-error_visable'
}); 