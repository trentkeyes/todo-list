class ProjectModel {
  constructor(id, title) {
    this.id = id;
    this.title = title;
    this.archive = false;
    // add completed / delete project
  }
  set setID(newID) {
    this.id = newID;
  }
  set setName(newTitle) {
    this.title = newTitle;
  }
  set setArchive(bool) {
    this.archive = bool;
  }
}

export { ProjectModel };
