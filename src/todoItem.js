const todoData = (() => {
  const todos = [];
  let id = 0;
  const getID = () => id;
  const addTodo = (item) => {
    todos.push(item);
    id++;
  };
  const getTodos = () => todos;
  return { addTodo, getTodos, getID };
})();

const todoItem = (name) => {
  const sayName = () => console.log(`My title is: ${name}`);
  return { name, sayName };
};

const createTodo = (name) => {
  const newTodo = todoItem(name);
  newTodo.id = todoData.getID();
  todoData.addTodo(newTodo);
  console.log(todoData.getTodos());
};

export { createTodo };
