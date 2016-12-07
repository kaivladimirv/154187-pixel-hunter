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
    it('success: set current game number', () => {
      const newData = setCurrentGameNumber(initialData, 1);

      assert.equal(newData.currentGameNumber, 1);
      assert.notDeepEqual(initialData, newData);
    });
    it('fail: set current game number', () => assert.throws(() => setCurrentGameNumber(initialData, -1)));
  });

  describe('Get game', () => {
    it('success: get data', () => assert.equal(getDataGame(1).gameNumber, 1));
    it('fail: get data', () => assert.throws(() => getDataGame(-1)));
  });

  describe('Lives', () => {
    it('success: set count lives', () => {
      const newData = setCountLives(initialData, 3);

      assert.equal(newData.livesCount, 3);
      assert.notDeepEqual(initialData, newData);
    });

    it('fail: set count lives', () => {
      assert.throws(() => setCountLives(initialData, -1));
      assert.throws(() => setCountLives(initialData, gameSettings.maxLives + 1));
    });
  });

  describe('Time', () => {
    it('success: set time', () => {
      const newData = setTime(initialData, 10);

      assert.equal(newData.time, 10);
      assert.notDeepEqual(initialData, newData);
    });

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
      const newStateGame = determineAnswerSpeed(stateGame);

      assert.equal(newStateGame.stats[gameNumber - 1], 'fast');
      assert.notDeepEqual(stateGame, newStateGame);
    });

    it('Answer is slow', () => {
      stateGame = setTime(stateGame, gameSettings.timeLimitForSlowAnswer + 1);
      const newStateGame = determineAnswerSpeed(stateGame);

      assert.equal(newStateGame.stats[gameNumber - 1], 'slow');
      assert.notDeepEqual(stateGame, newStateGame);
    });
  });
});
