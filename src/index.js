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
  checkbox.todoID = todoData.getNewTodoID();

  const list = document.querySelector(".todo-list");
  const listItem = document.createElement("li");
  listItem.classList.add("todoItem");
  list.prepend(listItem);
  const newTodo = document.createElement("label");
  newTodo.classList.add("todoText");
  const hr = document.createElement("hr");
  listItem.appendChild(checkbox);
  listItem.appendChild(newTodo);
  listItem.after(hr);
  newTodo.textContent = todoData.getNewTodo();

  // hr.setAttribute("width", "100px");

  checkbox.addEventListener("click", markComplete);
};

const markComplete = (e) => {
  const list = document.querySelector(".todo-list");
  console.log(e.target.todoID);
};

const addTaskButton = document.querySelector("#taskButton");
addTaskButton.addEventListener("click", inputTodo);
