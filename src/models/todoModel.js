import { format } from 'date-fns';

export class TodoModel {
  constructor(id, title, description, dueDate, priority, projectID) {
    this.id = id;
    (this.title = title), (this.description = description);
    this.dueDate = dueDate;
    (this.priority = priority), (this.projectID = projectID);
    this.complete = false;
  }
}

//  get getDueDate() {
//   const split = this.dueDate.split('-');
//   return format(new Date(split[0], Number(split[1]) - 1, split[2]), 'PPPP');
// }
