const projectData = (() => {
  const todos = [];
  let id = 0;
  const getID = () => id;
  const addTodo = (todo) => {
    todos.push(todo);
    id++;
  };
  const getTodos = () => {
    console.log(todos);
    return { getTodos, addTodo, getID };
  };
})();

export { projectData };
