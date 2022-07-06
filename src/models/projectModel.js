class ProjectModel {
  constructor(id, title) {
    this.id = id;
    this.title = title;
  }
  createJSON() {
    return {
      id: this.id,
      title: this.title,
    };
  }
  set setID(newID) {
    this.id = newID;
  }
  set setName(newTitle) {
    this.title = newTitle;
  }
}

export { ProjectModel };
