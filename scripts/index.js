//Находим popup
const modalWindow = document.querySelector('.popup');
//В popup находим кнопку закрытия
const modalWindowCloseButton = modalWindow.querySelector('.popup__close');
//Находим секцию profile
const profile = document.querySelector('.profile');
//Находим в profile кнопку редактирования
const editButton = profile.querySelector('.profile__edit-button');
//Находим форму в popup
const popupForm = modalWindow.querySelector('.popup__content');
//Находим поля формы
const userName = popupForm.querySelector('.popup__user_type_name');
const userProfile = popupForm.querySelector('.popup__user_type_profile');



//Находим кнопку добавления нового места
const addButton = profile.querySelector('.profile__add-button');
//Находим popup__new-place
const popupPlace = document.querySelector('.popup__new-place');
//Находи кнопку закрытия для popup__new-place
const popupPlaceClose = popupPlace.querySelector('.popup__new-place-close');
//Находим форму в popupPlace
const popupPlaceForm = popupPlace.querySelector('.popup__place-content');
//Находим поля формы
const placeName = popupPlaceForm.querySelector('.popup__place_type_name');
const placeLink = popupPlaceForm.querySelector('.popup__place_type_link');
//Находим кнопку создать новую карточку
const createButton = popupPlaceForm.querySelector('.popup__create');


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

const elementsContainer = document.querySelector('.elements');
const elementsTemplate = document.querySelector('#elements-template').content;

initialCards.forEach(function(item){

    const elementsItem = elementsTemplate.cloneNode(true);

    elementsItem.querySelector('.element__picture').src = item.link;
    elementsItem.querySelector('.element__picture').alt = item.name;
    elementsItem.querySelector('.element__title').textContent = item.name;
    //Активируем кнопку like
    elementsItem.querySelector('.element__like').addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__like_active');
    });

    //Удаляем карточки по умолчанию
    elementsItem.querySelector('.element__delete').addEventListener('click', function (event){
      event.target.closest('.element').remove();
    });

    elementsContainer.append(elementsItem)
});

//Выбираем элементы, куда добавятся значения полей
const putName = profile.querySelector('.profile__title');
const putProfile = profile.querySelector('.profile__subtitle');

//Для отображения popup__new-place
function popupPlaceOpened() {
  popupPlace.classList.add('popup_is-opened-place');
};
//Для скрытия popup__new-place
function popupPlaceClosed() {
  popupPlace.classList.remove('popup_is-opened-place');
};

//Для отображения popup
function modalWindowOpened() {
    modalWindow.classList.add('popup_is-opened');
};
//Для скрытия popup
function modalWindowClosed() {
    modalWindow.classList.remove('popup_is-opened');
};

function reloadContent() {
    userName.value = putName.textContent;
    userProfile.value = putProfile.textContent;
    //При открытии popup поля заполняются данными из profile
    modalWindowOpened()
};

//Для отправки формы
function submitContent(evt) {
    evt.preventDefault();
    //Получение полей input из свойства Value
    let userNameValue = userName.value;
    let userProfileValue = userProfile.value;
    //Добавляем значения
    putName.textContent = userNameValue;
    putProfile.textContent = userProfileValue;
    //Добавляем закрытие после отправки
    modalWindowClosed()
};

//Для создания новой карточки

function addPlace(placeNameValue, placeLinkValue) {

  const placeContainer = document.querySelector('.elements');
  const placeTemplate = document.querySelector('#elements-template').content;
  const placeItem = placeTemplate.cloneNode(true);

  placeItem.querySelector('.element__picture').src = placeLinkValue;
  placeItem.querySelector('.element__title').textContent = placeNameValue;
  //Активируем кнопку like
  placeItem.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });

  //Удаляем карточки которые были добавлены на страницу
  placeItem.querySelector('.element__delete').addEventListener('click', function (event){
     event.target.closest('.element').remove();
  });

  placeContainer.prepend(placeItem); //prepend впереди всех, append после всех 
}

createButton.addEventListener('click', function(event) {
  event.preventDefault();
  const place = document.querySelector('.popup__place_type_name');
  const link = document.querySelector('.popup__place_type_link');

  addPlace(place.value, link.value);
  popupPlaceClosed();

  place.value = '';
  link.value = '';
});



//Следим за событием 'submit'
popupForm.addEventListener('submit', submitContent);

editButton.addEventListener('click', reloadContent);

addButton.addEventListener('click', popupPlaceOpened);

//Для закрытия popup по кнопке "Закрыть"
modalWindowCloseButton.addEventListener('click', modalWindowClosed);
popupPlaceClose.addEventListener('click', popupPlaceClosed);