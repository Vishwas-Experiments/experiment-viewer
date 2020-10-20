let listProjects = () => {
  return [
    {name: 'even-odd', url: 'console.html'},
    {name: 'sum-of-digits', url: ''},
  ]
}

let renderProjects = () => {
  let projectList = document.getElementById('project-list');
  if(!projectList) throw new Error('Project list not found. Aborting process');
  for(let project of listProjects()) {
    let projectListItem = document.createElement('LI');
    projectListItem.innerHTML = `<a href="${project.url}">${project.name}</a>`;
    projectList.appendChild(projectListItem);
  }
}

renderProjects();
