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
  list.prepend(listItem);
  const newTodo = document.createElement("label");
  newTodo.classList.add("todoText");
  newTodo.textContent = todoData.getNewTodo();
  const hr = document.createElement("hr");
  // hr.setAttribute("width", "100px");
  listItem.appendChild(checkbox);
  listItem.appendChild(newTodo);
  listItem.after(hr);
};

const addTaskButton = document.querySelector("#taskButton");
addTaskButton.addEventListener("click", inputTodo);
