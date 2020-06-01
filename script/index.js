const popupEdit = document.querySelector('.popup__edit');
const editButton = document.querySelector('.profile__button-rename');
const escapeButton = document.querySelector('.popup__escape');
const escapeButtonPlaceAdd = document.querySelector('.popup__escape_active');
const escapeButtonPlacePhoto = document.querySelector('.popup__escape_place_photo');
const popupAdd = document.querySelector('.popup__add');
const addButton = document.querySelector('.profile__button');
let formElementAdd = document.querySelector('.popup__container_place-add');
const elements = document.querySelector('.elements');//контейнер для карточки

//поля ввода
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_job');
let formElement = document.querySelector('.popup__container');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

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
initialCards.forEach(element => {
  const name = element.name;
  const link = element.link;
  addCard(link, name);
});


//открыть-закрыть окно редактирования popup__edit
function togglePopupEdit() {
  if (!popupEdit.classList.contains('popup_opened')) {
    popupEdit.classList.add('popup_opened');
  }

  else {
    popupEdit.classList.remove('popup_opened');
  }
}

//изменить данные пользователя через окно ред-я popup__edit
function formSubmitHandler(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  togglePopupEdit();
}

editButton.addEventListener('click', togglePopupEdit);//открыть окно ред-я
escapeButton.addEventListener('click', togglePopupEdit);//закрыть окно ред-я
formElement.addEventListener('submit', formSubmitHandler);//внести изменения 

//добавить карточку
function addCard(link, name) {
  const elementCard = document.querySelector('#card').content;//загатовка карточки
  const cardContent = elementCard.cloneNode(true);
  cardContent.querySelector('.element__photo').src = link;
  cardContent.querySelector('.element__title').textContent = name;
  cardContent.querySelector('.element__photo').alt = name;

  /* удалить карточку */
  const deleteButton = cardContent.querySelectorAll('.element__delete');
  function del(evt) {
    evt.target.closest('.element').remove();
  }
  deleteButton.forEach(function (elem) {
    elem.addEventListener('click', del);
  });

  /* лайкнуть карточку */
  const likeButton = cardContent.querySelectorAll('.element__like');
  likeButton.forEach(function (elem) {
    elem.addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__like_active')
    })
  });

  /* увеличить карточку (открыть popup__photo)*/
  const zoomPhoto = cardContent.querySelector('.element__photo');
  zoomPhoto.addEventListener('click', function (evt) {
    popupPhoto.classList.add('popup_opened');
    popupPhotoZoom.src = link;
    popupPhotoZoom.alt = name;
    popupTitleZoom.textContent = name;
  });

  elements.prepend(cardContent);
};

//закрыть попап popup__photo
const buttonClosePopupPhoto = document.querySelector('.popup__escape_place_photo');
const popupPhoto = document.querySelector('.popup__photo');
const popupPhotoZoom = popupPhoto.querySelector('.popup__photo-zoom');
const popupTitleZoom = popupPhoto.querySelector('.popup__caption');
function closePopupPhoto() {
  popupPhoto.classList.remove('popup_opened');
}
buttonClosePopupPhoto.addEventListener('click', closePopupPhoto);

//закрыть-открыть форму добавления фото popup__add
function togglePopupAdd() {
  popupAdd.classList.toggle('popup_opened');
}

function addFormSubmitHandler(evt) {
  const photoInput = document.querySelector('.popup__input_photo');
  const titleInput = document.querySelector('.popup__input_title');
  const name = titleInput.value;
  const link = photoInput.value;
  evt.preventDefault();
  togglePopupAdd();
  addCard(link, name);
  photoInput.value = '';
  titleInput.value = '';
};

formElementAdd.addEventListener('submit', addFormSubmitHandler);
addButton.addEventListener('click', togglePopupAdd);
escapeButtonPlaceAdd.addEventListener('click', togglePopupAdd);
