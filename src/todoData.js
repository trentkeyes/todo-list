import { todoModel } from "./todoModel";

const todoData = (() => {
  const todos = [];
  let id = 0;
  const projects = ["inbox"];
  const createTodo = (title, description, dueDate, priority, project) => {
    const newTodo = new todoModel(
      id,
      title,
      description,
      dueDate,
      priority,
      project
    );
    if (projects.indexOf(project) === -1) {
      projects.push(project);
    }
    newTodo.setProjectID = projects.indexOf(project);
    todos.push(newTodo);
    id++;
    getTodos();
    console.log(newTodo.getDueDate);
    console.log(projects);
  };
  const getTodos = () => {
    console.log(todos);
    return todos;
  };
  const getNewTodoTitle = () => todos[todos.length - 1].title;
  const getNewTodoID = () => todos[todos.length - 1].id;
  const updateTodo = (id, action) => {
    const record = todos[id];
    action(record);
  };

  return {
    createTodo,
    getTodos,
    getNewTodoTitle,
    getNewTodoID,
    updateTodo,
  };
})();

export { todoData };

//update todo

//first parameter would be update function

//rename service, repository
