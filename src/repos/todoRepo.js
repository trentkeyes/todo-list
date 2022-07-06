import { TodoModel } from '/src/models/todoModel';
import { projectRepo } from '/src/index';

export class TodoRepo {
  constructor() {
    this.todos = [];
    this.id = 0;
    this.currentTodo = null;
  }
  createTodo(title, description, dueDate, priority, project) {
    if (title !== '') {
      const todo = new TodoModel(
        this.id,
        title,
        description,
        dueDate,
        priority
      );
      const projectID = projectRepo.getProjectID(project);
      todo.projectID = projectID;
      this.todos.push(todo);
      this.id++;
      //save to local storage
      const storage = JSON.parse(localStorage.getItem('todos'));
      storage.push(todo);
      const stringifiedArr = JSON.stringify(storage);
      localStorage.setItem('todos', stringifiedArr);
      return todo;
    }
  }
  updateTodo(id, action) {
    const record = this.todos[id];
    action(record);
    //modify local storage
    const storage = JSON.parse(localStorage.getItem('todos'));
    storage[id] = record;
    const stringifiedArr = JSON.stringify(storage);
    localStorage.setItem('todos', stringifiedArr);
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
