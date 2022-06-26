const projectData = (() => {
  let projects = {
    completed: [],
  };
  const addToProject = (item, title) => {
    if (!title) {
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
