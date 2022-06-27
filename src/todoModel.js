import { format, add } from "date-fns";

const todoModel = (id, title, description, dueDate, priority, projectID) => {
  const getID = () => {
    console.log(id);
    return id;
  };
  const setID = (newID) => (id = newID);
  let complete = false;
  const getStatus = () => complete;
  const setStatus = (newStatus) => {
    complete = newStatus;
    console.log(complete);
  };

  const getTitle = () => {
    console.log(title);
    return title;
  };
  const setTitle = (newTitle) => (title = newTitle);
  const getDescription = () => description;
  const setDescription = (newDescription) => (description = newDescription);
  const getDueDate = () => {
    dueDate = dueDate.split("-");
    const formattedDate = format(
      new Date(dueDate[0], Number(dueDate[1]) - 1, dueDate[2]),
      "PPPP"
    );
    return formattedDate;
  };
  const setDueDate = (newDueDate) => (dueDate = newDueDate);
  const getPriority = () => priority;
  const setPriority = (newPriority) => (priority = newPriority);
  const getProjectID = () => projectID;
  const setProjectID = (newProjectID) => (projectID = newProjectID);
  //add to prject

  //  const getall formatted Info
  // might just need getTitle, get everything else, and set functions
  return {
    getID,
    setID,
    getStatus,
    setStatus,
    getTitle,
    setTitle,
    getDescription,
    setDescription,
    getDueDate,
    setDueDate,
    getPriority,
    setPriority,
    getProjectID,
    setProjectID,
  };
};

export { todoModel };
