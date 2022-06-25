import { format, add } from "date-fns";

const todoModel = (title, description, dueDate, priority) => {
  let complete = false;
  const setCompleteStatus = () => {
    complete ? (complete = false) : (complete = true);
    //trigger dom event to make task dissapear
  };
  const getTitle = () => title;
  const setTitle = (newTitle) => (title = newTitle);
  const getDescription = () => description;
  const setDescription = (newDescription) => (description = newDescription);
  const getDueDate = (dueDate) => {
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
  //complete todo boolean

  return {
    setCompleteStatus,
    getTitle,
    setTitle,
    getDescription,
    setDescription,
    getDueDate,
    setDueDate,
    getPriority,
    setPriority,
  };
};

export { todoModel };
