import { events } from './dom/events';
import { render } from './dom/render';
import { TodoRepo } from './repos/todoRepo';
import { ProjectRepo } from './repos/projectRepo';

//fix todos not modifying

//populate project sidebar on startup

const todoRepo = new TodoRepo();
const projectRepo = new ProjectRepo();

const storage = (() => {
  let todosJSON = [];
  let projectsJSON = [];
  console.log(!localStorage.getItem('todos'));
  if (!localStorage.getItem('todos')) {
    localStorage.setItem('todos', todosJSON);
    console.log('no todo data');
  } else {
    todosJSON = JSON.parse(localStorage.getItem('todos'));
    console.log(todosJSON, 'heres todo data');
    todoRepo.todos = todosJSON;
  }
  if (!localStorage.getItem('projects')) {
    localStorage.setItem('projects', projectsJSON);
    console.log('no project data');
  } else {
    todosJSON = JSON.parse(localStorage.getItem('todos'));
    console.log(todosJSON, 'heres project data');
    projectRepo.projects = projectsJSON;
  }
  return {
    todosJSON,
    projectsJSON,
  };
})();
const createInboxProject = () => {
  projectRepo.createProject('Inbox');
  render.renderProjectSelect('Inbox');
};
createInboxProject();
render.renderInboxList();

export { storage, todoRepo, projectRepo };
