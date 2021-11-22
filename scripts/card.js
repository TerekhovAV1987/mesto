export class Card {
    constructor(name, link, template) {
        this._name = name;
        this._link = link;
        this._template = template;
    }

    _getTemplate() {
        const Element = document
            .querySelector(this._template)
            .content
            .cloneNode(true)
        return Element;
    }

    _setEventListener(openPopup) {
        this._elementPicture.addEventListener('click', () => {
            const popup = document.querySelector('.popup_item_create-image');
            const image = popup.querySelector('.popup__preview-image');
            const imageName = popup.querySelector('.popup__caption-image');
            image.src = this._link;
            image.alt = this._name;
            imageName.textContent = this._name;
            openPopup(popup);
        });

        this._elementLike.addEventListener('click', function (evt) {
            evt.target.classList.toggle('element__like_active');
        })

        this._elementDelete.addEventListener('click', function (evt) {
            evt.target.parentNode.remove()
        })

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