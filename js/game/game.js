import gameDouble from './game-double';
import gameWide from './game-wide';
import gameTriple from './game-triple';
import {getData, gameIsExists} from './data';
import nextElement from '../stats/stats';
import getDataStats from '../stats/data';

function getGame(data) {
  switch (data.type) {
    case 'double':
      return gameDouble(data);

    case 'wide':
      return gameWide(data);

    case 'triple':
      return gameTriple(data);

    default:
      return nextElement(getDataStats());
  }
}

export default (gameNumber) => {
  if (!gameIsExists(gameNumber)) {
    return nextElement(getDataStats());
  }

  return getGame(getData(gameNumber));
};
