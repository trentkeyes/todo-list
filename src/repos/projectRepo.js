import { ProjectModel } from "/src/models/projectModel";
import { todoRepo } from "./todoRepo";
import { addProjectToSelect } from "/src/dom/events";

class ProjectRepo {
  constructor() {
    this.projects = [];
    this.id = 0;
    this.activeProject = 0;
  }
  createProject(title) {
    const project = new ProjectModel(this.id, title);
    this.projects.push(project);
    this.id++;
    // addProjectToSelect(title);
    return project.id;
  }
  getProjectID(title) {
    this.projects.forEach((project) => {
      if (project.title === title) {
        return project.id;
      }
    });
  }
  getProjectItems(title) {
    const projID = this.getProjectID(title);
    const projItems = [];
    todoRepo.todos.forEach((item) => {
      if (item.projectID === projID) {
        projItems.push(item);
      }
    });
    return projItems;
  }
  get getNewProj() {
    return this.projects[this.projects.length - 1];
  }
}

const projectRepo = new ProjectRepo();

export { projectRepo };
