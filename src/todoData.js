import { todoModel } from "./todoModel";

const todoData = (() => {
  const todos = [];
  let id = 0;
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
  const getNewTodo = () => todos[todos.length - 1].getTitle();
  const getNewTodoID = () => todos[todos.length - 1].id;
  return { createTodo, getTodos, getNewTodo, getNewTodoID };
})();

export { todoData };
