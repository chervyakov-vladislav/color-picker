

function createDom() {
  let wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');

  for (let i=0; i < 6; i++) {
    wrapper.append(createCol());
  }
  return wrapper;
}

function createCol() {
  let col = document.createElement('div');
  let header = document.createElement('h2');
  let button = document.createElement('button');
  let i = document.createElement('i');
  col.classList.add('col');
  header.classList.add('title');
  button.classList.add('button');
  i.classList.add('fa-solid', 'fa-lock-open');
  header.setAttribute('data-type', 'copy');
  button.setAttribute('data-type', 'lock');
  i.setAttribute('data-type', 'lock');
  button.append(i);
  col.append(header);
  col.append(button);
  
  return col;
}

document.body.append(createDom());

let cols = Array.from(document.querySelectorAll('.col'))

document.addEventListener('keydown', event => {
  event.preventDefault();
  if (event.code.toLowerCase() == 'space') {
    setRandomColors();
  }
})

document.addEventListener('click', event => {
  let type = event.target.dataset.type;

  if (type == 'lock') {
    const node = event.target.tagName.toLowerCase() == 'i'
      ? event.target
      : event.target.querySelector('i');
      node.classList.toggle('fa-lock-open');
      node.classList.toggle('fa-lock');
  }

  if (type == 'copy') {
    copyToClickboard(event.target.textContent);
  }
  
})

function generateRandomColor() {
  let hexCodes = '0123456789ABCDEF';
  let color = ''
  for (let i=0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random()*(hexCodes.length-1))];
  }
  return '#' + color;
}

function setRandomColors(isInitial) {
  let colors = isInitial ? getColorsFromHash() : [];
  cols.forEach( (col, index) => {
    let isLocked = col.querySelector('i').classList.contains('fa-lock');
    let text = col.querySelector('.title');
    let button = col.querySelector('.button');
    if (isLocked) {
      colors.push(text.textContent);
      return;
    };

    let color = isInitial 
      ? colors[index]
        ? colors[index]
        : generateRandomColor()
      : generateRandomColor()

    if (!isInitial) {
      colors.push(color)
    }
    text.innerText = color;
    col.style.background = color;
    setTextColor(text, color);
    setTextColor(button, color);
  })

  updateColorsHash(colors);
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? 'black' : 'white';
}

function copyToClickboard(text) {
  return navigator.clipboard.writeText(text);
}

function updateColorsHash(colors = []) {
  document.location.hash = colors
    .map(color => color.slice(1))
    .join('-');
}

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .slice(1)
      .split('-')
      .map(color => '#' + color)
  }
  return []
}

setRandomColors(true);
