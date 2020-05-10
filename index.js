//создаем привязки для 'popup' контейнера и кнопки "изменить"
const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__button-rename');

//создаем переменные для строк ввода попапа
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_job');
//создаем модификатор, который делает окно видимым
//модифакатор добавился => заполняем значения input из строк
editButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
  if (popup.classList.contains('popup_opened')) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
  }
});

//закрытие формы
//создаем привязку для кнопки 'закрыть'
const escapeButton = document.querySelector('.popup__button-escape');
//удаляем модификатор => форма закрывается
function closePopup() {
  popup.classList.remove('popup_opened');
}
//удаляем модификатор => закрываем форму
escapeButton.addEventListener('click', closePopup);

//создаем переменную формы
let formElement = document.querySelector('.popup__container');
//создаем переменные для строк секции profile
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

//форма отправки
function formSubmitHandler(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
