import { TodoModel } from "./models/todoModel";
import { ProjectModel } from "./models/projectModel";
import { addProjectToSelect } from "./index";

//rewrite to be class, change name to todoRepo

const todoRepo = (() => {
  const todos = [];
  let id = 0;
  const projects = [];
  let projectID = 0;
  const createTodo = (title, description, dueDate, priority, project) => {
    const newTodo = new TodoModel(id, title, description, dueDate, priority);
    projects.forEach((proj) => {
      if (proj.title === project) {
        newTodo.setProjectID = proj.id;
      }
    });
    if (newTodo.projectID === undefined) {
      newTodo.projectID = projectID;
      createProject(project);
    }
    todos.push(newTodo);
    id++;
    getTodos();
    console.log(projects);
  };
  const createProject = (title) => {
    projects.push(new ProjectModel(projectID, title));
    projectID++;
    addProjectToSelect(title);
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
    createProject,
    getTodos,
    getNewTodoTitle,
    getNewTodoID,
    updateTodo,
  };
})();

export { todoRepo };

//rename service, repository
