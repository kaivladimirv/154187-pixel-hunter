import createElementFromTemplate from '../create-element-from-template';
import header from './header';
import resultItem from './result';

function getTemplate(data) {
  let resultsList = data.results.map(resultItem).join('');

  return `
    ${header()}
    <div class="result">
      <h1>${data.title}</h1>
      ${resultsList}
    </div>`;
}

export default function (data) {
  const moduleElement = createElementFromTemplate(getTemplate(data));

  return moduleElement;
}
