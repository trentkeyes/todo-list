import { todoModel } from "./todoModel";
import { projectData } from "./projectData";

const todoData = (() => {
  const todos = [];
  let id = 0;
  const projects = ["inbox object"];
  let projectID = 0;
  const createTodo = (title, description, dueDate, priority, project) => {
    const newTodo = todoModel(
      id,
      title,
      description,
      dueDate,
      priority,
      projectID
    );
    todos.push(newTodo);
    id++;
    //add/ attach project todo
    // if (project) {
    //   projectData.addToProject(newTodo, project);
    // }
    getTodos();
    newTodo.getID();
  };
  const getTodos = () => {
    console.log(todos);
    return todos;
  };
  //consolodate these
  const getNewTodo = () => todos[todos.length - 1].getTitle();
  const getNewTodoID = () => todos[todos.length - 1].getID();
  const setTodoStatus = (index) => {
    todos[index].setStatus();
    projectData.addToProject(todos[index], "completed");
  };
  const updateTodo = (id, action) => {
    const record = todos[id];
    action(record);
    //save to database
  };

  return {
    createTodo,
    getTodos,
    getNewTodo,
    getNewTodoID,
    setTodoStatus,
    updateTodo,
  };
})();

export { todoData };

//update todo

//first parameter would be update function

//rename service, repository
