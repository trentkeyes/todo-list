import { todoModel } from "./todoModel";
import { projectData } from "./projectData";

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
    console.log(todos);
    return todos;
  };
  //consolodate these
  const getNewTodo = () => todos[todos.length - 1].getTitle();
  const getNewTodoID = () => todos[todos.length - 1].id;
  const setTodoStatus = (index) => {
    todos[index].setStatus();
    projectData.addToProject(todos[index], "completed");
  };
  const addToProject = (item, title) => projectData.addToProject(item, title);
  return {
    createTodo,
    getTodos,
    getNewTodo,
    getNewTodoID,
    setTodoStatus,
    addToProject,
  };
})();

export { todoData };
