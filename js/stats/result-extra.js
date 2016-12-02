export default (extra) => extra.map((value) => `
  <tr>
    <td></td>
    <td class="result__extra">${value.title}:</td>
    <td class="result__extra">${value.value}&nbsp;<span class="stats__result stats__result--${value.name}"></span></td>
    <td class="result__points">×&nbsp;${value.points}</td>
    <td class="result__total">${value.total}</td>
  </tr>`).join('');
