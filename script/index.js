
const popupEdit = document.querySelector('.popup__edit');
const editButton = document.querySelector('.profile__button-rename');
const escapeButton = document.querySelector('.popup__escape');
const escapeButtonPlaceAdd = document.querySelector('.popup__escape_active');
const popupAdd = document.querySelector('.popup__add');
const addButton = document.querySelector('.profile__button');
const formElementAdd = document.querySelector('.popup__container_place-add');
const elements = document.querySelector('.elements');//контейнер для карточки
const buttonClosePopupPhoto = document.querySelector('.popup__escape_place_photo');
const popupPhoto = document.querySelector('.popup__photo');
const popupPhotoZoom = popupPhoto.querySelector('.popup__photo-zoom');
const popupTitleZoom = popupPhoto.querySelector('.popup__caption');
//поля ввода
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_job');
const formElement = document.querySelector('.popup__container');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

//передаем объект в аргумент
const validSettings = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-disabled',
  inputErrorClass: 'popup__input_border-error',
  errorClass: '.popup__input-error_active'
};

//открыть-закрыть окно редактирования popup__edit
function togglePopup(element) {
  if (!element.classList.contains('popup_opened')) {
    element.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    document.addEventListener('keydown', closeByEsc);
    enableValidation(validSettings);
  }
  else {
    element.classList.remove('popup_opened');
  }
}

//изменить данные пользователя через окно ред-я popup__edit
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  togglePopup(popupEdit);
}

//добавить карточку
function addCard(link, name) {
  const elementCard = document.querySelector('#card').content;//загатовка карточки
  const cardContent = elementCard.cloneNode(true);
  const cardPhoto = cardContent.querySelector('.element__photo');
  const cardTitle = cardContent.querySelector('.element__title');
  const deleteButton = cardContent.querySelector('.element__delete');
  const likeButton = cardContent.querySelector('.element__like');
  const zoomPhoto = cardContent.querySelector('.element__photo');
  cardPhoto.src = link;
  cardTitle.textContent = name;
  cardPhoto.alt = name;

  /* удалить карточку */
  deleteButton.addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  });

  /* лайкнуть карточку */
  likeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active');
  });

  /* увеличить карточку (открыть popup__photo)*/
  zoomPhoto.addEventListener('click', () => {
    popupPhoto.classList.add('popup_opened');
    popupPhotoZoom.src = link;
    popupPhotoZoom.alt = name;
    popupTitleZoom.textContent = name;
    document.addEventListener('keydown', closeByEsc);
  });
  elements.prepend(cardContent);
}

initialCards.forEach((element) => {
  addCard(element.link, element.name);
});

//закрыть-открыть форму добавления фото popup__add
function addFormSubmitHandler(evt) {
  const photoInput = document.querySelector('.popup__input_photo');
  const titleInput = document.querySelector('.popup__input_title');
  const name = titleInput.value;
  const link = photoInput.value;
  evt.preventDefault();
  togglePopup(popupAdd);
  addCard(link, name);

  photoInput.value = '';
  titleInput.value = '';
};

//закрыть форму через esc
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    document.querySelector('.popup_opened').classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc)
  };
};

//закрыть форму через оверлэй
document.addEventListener('click', function (evt) {
  evt.target.classList.remove('popup_opened');
  //остановим всплытие
  evt.stopPropagation();
});

formElementAdd.addEventListener('submit', addFormSubmitHandler); //отправить данные popup__add
addButton.addEventListener('click', () => togglePopup(popupAdd));//открыть попап popup__photo
escapeButtonPlaceAdd.addEventListener('click', () => togglePopup(popupAdd));//закрыть попап popup__add
buttonClosePopupPhoto.addEventListener('click', () => togglePopup(popupPhoto));//закрыть попап popup__photo
editButton.addEventListener('click', () => togglePopup(popupEdit));//открыть окно ред-я
escapeButton.addEventListener('click', () => togglePopup(popupEdit));//закрыть окно ред-я
formElement.addEventListener('submit', formSubmitHandler);//внести изменения 

// включение валидации вызовом enableValidation
// все настройки c аргументом передаются при вызове
enableValidation(validSettings);