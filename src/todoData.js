import { todoModel } from "./todoModel";
import { projectData } from "./projectData";

const todoData = (() => {
  const todos = [];
  let id = 0;
  const createTodo = (name, description, dueDate, priority, project) => {
    const newTodo = todoModel(name, description, dueDate, priority);
    newTodo.id = id;
    todos.push(newTodo);
    id++;
    if (project) {
      projectData.addToProject(newTodo, project);
    }
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
  return {
    createTodo,
    getTodos,
    getNewTodo,
    getNewTodoID,
    setTodoStatus,
  };
})();

export { todoData };
