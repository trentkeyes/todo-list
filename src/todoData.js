import { todoModel } from "./todoModel";

const todoData = (() => {
  const todos = [];
  let id = 0;
  const getID = () => id;
  const createTodo = (name, description) => {
    const newTodo = todoModel(name, description);
    newTodo.id = id;
    todos.push(newTodo);
    id++;
    getTodos();
  };
  const getTodos = () => {
    console.log(todos);
    return todos;
  };
  return { createTodo, getTodos, getID };
})();

//add model folder, create two different files, todoItem.js, category.js

export { todoData };
