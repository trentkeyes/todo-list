const projectData = (() => {
  let projects = {
    completed: [],
  };
  const addToProject = (item, title) => {
    if (!projects[title]) {
      projects[title] = [];
      // event to add project to sidebar
    }
    projects[title].push(item);
    console.log(projects);
  };

  //edit project name
  // display project event

  return { addToProject };
})();

export { projectData };

//add to project is in todo data. call it attach to project to todo
