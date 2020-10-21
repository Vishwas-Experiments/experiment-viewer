let listProjects = async () => {
  let response = await fetch('projects.json');
  let content = await response;
  return await response.json();
}

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

let renderProjects = async () => {
  let projectList = document.getElementById('project-list');
  if(!projectList) throw new Error('Project list not found. Aborting process');
  for(let projectGroup of await listProjects()) {
    let projectMonth = document.createElement('LI');
    projectMonth.className = 'project-month';
    projectMonth.innerHTML = `${monthNames[projectGroup.monthCreated.slice(0, 2) - 1]} 20${projectGroup.monthCreated.slice(2, 4)}`;
    projectList.appendChild(projectMonth);

    let projectsUl = document.createElement('UL');
    for(let project of projectGroup.projects) {
      let projectLi = document.createElement('LI');
      projectLi.innerHTML = `<a href="console.html#${project.name}">${project.name}</a>`;
      projectsUl.appendChild(projectLi);
    }
    projectList.appendChild(projectsUl);

    let takeHomeTitle = document.createElement('LI');
    takeHomeTitle.className = 'take-home__title';
    takeHomeTitle.innerText = 'Take Home Projects';
    projectList.appendChild(takeHomeTitle);

    let takeHomeUl = document.createElement('UL');
    takeHomeUl.className = 'take-home__ul';
    for(let project of projectGroup.takeHome) {
      let projectLi = document.createElement('LI');
      projectLi.innerHTML = `<a href="console.html#${project.name}">${project.name}</a>`;
      takeHomeUl.appendChild(projectLi);
    }
    projectList.appendChild(takeHomeUl);
  }
}

renderProjects();
