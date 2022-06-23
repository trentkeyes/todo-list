import { todoData } from "./todoData";

//dom stuff

const inputTodo = (e) => {
  if (e.key === "Enter") {
    const input = e.target.value;
    todoData.createTodo(input);
    textInput.value = "";
  }
};

const textInput = document.querySelector(".todoInput");
textInput.addEventListener("keypress", inputTodo);

const content = document.querySelector("#content");

// const addTodo = document.createElement("button");
// addTodo.textContent = "Add a todo";
// content.appendChild(addTodo);
