import createElementFromTemplate from './create-element-from-template';
import renderElement from './render-element';
import greetingElement from './greeting';

let template = `<div id="intro" class="intro">
  <h1 class="intro__asterisk">*</h1>
  <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf
    Sparnaay.</p>
</div>`;

const moduleElement = createElementFromTemplate(template);

moduleElement.querySelector('.intro__asterisk').onclick = () => renderElement(greetingElement);

export default moduleElement;
