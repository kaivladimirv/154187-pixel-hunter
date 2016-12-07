import {games, gameSettings, extraList} from './game-data';

export const initialData = {
  currentGameNumber: 0,
  livesCount: gameSettings.maxLives,
  maxLives: gameSettings.maxLives,
  timeLimit: gameSettings.timeLimit,
  time: 0,
  points: gameSettings.pointsPerRightAnswer,
  total: 0,
  totalFinal: 0,
  stats: new Array(games.length).fill('unknown'),
  extra: {}
};

export const getDataGame = (gameNumber) => {
  if (!gameIsExists(gameNumber)) {
    throw new RangeError(`Game number ${gameNumber} does not exist`);
  }

  return games[gameNumber - 1];
};

export const gameIsExists = (gameNumber) => {
  if (isNaN(parseInt(gameNumber, 10))) {
    return false;
  }

  return !!games[gameNumber - 1];
};

export const setCountLives = (game, count) => {
  if (count < 0) {
    throw new RangeError('Number of lives can not be negative');
  }
  if (count > gameSettings.maxLives) {
    throw new RangeError(`Number of lives can not be more than ${gameSettings.maxLives}`);
  }

  return Object.assign({}, game, {
    livesCount: count
  });
};

export const setTime = (game, time) => {
  if (time < 0) {
    throw new RangeError('Time can not be negative');
  }
  if (time > gameSettings.timeLimit) {
    throw new RangeError(`Time can not be more than ${gameSettings.timeLimit}`);
  }

  return Object.assign({}, game, {
    time: time
  });
};

export const setCurrentGameNumber = (game, gameNumber) => {
  if (!gameIsExists(gameNumber)) {
    throw new RangeError(`Game number ${gameNumber} does not exist`);
  }

  return Object.assign({}, game, {
    currentGameNumber: gameNumber
  });
};

export const answerIsRight = (gameNumber, answer) => {
  const game = getDataGame(gameNumber);

  switch (game.type) {
    case 'double':
      if (game.questions.length !== answer.length) {
        return false;
      }

      return answer.filter((value, index) => game.questions[index].type === value).length === answer.length;

    case 'wide':
      return (answer && (answer === game.question.type));

    case 'triple':
      return (Number.isInteger(answer) && game.answers[answer].type === 'paint');

    default:
      throw new Error(`Unknown type game ${game.type}`);
  }
};

export const determineAnswerAsRight = (game) => setStatus(game, 'correct');

export const determineAnswerAsWrong = (game) => {
  game = setCountLives(game, game.livesCount - 1);

  return setStatus(game, 'wrong');
};

export const determineAnswerSpeed = (game) => {
  let speedName;

  if (answerIsFast(game.time)) {
    speedName = 'fast';
  }
  if (answerIsSlow(game.time)) {
    speedName = 'slow';
  }

  if (!speedName) {
    return game;
  }

  game = setStatus(game, speedName);
  return addPointsToExtraStats(game, speedName, 1);
};

export const calculatePoints = (game) => {
  const countCorrect = getCountAnswersByResultType(game, 'correct');
  const countFast = getCountAnswersByResultType(game, 'fast');
  const countSlow = getCountAnswersByResultType(game, 'slow');

  const bonusPerFast = countFast * getPointsByResultType('fast');
  const bonusPerLives = game.livesCount * gameSettings.pointsPerEachLife;
  const penaltyPerSlow = countSlow * getPointsByResultType('slow');

  const total = (countCorrect + countFast + countSlow) * getPointsByResultType('correct');

  let newStateGame = cloneObject(game);
  if (bonusPerLives) {
    newStateGame = addPointsToExtraStats(newStateGame, 'heart', newStateGame.livesCount);
  }
  newStateGame.total = total;
  newStateGame.totalFinal = total + bonusPerFast + bonusPerLives - penaltyPerSlow;

  return newStateGame;
};

function getCountAnswersByResultType(game, resultType) {
  return game.stats.filter((value) => value === resultType).length;
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

function answerIsFast(time) {
  return time < gameSettings.timeLimitForFastAnswer;
}

function answerIsSlow(time) {
  return time > gameSettings.timeLimitForSlowAnswer;
}

function setStatus(game, statusName) {
  if (!statusName) {
    throw new Error(`Unknown status game ${statusName}`);
  }

  let stats = [...game.stats];

  stats[game.currentGameNumber - 1] = statusName;

  return mergeObjects(game, {
    stats: stats
  });
}

function addPointsToExtraStats(game, name, value) {
  const initialValue = {
    name: name,
    title: extraList[name].title,
    value: 0,
    points: extraList[name].points,
    total: 0,
  };

  let extra = Object.assign({}, game.extra);

  if (!extra[name]) {
    extra[name] = initialValue;
  }

  extra[name].value += value;
  extra[name].total = extra[name].value * extra[name].points;

  return mergeObjects(game, {
    extra: extra
  });
}

function mergeObjects(...objects) {
  return Object.assign({}, ...objects);
}

function cloneObject(object) {
  return JSON.parse(JSON.stringify(object));
}
