import { todoModel } from "./todoModel";

const todoData = (() => {
  const todos = [];
  let id = 0;
  const getID = () => id;
  const createTodo = (name, description, dueDate, priority) => {
    const newTodo = todoModel(name, description, dueDate, priority);
    newTodo.id = id;
    todos.push(newTodo);
    id++;
    getTodos();
  };
  const getTodos = () => {
    //  console.log(todos);
    return todos;
  };
  return { createTodo, getTodos };
})();

export { todoData };
