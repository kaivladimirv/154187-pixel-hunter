import imageLoader from './image-loader/image-loader';

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

export const loadImages = (images, data) => {
  if (!images.length) {
    return;
  }

  let index = 0;
  for (let image of images) {
    imageLoader(image).load({
      url: data[index].image.url,
      width: data[index].image.width,
      height: data[index].image.height
    });

    index++;
  }
};
