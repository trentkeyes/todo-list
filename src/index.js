import { todoRepo } from "./todoRepo";

const inputTodo = (e) => {
  const taskName = document.querySelector("#taskName").value;
  const description = document.querySelector("#description").value;
  const dueDate = document.querySelector("#dueDate").value;
  const priority = document.querySelector("#priority").value;
  const project = document.querySelector("#projectName").value;
  todoRepo.createTodo(taskName, description, dueDate, priority, project);
  displayTodo();
};

const displayTodo = () => {
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
  const project = e.target.id;
  //clear list
  clearList();

  // populate projects for that list
  const items = todoRepo.findProjectItems(project);
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
  });
};

const addTaskButton = document.querySelector("#taskButton");
addTaskButton.addEventListener("click", inputTodo);

const addProjectButton = document.querySelector("#projectButton");
addProjectButton.addEventListener("click", createProject);

export { addProjectToSelect };

//have form pop up to add project

//pop up expanded todo info that lets you edit

// add a delete projects button

// have projects sidebar display only associated projects

// add date to quick/insta view
