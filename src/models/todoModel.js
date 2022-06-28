import { format } from "date-fns";

// put into a folder with project model

class TodoModel {
  constructor(id, title, description, dueDate, priority, projectID) {
    this.id = id;
    (this.title = title), (this.description = description);
    this.dueDate = dueDate;
    (this.priority = priority), (this.projectID = projectID);
    this.complete = false;
  }
  get getDueDate() {
    const split = this.dueDate.split("-");
    return format(new Date(split[0], Number(split[1]) - 1, split[2]), "PPPP");
  }
  set setID(newID) {
    this.id = newID;
  }
  set setCompleteStatus(newStatus) {
    this.complete = newStatus;
  }
  set setTitle(newTitle) {
    this.title = newTitle;
  }
  set setDescription(newDescription) {
    this.description = newDescription;
  }
  set setDueDate(newDueDate) {
    this.dueDate = newDueDate;
  }
  set setPriority(newPriority) {
    this.priority = newPriority;
  }
  set setProjectID(newProjectID) {
    this.projectID = newProjectID;
  }
}

export { TodoModel };
