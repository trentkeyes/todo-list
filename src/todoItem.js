const todoItem = (title, priority) => {
  const getTitle = () => title;
  const getPriority = () => priority;
  const sayTitle = () => console.log(`My title is: ${title}`);
  return { title, priority, sayTitle };
};

export { todoItem };
