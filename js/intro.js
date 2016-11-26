import createElementFromTemplate from './create-element-from-template';
import renderElement from './render-element';
import nextElement from './greeting';

let data = {
  text: 'Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.'
};

let template = `<div id="intro" class="intro">
  <h1 class="intro__asterisk">*</h1>
  <p class="intro__motto"><sup>*</sup> ${data.text}</p>
</div>`;

const moduleElement = createElementFromTemplate(template);

moduleElement.querySelector('.intro__asterisk').onclick = () => renderElement(nextElement);

export default moduleElement;
