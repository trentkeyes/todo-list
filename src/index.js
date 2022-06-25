import { todoData } from "./todoData";

//dom stuff

const inputTodo = (e) => {
  const taskName = document.querySelector("#taskName").value;
  const description = document.querySelector("#description").value;
  todoData.createTodo(taskName, description);
};

const taskButton = document.querySelector("#taskButton");
taskButton.addEventListener("click", inputTodo);
