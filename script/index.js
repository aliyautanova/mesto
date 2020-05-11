const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__button-rename');
const escapeButton = document.querySelector('.popup__button-escape');
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_job');
let formElement = document.querySelector('.popup__container');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup();
}

editButton.addEventListener('click', openPopup);
escapeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
