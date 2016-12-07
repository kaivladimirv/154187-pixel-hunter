import createElementFromTemplate from './create-element-from-template';
import renderElement from './render-element';
import nextElement from './rules';
import getData from './data/rules-data';

function getTemplate(data) {
  let logo = '<div class="greeting__logo"><img src="img/logo_big.png" width="201" height="89" alt="Pixel Hunter"></div>';
  let challenge = `
    <div class="greeting__challenge">
      <h3>${data.title}</h3>
      <p>${data.description}</p>
    </div>`;

  return `
    <div class="greeting  central--blur">
      ${logo}
      <h1 class="greeting__asterisk">*</h1>
      ${challenge}
      <div class="greeting__continue"><span><img src="img/arrow_right.svg" width="64" height="64" alt="Next"></span></div>
    </div>`;
}

export default function (data) {
  const moduleElement = createElementFromTemplate(getTemplate(data));

  moduleElement.querySelector('.greeting__continue').onclick = () => renderElement(nextElement(getData()));

  return moduleElement;
}
