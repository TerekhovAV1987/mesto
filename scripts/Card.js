import { openPopup } from './index.js';

export class Card {
    constructor(name, link, template) {
        this._name = name;
        this._link = link;
        this._template = template;

        this.popup = document.querySelector('.popup_item_create-image');
        this.image = this.popup.querySelector('.popup__preview-image');
        this.imageName = this.popup.querySelector('.popup__caption-image');
    }

    _getTemplate() {
        const Element = document
            .querySelector(this._template)
            .content
            .cloneNode(true)
        return Element;
    }

    _addlike(){
        this._elementLike.classList.toggle('element__like_active');
    }

    _deleteCard(){
        this._elementDelete.parentNode.remove();
    }

    _handleCard(){
        this.image.src = this._link;
        this.image.alt = this._name;
        this.imageName.textContent = this._name;

        openPopup(this.popup);
    }

    _setEventListener() {
        this._elementPicture.addEventListener('click', () => {
            this._handleCard();
        });

        this._elementLike.addEventListener('click', () => {
           this._addlike();
        });

        this._elementDelete.addEventListener('click', () => {
            this._deleteCard();
        });

    }

    createElement(openPopup) {
        this._element = this._getTemplate();
        this._elementPicture = this._element.querySelector('.element__picture');
        this._elementName = this._element.querySelector('.element__title');
        this._elementLike = this._element.querySelector('.element__like');
        this._elementDelete = this._element.querySelector('.element__delete');
        this._elementName.textContent = this._name;
        this._elementPicture.src = this._link;
        this._elementPicture.alt = this._name;
        this._setEventListener(openPopup);
        return this._element;
    }
}