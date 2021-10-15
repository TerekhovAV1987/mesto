//Находим popup profile
const popupProfile = document.querySelector('.popup_item_create-profile');
//Находим popup plcae
const popupPlace = document.querySelector('.popup_item_create-place');
//Находим popup image
const popupImage = document.querySelector('.popup_item_create-image');
//находим кнопку закрытия popupProfile
const popupCloseProfile = document.querySelector('.popup__close_button_profile');
//находим кнопку закрытия popupImage
const popupCloseImage = document.querySelector('.popup__close_button_image');
//находим кнопку закрытия popupPlace
const popupClosePlace = document.querySelector('.popup__close_button_place');
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
//Находим кнопку сохранить popupPlace
const saveButton = popupPlace.querySelector('.popup-content__save');

const popupImagePreview = document.querySelector('.popup__preview-image');
const popupCaption = document.querySelector('.popup__caption-image');

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



//Для отображения popup. Чтобы не создавать на каждый попап функцию открытия, использую popupName для функции
function handleOpenedPopup(popupName) {
  popupName.classList.add('popup_is-opened');
};
//Для скрытия popup
function handleClosedPopup(popupName) {
  popupName.classList.remove('popup_is-opened');
};



//создание общей функции для карточек
function createCard(item) {
  //Находим template
  const elementsTemplate = document.querySelector('#elements-template').content.cloneNode(true);
  //находим изображение в template
  const elementPicture = elementsTemplate.querySelector('.element__picture');
  //находим кнопку like в template
  const elementLike = elementsTemplate.querySelector('.element__like');
  //находим кнопку удалить в template
  const elementDelete = elementsTemplate.querySelector('.element__delete');

  elementsTemplate.querySelector('.element__title').textContent = item.name;
  elementPicture.src = item.link;
  elementPicture.alt = item.name;
  //удаление
  elementDelete.addEventListener('click', function(event) {
    event.target.closest('.element').remove();
  });

  //like
  elementLike.addEventListener('click', function(event) {
    event.target.classList.toggle('element__like_active');
  });

  //увеличение изображения
  elementPicture.addEventListener('click', function (){
    popupImagePreview.src = item.link;
    popupCaption.textContent = item.name;
    handleOpenedPopup(popupImage);
  });

  return elementsTemplate;
}

//функция добавления новых карточек
function addCard(item) {
  const elementsTemplate = createCard(item);
  elementsContainer.prepend(elementsTemplate);
}

//загрузка карточек по умолчанию
initialCards.forEach(element => {
  addCard(element);
});

function reloadContent() {
    userName.value = profileTitle.textContent;
    userProfile.value = profileSubtitle.textContent;
    //При открытии popup поля заполняются данными из profile
    handleOpenedPopup(popupProfile);
};

editButton.addEventListener('click', reloadContent);

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
    handleClosedPopup(popupProfile);
};

//Для создания новой карточки

addButton.addEventListener('click', () => handleOpenedPopup(popupPlace));

// function addCard(placeNameValue, placeLinkValue) {

//   const placeContainer = document.querySelector('.elements');
//   const placeTemplate = document.querySelector('#elements-template').content;
//   const placeItem = placeTemplate.cloneNode(true);
//   const placePicture = placeItem.querySelector('.element__picture');

//   placeItem.querySelector('.element__picture').src = placeLinkValue;
//   placeItem.querySelector('.element__title').textContent = placeNameValue;
//   //Активируем кнопку like
//   placeItem.querySelector('.element__like').addEventListener('click', function (evt) {
//     evt.target.classList.toggle('element__like_active');
//   });

//   //Удаляем карточки которые были добавлены на страницу
//   placeItem.querySelector('.element__delete').addEventListener('click', function (event){
//      event.target.closest('.element').remove();
//   });

//     //Popup увеличенное изображение
//   placePicture.addEventListener('click', function() {
//     popupImagePreview.src = placeLinkValue;
//     popupCaption.textContent = placeNameValue;
//     handleOpenedPopup(popupImage);
//   });
  
//   placeContainer.prepend(placeItem); //prepend впереди всех, append после всех 
// };

//   saveButton.addEventListener('click', function(event) {
//   event.preventDefault();
//   // const place = document.querySelector('.popup-content__form_place_name');
//   // const link = document.querySelector('.popup-content__form_place_link');

//   addCard(placeName.value, placeLink.value);
//   handleClosedPopup(popupPlace);

//   placeName.value = '';
//   placeLink.value = '';
// });



//Следим за событием 'submit'
popupProfile.addEventListener('submit', submitContent);

//Для закрытия popupProfile по кнопке "Закрыть"
popupCloseProfile.addEventListener('click', () => handleClosedPopup(popupProfile));
//Для закрытия popupImage по кнопке "Закрыть"
popupCloseImage.addEventListener('click', () => handleClosedPopup(popupImage));
//Для закрытия popupPlace по кнопке "Закрыть"
popupClosePlace.addEventListener('click', () => handleClosedPopup(popupPlace));