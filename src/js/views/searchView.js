class SearchView {
  _parentEl = document.querySelector('.search');

  getQuery() {
    // console.log(this._parentEl.querySelector('.search__field'));
    const query = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  addHandleSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault(); // we cannot pass direclty the handler because when we have "submit", so submit a form first we need to prevent default action, because otherwise page is going to reload

      handler();
    });
  }
}

export default new SearchView();
