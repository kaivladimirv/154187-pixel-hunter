import createElementFromTemplate from './create-element-from-template';
import renderElement from './render-element';
import nextElement from './rules';

let data = {
  title: 'Лучшие художники-фотореалисты бросают&nbsp;тебе&nbsp;вызов!',
  description: `Правила игры просты.<br>
    Нужно отличить рисунок&nbsp;от фотографии и сделать выбор.<br>
    Задача кажется тривиальной, но не думай, что все так просто.<br>
    Фотореализм обманчив и коварен.<br>
    Помни, главное — смотреть очень внимательно.`
};

let logo = '<div class="greeting__logo"><img src="img/logo_big.png" width="201" height="89" alt="Pixel Hunter"></div>';
let challenge = `
  <div class="greeting__challenge">
    <h3>${data.title}</h3>
    <p>${data.description}</p>
  </div>`;

let template = `
  <div class="greeting  central--blur">
    ${logo}
    <h1 class="greeting__asterisk">*</h1>
    ${challenge}
    <div class="greeting__continue"><span><img src="img/arrow_right.svg" width="64" height="64" alt="Next"></span></div>
  </div>`;

const moduleElement = createElementFromTemplate(template);

moduleElement.querySelector('.greeting__continue').onclick = () => renderElement(nextElement);

export default moduleElement;
