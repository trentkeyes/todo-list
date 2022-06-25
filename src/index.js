import { todoData } from "./todoData";
import { format, compareAsc } from "date-fns";

// format(new Date(2014, 1, 11), "MM/dd/yyyy");
// //=> '02/11/2014'

// const dates = [
//   new Date(1995, 6, 2),
//   new Date(1987, 1, 11),
//   new Date(1989, 6, 10),
// ];
// console.log(dates.sort(compareAsc));

// const myDate = format(new Date(2022, 10, 10), "PPPP");

// console.log(myDate);

//dom stuff

const inputTodo = (e) => {
  const taskName = document.querySelector("#taskName").value;
  const description = document.querySelector("#description").value;
  const dueDate = document.querySelector("#dueDate").value;
  const priority = document.querySelector("#priority").value;
  console.log(dueDate, priority);
  todoData.createTodo(taskName, description, dueDate, priority);
};

const taskButton = document.querySelector("#taskButton");
taskButton.addEventListener("click", inputTodo);
