import { todoRepo } from '../repos/todoRepo';
import { projectRepo } from '../repos/projectRepo';
import { render } from './render';

const events = (() => {
  const createInboxProject = () => {
    projectRepo.createProject('Inbox');
    render.renderProjectSelect('Inbox');
  };

  const inputTodo = () => {
    if (todoRepo.activeTodo !== null) {
      updateTodo();
      return;
    }
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
    dueDate.value = '';
    priority.value = '';
    project.value = 'Inbox';
    render.closeDetailsPopup();
  };

   // events.updateTodo(id);
  // after... todoRepo.activeTodo = null;

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
  addTaskButton.addEventListener('click', render.renderDetailsPopup);

  const addProjectButton = document.querySelector('#projectButton');
  addProjectButton.addEventListener('click', createProject);

  const saveButton = document.querySelector('#saveButton');
  saveButton.addEventListener('click', inputTodo);

  const inbox = document.querySelector('#Inbox');
  inbox.addEventListener('click', render.renderTodoList);

  const completed = document.querySelector('#Completed');
  completed.addEventListener('click', render.renderCompletedList);

  const closeButton = document.querySelector('#closeButton');
  closeButton.addEventListener('click', render.closeDetailsPopup);

  createInboxProject();

  return {
    markComplete,
  };
})();

export { events };
