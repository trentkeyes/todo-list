import { todoRepo } from '../repos/todoRepo';
import { projectRepo } from '../repos/projectRepo';
import { render } from './render';

const events = (() => {
  const taskName = document.querySelector('#taskName');
  const description = document.querySelector('#description');
  const dueDate = document.querySelector('#dueDate');
  const priority = document.querySelector('#priority');
  const project = document.querySelector('#projectName');
  const detailsPopup = document.querySelector('#detailsPopup');

  const createInboxProject = () => {
    projectRepo.createProject('Inbox');
    render.renderProjectSelect('Inbox');
  };
  // create todo / save todo
  const inputTodo = () => {
    console.log(`Inputting ${todoRepo.currentTodo}`);
    if (todoRepo.currentTodo !== null) {
      const id = todoRepo.currentTodo;
      updateTodo(id);
      return;
    }
    const item = todoRepo.createTodo(
      taskName.value,
      description.value,
      dueDate.value,
      priority.value,
      project.value
    );
    if (item && projectRepo.currentProject === item.projectID) {
      render.renderTodoItem(item);
    }
    render.closeDetailsPopup();
  };

  const updateTodo = (id) => {
    todoRepo.updateTodo(id, (record) => {
      record.setTitle = taskName.value;
      record.setDescription = description.value;
      record.setDueDate = dueDate.value;
      record.setPriority = priority.value;
      record.setProjectID = projectRepo.getProjectID(project.value);
    });
    if (todoRepo.todos[id].projectID === projectRepo.currentProject) {
      render.renderModifiedTodo(id);
      console.log('updated and rendered');
    }
    todoRepo.currentTodo = null;
    render.closeDetailsPopup();
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
    todoRepo.updateTodo(item.todoID, (record) => {
      record.setCompleteStatus = true;
    });
  };

  const popupDetailsForm = (e) => {
    if (e.target.type === 'checkbox') {
      return;
    }
    const idToModify = e.target.todoID;
    detailsPopup.classList.add('open-popup');
    //previoustodo problem, doesn't work with zero, try with current element
    if (idToModify >= 0) {
      render.currentListElement = e.target;
      console.log(`modifying ${idToModify}`);
      todoRepo.currentTodo = idToModify;
      render.renderPreviousDetails(idToModify);
      return;
    }
    console.log('starting fresh');
  };

  const addTaskButton = document.querySelector('#taskButton');
  addTaskButton.addEventListener('click', popupDetailsForm);

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
    popupDetailsForm,
  };
})();

export { events };
