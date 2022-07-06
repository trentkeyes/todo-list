import { TodoModel } from '/src/models/todoModel';
import { projectRepo } from '/src/index';
import { storage } from '..';

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
      todo.setProjectID = projectID;
      this.todos.push(todo);
      this.id++;
      //save to local storage
      storage.todosJSON.push(todo.createJSON());
      localStorage.setItem('todos', JSON.stringify(storage.todosJSON));
      return todo;
    }
  }
  updateTodo(id, action) {
    const record = this.todos[id];
    action(record);
    // save to local storage
    storage.todosJSON[id] = record;
    localStorage.setItem('todos', JSON.stringify(storage.todosJSON));
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
