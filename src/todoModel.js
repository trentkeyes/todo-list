import { format, add } from "date-fns";

const todoModel = (title, description, dueDate, priority) => {
  let complete = false;
  const setStatus = () => {
    complete ? (complete = false) : (complete = true);
    //trigger dom event to make task dissapear
  };
  const getStatus = () => {
    console.log(complete);
    return complete;
  };
  const getTitle = () => title;
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

  //  const getall formatted Info
  // might just need getTitle, get everything else, and set functions
  return {
    setStatus,
    getTitle,
    setTitle,
    getDescription,
    setDescription,
    getDueDate,
    setDueDate,
    getPriority,
    setPriority,
    getStatus,
  };
};

export { todoModel };
