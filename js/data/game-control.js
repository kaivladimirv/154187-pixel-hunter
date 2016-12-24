import {mergeObjects, cloneObject} from '../utils';
import {gameSettings, extraList, taskTypes, answerTypes, resultTypes} from './game-data';

let tasks = [];

export const initialData = {
  userName: '',
  currentTaskNumber: 1,
  livesCount: gameSettings.maxLives,
  maxLives: gameSettings.maxLives,
  time: 0,
  timeLimit: gameSettings.timeLimit,
  points: gameSettings.pointsPerRightAnswer,
  total: 0,
  totalFinal: 0,
  stats: [],
  extra: []
};

export const setUserName = (stateGame, userName) => {
  return mergeObjects(stateGame, {
    userName: userName
  });
};

export const setTasksList = (data) => {
  tasks = data;
};

export const getTasksCount = () => tasks.length;

export const getTask = (taskNumber) => {
  if (!isTaskExists(taskNumber)) {
    throw new RangeError(`Task number ${taskNumber} does not exist`);
  }

  return tasks[taskNumber - 1];
};

export const isTaskExists = (taskNumber) => {
  if (isNaN(parseInt(taskNumber, 10))) {
    return false;
  }

  return !!tasks[taskNumber - 1];
};

export const setCountLives = (stateGame, count) => {
  if (count < 0) {
    throw new RangeError('Number of lives can not be negative');
  }
  if (count > gameSettings.maxLives) {
    throw new RangeError(`Number of lives can not be more than ${gameSettings.maxLives}`);
  }

  return mergeObjects(stateGame, {
    livesCount: count
  });
};

export const setTime = (stateGame, time) => {
  if (time < 0) {
    throw new RangeError('Time can not be negative');
  }
  if (time > gameSettings.timeLimit) {
    throw new RangeError(`Time can not be more than ${gameSettings.timeLimit}`);
  }

  return mergeObjects(stateGame, {
    time: time
  });
};

export const setCurrentTaskNumber = (stateGame, taskNumber) => {
  if (!isTaskExists(taskNumber)) {
    throw new RangeError(`Task number ${taskNumber} does not exist`);
  }

  return mergeObjects(stateGame, {
    currentTaskNumber: taskNumber
  });
};

export const isRightAnswer = (taskNumber, answer) => {
  const task = getTask(taskNumber);

  switch (task.type) {
    case taskTypes.TWO_OF_TWO:
      if (task.answers.length !== answer.length) {
        return false;
      }

      return answer.filter((value, index) => task.answers[index].type === value).length === answer.length;

    case taskTypes.TINDER_LIKE:
      return (answer && (answer === task.answers[0].type));

    case taskTypes.ONE_OF_THREE:
      return (Number.isInteger(answer) && task.answers[answer].type === answerTypes.PAINTING);

    default:
      throw new Error(`Unknown type task ${task.type}`);
  }
};

export const determineAnswerAsRight = (stateGame) => setStatus(stateGame, resultTypes.CORRECT);

export const determineAnswerAsWrong = (stateGame) => {
  let newStateGame = setCountLives(stateGame, stateGame.livesCount - 1);

  return setStatus(newStateGame, resultTypes.WRONG);
};

export const determineAnswerSpeed = (stateGame) => {
  let speedName;

  if (isFastAnswer(stateGame.time)) {
    speedName = resultTypes.FAST;
  }
  if (isSlowAnswer(stateGame.time)) {
    speedName = resultTypes.SLOW;
  }

  if (!speedName) {
    return stateGame;
  }

  return setStatus(stateGame, speedName);
};

export const calculatePoints = (stateGame) => {
  const countCorrect = getCountAnswersByResultType(stateGame, resultTypes.CORRECT);
  const countFast = getCountAnswersByResultType(stateGame, resultTypes.FAST);
  const countSlow = getCountAnswersByResultType(stateGame, resultTypes.SLOW);

  const bonusPerFast = countFast * getPointsByResultType(resultTypes.FAST);
  const bonusPerLives = stateGame.lives * gameSettings.pointsPerEachLife;
  const penaltyPerSlow = countSlow * getPointsByResultType(resultTypes.SLOW);

  const total = (countCorrect + countFast + countSlow) * getPointsByResultType(resultTypes.CORRECT);

  stateGame.points = gameSettings.pointsPerRightAnswer;

  let newStateGame = cloneObject(stateGame);
  if (bonusPerLives) {
    newStateGame = addPointsToExtraStats(newStateGame, 'heart', stateGame.lives);
  }
  if (bonusPerFast) {
    newStateGame = addPointsToExtraStats(newStateGame, resultTypes.FAST, countFast);
  }
  if (penaltyPerSlow) {
    newStateGame = addPointsToExtraStats(newStateGame, resultTypes.SLOW, countSlow);
  }

  newStateGame.total = total;
  newStateGame.totalFinal = total + bonusPerFast + bonusPerLives + penaltyPerSlow;

  return newStateGame;
};

function getCountAnswersByResultType(stateGame, resultType) {
  return stateGame.stats.filter((value) => value === resultType).length;
}

function getPointsByResultType(resultType) {
  switch (resultType) {
    case resultTypes.CORRECT:
      return gameSettings.pointsPerRightAnswer;

    case resultTypes.FAST:
    case resultTypes.SLOW:
    case 'heart':
      return extraList[resultType].points;

    default:
      return 0;
  }
}

function isFastAnswer(time) {
  return time < gameSettings.timeLimitForFastAnswer;
}

function isSlowAnswer(time) {
  return time > gameSettings.timeLimitForSlowAnswer;
}

function setStatus(stateGame, statusName) {
  if (!statusName) {
    throw new Error(`Unknown status game ${statusName}`);
  }

  let stats = [...stateGame.stats];

  stats[stateGame.currentTaskNumber - 1] = statusName;

  return mergeObjects(stateGame, {
    stats: stats
  });
}

function addPointsToExtraStats(stateGame, name, value) {
  if (!stateGame.extra) {
    stateGame.extra = [];
  }

  let extra = [...stateGame.extra];

  extra.push({
    name: name,
    title: extraList[name].title,
    value: value,
    points: Math.abs(extraList[name].points),
    total: value * extraList[name].points,
  });

  return mergeObjects(stateGame, {
    extra: extra
  });
}
