import createElementFromTemplate from './create-element-from-template';
import renderElement from './render-element';
import nextElement from './greeting';
import getData from './data/greeting-data';

function getTemplate(data) {
  return `
    <div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup> ${data.text}</p>
    </div>`;
}

export default function (data) {
  const moduleElement = createElementFromTemplate(getTemplate(data));

  moduleElement.querySelector('.intro__asterisk').onclick = () => renderElement(nextElement(getData()));

  return moduleElement;
}
