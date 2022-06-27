import { todoData } from "./todoData";
import { format, compareAsc } from "date-fns";

//dom stuff

const inputTodo = (e) => {
  const taskName = document.querySelector("#taskName").value;
  const description = document.querySelector("#description").value;
  const dueDate = document.querySelector("#dueDate").value;
  const priority = document.querySelector("#priority").value;
  const project = document.querySelector("#projectName").value;
  todoData.createTodo(taskName, description, dueDate, priority, project);
  displayTodo();
};

const displayTodo = () => {
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  const list = document.querySelector(".todo-list");
  const listItem = document.createElement("li");
  listItem.classList.add("todoItem");
  const form = document.querySelector(".todo-form");
  list.insertBefore(listItem, form);
  const newTodo = document.createElement("label");
  newTodo.classList.add("todoText");
  listItem.appendChild(checkbox);
  listItem.appendChild(newTodo);

  listItem.todoID = todoData.getNewTodoID();
  newTodo.textContent = todoData.getNewTodo();
  checkbox.addEventListener("click", markComplete);
};

const markComplete = (e) => {
  const list = document.querySelector(".todo-list");
  const listItem = e.target.parentElement;
  list.removeChild(listItem);
  // use this idea to edit everything else
  todoData.updateTodo(listItem.todoID, (record) => {
    record.setStatus(true);
  });
};
const addToProject = [];

const addTaskButton = document.querySelector("#taskButton");
addTaskButton.addEventListener("click", inputTodo);

//pop up form

//pop up expanded todo info that lets you edit

//add project on side panel

//so it goes inbox, completed, projects, add project

// add select element that loops through the project names for input

//make two directories for data and model
//record is undefined?
// const update = (id, action) => {
//   var record = // get the element by id

//   action(record);

//   // save into database
// }

// todoData.setTodoStatus(listItem.todoID, function (record) {
//   record.setTitle("new title");
// });
