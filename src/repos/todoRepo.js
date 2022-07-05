import { TodoModel } from '/src/models/todoModel';
import { projectRepo } from '/src/repos/projectRepo';

class TodoRepo {
  constructor() {
    this.todos = [];
    this.id = 0;
    this.currentTodo = null;
    this.todosJSON = [];
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
      console.log(todo);
      //save to local storage

      this.todosJSON.push(todo.createJSON());
      console.log(this.todosJSON);
      localStorage.setItem('todos', JSON.stringify(this.todosJSON));
      console.log(localStorage.todos);
      return todo;
    }
  }
  updateTodo(id, action) {
    const record = this.todos[id];
    action(record);
    // save to local storage
    this.todosJSON[id] = record;
    localStorage.setItem('todos', this.todosJSON);
    console.log(localStorage);
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
