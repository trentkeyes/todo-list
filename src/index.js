import { events } from './dom/events';
import { render } from './dom/render';
import { TodoRepo } from './repos/todoRepo';
import { ProjectRepo } from './repos/projectRepo';

//fix todos not modifying

//populate project sidebar on startup

// render date when needed

// set repos id count whenever  todo data is added

// localStorage.clear();

const todoRepo = new TodoRepo();
const projectRepo = new ProjectRepo();
// class TodoJSON {
//   constructor(id, title, description, dueDate, priority, projectID) {
//     this.id = id;
//     (this.title = title), (this.description = description);
//     this.dueDate = dueDate;
//     (this.priority = priority), (this.projectID = projectID);
//     this.complete = false;
//   }
// }
// class TodoJSONMethods extends TodoJSON {
//   get getDueDate() {
//     const split = this.dueDate.split('-');
//     return format(new Date(split[0], Number(split[1]) - 1, split[2]), 'PPPP');
//   }
//   set setCompleteStatus(newStatus) {
//     this.complete = newStatus;
//   }
//   set setTitle(newTitle) {
//     this.title = newTitle;
//   }
//   set setDescription(newDescription) {
//     this.description = newDescription;
//   }
//   set setDueDate(newDueDate) {
//     this.dueDate = newDueDate;
//   }
//   set setPriority(newPriority) {
//     this.priority = newPriority;
//   }
//   set setProjectID(newProjectID) {
//     this.projectID = newProjectID;
//   }
// }
const storage = (() => {
  // let todoID = 0;
  // let projectID = 0;
  // const getTodoID = () => todoID;
  // const getProjectID = () => projectID;
  // const incrementTodoID = () => todoID++;
  // const incrementProjectID = () => todoID++;
  let todosJSON = [];
  let projectsJSON = [];
  if (!localStorage.getItem('todos')) {
    localStorage.setItem('todos', '[]');
    console.log('no todo data');
  } else {
    console.log(localStorage);
    todoRepo.todos = JSON.parse(localStorage.getItem('todos'));
    todoRepo.id = todoRepo.todos.length;
    console.log(todoRepo.todos, 'heres parsed todo data', todoRepo.id);
  }
  // if (!localStorage.getItem('projects')) {
  //   localStorage.setItem('projects', projectsJSON);
  //   console.log('no project data');
  // } else {
  //   todosJSON = JSON.parse(localStorage.getItem('todos'));
  //   console.log(todosJSON, 'heres project data');
  //   projectRepo.projects = projectsJSON;
  // }
  // const saveToStorage = (type) => {
  //   if (type === 'todos') {
  //     todosJSON = todoRepo.todos;
  //     localStorage.setItem('todos', JSON.stringify(todosJSON));
  //     return;
  //   }
  //   if (type === 'projects') {
  //     projectsJSON = projectRepo.projects;
  //     localStorage.setItem('projects', JSON.stringify(projectsJSON));
  //     return;
  //   }
  // };
  const addTodo = (id) => {};
  const modifyTodo = (id) => {};
  const addProject = (id) => {};
  return {
    todosJSON,
    projectsJSON,
    // getTodoID,
    // getProjectID,
    // incrementTodoID,
    // incrementProjectID,
  };
})();
const createInboxProject = () => {
  projectRepo.createProject('Inbox');
  render.renderProjectSelect('Inbox');
};
createInboxProject();
render.renderInboxList();

export { todoRepo, projectRepo, storage };
