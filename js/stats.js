import createElementFromTemplate from './create-element-from-template';

let data = {
  title: 'Победа!',
  results: [
    {
      gameNumber: 1,
      status: 'success',
      stats: [
        'wrong',
        'slow',
        'fast',
        'correct',
        'wrong',
        'unknown',
        'slow',
        'unknown',
        'fast',
        'unknown'
      ],
      points: 100,
      total: 900,
      totalFinal: 950,
      extra: [
        {
          name: 'fast',
          title: 'Бонус за скорость',
          value: 1,
          points: 50,
          total: 50,
        },
        {
          name: 'heart',
          title: 'Бонус за жизни',
          value: 2,
          points: 50,
          total: 100,
        },
        {
          name: 'slow',
          title: 'Штраф за медлительность',
          value: 2,
          points: 50,
          total: -100,
        }
      ]
    },
    {
      gameNumber: 2,
      status: 'fail',
      stats: [
        'wrong',
        'slow',
        'fast',
        'correct',
        'wrong',
        'unknown',
        'slow',
        'wrong',
        'fast',
        'wrong'
      ],
      totalFinal: 'fail',
      extra: []
    },
    {
      gameNumber: 3,
      status: 'success',
      stats: [
        'wrong',
        'slow',
        'fast',
        'correct',
        'wrong',
        'unknown',
        'slow',
        'unknown',
        'fast',
        'unknown'
      ],
      points: 100,
      total: 900,
      totalFinal: 950,
      extra: [
        {
          name: 'heart',
          title: 'Бонус за жизни',
          value: 2,
          points: 50,
          total: 100,
        }
      ]
    },
  ]
};

let header = `
  <header class="header">
    <div class="header__back">
      <span class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.png" width="101" height="44">
      </span>
    </div>
  </header>`;

let resultExtra = (extra) => extra.map((value) => `
  <tr>
    <td></td>
    <td class="result__extra">${value.title}:</td>
    <td class="result__extra">${value.value}&nbsp;<span class="stats__result stats__result--${value.name}"></span></td>
    <td class="result__points">×&nbsp;${value.points}</td>
    <td class="result__total">${value.total}</td>
  </tr>`).join('');

let resultStats = (stats) => `
  <ul class="stats">
    ${stats.map((value) => `<li class="stats__result stats__result--${value}"></li>`)}
  </ul>`;

let resultFail = (result) => `
  <tr>
    <td class="result__number">${result.gameNumber}.</td>
    <td>
      ${resultStats(result.stats)}
    </td>
    <td class="result__total"></td>
    <td class="result__total  result__total--final">fail</td>
  </tr>`;

let resultSuccess = (result) => `
  <tr>
    <td class="result__number">${result.gameNumber}.</td>
    <td colspan="2">
      ${resultStats(result.stats)}
    </td>
    <td class="result__points">×&nbsp;${result.points}</td>
    <td class="result__total">${result.total}</td>
  </tr>
  ${resultExtra(result.extra)}
  <tr>
    <td colspan="5" class="result__total  result__total--final">${result.totalFinal}</td>
  </tr>`;

let resultItem = (result) => `
  <table class="result__table">
    ${(result.status === 'success') ? resultSuccess(result) : ''}
    ${(result.status === 'fail') ? resultFail(result) : ''}
  </table>`;

let resultsList = data.results.map(resultItem).join('');

let template = `
  ${header}
  <div class="result">
    <h1>${data.title}</h1>
    ${resultsList}
  </div>`;

const moduleElement = createElementFromTemplate(template);

export default moduleElement;
