import { todoRepo } from "../repos/todoRepo";
import { projectRepo } from "../repos/projectRepo";
import { render } from "./render";

const events = (() => {
  const createInboxProject = () => {
    projectRepo.createProject("Inbox");
    render.renderProjectSelect("Inbox");
  };

  const inputTodo = () => {
    const taskName = document.querySelector("#taskName").value;
    const description = document.querySelector("#description").value;
    const dueDate = document.querySelector("#dueDate").value;
    const priority = document.querySelector("#priority").value;
    const project = document.querySelector("#projectName").value;
    const item = todoRepo.createTodo(
      taskName,
      description,
      dueDate,
      priority,
      project
    );
    if (render.getRenderingProject() === item.projectID) {
      render.renderTodoItem(item);
    }
  };

  const createProject = () => {
    const title = document.querySelector("#newProject").value;
    const project = projectRepo.createProject(title);
    render.renderProjectTitle(project.title);
    render.renderProjectSelect(project.title);
  };

  const markComplete = (e) => {
    const item = e.target.parentElement;
    render.renderCompletedItem(item);
    // use this structure to edit everything else
    todoRepo.updateTodo(item.todoID, (record) => {
      record.setCompleteStatus = true;
    });
  };

  const addTaskButton = document.querySelector("#taskButton");
  addTaskButton.addEventListener("click", inputTodo);

  const addProjectButton = document.querySelector("#projectButton");
  addProjectButton.addEventListener("click", createProject);

  const inbox = document.querySelector("#Inbox");
  inbox.addEventListener("click", render.renderTodoList);

  const completed = document.querySelector("#Completed");
  completed.addEventListener("click", render.renderCompletedList);

  createInboxProject();

  return {
    markComplete,
  };
})();

export { events };
