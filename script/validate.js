//создаем функции показать-скрыть ошибку
const showInputError = (formElement, inputElement, errorMessage, argument) => {
  //находим эл-т с ошибкой внутри ф-ции
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(argument.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(argument.errorClass);
};

const hideInputError = (formElement, inputElement, argument) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(argument.inputErrorClass);
  errorElement.classList.remove(argument.errorClass);
  errorElement.textContent = ' ';
};

//проверяем на валидность
const isValid = (formElement, inputElement, argument) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, argument);
  } else {
    hideInputError(formElement, inputElement, argument);
  }
};

//добавляем слушатель события всем полям формы
const setEventListener = (formElement, argument) => {
  //находим все поля формы и делаем из них массив
  const inputList = Array.from(formElement.querySelectorAll(argument.inputSelector));
  //находит кнопку отправки
  const buttonElement = formElement.querySelector(argument.submitButtonSelector);
  toggleButtonState(formElement, buttonElement, argument.inactiveButtonClass);

  //добавляем слушатель каждому полю
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, argument);
    });
  });
  formElement.addEventListener('input', () => toggleButtonState(formElement, buttonElement, argument.inactiveButtonClass));
};

//добавляем обработчика всем формам
const enableValidation = (argument) => {
  //находим все форма и делаем из них массив
  const formList = Array.from(document.querySelectorAll(argument.formSelector));

  //отменяем стандартное поведение для каждой формы
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListener(formElement, argument);
  });
};

//поведение submit при валидации формы
const toggleButtonState = (formElement, submitButton, inactiveButtonClass) => {
  const checkError = !formElement.checkValidity();
  submitButton.disabled = checkError;
  submitButton.classList.toggle(inactiveButtonClass, checkError);
}
