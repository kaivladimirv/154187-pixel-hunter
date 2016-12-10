import AbstractView from '../abstract-view';

export default class ResultExtraView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getMarkup() {
    return this._data.map((value) => `
      <tr>
        <td></td>
        <td class="result__extra">${value.title}:</td>
        <td class="result__extra">${value.value}&nbsp;<span class="stats__result stats__result--${value.name}"></span></td>
        <td class="result__points">×&nbsp;${value.points}</td>
        <td class="result__total">${value.total}</td>
      </tr>`).join(' ');
  }
}
