import { TodoModel } from "/src/models/todoModel";
import { projectRepo } from "./projectRepo";

class TodoRepo {
  constructor() {
    this.todos = [];
    this.id = 0;
    this.activeProject = 0;
    this.completedTodos = [];
  }
  createTodo(title, description, dueDate, priority, project) {
    const todo = new TodoModel(this.id, title, description, dueDate, priority);
    let projectID = projectRepo.getProjectID(project);
    if (projectID === undefined) {
      projectID = projectRepo.createProject(project);
    }
    todo.setProjectID = projectID;
    this.todos.push(todo);
    this.id++;
    console.log(this.todos);
    console.log(projectRepo.projects);
  }
  updateTodo(id, action) {
    const record = this.todos[id];
    action(record);
  }
  get getNewTodo() {
    return this.todos[this.todos.length - 1];
  }
  get getCompletedTodos() {
    const completed = [];
    this.todos.forEach((item) => {
      if (item.complete) {
        completed.push(item);
      }
    });
    return completed;
  }
}

const todoRepo = new TodoRepo();

// maybe a class called todo render, param is array of todos, inside of it, you will do everything from display todo, with foreach loop

//render element, render list, can use render element inside render list

// get rid of completed project

export { todoRepo };
