import assert from 'assert';
import {gameSettings, testTasks} from './game-data';
import {
  initialData,
  setUserName,
  setTasksList,
  getTasksCount,
  isTaskExists,
  setCountLives,
  setTime,
  setCurrentTaskNumber,
  getTask,
  determineAnswerSpeed,
  determineAnswerAsRight,
  determineAnswerAsWrong
} from './game-control';

describe('Game', () => {
  it('Set tasks list', () => {
    setTasksList(testTasks);
    assert.equal(getTasksCount(), testTasks.length);
  });

  it('Task is not exists', () => {
    setTasksList(testTasks);
    assert.equal(isTaskExists(100000), false);
    assert.equal(isTaskExists('abc'), false);
  });

  it('Set user name', () => {
    const newData = setUserName(initialData, 'Ivan');

    assert.equal(newData.userName, 'Ivan');
    assert.notEqual(newData, initialData);
  });

  describe('Current task number', () => {
    it('success: set current task number', () => {
      const newData = setCurrentTaskNumber(initialData, 1);

      assert.equal(newData.currentTaskNumber, 1);
      assert.notEqual(newData, initialData);
    });
    it('fail: set current task number', () => assert.throws(() => setCurrentTaskNumber(initialData, -1)));
  });

  describe('Get task', () => {
    setTasksList(testTasks);
    it('success: get data', () => assert.equal(!!getTask(1).type, true));
    it('fail: get data', () => assert.throws(() => getTask(-1)));
  });

  describe('Lives', () => {
    it('success: set count lives', () => {
      const newData = setCountLives(initialData, 3);

      assert.equal(newData.livesCount, 3);
      assert.notEqual(newData, initialData);
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
    let taskNumber = 1;
    let stateGame = setCurrentTaskNumber(initialData, taskNumber);

    it('Answer is fast', () => {
      stateGame = setTime(stateGame, gameSettings.timeLimitForFastAnswer - 1);
      const newStateGame = determineAnswerSpeed(stateGame);

      assert.equal(newStateGame.stats[taskNumber - 1], 'fast');
      assert.notEqual(stateGame, newStateGame);
    });

    it('Answer is slow', () => {
      stateGame = setTime(stateGame, gameSettings.timeLimitForSlowAnswer + 1);
      const newStateGame = determineAnswerSpeed(stateGame);

      assert.equal(newStateGame.stats[taskNumber - 1], 'slow');
      assert.notEqual(stateGame, newStateGame);
    });
  });

  describe('Answer result', () => {
    let taskNumber = 1;
    let stateGame = setCurrentTaskNumber(initialData, taskNumber);

    it('Answer is right', () => {
      const newStateGame = determineAnswerAsRight(stateGame);

      assert.equal(newStateGame.stats[taskNumber - 1], 'correct');
      assert.notEqual(stateGame, newStateGame);
    });

    it('Answer is wrong', () => {
      const newStateGame = determineAnswerAsWrong(stateGame);

      assert.equal(newStateGame.stats[taskNumber - 1], 'wrong');
      assert.notEqual(stateGame, newStateGame);
    });
  });

});
