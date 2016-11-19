export default (template) => {
  let node = document.createElement('span');
  node.innerHTML = template;
  return node.cloneNode(true);
};
