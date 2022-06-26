import { todoData } from "./todoData";
import { format, compareAsc } from "date-fns";

//dom stuff

const inputTodo = (e) => {
  const taskName = document.querySelector("#taskName").value;
  const description = document.querySelector("#description").value;
  const dueDate = document.querySelector("#dueDate").value;
  const priority = document.querySelector("#priority").value;
  todoData.createTodo(taskName, description, dueDate, priority);
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
  console.log(e.target.parentElement.todoID);

  // need to remove the line in a different way. It always takes the one from the top.
};

const addTaskButton = document.querySelector("#taskButton");
addTaskButton.addEventListener("click", inputTodo);
