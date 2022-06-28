class ProjectModel {
  constructor(id, title) {
    this.id = id;
    this.title = title;
    this.archive = false;
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
  //maybe set a color, delete, archive
}

export { ProjectModel };
