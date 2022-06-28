import { todoRepo } from "./todoRepo";

const createInboxProject = () => {
  todoRepo.createProject("Inbox");
};

const inputTodo = (e) => {
  const taskName = document.querySelector("#taskName").value;
  const description = document.querySelector("#description").value;
  const dueDate = document.querySelector("#dueDate").value;
  const priority = document.querySelector("#priority").value;
  const project = document.querySelector("#projectName").value;
  todoRepo.createTodo(taskName, description, dueDate, priority, project);
  if (
    todoRepo.activeProject === todoRepo.getNewTodoProjID ||
    todoRepo.activeProject === 0
  ) {
    displayTodo();
  }
};

const displayTodo = () => {
  //if displayed project === project id, display

  //and not complete

  //make list item with checkbox, add to list
  const list = document.querySelector(".todo-list");
  const listItem = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  listItem.classList.add("todoItem");
  const form = document.querySelector(".todo-form");
  list.insertBefore(listItem, form);
  const newTodo = document.createElement("label");
  newTodo.classList.add("todoText");
  listItem.appendChild(checkbox);
  listItem.appendChild(newTodo);

  listItem.todoID = todoRepo.getNewTodoID();
  newTodo.textContent = todoRepo.getNewTodoTitle();
  checkbox.addEventListener("click", markComplete);
};

const markComplete = (e) => {
  const list = document.querySelector(".todo-list");
  const listItem = e.target.parentElement;
  list.removeChild(listItem);
  // use this structure to edit everything else
  todoRepo.updateTodo(listItem.todoID, (record) => {
    record.setCompleteStatus = true;
  });
  todoRepo.addCompletedTodo(listItem.todoID);
};

const createProject = () => {
  const newProject = document.querySelector("#newProject").value;
  todoRepo.createProject(newProject);
  displayProject(newProject);
};

const displayProject = (newProject) => {
  const projectList = document.querySelector(".projectList");
  const listItem = document.createElement("li");
  const listItemA = document.createElement("a");
  listItemA.setAttribute("href", "#");
  listItemA.setAttribute("id", newProject);
  listItemA.textContent = newProject;
  listItemA.addEventListener("click", seeProject);
  listItem.appendChild(listItemA);
  const projectInput = document.querySelector(".newProject");
  projectList.insertBefore(listItem, projectInput);
};

const addProjectToSelect = (project) => {
  const projectSelect = document.querySelector("#projectName");
  const newOption = document.createElement("option");
  newOption.setAttribute("value", project);
  newOption.textContent = project;
  projectSelect.appendChild(newOption);
};

const clearList = () => {
  const list = document.querySelector(".todo-list");
  Array.from(list.childNodes).forEach((child) => {
    if (child.nodeName === "LI") {
      list.removeChild(child);
    }
  });
};

const seeProject = (e) => {
  clearList();
  const project = e.target.id;
  let items;
  if (project === "completed") {
    items = todoRepo.completedTodos;
    todoRepo.activeProject = "completed";
  }
  if (project !== "completed") {
    items = todoRepo.findProjectItems(project);
    todoRepo.activeProject = todoRepo.findProjectID(project);
  }

  items.forEach((item) => {
    const list = document.querySelector(".todo-list");
    const listItem = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    listItem.classList.add("todoItem");
    const form = document.querySelector(".todo-form");
    list.insertBefore(listItem, form);
    const newTodo = document.createElement("label");
    newTodo.classList.add("todoText");
    listItem.appendChild(checkbox);
    listItem.appendChild(newTodo);

    listItem.todoID = item.id;
    newTodo.textContent = item.title;
    checkbox.addEventListener("click", markComplete);
    console.log(item);
    if (project === "completed") {
      checkbox.setAttribute("checked", true);
    }
  });
};

const addTaskButton = document.querySelector("#taskButton");
addTaskButton.addEventListener("click", inputTodo);

const addProjectButton = document.querySelector("#projectButton");
addProjectButton.addEventListener("click", createProject);

const inbox = document.querySelector("#Inbox");
inbox.addEventListener("click", seeProject);

const completed = document.querySelector("#completed");
completed.addEventListener("click", seeProject);
//if it's not complete, we display project. If complete... it goes to completed projects

createInboxProject();

export { addProjectToSelect };

//have form pop up to add project

//pop up expanded todo info that lets you edit

// add a delete projects button

// add date to quick/insta view

// have inbox and completed show correct projects, change title from"inbox"

// how can I better organize this DOM page?
