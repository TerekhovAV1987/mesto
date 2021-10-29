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
// function handleOpenedPopup(popupName) {
//   popupName.classList.add('popup_is-opened');
//   document.addEventListener('keydown', function(evt) {
//     if(evt.key === 'Escape') {
//       handleClosedPopup(popupName);
//     }
//   })
// };

// //Для скрытия popup
// function handleClosedPopup(popupName) {
//   popupName.classList.remove('popup_is-opened');
//   document.removeEventListener('keydown', function(evt) {
//     if(evt.key === 'Escape') {
//       handleClosedPopup(popupName);
//     }
//   })
// };

function openPopup(openedPopup) {
  openedPopup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEsc);
}

function closePopup(openedPopup) {
  openedPopup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEsc);
}


const esc_code = 'Escape';
//Для закрытия по escape
function closeByEsc(evt) {
  if(evt.key === esc_code) {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}

//Для закрытия по overlay
function closeOverlay(evt) {
  if(evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
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
    popupImagePreview.alt = item.name;
    popupCaption.textContent = item.name;
    openPopup(popupImage);
    // handleOpenedPopup(popupImage);
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
    openPopup(popupProfile);
    // handleOpenedPopup(popupProfile);
};

function setSubmitButtonState(isFormValid) {
  if (isFormValid) {
    saveButton.removeAttribute('disabled');
    saveButton.classList.remove('popup-content__save_invalid');
  } else {
    saveButton.setAttribute('disabled', true);
    saveButton.classList.add('popup-content__save_invalid');
  }
}

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
    closePopup(popupProfile);
    // handleClosedPopup(popupProfile);

};

//Для создания новой карточки

// // addButton.addEventListener('click', () => handleOpenedPopup(popupPlace));
// addButton.addEventListener('click', () => openPopup(popupPlace));

//   saveButton.addEventListener('click', function(event) {
//   event.preventDefault();
//   const card = {}
//   card.link = placeLink.value;
//   card.name = placeName.value;
//   addCard(card);
//     closePopup(popupPlace);
//   // handleClosedPopup(popupPlace);

//   placeName.value = '';
//   placeLink.value = '';
// });

function sumbitCards(evt) {
  evt.preventDefault();
  const card = {};
  card.link = placeLink.value;
  card.name = placeName.value;
  addCard(card);
  closePopup(popupPlace);
  setSubmitButtonState(false);

  placeName.value = '';
  placeLink.value = '';
}

addButton.addEventListener('click', function () {
  openPopup(popupPlace);
});

//Следим за событием 'submit'
popupProfile.addEventListener('submit', submitContent);

popupPlace.addEventListener('submit', sumbitCards);

//Для закрытия popupProfile по кнопке "Закрыть"
// popupCloseProfile.addEventListener('click', () => handleClosedPopup(popupProfile));
popupCloseProfile.addEventListener('click', () => closePopup(popupProfile));
//Для закрытия popupImage по кнопке "Закрыть"
popupCloseImage.addEventListener('click', () => closePopup(popupImage));
//Для закрытия popupPlace по кнопке "Закрыть"
popupClosePlace.addEventListener('click', () => closePopup(popupPlace));

//Для закрытия popupProfile по клику на overlay
popupProfile.addEventListener('click', closeOverlay);
//Для закрытия popupImage по клику на overlay
popupImage.addEventListener('click', closeOverlay);
//Для закрытия popupPlace по клику на overlay
popupPlace.addEventListener('click', closeOverlay);