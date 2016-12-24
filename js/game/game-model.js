import 'whatwg-fetch';
import {validationStatusForGetRequest, validationStatusForPostRequest} from '../utils';
import {
  initialData,
  setUserName,
  setTasksList,
  getTasksCount,
  getTask,
  setCurrentTaskNumber,
  setTime,
  isTaskExists,
  isRightAnswer,
  determineAnswerSpeed,
  determineAnswerAsRight,
  determineAnswerAsWrong,
  calculatePoints
} from '../data/game-control';
import Application from '../application';

export default class GameModel {
  constructor(userName, gameData) {
    this._userName = userName;

    setTasksList(gameData);

    this.reset();
  }

  get state() {
    return this._state;
  }

  reset() {
    this._state = initialData;
    this._state.stats = new Array(getTasksCount()).join(' ').split(' ').map((value) => 'unknown');
    this._state = setUserName(this._state, this._userName);
  }

  getTask() {
    return getTask(this._state.currentTaskNumber);
  }

  getStats() {
    return this._state.stats;
  }

  hasLives() {
    return this._state.livesCount > 0;
  }

  isOverTime() {
    return this._state.time >= this._state.timeLimit;
  }

  nextTask() {
    this._state = setCurrentTaskNumber(this._state, this._state.currentTaskNumber + 1);
  }

  hasNextTask() {
    return isTaskExists(this._state.currentTaskNumber + 1);
  }

  resetTime() {
    this._state = setTime(this._state, 0);
  }

  tick() {
    this._state = setTime(this._state, this._state.time + 1);
  }

  saveAnswer(answer) {
    if (isRightAnswer(this._state.currentTaskNumber, answer)) {
      this._state = determineAnswerAsRight(this._state);
      this._state = determineAnswerSpeed(this._state);
    } else {
      this._state = determineAnswerAsWrong(this._state);
    }
  }

  saveResult() {
    this._state = calculatePoints(this._state);

    const requestBody = JSON.stringify({
      stats: this._state.stats,
      lives: this._state.livesCount
    });

    return window.fetch(Application.severUrl + 'pixel-hunter/stats/' + this._state.userName,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: requestBody
      })
        .then(validationStatusForPostRequest);
  }

  getHistoryResults() {
    return window.fetch(Application.severUrl + 'pixel-hunter/stats/' + this._state.userName)
        .then(validationStatusForGetRequest)
        .then((response) => response.json())
        .then((historyResults) => {
          return historyResults.map((value) => calculatePoints(value));
        });
  }
}
