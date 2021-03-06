import {createElementFromTemplate, renderElement} from '../utils';
import HeaderView from './header-view';
import TaskDoubleView from './task-double-view';
import TaskWideView from './task-wide-view';
import TaskTripleView from './task-triple-view';
import GameModel from './game-model';
import {taskTypes} from '../data/game-data';
import dataStats from '../data/stats-data';
import Application from '../application';

class GamePresenter {
  constructor(model) {
    this._timer = null;
    this._header = null;
    this._content = null;

    this._model = model;
  }

  startGame() {
    this._model.reset();
    this._createScreenGame();
    this._startTimer();
  }

  stopGame() {
    this._stopTimer();

    this._model.saveAnswer([]);

    this._nextTask();
  }

  endGame() {
    this._saveResult().then(() => {
      this._getHistoryResults().then((history) => {
        Application.showStats(dataStats, history);
      });
    });
  }

  _onAnswer(answer) {
    this._stopTimer();

    this._model.saveAnswer(answer);

    this._nextTask();
  }

  _saveResult() {
    Application.showLoading({title: 'Сохранение результатов игры...', description: ''});

    return this._model.saveResult().catch((errorText) => {
      Application.showError({
        title: 'Ошибка сохранения результатов игры',
        description: errorText
      });
    });
  }

  _getHistoryResults() {
    Application.showLoading({title: 'Загрузка истории...', description: ''});

    return this._model.getHistoryResults().catch((errorText) => {
      Application.showError({
        title: 'Произошла ошибка при получении истории результатов!',
        description: errorText
      });
    });
  }

  _startTask() {
    this._updateContentGame();

    this._startTimer();
  }

  _nextTask() {
    if (!(this._model.hasLives() && this._model.hasNextTask())) {
      this.endGame();
      return;
    }

    this._model.nextTask();

    this._startTask();
  }

  _startTimer() {
    this._model.resetTime();
    this._updateHeader();

    this._timer = setInterval(() => {
      if (this._model.isOverTime()) {
        this.stopGame();
        return;
      }

      this._model.tick();
      this._updateHeader();
    }, 1000);
  }

  _stopTimer() {
    clearInterval(this._timer);
  }

  _createScreenGame() {
    let screenGame = createElementFromTemplate('');

    this._header = this._createHeader();
    screenGame.appendChild(this._header);

    this._content = this._getContentGame();
    screenGame.appendChild(this._content);

    renderElement(screenGame);
  }

  _createHeader() {
    let header = new HeaderView(this._model.state);
    header.onBack = this._stopTimer.bind(this);

    return header.element;
  }

  _updateHeader() {
    const newHeader = this._createHeader();

    this._header.parentElement.replaceChild(newHeader, this._header);
    this._header = newHeader;
  }

  _getContentGame() {
    let taskContent;
    let task = this._model.getTask();

    switch (task.type) {
      case taskTypes.TWO_OF_TWO:
        taskContent = new TaskDoubleView(task, this._model.getStats());
        break;

      case taskTypes.TINDER_LIKE:
        taskContent = new TaskWideView(task, this._model.getStats());
        break;

      case taskTypes.ONE_OF_THREE:
        taskContent = new TaskTripleView(task, this._model.getStats());
        break;

      default:
        throw new Error(`Unknown type task ${task.type}`);
    }

    taskContent.onAnswer = this._onAnswer.bind(this);
    return taskContent.element;
  }

  _updateContentGame() {
    const newContent = this._getContentGame();

    this._content.parentElement.replaceChild(newContent, this._content);
    this._content = newContent;
  }
}

export default (userName, gameData) => {
  const gamePresenter = new GamePresenter(new GameModel(userName, gameData));
  gamePresenter.startGame();
};
