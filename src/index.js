import { events } from './dom/events';
import { render } from './dom/render';
import { TodoRepo } from './repos/todoRepo';
import { ProjectRepo } from './repos/projectRepo';
import { initFirebaseAuth } from './user';

const todoRepo = new TodoRepo();
const projectRepo = new ProjectRepo();

//check for local storage data
const storage = (() => {
  if (!localStorage.getItem('todos')) {
    localStorage.setItem('todos', '[]');
  } else {
    todoRepo.todos = JSON.parse(localStorage.getItem('todos'));
    todoRepo.id = todoRepo.todos.length;
  }
  if (!localStorage.getItem('projects')) {
    localStorage.setItem('projects', '[]');
    const createInboxProject = () => {
      projectRepo.createProject('Inbox');
      render.renderProjectSelect('Inbox');
    };
    createInboxProject();
  } else {
    projectRepo.projects = JSON.parse(localStorage.getItem('projects'));
    projectRepo.id = projectRepo.projects.length;
    render.renderProjectSelect('Inbox');
  }
})();

render.renderInboxList();
render.renderProjectList();
render.renderProjectSelectors();

initFirebaseAuth();

export { todoRepo, projectRepo, storage };
