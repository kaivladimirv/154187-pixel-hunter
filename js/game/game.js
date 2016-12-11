import {createElementFromTemplate, renderElement} from '../utils';
import HeaderView from './header-view';
import TaskDoubleView from './task-double-view';
import TaskWideView from './task-wide-view';
import TaskTripleView from './task-triple-view';
import gameModel from './game-model';
import showStats from '../stats/stats-view';
import getDataStats from '../data/stats-data';

let timer;
let headerGame;
let contentGame;

function createHeader() {
  return new HeaderView(gameModel.state).element;
}

function updateHeader() {
  const newHeader = createHeader();

  headerGame.parentElement.replaceChild(newHeader, headerGame);
  headerGame = newHeader;
}

function getContentGame() {
  let taskContent;
  let task = gameModel.getTask();

  switch (task.type) {
    case 'double':
      taskContent = new TaskDoubleView(task, gameModel.getStats());
      break;

    case 'wide':
      taskContent = new TaskWideView(task, gameModel.getStats());
      break;

    case 'triple':
      taskContent = new TaskTripleView(task, gameModel.getStats());
      break;

    default:
      throw new Error(`Unknown type task ${task.type}`);
  }

  taskContent.onAnswer = onAnswer;
  return taskContent.element;
}

function updateContentGame() {
  const newContent = getContentGame();

  contentGame.parentElement.replaceChild(newContent, contentGame);
  contentGame = newContent;
}

function onAnswer(answer) {
  stopTimer();

  gameModel.saveAnswer(answer);

  nextTask();
}

function startTimer() {
  gameModel.resetTime();
  updateHeader();

  timer = setInterval(() => {
    if (gameModel.isOverTime()) {
      stopGame();
      return;
    }

    gameModel.tick();
    updateHeader();
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function startTask() {
  updateContentGame();

  startTimer();
}

function nextTask() {
  if (!gameModel.hasLives() || !gameModel.nextTaskIsExists()) {
    endGame();
    return;
  }

  gameModel.nextTask();

  startTask();
}

function stopGame() {
  stopTimer();

  gameModel.saveAnswer([]);

  nextTask();
}

function endGame() {
  gameModel.calcResult();

  renderElement(showStats(getDataStats()));
}

function createScreenGame() {
  let screenGame = createElementFromTemplate('');

  headerGame = createHeader();
  screenGame.appendChild(headerGame);

  contentGame = getContentGame();
  screenGame.appendChild(contentGame);

  renderElement(screenGame);
}

export default () => {
  createScreenGame();
  startTimer();
};
