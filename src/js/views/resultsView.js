import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';
import View from './View';
class ResultsView extends View {
  _parentEl = document.querySelector('.results');

  _errorMessage = 'No recipes found for your query! Please try again😖!';

  //   _generateMarkup() {
  //     return this._data.map(this._generateMarkupPreview).join('');
  //   }
  //OR
  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
