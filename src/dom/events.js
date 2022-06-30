import { todoRepo } from '../repos/todoRepo';
import { projectRepo } from '../repos/projectRepo';
import { render } from './render';

const events = (() => {
  const createInboxProject = () => {
    projectRepo.createProject('Inbox');
    render.renderProjectSelect('Inbox');
  };

  const inputTodo = () => {
    const taskName = document.querySelector('#taskName');
    const description = document.querySelector('#description');
    const dueDate = document.querySelector('#dueDate');
    const priority = document.querySelector('#priority');
    const project = document.querySelector('#projectName');
    const item = todoRepo.createTodo(
      taskName.value,
      description.value,
      dueDate.value,
      priority.value,
      project.value
    );
    if (item && render.getRenderingProject() === item.projectID) {
      render.renderTodoItem(item);
    }
    taskName.value = '';
    description.value = '';
    priority.value = '';
  };

  const createProject = () => {
    const title = document.querySelector('#newProject');
    const project = projectRepo.createProject(title.value);
    if (project) {
      render.renderProjectTitle(project.title);
      render.renderProjectSelect(project.title);
    }
    title.value = '';
  };

  const markComplete = (e) => {
    const item = e.target.parentElement;
    render.renderRemovedItem(item);
    // use this structure to edit everything else
    todoRepo.updateTodo(item.todoID, (record) => {
      record.setCompleteStatus = true;
    });
  };

  const addTaskButton = document.querySelector('#taskButton');
  addTaskButton.addEventListener('click', inputTodo);

  const addProjectButton = document.querySelector('#projectButton');
  addProjectButton.addEventListener('click', createProject);

  const inbox = document.querySelector('#Inbox');
  inbox.addEventListener('click', render.renderTodoList);

  const completed = document.querySelector('#Completed');
  completed.addEventListener('click', render.renderCompletedList);

  createInboxProject();

  return {
    markComplete,
  };
})();

export { events };
