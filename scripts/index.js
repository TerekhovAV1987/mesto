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

    elementsContainer.append(elementsItem)
});

//Выбираем элементы, куда добавятся значения полей
const putName = profile.querySelector('.profile__title');
const putProfile = profile.querySelector('.profile__subtitle');

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

//Следим за событием 'submit'
popupForm.addEventListener('submit', submitContent);

editButton.addEventListener('click', reloadContent);

//Для закрытия popup по кнопке "Закрыть"
modalWindowCloseButton.addEventListener('click', modalWindowClosed);
