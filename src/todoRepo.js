import { TodoModel } from "./models/todoModel";
import { ProjectModel } from "./models/projectModel";
import { addProjectToSelect } from "./index";

class TodoRepo {
  constructor() {
    this.todos = [];
    this.id = 0;
    this.projects = [];
    this.projectID = 0;
    this.activeProject = 0;
    this.completedTodos = [];
  }
  createTodo(title, description, dueDate, priority, project) {
    const newTodo = new TodoModel(
      this.id,
      title,
      description,
      dueDate,
      priority
    );
    this.projects.forEach((proj) => {
      if (proj.title === project) {
        newTodo.setProjectID = proj.id;
      }
    });
    if (newTodo.projectID === undefined) {
      newTodo.projectID = projectID;
      createProject(project);
    }
    this.todos.push(newTodo);
    this.id++;
    console.log(this.todos);
    console.log(this.projects);
  }
  createProject(title) {
    this.projects.push(new ProjectModel(this.projectID, title));
    this.projectID++;
    addProjectToSelect(title);
  }
  updateTodo(id, action) {
    const record = this.todos[id];
    action(record);
  }
  addCompletedTodo(id) {
    this.completedTodos.push(this.todos[id]);
  }

  findProjectID(project) {
    let projID;
    this.projects.forEach((proj) => {
      if (proj.title === project) {
        projID = proj.id;
      }
    });
    return projID;
  }
  findProjectItems(project) {
    const projID = this.findProjectID(project);
    const projItems = [];
    this.todos.forEach((item) => {
      if (item.projectID === projID) {
        projItems.push(item);
      }
    });
    return projItems;
  }
  get getNewTodo() {
    return this.todos[this.todos.length - 1];
  }
  get getNewProj() {
    return this.projects[this.projects.length - 1];
  }
}

const todoRepo = new TodoRepo();

export { todoRepo };
