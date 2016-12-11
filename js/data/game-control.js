import {mergeObjects, cloneObject} from '../utils';
import {gameSettings, tasks, extraList} from './game-data';

export const initialData = {
  currentTaskNumber: 1,
  livesCount: gameSettings.maxLives,
  maxLives: gameSettings.maxLives,
  time: 0,
  timeLimit: gameSettings.timeLimit,
  points: gameSettings.pointsPerRightAnswer,
  total: 0,
  totalFinal: 0,
  stats: new Array(tasks.length).fill('unknown'),
  extra: {}
};

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

  return Object.assign({}, stateGame, {
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

  return Object.assign({}, stateGame, {
    time: time
  });
};

export const setCurrentTaskNumber = (stateGame, taskNumber) => {
  if (!isTaskExists(taskNumber)) {
    throw new RangeError(`Task number ${taskNumber} does not exist`);
  }

  return Object.assign({}, stateGame, {
    currentTaskNumber: taskNumber
  });
};

export const isRightAnswer = (taskNumber, answer) => {
  const task = getTask(taskNumber);

  switch (task.type) {
    case 'double':
      if (task.questions.length !== answer.length) {
        return false;
      }

      return answer.filter((value, index) => task.questions[index].type === value).length === answer.length;

    case 'wide':
      return (answer && (answer === task.question.type));

    case 'triple':
      return (Number.isInteger(answer) && task.answers[answer].type === 'paint');

    default:
      throw new Error(`Unknown type task ${task.type}`);
  }
};

export const determineAnswerAsRight = (stateGame) => setStatus(stateGame, 'correct');

export const determineAnswerAsWrong = (stateGame) => {
  let newStateGame = setCountLives(stateGame, stateGame.livesCount - 1);

  return setStatus(newStateGame, 'wrong');
};

export const determineAnswerSpeed = (stateGame) => {
  let speedName;

  if (isFastAnswer(stateGame.time)) {
    speedName = 'fast';
  }
  if (isSlowAnswer(stateGame.time)) {
    speedName = 'slow';
  }

  if (!speedName) {
    return stateGame;
  }

  let newStateGame = setStatus(stateGame, speedName);
  return addPointsToExtraStats(newStateGame, speedName, 1);
};

export const calculatePoints = (stateGame) => {
  const countCorrect = getCountAnswersByResultType(stateGame, 'correct');
  const countFast = getCountAnswersByResultType(stateGame, 'fast');
  const countSlow = getCountAnswersByResultType(stateGame, 'slow');

  const bonusPerFast = countFast * getPointsByResultType('fast');
  const bonusPerLives = stateGame.livesCount * gameSettings.pointsPerEachLife;
  const penaltyPerSlow = countSlow * getPointsByResultType('slow');

  const total = (countCorrect + countFast + countSlow) * getPointsByResultType('correct');

  let newStateGame = cloneObject(stateGame);
  if (bonusPerLives) {
    newStateGame = addPointsToExtraStats(newStateGame, 'heart', newStateGame.livesCount);
  }
  newStateGame.total = total;
  newStateGame.totalFinal = total + bonusPerFast + bonusPerLives - penaltyPerSlow;

  return newStateGame;
};

function getCountAnswersByResultType(stateGame, resultType) {
  return stateGame.stats.filter((value) => value === resultType).length;
}

function getPointsByResultType(resultType) {
  switch (resultType) {
    case 'correct':
      return gameSettings.pointsPerRightAnswer;

    case 'fast':
    case 'slow':
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
  const initialValue = {
    name: name,
    title: extraList[name].title,
    value: 0,
    points: extraList[name].points,
    total: 0,
  };

  let extra = Object.assign({}, stateGame.extra);

  if (!extra[name]) {
    extra[name] = initialValue;
  }

  extra[name].value += value;
  extra[name].total = extra[name].value * extra[name].points;

  return mergeObjects(stateGame, {
    extra: extra
  });
}
