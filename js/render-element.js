let mainElement = document.getElementById('main');

export default (element) => {
  mainElement.innerHTML = '';
  mainElement.appendChild(element);
};
