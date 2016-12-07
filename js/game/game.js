import createElementFromTemplate from '../create-element-from-template';
import renderElement from '../render-element';
import header from './header';
import gameDouble from './game-double';
import gameWide from './game-wide';
import gameTriple from './game-triple';
import {
  initialData,
  getDataGame,
  setCurrentGameNumber,
  setCountLives,
  setTime,
  gameIsExists,
  answerIsRight,
  determineAnswerSpeed,
  determineAnswerAsRight,
  determineAnswerAsWrong,
  calculatePoints
} from '../data/game-control';
import showStats from '../stats/stats';
import getDataStats from '../stats/data';

let gameState = initialData;
let timer;
let headerGame;
let contentGame;

function createHeader() {
  return createElementFromTemplate(header(gameState));
}

function updateHeader() {
  const newHeader = createHeader();

  headerGame.parentElement.replaceChild(newHeader, headerGame);
  headerGame = newHeader;
}

function getContentGame(game, stats) {
  switch (game.type) {
    case 'double':
      return gameDouble(game, stats, onAnswer);

    case 'wide':
      return gameWide(game, stats, onAnswer);

    case 'triple':
      return gameTriple(game, stats, onAnswer);

    default:
      throw new Error(`Unknown type game ${game.type}`);
  }
}

function updateContentGame(game) {
  const newContent = getContentGame(game, gameState.stats);

  contentGame.parentElement.replaceChild(newContent, contentGame);
  contentGame = newContent;
}

function onAnswer(answer) {
  stopTimer();

  saveAnswer(answer);

  nextGame();
}

function saveAnswer(answer) {
  if (answerIsRight(gameState.currentGameNumber, answer)) {
    gameState = determineAnswerAsRight(gameState);
    gameState = determineAnswerSpeed(gameState);
  } else {
    gameState = determineAnswerAsWrong(gameState);
  }
}

function startTimer() {
  gameState = setTime(gameState, 0);
  updateHeader(gameState);

  timer = setInterval(() => {
    const time = gameState.time + 1;
    if (time >= gameState.timeLimit) {
      stopGame();
      return;
    }

    gameState = setTime(gameState, time);
    updateHeader(gameState);

  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function stopGame() {
  stopTimer();

  gameState = determineAnswerAsWrong(gameState);

  nextGame();
}

function nextGame() {
  const nextGameNumber = gameState.currentGameNumber + 1;

  if ((gameState.livesCount === 0) || !gameIsExists(nextGameNumber)) {
    endGame();
    return;
  }

  startGame(nextGameNumber);
}

function endGame() {
  gameState = calculatePoints(gameState);

  renderElement(showStats(getDataStats()));
}

function startGame(gameNumber) {
  gameState = setCurrentGameNumber(gameState, gameNumber);

  updateContentGame(getDataGame(gameNumber));

  startTimer();
}

function createScreenGame() {
  const gameNumber = 1;
  gameState = setCurrentGameNumber(gameState, gameNumber);
  gameState = setCountLives(gameState, gameState.maxLives);

  let screenGame = createElementFromTemplate('');

  headerGame = createHeader();
  screenGame.appendChild(headerGame);

  contentGame = getContentGame(getDataGame(gameNumber), gameState.stats);
  screenGame.appendChild(contentGame);

  renderElement(screenGame);
}

export default () => {
  createScreenGame();
  startTimer();
};
