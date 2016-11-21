import introElement from './intro';
import greetingElement from './greeting';
import rulesElement from './rules';
import game1Element from './game-1';
import game2Element from './game-2';
import game3Element from './game-3';
import statsElement from './stats';

// Rules
let rulesSubmit = rulesElement.querySelector('.rules__button');

rulesElement.querySelector('.rules__input').oninput = (e) => {
  if (e.target.value) {
    rulesSubmit.removeAttribute('disabled');
  } else {
    rulesSubmit.setAttribute('disabled', '');
  }
};

// Slides changer

let mainElement = document.getElementById('main');

let switcher = document.createElement('div');
switcher.innerHTML =
  `<span class="prev"><img src="img/arrow_left.svg" alt="Left" width="50" height="50"></span>
  <span class="next"><img src="img/arrow_right.svg" alt="Right" width="50" height="50"></span>`;
switcher.style.cssText = 'text-align: center';
mainElement.after(switcher);

let slides = [
  introElement,
  greetingElement,
  rulesElement,
  game1Element,
  game2Element,
  game3Element,
  statsElement
];
let current = -1;

let select = (index) => {
  if (!slides[index]) {
    return;
  }

  current = index;
  mainElement.innerHTML = '';
  mainElement.appendChild(slides[index]);
};

document.querySelector('.next').onclick = (e) => {
  e.preventDefault();

  select(current + 1);
};

document.querySelector('.prev').onclick = (e) => {
  e.preventDefault();

  select(current - 1);
};

select(0);
