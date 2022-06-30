import { events } from "./events";
import { todoRepo } from "../repos/todoRepo";
import { projectRepo } from "../repos/projectRepo";

const render = (() => {
  let renderingProject = 0;
  const getRenderingProject = () => renderingProject || 0;

  //shared queried elements object? const domElements
  const projectHeader = document.querySelector(".inbox-header");

  const renderTodoItem = (item) => {
    const list = document.querySelector(".todo-list");
    const form = document.querySelector(".todo-form");
    const listItem = document.createElement("li");
    const title = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    listItem.classList.add("todoItem");
    title.classList.add("todoText");

    list.insertBefore(listItem, form);
    listItem.appendChild(checkbox);
    listItem.appendChild(title);

    listItem.todoID = item.id;
    title.textContent = item.title;

    checkbox.addEventListener("click", events.markComplete);
  };

  const clearList = () => {
    const list = document.querySelector(".todo-list");
    Array.from(list.childNodes).forEach((child) => {
      if (child.nodeName === "LI") {
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
    renderingProject = "Completed";
    clearList();
    todoList.forEach((item) => {
      renderTodoItem(item);
    });
    // add these attributes to the loop
    // checkbox.setAttribute("checked", true);
    // listItem.classList.add("strikethrough");
    projectHeader.textContent = "Completed";
  };

  const renderCompletedItem = (item) => {
    const list = document.querySelector(".todo-list");
    list.removeChild(item);
  };

  const renderProjectTitle = (project) => {
    const projectList = document.querySelector(".projectList");
    const projectInput = document.querySelector(".newProject");
    const listItem = document.createElement("li");
    const listItemA = document.createElement("a");
    listItemA.setAttribute("href", "#");
    listItemA.setAttribute("id", project);
    listItemA.textContent = project;
    listItem.appendChild(listItemA);
    projectList.insertBefore(listItem, projectInput);
    listItemA.addEventListener("click", renderTodoList);

    //change selector to the same project
  };

  const renderProjectSelect = (project) => {
    const projectSelect = document.querySelector("#projectName");
    const newOption = document.createElement("option");
    newOption.setAttribute("value", project);
    newOption.textContent = project;
    projectSelect.appendChild(newOption);
  };
  return {
    getRenderingProject,
    renderTodoItem,
    renderTodoList,
    renderCompletedList,
    renderCompletedItem,
    renderProjectTitle,
    renderProjectSelect,
  };
})();

export { render };
