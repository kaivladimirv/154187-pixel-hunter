let mainElement;

export const renderElement = (element) => {
  if (!mainElement) {
    mainElement = document.getElementById('main');
  }

  mainElement.innerHTML = '';
  mainElement.appendChild(element);
};

export const createElementFromTemplate = (template) => {
  let node = document.createElement('span');
  node.innerHTML = template.trim();
  return node;
};

export const mergeObjects = (...objects) => Object.assign({}, ...objects);

export const cloneObject = (object) => JSON.parse(JSON.stringify(object));
