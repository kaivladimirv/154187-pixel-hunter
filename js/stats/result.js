import resultExtra from './result-extra';
import stats from '../game/stats';

let resultFail = (result) => `
  <tr>
    <td class="result__number">${result.gameNumber}.</td>
    <td>
      ${stats(result.stats)}
    </td>
    <td class="result__total"></td>
    <td class="result__total  result__total--final">fail</td>
  </tr>`;

let resultSuccess = (result) => `
  <tr>
    <td class="result__number">${result.gameNumber}.</td>
    <td colspan="2">
      ${stats(result.stats)}
    </td>
    <td class="result__points">×&nbsp;${result.points}</td>
    <td class="result__total">${result.total}</td>
  </tr>
  ${resultExtra(result.extra)}
  <tr>
    <td colspan="5" class="result__total  result__total--final">${result.totalFinal}</td>
  </tr>`;

export default (result) => {
  return `
    <table class="result__table">
      ${(result.status === 'success') ? resultSuccess(result) : ''}
      ${(result.status === 'fail') ? resultFail(result) : ''}
    </table>`;
};
