import { events } from './events';
import { todoRepo } from '../repos/todoRepo';
import { projectRepo } from '../repos/projectRepo';

const render = (() => {
  let renderingProject = 0;
  const getRenderingProject = () => renderingProject || 0;

  const list = document.querySelector('.todo-list');
  const form = document.querySelector('.todo-form');

  const projectHeader = document.querySelector('.inbox-header');

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
    listItem.appendChild(priority);
    listItem.appendChild(description);
    listItem.appendChild(dueDate);

    checkbox.addEventListener('click', events.markComplete);
    listItem.addEventListener('click', renderDetailsPopup);

    listItem.todoID = todo.id;
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

  const clearList = () => {
    Array.from(list.childNodes).forEach((child) => {
      if (child.nodeName === 'LI') {
        list.removeChild(child);
      }
    });
  };

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

  const renderRemovedItem = (item) => {
    list.removeChild(item);
  };

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

  //put in events and rename popup details?
  const renderDetailsPopup = (e) => {
    if (e.target.type === 'checkbox') {
      return;
    }
    const previousTodo = e.target.todoID;
    if (previousTodo || previousTodo === 0) {
      todoRepo.activeTodo = previousTodo;
      console.log(todoRepo);
      renderPreviousDetails(previousTodo);
    }

    const detailsPopup = document.querySelector('#detailsPopup');
    detailsPopup.classList.add('open-popup');
  };

  const closeDetailsPopup = () => {
    const detailsPopup = document.querySelector('#detailsPopup');
    detailsPopup.classList.remove('open-popup');
  };

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

  const renderModifiedTodo = (id) => {
    const todo = todoRepo.todos[id];
    const todoItems = Array.from(document.querySelectorAll('.todoItem'));
    let elements;
    for (const item of todoItems) {
      if (item.todoID === id) {
        elements = item.children; // { 0: input.checkbox, 1: label.todoText, 2: p.priorityText, 3: p.descriptionText, 4: p.dueDateText, length: 5 }
      }
    }
    fillItemDetails(todo, elements[1], elements[2], elements[3], elements[4]);
  };

  const resetForm = () => {
    render.closeDetailsPopup();
    taskName.value = '';
    description.value = '';
    dueDate.value = '';
    priority.value = '';
    project.value = 'Inbox';
  };

  return {
    getRenderingProject,
    renderTodoItem,
    renderTodoList,
    renderCompletedList,
    renderRemovedItem,
    renderProjectTitle,
    renderProjectSelect,
    renderDetailsPopup,
    closeDetailsPopup,
    resetForm,
    renderModifiedTodo,
  };
})();

export { render };
