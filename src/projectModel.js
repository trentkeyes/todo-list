const projectModel = (title) => {
  const changeTitle = (newTitle) => {
    title = newTitle;
  };
  const getTitle = () => title;
  return { changeTitle, getTitle };

  //edit project name
  // add todos
};

export { projectModel };
