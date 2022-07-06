import { render } from './render';
import { todoRepo } from '/src/index';
import { projectRepo } from '/src/index';

const events = (() => {
  const taskName = document.querySelector('#taskName');
  const description = document.querySelector('#description');
  const dueDate = document.querySelector('#dueDate');
  const priority = document.querySelector('#priority');
  const project = document.querySelector('#projectName');
  const detailsPopup = document.querySelector('#detailsPopup');

  const inputTodo = () => {
    // modify if todo has already been created
    if (todoRepo.currentTodo !== null) {
      const id = todoRepo.currentTodo;
      updateTodoRecord(id);
      return;
    }
    // create a new todo
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

  const updateTodoRecord = (id) => {
    todoRepo.updateTodo(id, (record) => {
      record.title = taskName.value;
      record.description = description.value;
      record.dueDate = dueDate.value;
      record.priority = priority.value;
      record.projectID = projectRepo.getProjectID(project.value);
    });
    if (todoRepo.todos[id].projectID === projectRepo.currentProject) {
      render.renderModifiedTodo(id);
    } else {
      render.renderRemovedItem(render.getCurrentListElement());
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
    console.log(item);
    todoRepo.updateTodo(item.todoID, (record) => {
      record.complete = true;
    });
  };

  const popupDetailsForm = (e) => {
    if (e.target.type === 'checkbox') {
      return;
    }
    detailsPopup.classList.add('open-popup');
    if (e.target.id === 'taskButton') {
      return;
    }
    let idToModify;
    //if p or label is clicked, remember parent li element
    if (
      e.target.className === 'todoText' ||
      e.target.className === 'priorityText' ||
      e.target.className === 'descriptionText' ||
      e.target.className === 'dueDateText'
    ) {
      render.setCurrentListElement(e.target.parentElement);
      idToModify = e.target.parentElement.todoID;
    } else if (e.target.className === 'todoItem') {
      render.setCurrentListElement(e.target);
      idToModify = e.target.todoID;
    }
    todoRepo.currentTodo = idToModify;
    render.renderSavedDetails(idToModify);
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

  return {
    markComplete,
    popupDetailsForm,
  };
})();

export { events };
