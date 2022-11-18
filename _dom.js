

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