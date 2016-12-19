import {renderElement} from './utils';
import introElement from './intro-view';
import greetingElement from './greeting-view';
import rulesElement from './rules-view';
import startGame from './game/game-presenter';
import statsElement from './stats/stats-view';
import errorElement from './error-view';
import loadingElement from './loading-view';
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

  static showGame(userName) {
    startGame(userName, gameData);
  }

  static showStats(data, history) {
    renderElement(statsElement(data, history));
  }

  static showError(data) {
    renderElement(errorElement(data));
  }

  static showLoading(data) {
    renderElement(loadingElement(data));
  }

  static set data(data) {
    gameData = data;
  }

  static get severUrl() {
    return 'https://intensive-ecmascript-server-nnpnvhhedl.now.sh/';
  }
}
