import createElementFromTemplate from './create-element-from-template';
import renderElement from './render-element';
import nextElement from './game-3';

let data = {
  task: 'Угадай, фото или рисунок?',
  timer: 'NN',
  lives: [
    'empty',
    'full',
    'full'
  ],
  question: {
    image: 'http://placehold.it/705x455',
    alt: 'Option 1'
  },
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
  ]
};

let gameLives = `
  <div class="game__lives">
    ${data.lives.map((value) => `<img src="img/heart__${value}.svg" class="game__heart" alt="Life" width="32" height="32">`).join(' ')}
  </div>`;

let header = `
  <header class="header">
    <div class="header__back">
      <span class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.png" width="101" height="44">
      </span>
    </div>
    <h1 class="game__timer">${data.timer}</h1>
    ${gameLives}
  </header>`;

let gameContent = `
  <form class="game__content  game__content--wide">
    <div class="game__option">
      <img src="${data.question.image}" alt="${data.question.alt}" width="705" height="455">
      <label class="game__answer  game__answer--photo">
        <input name="question1" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--wide  game__answer--paint">
        <input name="question1" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>
  </form>`;

let stats = `
  <div class="stats">
    <ul class="stats">
      ${data.stats.map((value) => `<li class="stats__result stats__result--${value}"></li>`)}
    </ul>
  </div>`;

let template = `
  ${header}
  <div class="game">
    <p class="game__task">${data.task}</p>
    ${gameContent}
    ${stats}
  </div>`;

const moduleElement = createElementFromTemplate(template);

moduleElement.querySelector('.game').onclick = (e) => {
  if (e.target.parentElement.classList.contains('game__answer')) {
    renderElement(nextElement);
  }
};

export default moduleElement;
