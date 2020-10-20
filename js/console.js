let loadWasm = async url => {
  let response = await (await fetch(url));
  let wasmBuffer = await response.arrayBuffer();
  let wasmModule = await WebAssembly.compile(wasmBuffer);
  console.log(wasmModule);
  return new WebAssembly.Instance(wasmModule, {
    'cout': function(text) { alert('stdout: ' + text) },
  });
}

let overridePrompt = () => {
  let originalPrompt = window.prompt;
  window.prompt = (...args) => {
    let res = originalPrompt.apply(undefined, args);
    if(res)
      writeToConsole(res + '\n');
    return res;
  }
}

let writeToConsole = content => {
  document.getElementById('console').value += content;
}

let initPage = projectName => {
  document.getElementById('project-name').innerText = projectName || 'untitled project';
  let consoleDisplay = document.getElementById('console');
  consoleDisplay.style.height = `${window.innerHeight - consoleDisplay.getBoundingClientRect().top - 30}px`;
  overridePrompt();
}

initPage(window.location.hash.slice(1));

var wasmBinaryFile = '../wasm/sum-of-digits.wasm';
var Module = {
  preRun: [],
  postRun: [],
  print: writeToConsole,
  printErr: function(text) {
    if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
      console.error(text);
  }
};
