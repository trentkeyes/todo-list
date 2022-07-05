import { events } from '../index';
import { todoRepo } from '../repos/todoRepo';
import { projectRepo } from '../repos/projectRepo';

const render = (() => {
  // todo items
  let currentListElement;
  const getCurrentListElement = () => currentListElement;
  const setCurrentListElement = (obj) => {
    currentListElement = obj;
  };

  const list = document.querySelector('.todo-list');
  const form = document.querySelector('.todo-form');
  const detailsPopup = document.querySelector('#detailsPopup');

  const renderTodoItem = (todo) => {
    const listItem = document.createElement('li');
    const title = document.createElement('label');
    const checkbox = document.createElement('input');
    const priority = document.createElement('p');
    const dueDate = document.createElement('p');
    const description = document.createElement('p');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.classList.add('checkbox');
    listItem.classList.add('todoItem');
    title.classList.add('todoText');
    priority.classList.add('priorityText');
    description.classList.add('descriptionText');
    dueDate.classList.add('dueDateText');

    list.insertBefore(listItem, form);
    listItem.appendChild(checkbox);
    listItem.appendChild(title);
    listItem.appendChild(description);
    listItem.appendChild(dueDate);
    listItem.appendChild(priority);

    checkbox.addEventListener('click', events.markComplete);
    listItem.addEventListener('click', events.popupDetailsForm);

    listItem.todoID = todo.id;
    fillItemDetails(todo, title, description, dueDate, priority);
  };

  const fillItemDetails = (todo, title, description, dueDate, priority) => {
    title.textContent = todo.title;
    description.textContent = todo.description;
    if (todo.dueDate) {
      dueDate.textContent = `${todo.getDueDate}`;
    }
    if (todo.priority) {
      switch (todo.priority) {
        case 'Low':
          priority.textContent = 'Low priority';
          priority.classList.remove('mediumPriority', 'highPriority');
          priority.classList.add('lowPriority');

          break;
        case 'Medium':
          priority.textContent = 'Medium priority';
          priority.classList.remove('lowPriority', 'highPriority');
          priority.classList.add('mediumPriority');
          break;
        case 'High':
          priority.textContent = 'High priority';
          priority.classList.remove('lowPriority', 'mediumPriority');
          priority.classList.add('highPriority');
          break;
      }
    }
  };

  const renderModifiedTodo = (id) => {
    const todo = todoRepo.todos[id];
    const elements = getCurrentListElement().children;
    fillItemDetails(todo, elements[1], elements[2], elements[3], elements[4]);
  };

  const renderRemovedItem = (item) => {
    list.removeChild(item);
  };

  // todo lists
  const renderTodoList = (e) => {
    const project = e.target.id;
    const projectID = projectRepo.getProjectID(project);
    clearList();
    projectRepo.currentProject = projectID;
    const todoList = projectRepo.getProjectItems(projectID);
    todoList.forEach((item) => {
      renderTodoItem(item);
    });
    projectHeader.textContent = project;
  };

  const renderCompletedList = () => {
    const todoList = todoRepo.getCompletedTodos;
    projectRepo.currentProject = 'Completed';
    clearList();
    todoList.forEach((item) => {
      const listItem = document.createElement('li');
      const title = document.createElement('label');
      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      listItem.classList.add('todoItem');
      title.classList.add('todoText');
      checkbox.setAttribute('checked', true);
      checkbox.setAttribute('disabled', true);
      listItem.classList.add('strikethrough');

      list.insertBefore(listItem, form);
      listItem.appendChild(checkbox);
      listItem.appendChild(title);

      listItem.todoID = item.id;
      title.textContent = item.title;
    });
    projectHeader.textContent = 'Completed';
  };

  const clearList = () => {
    Array.from(list.childNodes).forEach((child) => {
      if (child.nodeName === 'LI') {
        list.removeChild(child);
      }
    });
  };

  //projects
  const projectHeader = document.querySelector('.inbox-header');

  const renderProjectTitle = (project) => {
    const projectList = document.querySelector('.projectList');
    const projectInput = document.querySelector('.newProject');
    const listItem = document.createElement('li');
    const listItemA = document.createElement('a');
    listItemA.setAttribute('href', '#');
    listItemA.setAttribute('id', project);
    listItemA.textContent = project;
    listItem.appendChild(listItemA);
    projectList.insertBefore(listItem, projectInput);
    listItemA.addEventListener('click', renderTodoList);
  };

  const renderProjectSelect = (project) => {
    const projectSelect = document.querySelector('#projectName');
    const newOption = document.createElement('option');
    newOption.setAttribute('value', project);
    newOption.textContent = project;
    projectSelect.appendChild(newOption);
  };

  // details form
  const taskName = document.querySelector('#taskName');
  const description = document.querySelector('#description');
  const dueDate = document.querySelector('#dueDate');
  const priority = document.querySelector('#priority');
  const project = document.querySelector('#projectName');

  const renderSavedDetails = (id) => {
    const todo = todoRepo.todos[id];
    taskName.value = todo.title;
    description.value = todo.description;
    dueDate.value = todo.dueDate;
    priority.value = todo.priority;
    project.value = projectRepo.projects[todo.projectID].title;
  };

  const closeDetailsPopup = () => {
    detailsPopup.classList.remove('open-popup');
    resetForm();
  };

  const resetForm = () => {
    taskName.value = '';
    description.value = '';
    dueDate.value = '';
    priority.value = '';
    project.value = 'Inbox';
  };

  return {
    renderTodoItem,
    renderTodoList,
    renderCompletedList,
    renderRemovedItem,
    renderProjectTitle,
    renderProjectSelect,
    closeDetailsPopup,
    renderModifiedTodo,
    renderSavedDetails,
    setCurrentListElement,
  };
})();

export { render };
