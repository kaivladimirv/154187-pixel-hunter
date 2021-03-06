import AbstractView from '../abstract-view';
import ResultExtraView from './result-extra-view';
import StatsResultView from '../common/stats-result-view';

export default class ResultView extends AbstractView {
  constructor(data, index) {
    super();
    this._data = data;
    this._index = index;
  }

  getMarkup() {
    return `
      <table class="result__table">
        ${(this._data.lives > 0) ? this._getMarkupResultSuccess() : ''}
        ${(this._data.lives === 0) ? this._getMarkupResultFail() : ''}
      </table>`;
  }

  _getMarkupResultFail() {
    let statsResult = new StatsResultView(this._data.stats);

    return `
      <tr>
        <td class="result__number">${this._index}.</td>
        <td>
          ${statsResult.getMarkup()}
        </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>`;
  }

  _getMarkupResultSuccess() {
    let statsResult = new StatsResultView(this._data.stats);
    let resultExtra = new ResultExtraView(this._data.extra);

    return `
      <tr>
        <td class="result__number">${this._index}.</td>
        <td colspan="2">
          ${statsResult.getMarkup()}
        </td>
        <td class="result__points">×&nbsp;${this._data.points}</td>
        <td class="result__total">${this._data.total}</td>
      </tr>
      ${resultExtra.getMarkup()}  
      <tr>
        <td colspan="5" class="result__total  result__total--final">${this._data.totalFinal}</td>
      </tr>`;
  }
}
