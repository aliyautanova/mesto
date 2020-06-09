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

//добавить карточки 
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//открыть-закрыть окно редактирования popup__edit
function togglePopup(element) {
  if (!element.classList.contains('popup_opened')) {
    element.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
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

editButton.addEventListener('click', () => togglePopup(popupEdit));//открыть окно ред-я
escapeButton.addEventListener('click', () => togglePopup(popupEdit));//закрыть окно ред-я
formElement.addEventListener('submit', formSubmitHandler);//внести изменения 

//добавить карточку
function addCard(link, name) {
  const elementCard = document.querySelector('#card').content;//загатовка карточки
  const cardContent = elementCard.cloneNode(true);
  cardContent.querySelector('.element__photo').src = link;
  cardContent.querySelector('.element__title').textContent = name;
  cardContent.querySelector('.element__photo').alt = name;

  /* удалить карточку */
  const deleteButton = cardContent.querySelector('.element__delete');
  deleteButton.addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  });

  /* лайкнуть карточку */
  const likeButton = cardContent.querySelector('.element__like');
  likeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active');
  });

  /* увеличить карточку (открыть popup__photo)*/
  const zoomPhoto = cardContent.querySelector('.element__photo');
  zoomPhoto.addEventListener('click', () => {
    popupPhoto.classList.add('popup_opened');
    popupPhotoZoom.src = link;
    popupPhotoZoom.alt = name;
    popupTitleZoom.textContent = name;
  });
  elements.prepend(cardContent);
}

initialCards.forEach((element) => {
  addCard(element.link, element.name);
});

//закрыть попап popup__photo
buttonClosePopupPhoto.addEventListener('click', () => togglePopup(popupPhoto));

//закрыть-открыть форму добавления фото popup__add
function addFormSubmitHandler(evt) {
  const photoInput = document.querySelector('.popup__input_photo');
  const titleInput = document.querySelector('.popup__input_title');
  const name = titleInput.value;
  const link = photoInput.value;
  evt.preventDefault();
  togglePopup(popupAdd);
  addCard(link, name);
  //Здравствуйте, я не очень понимаю, как вызвать метод reset. Я вижу, что в 
  //тренажере есть урок, посвященный этой теме. Я его изучу и обязательно применю.
  //Спасибо за комментарии и правки.
  photoInput.value = '';
  titleInput.value = '';
}

formElementAdd.addEventListener('submit', addFormSubmitHandler);
addButton.addEventListener('click', () => togglePopup(popupAdd));
escapeButtonPlaceAdd.addEventListener('click', () => togglePopup(popupAdd));
