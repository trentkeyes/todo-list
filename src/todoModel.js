const todoModel = (name) => {
  const sayName = () => console.log(`My title is: ${name}`);
  return { name, sayName };
};

export { todoModel };
