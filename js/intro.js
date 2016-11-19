import createElementFromTemplate from './create-element-from-template';

let template = `<div id="intro" class="intro">
  <h1 class="intro__asterisk">*</h1>
  <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf
    Sparnaay.</p>
</div>`;

const moduleElement = createElementFromTemplate(template);
export default moduleElement;
