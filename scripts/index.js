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
