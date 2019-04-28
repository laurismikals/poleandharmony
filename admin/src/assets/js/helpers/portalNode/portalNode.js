let node = document.getElementById('js-portal');

if (!node) { // in case of testing
  node = document.createElement('div');
  node.setAttribute('id', 'js-portal');
  document.body.appendChild(node);
}

export const portalNode = node;
