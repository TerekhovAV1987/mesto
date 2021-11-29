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