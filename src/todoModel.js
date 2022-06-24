const todoModel = (title, description) => {
  const getTitle = () => title;
  const editTitle = (newTitle) => (title = newTitle);
  const getDescription = () => description;
  const editDescription = (newDescription) => (description = newDescription);

  // dueDate, edit duedate
  //priority, edit priority (number or low, medium high?)
  //complete todo boolean
  let complete = false;
  return { getTitle, editTitle, getDescription, editDescription };
};

export { todoModel };
