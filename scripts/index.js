const modalWindow = document.querySelector('.popup');
const modalWindowCloseButton = modalWindow.querySelector('.popup__close');
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const putName = profile.querySelector('.profile__title');
const putProfile = profile.querySelector('.profile__subtitle');


function toggleModalWindow() {
    modalWindow.classList.toggle('popup_is-opened');
}

function reloadContent() {
    userName.value = putName.textContent;
    userProfile.value = putProfile.textContent;
}

const popupContent = modalWindow.querySelector('.popup__content');
const userName = popupContent.querySelector('.popup__user-name');
const userProfile = popupContent.querySelector('.popup__user-profile');
const popupSave = modalWindow.querySelector('.popup__save');

function submitContent(evt) {
    evt.preventDefault();
    const nameInput = userName.value;
    const profileInput = userProfile.value;
    putName.textContent = nameInput;
    putProfile.textContent = profileInput;
}

popupSave.addEventListener('click', submitContent);

editButton.addEventListener('click', toggleModalWindow);
editButton.addEventListener('click', reloadContent);

modalWindowCloseButton.addEventListener('click', toggleModalWindow);
