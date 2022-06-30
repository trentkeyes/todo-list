import { ProjectModel } from "/src/models/projectModel";
import { todoRepo } from "./todoRepo";

class ProjectRepo {
  constructor() {
    this.projects = [];
    this.id = 0;
  }
  createProject(title) {
    // check if proj with same name exists
    const project = new ProjectModel(this.id, title);
    this.projects.push(project);
    this.id++;
    return project;
  }
  getProjectID(title) {
    for (const project of this.projects) {
      if (title === project.title) {
        return project.id;
      }
    }
  }
  getProjectItems(id) {
    const projectItems = todoRepo.todos.filter(
      (item) => item.projectID === id && item.complete === false
    );
    return projectItems;
  }
  get getNewProj() {
    return this.projects[this.projects.length - 1];
  }
}

const projectRepo = new ProjectRepo();

export { projectRepo };
