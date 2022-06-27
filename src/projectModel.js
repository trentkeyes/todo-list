class projectModel {
  constructor(name) {
    this.name = name;
    this.archive = false;
  }
  set setArchive(bool) {
    this.archive = bool;
  }
  //maybe set a color, delete, archive
}

export { projectModel };