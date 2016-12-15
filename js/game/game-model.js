import {
  initialData,
  setData,
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

export default class GameModel {
  constructor(gameData, state = initialData) {
    this._state = state;
    setData(gameData);
  }

  get state() {
    return this._state;
  }

  reset() {
    this._state = initialData;
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

  calcResult() {
    this._state = calculatePoints(this._state);
  }
}
