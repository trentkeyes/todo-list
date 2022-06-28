import { TodoModel } from "./models/todoModel";
import { ProjectModel } from "./models/projectModel";
import { addProjectToSelect } from "./index";

//rewrite to be class

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
  const getNewTodoProjID = () => todos[todos.length - 1].projectID;
  const updateTodo = (id, action) => {
    const record = todos[id];
    action(record);
  };
  const findProjectID = (project) => {
    let projID;
    projects.forEach((proj) => {
      if (proj.title === project) {
        projID = proj.id;
      }
    });
    return projID;
  };
  const findProjectItems = (project) => {
    const projID = findProjectID(project);
    // loop through todo array and get all with that projectID;
    const projItems = [];
    todos.forEach((item) => {
      if (item.projectID === projID) {
        projItems.push(item);
      }
    });
    return projItems;
  };
  const addCompletedTodo = (id) => {
    completedTodos.push(todos[id]);
  };
  const completedTodos = [];
  let activeProject = 0;

  return {
    createTodo,
    createProject,
    getTodos,
    getNewTodoTitle,
    getNewTodoID,
    getNewTodoProjID,
    updateTodo,
    findProjectID,
    findProjectItems,
    addCompletedTodo,
    completedTodos,
    activeProject,
  };
})();

export { todoRepo };
