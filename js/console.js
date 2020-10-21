let consoleInput = null;

let writeToConsole = content => {
  let consoleOutput = document.getElementById('console');
  consoleOutput.value += content;
  consoleOutput.scrollTo(0, consoleOutput.scrollHeight);
}

let initConsoleInput = () => {
  let consoleInputElem = document.getElementById('console-input');
  consoleInputElem.focus();
  consoleInputElem.addEventListener('change', e => {
    consoleInput = consoleInputElem.value;
  })
}

let flushConsoleInput = () => {
  writeToConsole(consoleInput + '\n');
  consoleInput = null;
  document.getElementById('console-input').value = '';
}

let addWasmLoaders = url => {
  let script = document.createElement('SCRIPT');
  script.setAttribute('src', `wasm/${url}/script.js`);
  document.body.appendChild(script);
}

let initPage = projectName => {
  document.getElementById('project-name').innerText = projectName || 'untitled project';
  let consoleDisplay = document.getElementById('console');
  initConsoleInput();
  addWasmLoaders(projectName);
}

initPage(window.location.hash.slice(1));
