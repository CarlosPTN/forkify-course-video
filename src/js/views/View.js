import icons from 'url:../../img/icons.svg'; // Parcel 2
export default class View {
  _data;

  /**
   * Render the received objct to the DOM
   * @param {Object  || Object[]} data The data to be rendered for example a recipe
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} a markup string is returned if the render=false
   * @this {Object} View object
   * @author Carlos Oliveira
   *
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    // console.log(data);
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) {
      return markup;
    }

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
    // console.log(this);
  }

  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();
    // console.log(data);
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    // console.log(newElements);
    const curElements = Array.from(this._parentEl.querySelectorAll('*'));
    // console.log(curElements);
    // console.log(newElements);

    // console.log(newElements);
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // Updates changed text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('🤡', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        // console.log(Array.from(newEl.attributes));
        Array.from(newEl.attributes).forEach(
          attr => curEl.setAttribute(attr.name, attr.value) // we are replacing the current attributes by the new element
        );
      }
    });
  }

  _clear() {
    console.log(this._parentEl);
    this._parentEl.innerHTML = '';
  }

  renderSpinner() {
    console.log(icons);
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderError = function (msg = this._errorMessage) {
    const markup = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${msg}</p>
        </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  };

  renderMessage = function (msg = this._message) {
    const markup = `
        <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${msg}</p>
        </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  };
}
