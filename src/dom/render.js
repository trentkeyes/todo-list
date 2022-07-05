import { events } from './events';
import { todoRepo } from '../repos/todoRepo';
import { projectRepo } from '../repos/projectRepo';

const render = (() => {
  // todo items
  let currentListElement;
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
    const datePriorityFlex = document.createElement('div');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.classList.add('checkbox');
    listItem.classList.add('todoItem');
    title.classList.add('todoText');
    priority.classList.add('priorityText');
    description.classList.add('descriptionText');
    dueDate.classList.add('dueDateText');
    datePriorityFlex.classList.add('datePriorityFlex');

    list.insertBefore(listItem, form);
    listItem.appendChild(checkbox);
    listItem.appendChild(title);
    listItem.appendChild(description);
    listItem.appendChild(datePriorityFlex);
    datePriorityFlex.append(dueDate, priority);

    checkbox.addEventListener('click', events.markComplete);
    listItem.addEventListener('click', events.popupDetailsForm);

    listItem.todoID = todo.id;
    currentListElement = listItem;
    fillItemDetails(todo, title, priority, description, dueDate);
  };

  const fillItemDetails = (todo, title, priority, description, dueDate) => {
    title.textContent = todo.title;
    description.textContent = todo.description;
    if (todo.dueDate) {
      dueDate.textContent = `${todo.getDueDate}`;
    }
    if (todo.priority) {
      switch (todo.priority) {
        case 'Low':
          priority.textContent = 'Low priority';
          priority.classList.add('lowPriority');
          break;
        case 'Medium':
          priority.textContent = 'Medium priority';
          priority.classList.add('mediumPriority');
          break;
        case 'High':
          priority.textContent = 'High priority';
          priority.classList.add('highPriority');
          break;
      }
    }
  };

  const renderModifiedTodo = (id) => {
    const todo = todoRepo.todos[id];
    console.log(currentListElement);
    const todoItems = Array.from(document.querySelectorAll('.todoItem'));
    let elements;
    let datePriorityFlex;
    for (const item of todoItems) {
      if (item.todoID === id) {
        elements = item.children; // { 0: input.checkbox, 1: label.todoText, 2: p.priorityText, 3: div }
        datePriorityFlex = elements[3].children;
      }
    }
    console.log(elements, datePriorityFlex);
    console.log(
      `Modifying: ${
        elements[2] //elements[2], datePriorityFlex[0], datePriorityFlex[1])
      }`
    );
    fillItemDetails(
      todo,
      elements[1],
      elements[2],
      datePriorityFlex[0],
      datePriorityFlex[1]
    );
  };

  const renderRemovedItem = (item) => {
    list.removeChild(item);
  };

  // todo lists
  const renderTodoList = (e) => {
    const project = e.target.id;
    const projectID = projectRepo.getProjectID(project);
    clearList();
    renderingProject = projectID;
    const todoList = projectRepo.getProjectItems(projectID);
    todoList.forEach((item) => {
      renderTodoItem(item);
    });
    projectHeader.textContent = project;
  };

  const renderCompletedList = () => {
    const todoList = todoRepo.getCompletedTodos;
    renderingProject = 'Completed';
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

  const renderPreviousDetails = (id) => {
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
    renderPreviousDetails,
    currentListElement,
  };
})();

export { render };
