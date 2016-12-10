import {renderElement} from './utils';
import introElement from './intro-view';
import getData from './data/intro-data';

renderElement(introElement(getData()));
