import { todoRepo } from "../repos/todoRepo";
import { projectRepo } from "../repos/projectRepo";

//all dom events are here until I separate at least render/events
// for rendering list I can write the vars for all that are shared
const events = (() => {
  const createInboxProject = () => {
    projectRepo.createProject("Inbox");
    addProjectToSelect("Inbox");
  };

  const inputTodo = () => {
    const taskName = document.querySelector("#taskName").value;
    const description = document.querySelector("#description").value;
    const dueDate = document.querySelector("#dueDate").value;
    const priority = document.querySelector("#priority").value;
    const project = document.querySelector("#projectName").value;
    todoRepo.createTodo(taskName, description, dueDate, priority, project);
    if (
      todoRepo.activeProject === todoRepo.getNewTodo.projectID ||
      todoRepo.activeProject === 0
    ) {
      displayTodo();
    }
  };
  // display one todo, display list of todos
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

    listItem.todoID = todoRepo.getNewTodo.id;
    newTodo.textContent = todoRepo.getNewTodo.title;
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
    //todoRepo.addCompletedTodo(listItem.todoID);
  };

  const createProject = () => {
    const newProject = document.querySelector("#newProject").value;
    projectRepo.createProject(newProject);
    displayProject(newProject);
    addProjectToSelect(newProject);
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
    const header = document.querySelector(".inbox-header");
    header.textContent = project;

    //get project/complete items list
    if (project === "Completed") {
      //get completed todos
      items = todoRepo.getCompletedTodos;
      projectRepo.activeProject = "Completed";
    }
    if (project !== "Completed") {
      items = projectRepo.getProjectItems(project);
      projectRepo.activeProject = projectRepo.getProjectID(project);
    }
    //render item list
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
      if (project === "Completed") {
        checkbox.setAttribute("checked", true);
        listItem.classList.add("strikethrough");
      }
    });
  };

  // add event listeners

  const addTaskButton = document.querySelector("#taskButton");
  addTaskButton.addEventListener("click", inputTodo);

  const addProjectButton = document.querySelector("#projectButton");
  addProjectButton.addEventListener("click", createProject);

  const inbox = document.querySelector("#Inbox");
  inbox.addEventListener("click", seeProject);

  const completed = document.querySelector("#Completed");
  completed.addEventListener("click", seeProject);
  //if it's not complete, we display project. If complete... it goes to completed projects

  createInboxProject();

  // return {

  // }
  //have form pop up to add project

  //pop up expanded todo info that lets you edit

  // add a delete projects button

  // add date to quick/insta view

  // don't display completed todos

  // how can I better organize this DOM page?

  // maybe a class called todo render, param is array of todos, inside of it, you will do everything from display todo, with foreach loop

  //render element, render list, can use render element inside render list
})();

export { events };
