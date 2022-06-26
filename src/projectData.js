const projectData = (() => {
  const todos = [];
  let id = 0;
  const addTodo = (todo) => {
    todos.push(todo);
    id++;
  };
  const getTodos = () => {
    console.log(todos);
    return todos;
  };
  const getNewTodo = () => todos[todos.length - 1].getTitle();
  return { addTodo, getTodos, getNewTodo };
})();

export { projectData };
