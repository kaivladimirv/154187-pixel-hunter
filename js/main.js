import renderElement from './render-element';
import introElement from './intro';
import getData from './data';

renderElement(introElement(getData('intro')));
