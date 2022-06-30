import { todoRepo } from "../repos/todoRepo";
import { projectRepo } from "../repos/projectRepo";
import { render } from "./render";

const events = (() => {
  const createInboxProject = () => {
    projectRepo.createProject("Inbox");
    render.renderProjectSelect("Inbox");
  };

  const inputTodo = () => {
    const taskName = document.querySelector("#taskName").value;
    const description = document.querySelector("#description").value;
    const dueDate = document.querySelector("#dueDate").value;
    const priority = document.querySelector("#priority").value;
    const project = document.querySelector("#projectName").value;
    const item = todoRepo.createTodo(
      taskName,
      description,
      dueDate,
      priority,
      project
    );
    if (render.getRenderingProject() === item.projectID) {
      render.renderTodoItem(item);
    }
  };

  const createProject = () => {
    const title = document.querySelector("#newProject").value;
    const project = projectRepo.createProject(title);
    console.log(project);

    //  render.renderTodoList(project.id);
    render.renderProjectTitle(project.title);
    render.renderProjectSelect(project.title);
  };

  const markComplete = (e) => {
    const item = e.target.parentElement;
    render.renderCompletedItem(item);
    // use this structure to edit everything else
    todoRepo.updateTodo(item.todoID, (record) => {
      record.setCompleteStatus = true;
    });
  };

  const addTaskButton = document.querySelector("#taskButton");
  addTaskButton.addEventListener("click", inputTodo);

  const addProjectButton = document.querySelector("#projectButton");
  addProjectButton.addEventListener("click", createProject);

  const inbox = document.querySelector("#Inbox");
  inbox.addEventListener("click", render.renderTodoList);

  const completed = document.querySelector("#Completed");
  completed.addEventListener("click", render.renderCompletedList);

  createInboxProject();

  //make renderCompleted it's own thing

  //when rendering project, make it if it doesn't already exist
  //   const projectHeader = document.querySelector(".inbox-header");

  //   const seeProject = (e) => {
  //     clearList();
  //     const project = e.target.id;
  //     projectHeader.textContent = project;
  //     const todoList = projectRepo.getProjectItems(project);
  //     projectRepo.activeProject = projectRepo.getProjectID(project);
  //     //render item list
  //     todoList.forEach((item) => {
  //       //renderTodoItem
  //       const list = document.querySelector(".todo-list");
  //       const form = document.querySelector(".todo-form");

  //       const listItem = document.createElement("li");
  //       const title = document.createElement("label");
  //       const checkbox = document.createElement("input");

  //       list.insertBefore(listItem, form);
  //       listItem.appendChild(checkbox);
  //       listItem.appendChild(title);

  //       checkbox.setAttribute("type", "checkbox");
  //       listItem.classList.add("todoItem");
  //       title.classList.add("todoText");

  //       listItem.todoID = item.id;
  //       title.textContent = item.title;
  //       checkbox.addEventListener("click", markComplete);
  //     });
  //   };

  return {
    markComplete,
  };
  // add event listeners

  //if it's not complete, we display project. If complete... it goes to completed projects

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
