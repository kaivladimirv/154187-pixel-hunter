import Promise from 'promise-polyfill';
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

export const mergeObjects = (...objects) => {
  let to = {};

  objects.forEach((value) => {
    to = mergeObject(to, value);
  });

  return to;
};

function mergeObject(target, source) {
  if (!target) {
    throw new TypeError('Cannot convert first argument to object');
  }

  let to = Object(target);
  let keysArray = Object.keys(Object(source));
  for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
    let nextKey = keysArray[nextIndex];
    to[nextKey] = source[nextKey];
  }

  return to;
}

export const cloneObject = (object) => JSON.parse(JSON.stringify(object));

export const loadImages = (images, data) => {
  if (!images.length) {
    return;
  }

  [].forEach.call(images, (image, index) => {
    imageLoader(image).load({
      url: data[index].image.url,
      width: data[index].image.width,
      height: data[index].image.height
    });
  });
};

export const validationStatusForGetRequest = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export const validationStatusForPostRequest = (response) => {
  if ((response.status >= 200 && response.status < 300) || (response.status === 400)) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export const initPromisePolyfill = () => {
  if (!window.Promise) {
    window.Promise = Promise;
  }
};
