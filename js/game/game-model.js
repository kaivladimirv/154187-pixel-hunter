import {
  initialData,
  getTask,
  setCurrentTaskNumber,
  setTime,
  taskIsExists,
  answerIsRight,
  determineAnswerSpeed,
  determineAnswerAsRight,
  determineAnswerAsWrong,
  calculatePoints
} from '../data/game-control';

class GameModel {
  constructor(state = initialData) {
    this._state = state;
  }

  get state() {
    return this._state;
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

  timeIsOver() {
    return this._state.time >= this._state.timeLimit;
  }

  nextTask() {
    this._state = setCurrentTaskNumber(this._state, this._state.currentTaskNumber + 1);
  }

  nextTaskIsExists() {
    return taskIsExists(this._state.currentTaskNumber + 1);
  }

  resetTime() {
    this._state = setTime(this._state, 0);
  }

  tick() {
    this._state = setTime(this._state, this._state.time + 1);
  }

  saveAnswer(answer) {
    if (answerIsRight(this._state.currentTaskNumber, answer)) {
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

export default new GameModel();
