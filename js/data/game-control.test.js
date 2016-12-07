import assert from 'assert';
import {gameSettings} from './game-data';
import {
  initialData,
  gameIsExists,
  setCountLives,
  setTime,
  setCurrentGameNumber,
  getDataGame,
  determineAnswerSpeed
} from './game-control';

describe('Game', () => {
  it('is not exists', () => {
    assert.equal(gameIsExists(100000), false);
    assert.equal(gameIsExists('abc'), false);
  });

  describe('Current game number', () => {
    it('success: set current game number', () => assert.equal(setCurrentGameNumber(initialData, 1).currentGameNumber, 1));
    it('fail: set current game number', () => assert.throws(() => setCurrentGameNumber(initialData, -1)));
  });

  describe('Get game', () => {
    it('success: get data', () => assert.equal(getDataGame(1).gameNumber, 1));
    it('fail: get data', () => assert.throws(() => getDataGame(-1)));
  });

  describe('Lives', () => {
    it('success: set count lives', () => assert.equal(setCountLives(initialData, 3).livesCount, 3));

    it('fail: set count lives', () => {
      assert.throws(() => setCountLives(initialData, -1));
      assert.throws(() => setCountLives(initialData, gameSettings.maxLives + 1));
    });
  });

  describe('Time', () => {
    it('success: set time', () => assert.equal(setTime(initialData, 10).time, 10));

    it('fail: set time', () => {
      assert.throws(() => setTime(initialData, -1));
      assert.throws(() => setTime(initialData, gameSettings.timeLimit + 1));
    });
  });

  describe('Answer speed', () => {
    let gameNumber = 1;
    let stateGame = setCurrentGameNumber(initialData, gameNumber);

    it('Answer is fast', () => {
      stateGame = setTime(stateGame, gameSettings.timeLimitForFastAnswer - 1);
      assert.equal(determineAnswerSpeed(stateGame).stats[gameNumber - 1], 'fast');
    });

    it('Answer is slow', () => {
      stateGame = setTime(stateGame, gameSettings.timeLimitForSlowAnswer + 1);
      assert.equal(determineAnswerSpeed(stateGame).stats[gameNumber - 1], 'slow');
    });
  });
});
