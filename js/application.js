import {renderElement} from './utils';
import introElement from './intro-view';
import greetingElement from './greeting-view';
import rulesElement from './rules-view';
import startGame from './game/game-presenter';
import showStats from './stats/stats-view';
import errorElement from './error-view';
import getIntroData from './data/intro-data';
import getGreetingData from './data/greeting-data';
import getRulesData from './data/rules-data';

let gameData;

export default class Application {

  static showWelcome() {
    renderElement(introElement(getIntroData()));
  }

  static showGreeting() {
    renderElement(greetingElement(getGreetingData()));
  }

  static showRules() {
    renderElement(rulesElement(getRulesData()));
  }

  static showGame() {
    startGame(gameData);
  }

  static showStats(data) {
    renderElement(showStats(data));
  }

  static showError(data) {
    renderElement(errorElement(data));
  }

  static set data(data) {
    gameData = data;
  }
}
