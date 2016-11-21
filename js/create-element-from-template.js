export default (template) => {
  let node = document.createElement('span');
  node.innerHTML = template.trim();
  return node;
};
