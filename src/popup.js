import './style.css';

function component() {
  const element = document.createElement('h1');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = 'Hello Extension';

  return element;
}

document.body.appendChild(component());
