import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

//Находим popup profile
const popupProfile = document.querySelector('.popup_item_create-profile');
//Находим popup plcae
const popupPlace = document.querySelector('.popup_item_create-place');
//Находим секцию profile
const profile = document.querySelector('.profile');
//Находим в profile кнопку редактирования
const editButton = profile.querySelector('.profile__edit-button');
//Находим Имя profile куда добавятся значения полей
const profileTitle = profile.querySelector('.profile__title');
//Находим Профиль profile куда добавятся значения полей
const profileSubtitle = profile.querySelector('.profile__subtitle');
//Находим кнопку добавления новых карточек в profile
const addButton = profile.querySelector('.profile__add-button');
//Находим форму редактирования профиля 
const editProfile = popupProfile.querySelector('.popup-content__item_profile');
//Находим форму добавления карточки
const addPlace = popupPlace.querySelector('.popup-content__item_place');
//Находим поля формы редактирования профиля
const userName = popupProfile.querySelector('.popup-content__form_type_name');
const userProfile = popupProfile.querySelector('.popup-content__form_type_profile');
//Находим поля формы добавления карточки
const placeName = popupPlace.querySelector('.popup-content__form_place_name');
const placeLink = popupPlace.querySelector('.popup-content__form_place_link');

//находим контейнер elements куда будут добавляться карточки
const elementsContainer = document.querySelector('.elements');




//Массив карточек, которые должны отображаться при загрузке страницы
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

const classSelector = {
  inputSelector: '.popup-content__form',
  submitButtonSelector: '.popup-content__save',
  inactiveButtonClass: 'popup-content__save_invalid',
  inputErrorClass: 'popup-content__form_invalid',
  errorClass: 'popup-content__error',
};

const formEditProfileValidity = new FormValidator(classSelector, popupProfile);
const formAddPlaceValidity = new FormValidator(classSelector, popupPlace);


//функция добавления новых карточек
function addCard(item) {
  const card = new Card(item.name, item.link, '#elements-template');
  const cardElements = card.createElement(openPopup);
  elementsContainer.prepend(cardElements);
}

function reloadFormEditProfile() {
  userName.value = profileTitle.textContent;
  userProfile.value = profileSubtitle.textContent;
}

function clearInputs(form) { 
  const inputs = Array.from(form.querySelectorAll('.popup-content__form'));
  inputs.forEach((input) => {
    input.value = '';
    input.classList.remove('popup-content__form_invalid');
  });
}

function clearErrors(form) { 
  const errors = Array.from(form.querySelectorAll('.popup-content__error'));
  errors.forEach((error) => {
    error.textContent = '';
    error.classList.remove('popup-content__error');
  });
}


function disableBtn(form) {
  const button = form.querySelector('.popup-content__save');
  button.disabled = true;
  button.classList.add('popup-content__save_invalid');
}

function activateBtn(form) {
  const button = form.querySelector('.popup-content__save');
  button.disabled = false;
  button.classList.remove('popup-content__save_invalid');
}

export function openPopup(openedPopup) {
  openedPopup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEsc);
}

function closePopup(openedPopup) {
  openedPopup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEsc);
}


function setEventListenerPopups() {
  const popups = Array.from(document.querySelectorAll('.popup'));
  popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if ((evt.target === evt.currentTarget) || (evt.target.classList.contains('popup__close'))) {
        closePopup(popup);
      }
    })
  })
}

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closePopup(popup);
  }
}


setEventListenerPopups();

addButton.addEventListener('click', function () {
  openPopup(popupPlace);
  clearInputs(popupPlace);
  clearErrors(popupPlace);
  disableBtn(popupPlace);

})

editButton.addEventListener('click', function () {
  openPopup(popupProfile);
  clearInputs(popupProfile);
  clearErrors(popupProfile);
  activateBtn(popupProfile);
  reloadFormEditProfile();
})

//загрузка карточек по умолчанию
initialCards.forEach(element => {
  addCard(element);
});



formEditProfileValidity.enableValidation();
formAddPlaceValidity.enableValidation();


//Для отправки формы
function submitContent(evt) {
    evt.preventDefault();
    //Получение полей input из свойства Value
    const userNameValue = userName.value;
    const userProfileValue = userProfile.value;
    //Добавляем значения
    profileTitle.textContent = userNameValue;
    profileSubtitle.textContent = userProfileValue;
    //Добавляем закрытие после отправки
    closePopup(popupProfile);
};

//Для создания новой карточки

function sumbitCards(evt) {
  evt.preventDefault();
  const card = {};
  card.link = placeLink.value;
  card.name = placeName.value;
  addCard(card);
  closePopup(popupPlace);

  placeName.value = '';
  placeLink.value = '';
}

popupProfile.addEventListener('submit', submitContent);

popupPlace.addEventListener('submit', sumbitCards);


