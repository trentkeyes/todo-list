import { TodoModel } from "/src/models/todoModel";
import { projectRepo } from "/src/repos/projectRepo";

class TodoRepo {
  constructor() {
    this.todos = [];
    this.id = 0;
  }
  createTodo(title, description, dueDate, priority, project) {
    const todo = new TodoModel(this.id, title, description, dueDate, priority);
    const projectID = projectRepo.getProjectID(project);
    todo.setProjectID = projectID;
    this.todos.push(todo);
    this.id++;
    return todo;
  }
  updateTodo(id, action) {
    const record = this.todos[id];
    action(record);
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

export { todoRepo };
