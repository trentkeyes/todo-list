import { TodoModel } from "./todoModel";
import { ProjectModel } from "./projectModel";

//rewrite to be class, change name to todoRepo

const todoData = (() => {
  const todos = [];
  let id = 0;
  const projects = ["inbox"];
  let projectID = 0;
  const createTodo = (title, description, dueDate, priority, project) => {
    const newTodo = new TodoModel(id, title, description, dueDate, priority);
    console.log(project);
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].title === project) {
        newTodo.setProjectID = projects[i].id;
      }
    }
    if (newTodo.projectID === undefined) {
      projects.push(new ProjectModel(projectID, project));
      newTodo.projectID = projectID;
      projectID++;
      //projects have to be created first in the sidebar
    }
    todos.push(newTodo);
    id++;
    getTodos();
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
