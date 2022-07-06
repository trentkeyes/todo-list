/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom/events.js":
/*!***************************!*\
  !*** ./src/dom/events.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "events": () => (/* binding */ events)
/* harmony export */ });
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render */ "./src/dom/render.js");
/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../src/index */ "./src/index.js");




const events = (() => {
  const taskName = document.querySelector('#taskName');
  const description = document.querySelector('#description');
  const dueDate = document.querySelector('#dueDate');
  const priority = document.querySelector('#priority');
  const project = document.querySelector('#projectName');
  const detailsPopup = document.querySelector('#detailsPopup');

  const inputTodo = () => {
    // modify if todo has already been created
    if (_src_index__WEBPACK_IMPORTED_MODULE_1__.todoRepo.currentTodo !== null) {
      const id = _src_index__WEBPACK_IMPORTED_MODULE_1__.todoRepo.currentTodo;
      updateTodoRecord(id);
      return;
    }
    // create a new todo
    const item = _src_index__WEBPACK_IMPORTED_MODULE_1__.todoRepo.createTodo(
      taskName.value,
      description.value,
      dueDate.value,
      priority.value,
      project.value
    );
    if (item && _src_index__WEBPACK_IMPORTED_MODULE_1__.projectRepo.currentProject === item.projectID) {
      _render__WEBPACK_IMPORTED_MODULE_0__.render.renderTodoItem(item);
    }
    _render__WEBPACK_IMPORTED_MODULE_0__.render.closeDetailsPopup();
  };

  const updateTodoRecord = (id) => {
    _src_index__WEBPACK_IMPORTED_MODULE_1__.todoRepo.updateTodo(id, (record) => {
      record.title = taskName.value;
      record.description = description.value;
      record.dueDate = dueDate.value;
      record.priority = priority.value;
      record.projectID = _src_index__WEBPACK_IMPORTED_MODULE_1__.projectRepo.getProjectID(project.value);
    });
    if (_src_index__WEBPACK_IMPORTED_MODULE_1__.todoRepo.todos[id].projectID === _src_index__WEBPACK_IMPORTED_MODULE_1__.projectRepo.currentProject) {
      _render__WEBPACK_IMPORTED_MODULE_0__.render.renderModifiedTodo(id);
    }
    _src_index__WEBPACK_IMPORTED_MODULE_1__.todoRepo.currentTodo = null;
    _render__WEBPACK_IMPORTED_MODULE_0__.render.closeDetailsPopup();
  };

  const createProject = () => {
    const title = document.querySelector('#newProject');
    const project = _src_index__WEBPACK_IMPORTED_MODULE_1__.projectRepo.createProject(title.value);
    if (project) {
      _render__WEBPACK_IMPORTED_MODULE_0__.render.renderProjectTitle(project.title);
      _render__WEBPACK_IMPORTED_MODULE_0__.render.renderProjectSelect(project.title);
    }
    title.value = '';
  };

  const markComplete = (e) => {
    const item = e.target.parentElement;
    _render__WEBPACK_IMPORTED_MODULE_0__.render.renderRemovedItem(item);
    _src_index__WEBPACK_IMPORTED_MODULE_1__.todoRepo.updateTodo(item.todoID, (record) => {
      record.complete = true;
    });
  };

  const popupDetailsForm = (e) => {
    if (e.target.type === 'checkbox') {
      return;
    }
    detailsPopup.classList.add('open-popup');
    if (e.target.id === 'taskButton') {
      return;
    }
    let idToModify;
    //if p or label is clicked, remember parent li element
    if (
      e.target.className === 'todoText' ||
      e.target.className === 'priorityText' ||
      e.target.className === 'descriptionText' ||
      e.target.className === 'dueDateText'
    ) {
      _render__WEBPACK_IMPORTED_MODULE_0__.render.setCurrentListElement(e.target.parentElement);
      idToModify = e.target.parentElement.todoID;
    } else if (e.target.className === 'todoItem') {
      _render__WEBPACK_IMPORTED_MODULE_0__.render.setCurrentListElement(e.target);
      idToModify = e.target.todoID;
    }
    _src_index__WEBPACK_IMPORTED_MODULE_1__.todoRepo.currentTodo = idToModify;
    _render__WEBPACK_IMPORTED_MODULE_0__.render.renderSavedDetails(idToModify);
  };

  const addTaskButton = document.querySelector('#taskButton');
  addTaskButton.addEventListener('click', popupDetailsForm);

  const addProjectButton = document.querySelector('#projectButton');
  addProjectButton.addEventListener('click', createProject);

  const saveButton = document.querySelector('#saveButton');
  saveButton.addEventListener('click', inputTodo);

  const inbox = document.querySelector('#Inbox');
  inbox.addEventListener('click', _render__WEBPACK_IMPORTED_MODULE_0__.render.renderTodoList);

  const completed = document.querySelector('#Completed');
  completed.addEventListener('click', _render__WEBPACK_IMPORTED_MODULE_0__.render.renderCompletedList);

  const closeButton = document.querySelector('#closeButton');
  closeButton.addEventListener('click', _render__WEBPACK_IMPORTED_MODULE_0__.render.closeDetailsPopup);

  return {
    markComplete,
    popupDetailsForm,
  };
})();




/***/ }),

/***/ "./src/dom/render.js":
/*!***************************!*\
  !*** ./src/dom/render.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events */ "./src/dom/events.js");
/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../src/index */ "./src/index.js");




const render = (() => {
  // todo items
  let currentListElement;
  const getCurrentListElement = () => currentListElement;
  const setCurrentListElement = (obj) => {
    currentListElement = obj;
  };

  const list = document.querySelector('.todo-list');
  const form = document.querySelector('.todo-form');
  const detailsPopup = document.querySelector('#detailsPopup');

  const renderTodoItem = (todo) => {
    const listItem = document.createElement('li');
    const title = document.createElement('label');
    const checkbox = document.createElement('input');
    const priority = document.createElement('p');
    const dueDate = document.createElement('p');
    const description = document.createElement('p');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.classList.add('checkbox');
    listItem.classList.add('todoItem');
    title.classList.add('todoText');
    priority.classList.add('priorityText');
    description.classList.add('descriptionText');
    dueDate.classList.add('dueDateText');

    list.insertBefore(listItem, form);
    listItem.appendChild(checkbox);
    listItem.appendChild(title);
    listItem.appendChild(description);
    listItem.appendChild(dueDate);
    listItem.appendChild(priority);

    checkbox.addEventListener('click', _events__WEBPACK_IMPORTED_MODULE_0__.events.markComplete);
    listItem.addEventListener('click', _events__WEBPACK_IMPORTED_MODULE_0__.events.popupDetailsForm);

    listItem.todoID = todo.id;
    fillItemDetails(todo, title, description, dueDate, priority);
  };

  const fillItemDetails = (todo, title, description, dueDate, priority) => {
    title.textContent = todo.title;
    description.textContent = todo.description;
    if (todo.dueDate) {
      dueDate.textContent = `${todo.getDueDate}`;
    }
    if (todo.priority) {
      switch (todo.priority) {
        case 'Low':
          priority.textContent = 'Low priority';
          priority.classList.remove('mediumPriority', 'highPriority');
          priority.classList.add('lowPriority');

          break;
        case 'Medium':
          priority.textContent = 'Medium priority';
          priority.classList.remove('lowPriority', 'highPriority');
          priority.classList.add('mediumPriority');
          break;
        case 'High':
          priority.textContent = 'High priority';
          priority.classList.remove('lowPriority', 'mediumPriority');
          priority.classList.add('highPriority');
          break;
      }
    }
  };

  const renderModifiedTodo = (id) => {
    const todo = _src_index__WEBPACK_IMPORTED_MODULE_1__.todoRepo.todos[id];
    const elements = getCurrentListElement().children;
    fillItemDetails(todo, elements[1], elements[2], elements[3], elements[4]);
  };

  const renderRemovedItem = (item) => {
    list.removeChild(item);
  };

  // todo lists

  const renderInboxList = () => {
    const todoList = _src_index__WEBPACK_IMPORTED_MODULE_1__.projectRepo.getProjectItems(0);
    todoList.forEach((item) => {
      if (item.complete === false) renderTodoItem(item);
    });
  };

  const renderTodoList = (e) => {
    const project = e.target.id;
    const projectID = _src_index__WEBPACK_IMPORTED_MODULE_1__.projectRepo.getProjectID(project);
    clearList();
    _src_index__WEBPACK_IMPORTED_MODULE_1__.projectRepo.currentProject = projectID;
    const todoList = _src_index__WEBPACK_IMPORTED_MODULE_1__.projectRepo.getProjectItems(projectID);
    todoList.forEach((item) => {
      renderTodoItem(item);
    });
    projectHeader.textContent = project;
  };

  const renderCompletedList = () => {
    const todoList = _src_index__WEBPACK_IMPORTED_MODULE_1__.todoRepo.getCompletedTodos;
    _src_index__WEBPACK_IMPORTED_MODULE_1__.projectRepo.currentProject = 'Completed';
    clearList();
    todoList.forEach((item) => {
      const listItem = document.createElement('li');
      const title = document.createElement('label');
      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      listItem.classList.add('todoItem');
      title.classList.add('todoText');
      checkbox.setAttribute('checked', true);
      checkbox.setAttribute('disabled', true);
      listItem.classList.add('strikethrough');

      list.insertBefore(listItem, form);
      listItem.appendChild(checkbox);
      listItem.appendChild(title);

      listItem.todoID = item.id;
      title.textContent = item.title;
    });
    projectHeader.textContent = 'Completed';
  };

  const clearList = () => {
    Array.from(list.childNodes).forEach((child) => {
      if (child.nodeName === 'LI') {
        list.removeChild(child);
      }
    });
  };

  //projects
  const projectHeader = document.querySelector('.inbox-header');

  const renderProjectTitle = (project) => {
    const projectList = document.querySelector('.projectList');
    const projectInput = document.querySelector('.newProject');
    const listItem = document.createElement('li');
    const listItemA = document.createElement('a');
    listItemA.setAttribute('href', '#');
    listItemA.setAttribute('id', project);
    listItemA.textContent = project;
    listItem.appendChild(listItemA);
    projectList.insertBefore(listItem, projectInput);
    listItemA.addEventListener('click', renderTodoList);
  };

  //render proj list

  const renderProjectSelect = (project) => {
    const projectSelect = document.querySelector('#projectName');
    const newOption = document.createElement('option');
    newOption.setAttribute('value', project);
    newOption.textContent = project;
    projectSelect.appendChild(newOption);
  };

  // details form
  const taskName = document.querySelector('#taskName');
  const description = document.querySelector('#description');
  const dueDate = document.querySelector('#dueDate');
  const priority = document.querySelector('#priority');
  const project = document.querySelector('#projectName');

  const renderSavedDetails = (id) => {
    const todo = _src_index__WEBPACK_IMPORTED_MODULE_1__.todoRepo.todos[id];
    taskName.value = todo.title;
    description.value = todo.description;
    dueDate.value = todo.dueDate;
    priority.value = todo.priority;
    project.value = _src_index__WEBPACK_IMPORTED_MODULE_1__.projectRepo.projects[todo.projectID].title;
  };

  const closeDetailsPopup = () => {
    detailsPopup.classList.remove('open-popup');
    resetForm();
  };

  const resetForm = () => {
    taskName.value = '';
    description.value = '';
    dueDate.value = '';
    priority.value = '';
    project.value = 'Inbox';
  };

  return {
    renderTodoItem,
    renderInboxList,
    renderTodoList,
    renderCompletedList,
    renderRemovedItem,
    renderProjectTitle,
    renderProjectSelect,
    closeDetailsPopup,
    renderModifiedTodo,
    renderSavedDetails,
    setCurrentListElement,
  };
})();




/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "projectRepo": () => (/* binding */ projectRepo),
/* harmony export */   "storage": () => (/* binding */ storage),
/* harmony export */   "todoRepo": () => (/* binding */ todoRepo)
/* harmony export */ });
/* harmony import */ var _dom_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom/events */ "./src/dom/events.js");
/* harmony import */ var _dom_render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom/render */ "./src/dom/render.js");
/* harmony import */ var _repos_todoRepo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./repos/todoRepo */ "./src/repos/todoRepo.js");
/* harmony import */ var _repos_projectRepo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./repos/projectRepo */ "./src/repos/projectRepo.js");





//fix todos not modifying

//populate project sidebar on startup

// render date when needed

// set repos id count whenever  todo data is added

// localStorage.clear();

const todoRepo = new _repos_todoRepo__WEBPACK_IMPORTED_MODULE_2__.TodoRepo();
const projectRepo = new _repos_projectRepo__WEBPACK_IMPORTED_MODULE_3__.ProjectRepo();
// class TodoJSON {
//   constructor(id, title, description, dueDate, priority, projectID) {
//     this.id = id;
//     (this.title = title), (this.description = description);
//     this.dueDate = dueDate;
//     (this.priority = priority), (this.projectID = projectID);
//     this.complete = false;
//   }
// }
// class TodoJSONMethods extends TodoJSON {
//   get getDueDate() {
//     const split = this.dueDate.split('-');
//     return format(new Date(split[0], Number(split[1]) - 1, split[2]), 'PPPP');
//   }
//   set setCompleteStatus(newStatus) {
//     this.complete = newStatus;
//   }
//   set setTitle(newTitle) {
//     this.title = newTitle;
//   }
//   set setDescription(newDescription) {
//     this.description = newDescription;
//   }
//   set setDueDate(newDueDate) {
//     this.dueDate = newDueDate;
//   }
//   set setPriority(newPriority) {
//     this.priority = newPriority;
//   }
//   set setProjectID(newProjectID) {
//     this.projectID = newProjectID;
//   }
// }
const storage = (() => {
  // let todoID = 0;
  // let projectID = 0;
  // const getTodoID = () => todoID;
  // const getProjectID = () => projectID;
  // const incrementTodoID = () => todoID++;
  // const incrementProjectID = () => todoID++;
  let todosJSON = [];
  let projectsJSON = [];
  if (!localStorage.getItem('todos')) {
    localStorage.setItem('todos', '[]');
    console.log('no todo data');
  } else {
    console.log(localStorage);
    todoRepo.todos = JSON.parse(localStorage.getItem('todos'));
    todoRepo.id = todoRepo.todos.length;
    console.log(todoRepo.todos, 'heres parsed todo data', todoRepo.id);
  }
  // if (!localStorage.getItem('projects')) {
  //   localStorage.setItem('projects', projectsJSON);
  //   console.log('no project data');
  // } else {
  //   todosJSON = JSON.parse(localStorage.getItem('todos'));
  //   console.log(todosJSON, 'heres project data');
  //   projectRepo.projects = projectsJSON;
  // }
  // const saveToStorage = (type) => {
  //   if (type === 'todos') {
  //     todosJSON = todoRepo.todos;
  //     localStorage.setItem('todos', JSON.stringify(todosJSON));
  //     return;
  //   }
  //   if (type === 'projects') {
  //     projectsJSON = projectRepo.projects;
  //     localStorage.setItem('projects', JSON.stringify(projectsJSON));
  //     return;
  //   }
  // };
  const addTodo = (id) => {};
  const modifyTodo = (id) => {};
  const addProject = (id) => {};
  return {
    todosJSON,
    projectsJSON,
    // getTodoID,
    // getProjectID,
    // incrementTodoID,
    // incrementProjectID,
  };
})();
const createInboxProject = () => {
  projectRepo.createProject('Inbox');
  _dom_render__WEBPACK_IMPORTED_MODULE_1__.render.renderProjectSelect('Inbox');
};
createInboxProject();
_dom_render__WEBPACK_IMPORTED_MODULE_1__.render.renderInboxList();




/***/ }),

/***/ "./src/models/projectModel.js":
/*!************************************!*\
  !*** ./src/models/projectModel.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectModel": () => (/* binding */ ProjectModel)
/* harmony export */ });
class ProjectModel {
  constructor(id, title) {
    this.id = id;
    this.title = title;
  }
}


/***/ }),

/***/ "./src/models/todoModel.js":
/*!*********************************!*\
  !*** ./src/models/todoModel.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TodoModel": () => (/* binding */ TodoModel)
/* harmony export */ });


class TodoModel {
  constructor(id, title, description, dueDate, priority, projectID) {
    this.id = id;
    (this.title = title), (this.description = description);
    this.dueDate = dueDate;
    (this.priority = priority), (this.projectID = projectID);
    this.complete = false;
  }
}

//  get getDueDate() {
//   const split = this.dueDate.split('-');
//   return format(new Date(split[0], Number(split[1]) - 1, split[2]), 'PPPP');
// }


/***/ }),

/***/ "./src/repos/projectRepo.js":
/*!**********************************!*\
  !*** ./src/repos/projectRepo.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectRepo": () => (/* binding */ ProjectRepo)
/* harmony export */ });
/* harmony import */ var _src_models_projectModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../src/models/projectModel */ "./src/models/projectModel.js");
/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! .. */ "./src/index.js");




class ProjectRepo {
  constructor() {
    this.projects = [];
    this.id = 0;
    this.currentProject = 0;
  }
  createProject(title) {
    if (this.isValid(title)) {
      const project = new _src_models_projectModel__WEBPACK_IMPORTED_MODULE_0__.ProjectModel(this.id, title);
      this.projects.push(project);
      this.id++;
      // storage.projectsJSON.push(project.createJSON());
      console.log(this.projects);
      // localStorage.setItem('projects', JSON.stringify(storage.projectsJSON));
      return project;
    }
  }
  getProjectID(title) {
    for (const project of this.projects) {
      if (title === project.title) {
        return project.id;
      }
    }
  }
  getProjectItems(id) {
    const projectItems = _src_index__WEBPACK_IMPORTED_MODULE_1__.todoRepo.todos.filter(
      (item) => item.projectID === id && item.complete === false
    );
    return projectItems;
  }
  isValid(title) {
    return title !== '' && this.getProjectID(title) === undefined;
  }
}


/***/ }),

/***/ "./src/repos/todoRepo.js":
/*!*******************************!*\
  !*** ./src/repos/todoRepo.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TodoRepo": () => (/* binding */ TodoRepo)
/* harmony export */ });
/* harmony import */ var _src_models_todoModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../src/models/todoModel */ "./src/models/todoModel.js");
/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! .. */ "./src/index.js");





class TodoRepo {
  constructor() {
    this.todos = [];
    this.id = 0;
    this.currentTodo = null;
  }
  createTodo(title, description, dueDate, priority, project) {
    if (title !== '') {
      const todo = new _src_models_todoModel__WEBPACK_IMPORTED_MODULE_0__.TodoModel(
        this.id,
        title,
        description,
        dueDate,
        priority
      );
      const projectID = _src_index__WEBPACK_IMPORTED_MODULE_1__.projectRepo.getProjectID(project);
      todo.projectID = projectID;
      this.todos.push(todo);
      this.id++;
      //save to local storage
      const storage = JSON.parse(localStorage.getItem('todos'));
      storage.push(todo);
      const stringifiedArr = JSON.stringify(storage);
      localStorage.setItem('todos', stringifiedArr);
      console.log(localStorage);
      return todo;
    }
  }
  updateTodo(id, action) {
    const record = this.todos[id];
    action(record);
    //modify local storage
    const storage = JSON.parse(localStorage.getItem('todos'));
    storage[id] = record;
    const stringifiedArr = JSON.stringify(storage);
    localStorage.setItem('todos', stringifiedArr);
  }

  get getCompletedTodos() {
    const completed = [];
    this.todos.forEach((item) => {
      if (item.complete) {
        completed.push(item);
      }
    });
    return completed;
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2RvbS9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2RvbS9yZW5kZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2RlbHMvcHJvamVjdE1vZGVsLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2RlbHMvdG9kb01vZGVsLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9yZXBvcy9wcm9qZWN0UmVwby5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcmVwb3MvdG9kb1JlcG8uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlbmRlciB9IGZyb20gJy4vcmVuZGVyJztcbmltcG9ydCB7IHRvZG9SZXBvIH0gZnJvbSAnL3NyYy9pbmRleCc7XG5pbXBvcnQgeyBwcm9qZWN0UmVwbyB9IGZyb20gJy9zcmMvaW5kZXgnO1xuXG5jb25zdCBldmVudHMgPSAoKCkgPT4ge1xuICBjb25zdCB0YXNrTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrTmFtZScpO1xuICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXNjcmlwdGlvbicpO1xuICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2R1ZURhdGUnKTtcbiAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJpb3JpdHknKTtcbiAgY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0TmFtZScpO1xuICBjb25zdCBkZXRhaWxzUG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0YWlsc1BvcHVwJyk7XG5cbiAgY29uc3QgaW5wdXRUb2RvID0gKCkgPT4ge1xuICAgIC8vIG1vZGlmeSBpZiB0b2RvIGhhcyBhbHJlYWR5IGJlZW4gY3JlYXRlZFxuICAgIGlmICh0b2RvUmVwby5jdXJyZW50VG9kbyAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgaWQgPSB0b2RvUmVwby5jdXJyZW50VG9kbztcbiAgICAgIHVwZGF0ZVRvZG9SZWNvcmQoaWQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBjcmVhdGUgYSBuZXcgdG9kb1xuICAgIGNvbnN0IGl0ZW0gPSB0b2RvUmVwby5jcmVhdGVUb2RvKFxuICAgICAgdGFza05hbWUudmFsdWUsXG4gICAgICBkZXNjcmlwdGlvbi52YWx1ZSxcbiAgICAgIGR1ZURhdGUudmFsdWUsXG4gICAgICBwcmlvcml0eS52YWx1ZSxcbiAgICAgIHByb2plY3QudmFsdWVcbiAgICApO1xuICAgIGlmIChpdGVtICYmIHByb2plY3RSZXBvLmN1cnJlbnRQcm9qZWN0ID09PSBpdGVtLnByb2plY3RJRCkge1xuICAgICAgcmVuZGVyLnJlbmRlclRvZG9JdGVtKGl0ZW0pO1xuICAgIH1cbiAgICByZW5kZXIuY2xvc2VEZXRhaWxzUG9wdXAoKTtcbiAgfTtcblxuICBjb25zdCB1cGRhdGVUb2RvUmVjb3JkID0gKGlkKSA9PiB7XG4gICAgdG9kb1JlcG8udXBkYXRlVG9kbyhpZCwgKHJlY29yZCkgPT4ge1xuICAgICAgcmVjb3JkLnRpdGxlID0gdGFza05hbWUudmFsdWU7XG4gICAgICByZWNvcmQuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbi52YWx1ZTtcbiAgICAgIHJlY29yZC5kdWVEYXRlID0gZHVlRGF0ZS52YWx1ZTtcbiAgICAgIHJlY29yZC5wcmlvcml0eSA9IHByaW9yaXR5LnZhbHVlO1xuICAgICAgcmVjb3JkLnByb2plY3RJRCA9IHByb2plY3RSZXBvLmdldFByb2plY3RJRChwcm9qZWN0LnZhbHVlKTtcbiAgICB9KTtcbiAgICBpZiAodG9kb1JlcG8udG9kb3NbaWRdLnByb2plY3RJRCA9PT0gcHJvamVjdFJlcG8uY3VycmVudFByb2plY3QpIHtcbiAgICAgIHJlbmRlci5yZW5kZXJNb2RpZmllZFRvZG8oaWQpO1xuICAgIH1cbiAgICB0b2RvUmVwby5jdXJyZW50VG9kbyA9IG51bGw7XG4gICAgcmVuZGVyLmNsb3NlRGV0YWlsc1BvcHVwKCk7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlUHJvamVjdCA9ICgpID0+IHtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXdQcm9qZWN0Jyk7XG4gICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RSZXBvLmNyZWF0ZVByb2plY3QodGl0bGUudmFsdWUpO1xuICAgIGlmIChwcm9qZWN0KSB7XG4gICAgICByZW5kZXIucmVuZGVyUHJvamVjdFRpdGxlKHByb2plY3QudGl0bGUpO1xuICAgICAgcmVuZGVyLnJlbmRlclByb2plY3RTZWxlY3QocHJvamVjdC50aXRsZSk7XG4gICAgfVxuICAgIHRpdGxlLnZhbHVlID0gJyc7XG4gIH07XG5cbiAgY29uc3QgbWFya0NvbXBsZXRlID0gKGUpID0+IHtcbiAgICBjb25zdCBpdGVtID0gZS50YXJnZXQucGFyZW50RWxlbWVudDtcbiAgICByZW5kZXIucmVuZGVyUmVtb3ZlZEl0ZW0oaXRlbSk7XG4gICAgdG9kb1JlcG8udXBkYXRlVG9kbyhpdGVtLnRvZG9JRCwgKHJlY29yZCkgPT4ge1xuICAgICAgcmVjb3JkLmNvbXBsZXRlID0gdHJ1ZTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBwb3B1cERldGFpbHNGb3JtID0gKGUpID0+IHtcbiAgICBpZiAoZS50YXJnZXQudHlwZSA9PT0gJ2NoZWNrYm94Jykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkZXRhaWxzUG9wdXAuY2xhc3NMaXN0LmFkZCgnb3Blbi1wb3B1cCcpO1xuICAgIGlmIChlLnRhcmdldC5pZCA9PT0gJ3Rhc2tCdXR0b24nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBpZFRvTW9kaWZ5O1xuICAgIC8vaWYgcCBvciBsYWJlbCBpcyBjbGlja2VkLCByZW1lbWJlciBwYXJlbnQgbGkgZWxlbWVudFxuICAgIGlmIChcbiAgICAgIGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ3RvZG9UZXh0JyB8fFxuICAgICAgZS50YXJnZXQuY2xhc3NOYW1lID09PSAncHJpb3JpdHlUZXh0JyB8fFxuICAgICAgZS50YXJnZXQuY2xhc3NOYW1lID09PSAnZGVzY3JpcHRpb25UZXh0JyB8fFxuICAgICAgZS50YXJnZXQuY2xhc3NOYW1lID09PSAnZHVlRGF0ZVRleHQnXG4gICAgKSB7XG4gICAgICByZW5kZXIuc2V0Q3VycmVudExpc3RFbGVtZW50KGUudGFyZ2V0LnBhcmVudEVsZW1lbnQpO1xuICAgICAgaWRUb01vZGlmeSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQudG9kb0lEO1xuICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSAndG9kb0l0ZW0nKSB7XG4gICAgICByZW5kZXIuc2V0Q3VycmVudExpc3RFbGVtZW50KGUudGFyZ2V0KTtcbiAgICAgIGlkVG9Nb2RpZnkgPSBlLnRhcmdldC50b2RvSUQ7XG4gICAgfVxuICAgIHRvZG9SZXBvLmN1cnJlbnRUb2RvID0gaWRUb01vZGlmeTtcbiAgICByZW5kZXIucmVuZGVyU2F2ZWREZXRhaWxzKGlkVG9Nb2RpZnkpO1xuICB9O1xuXG4gIGNvbnN0IGFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFza0J1dHRvbicpO1xuICBhZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcG9wdXBEZXRhaWxzRm9ybSk7XG5cbiAgY29uc3QgYWRkUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0QnV0dG9uJyk7XG4gIGFkZFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjcmVhdGVQcm9qZWN0KTtcblxuICBjb25zdCBzYXZlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NhdmVCdXR0b24nKTtcbiAgc2F2ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGlucHV0VG9kbyk7XG5cbiAgY29uc3QgaW5ib3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjSW5ib3gnKTtcbiAgaW5ib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZW5kZXIucmVuZGVyVG9kb0xpc3QpO1xuXG4gIGNvbnN0IGNvbXBsZXRlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNDb21wbGV0ZWQnKTtcbiAgY29tcGxldGVkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVuZGVyLnJlbmRlckNvbXBsZXRlZExpc3QpO1xuXG4gIGNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Nsb3NlQnV0dG9uJyk7XG4gIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVuZGVyLmNsb3NlRGV0YWlsc1BvcHVwKTtcblxuICByZXR1cm4ge1xuICAgIG1hcmtDb21wbGV0ZSxcbiAgICBwb3B1cERldGFpbHNGb3JtLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IHsgZXZlbnRzIH07XG4iLCJpbXBvcnQgeyBldmVudHMgfSBmcm9tICcuL2V2ZW50cyc7XG5pbXBvcnQgeyB0b2RvUmVwbyB9IGZyb20gJy9zcmMvaW5kZXgnO1xuaW1wb3J0IHsgcHJvamVjdFJlcG8gfSBmcm9tICcvc3JjL2luZGV4JztcblxuY29uc3QgcmVuZGVyID0gKCgpID0+IHtcbiAgLy8gdG9kbyBpdGVtc1xuICBsZXQgY3VycmVudExpc3RFbGVtZW50O1xuICBjb25zdCBnZXRDdXJyZW50TGlzdEVsZW1lbnQgPSAoKSA9PiBjdXJyZW50TGlzdEVsZW1lbnQ7XG4gIGNvbnN0IHNldEN1cnJlbnRMaXN0RWxlbWVudCA9IChvYmopID0+IHtcbiAgICBjdXJyZW50TGlzdEVsZW1lbnQgPSBvYmo7XG4gIH07XG5cbiAgY29uc3QgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWxpc3QnKTtcbiAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWZvcm0nKTtcbiAgY29uc3QgZGV0YWlsc1BvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RldGFpbHNQb3B1cCcpO1xuXG4gIGNvbnN0IHJlbmRlclRvZG9JdGVtID0gKHRvZG8pID0+IHtcbiAgICBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGNoZWNrYm94LnNldEF0dHJpYnV0ZSgndHlwZScsICdjaGVja2JveCcpO1xuICAgIGNoZWNrYm94LmNsYXNzTGlzdC5hZGQoJ2NoZWNrYm94Jyk7XG4gICAgbGlzdEl0ZW0uY2xhc3NMaXN0LmFkZCgndG9kb0l0ZW0nKTtcbiAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKCd0b2RvVGV4dCcpO1xuICAgIHByaW9yaXR5LmNsYXNzTGlzdC5hZGQoJ3ByaW9yaXR5VGV4dCcpO1xuICAgIGRlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoJ2Rlc2NyaXB0aW9uVGV4dCcpO1xuICAgIGR1ZURhdGUuY2xhc3NMaXN0LmFkZCgnZHVlRGF0ZVRleHQnKTtcblxuICAgIGxpc3QuaW5zZXJ0QmVmb3JlKGxpc3RJdGVtLCBmb3JtKTtcbiAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChjaGVja2JveCk7XG4gICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcbiAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChkdWVEYXRlKTtcbiAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChwcmlvcml0eSk7XG5cbiAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50cy5tYXJrQ29tcGxldGUpO1xuICAgIGxpc3RJdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnRzLnBvcHVwRGV0YWlsc0Zvcm0pO1xuXG4gICAgbGlzdEl0ZW0udG9kb0lEID0gdG9kby5pZDtcbiAgICBmaWxsSXRlbURldGFpbHModG9kbywgdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSk7XG4gIH07XG5cbiAgY29uc3QgZmlsbEl0ZW1EZXRhaWxzID0gKHRvZG8sIHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpID0+IHtcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9IHRvZG8udGl0bGU7XG4gICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB0b2RvLmRlc2NyaXB0aW9uO1xuICAgIGlmICh0b2RvLmR1ZURhdGUpIHtcbiAgICAgIGR1ZURhdGUudGV4dENvbnRlbnQgPSBgJHt0b2RvLmdldER1ZURhdGV9YDtcbiAgICB9XG4gICAgaWYgKHRvZG8ucHJpb3JpdHkpIHtcbiAgICAgIHN3aXRjaCAodG9kby5wcmlvcml0eSkge1xuICAgICAgICBjYXNlICdMb3cnOlxuICAgICAgICAgIHByaW9yaXR5LnRleHRDb250ZW50ID0gJ0xvdyBwcmlvcml0eSc7XG4gICAgICAgICAgcHJpb3JpdHkuY2xhc3NMaXN0LnJlbW92ZSgnbWVkaXVtUHJpb3JpdHknLCAnaGlnaFByaW9yaXR5Jyk7XG4gICAgICAgICAgcHJpb3JpdHkuY2xhc3NMaXN0LmFkZCgnbG93UHJpb3JpdHknKTtcblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdNZWRpdW0nOlxuICAgICAgICAgIHByaW9yaXR5LnRleHRDb250ZW50ID0gJ01lZGl1bSBwcmlvcml0eSc7XG4gICAgICAgICAgcHJpb3JpdHkuY2xhc3NMaXN0LnJlbW92ZSgnbG93UHJpb3JpdHknLCAnaGlnaFByaW9yaXR5Jyk7XG4gICAgICAgICAgcHJpb3JpdHkuY2xhc3NMaXN0LmFkZCgnbWVkaXVtUHJpb3JpdHknKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnSGlnaCc6XG4gICAgICAgICAgcHJpb3JpdHkudGV4dENvbnRlbnQgPSAnSGlnaCBwcmlvcml0eSc7XG4gICAgICAgICAgcHJpb3JpdHkuY2xhc3NMaXN0LnJlbW92ZSgnbG93UHJpb3JpdHknLCAnbWVkaXVtUHJpb3JpdHknKTtcbiAgICAgICAgICBwcmlvcml0eS5jbGFzc0xpc3QuYWRkKCdoaWdoUHJpb3JpdHknKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmVuZGVyTW9kaWZpZWRUb2RvID0gKGlkKSA9PiB7XG4gICAgY29uc3QgdG9kbyA9IHRvZG9SZXBvLnRvZG9zW2lkXTtcbiAgICBjb25zdCBlbGVtZW50cyA9IGdldEN1cnJlbnRMaXN0RWxlbWVudCgpLmNoaWxkcmVuO1xuICAgIGZpbGxJdGVtRGV0YWlscyh0b2RvLCBlbGVtZW50c1sxXSwgZWxlbWVudHNbMl0sIGVsZW1lbnRzWzNdLCBlbGVtZW50c1s0XSk7XG4gIH07XG5cbiAgY29uc3QgcmVuZGVyUmVtb3ZlZEl0ZW0gPSAoaXRlbSkgPT4ge1xuICAgIGxpc3QucmVtb3ZlQ2hpbGQoaXRlbSk7XG4gIH07XG5cbiAgLy8gdG9kbyBsaXN0c1xuXG4gIGNvbnN0IHJlbmRlckluYm94TGlzdCA9ICgpID0+IHtcbiAgICBjb25zdCB0b2RvTGlzdCA9IHByb2plY3RSZXBvLmdldFByb2plY3RJdGVtcygwKTtcbiAgICB0b2RvTGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpZiAoaXRlbS5jb21wbGV0ZSA9PT0gZmFsc2UpIHJlbmRlclRvZG9JdGVtKGl0ZW0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHJlbmRlclRvZG9MaXN0ID0gKGUpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0ID0gZS50YXJnZXQuaWQ7XG4gICAgY29uc3QgcHJvamVjdElEID0gcHJvamVjdFJlcG8uZ2V0UHJvamVjdElEKHByb2plY3QpO1xuICAgIGNsZWFyTGlzdCgpO1xuICAgIHByb2plY3RSZXBvLmN1cnJlbnRQcm9qZWN0ID0gcHJvamVjdElEO1xuICAgIGNvbnN0IHRvZG9MaXN0ID0gcHJvamVjdFJlcG8uZ2V0UHJvamVjdEl0ZW1zKHByb2plY3RJRCk7XG4gICAgdG9kb0xpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgcmVuZGVyVG9kb0l0ZW0oaXRlbSk7XG4gICAgfSk7XG4gICAgcHJvamVjdEhlYWRlci50ZXh0Q29udGVudCA9IHByb2plY3Q7XG4gIH07XG5cbiAgY29uc3QgcmVuZGVyQ29tcGxldGVkTGlzdCA9ICgpID0+IHtcbiAgICBjb25zdCB0b2RvTGlzdCA9IHRvZG9SZXBvLmdldENvbXBsZXRlZFRvZG9zO1xuICAgIHByb2plY3RSZXBvLmN1cnJlbnRQcm9qZWN0ID0gJ0NvbXBsZXRlZCc7XG4gICAgY2xlYXJMaXN0KCk7XG4gICAgdG9kb0xpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgbGlzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgY2hlY2tib3guc2V0QXR0cmlidXRlKCd0eXBlJywgJ2NoZWNrYm94Jyk7XG4gICAgICBsaXN0SXRlbS5jbGFzc0xpc3QuYWRkKCd0b2RvSXRlbScpO1xuICAgICAgdGl0bGUuY2xhc3NMaXN0LmFkZCgndG9kb1RleHQnKTtcbiAgICAgIGNoZWNrYm94LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsIHRydWUpO1xuICAgICAgY2hlY2tib3guc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgbGlzdEl0ZW0uY2xhc3NMaXN0LmFkZCgnc3RyaWtldGhyb3VnaCcpO1xuXG4gICAgICBsaXN0Lmluc2VydEJlZm9yZShsaXN0SXRlbSwgZm9ybSk7XG4gICAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChjaGVja2JveCk7XG4gICAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZCh0aXRsZSk7XG5cbiAgICAgIGxpc3RJdGVtLnRvZG9JRCA9IGl0ZW0uaWQ7XG4gICAgICB0aXRsZS50ZXh0Q29udGVudCA9IGl0ZW0udGl0bGU7XG4gICAgfSk7XG4gICAgcHJvamVjdEhlYWRlci50ZXh0Q29udGVudCA9ICdDb21wbGV0ZWQnO1xuICB9O1xuXG4gIGNvbnN0IGNsZWFyTGlzdCA9ICgpID0+IHtcbiAgICBBcnJheS5mcm9tKGxpc3QuY2hpbGROb2RlcykuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIGlmIChjaGlsZC5ub2RlTmFtZSA9PT0gJ0xJJykge1xuICAgICAgICBsaXN0LnJlbW92ZUNoaWxkKGNoaWxkKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICAvL3Byb2plY3RzXG4gIGNvbnN0IHByb2plY3RIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5ib3gtaGVhZGVyJyk7XG5cbiAgY29uc3QgcmVuZGVyUHJvamVjdFRpdGxlID0gKHByb2plY3QpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0TGlzdCcpO1xuICAgIGNvbnN0IHByb2plY3RJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXdQcm9qZWN0Jyk7XG4gICAgY29uc3QgbGlzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGNvbnN0IGxpc3RJdGVtQSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBsaXN0SXRlbUEuc2V0QXR0cmlidXRlKCdocmVmJywgJyMnKTtcbiAgICBsaXN0SXRlbUEuc2V0QXR0cmlidXRlKCdpZCcsIHByb2plY3QpO1xuICAgIGxpc3RJdGVtQS50ZXh0Q29udGVudCA9IHByb2plY3Q7XG4gICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQobGlzdEl0ZW1BKTtcbiAgICBwcm9qZWN0TGlzdC5pbnNlcnRCZWZvcmUobGlzdEl0ZW0sIHByb2plY3RJbnB1dCk7XG4gICAgbGlzdEl0ZW1BLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVuZGVyVG9kb0xpc3QpO1xuICB9O1xuXG4gIC8vcmVuZGVyIHByb2ogbGlzdFxuXG4gIGNvbnN0IHJlbmRlclByb2plY3RTZWxlY3QgPSAocHJvamVjdCkgPT4ge1xuICAgIGNvbnN0IHByb2plY3RTZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdE5hbWUnKTtcbiAgICBjb25zdCBuZXdPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICBuZXdPcHRpb24uc2V0QXR0cmlidXRlKCd2YWx1ZScsIHByb2plY3QpO1xuICAgIG5ld09wdGlvbi50ZXh0Q29udGVudCA9IHByb2plY3Q7XG4gICAgcHJvamVjdFNlbGVjdC5hcHBlbmRDaGlsZChuZXdPcHRpb24pO1xuICB9O1xuXG4gIC8vIGRldGFpbHMgZm9ybVxuICBjb25zdCB0YXNrTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrTmFtZScpO1xuICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXNjcmlwdGlvbicpO1xuICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2R1ZURhdGUnKTtcbiAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJpb3JpdHknKTtcbiAgY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0TmFtZScpO1xuXG4gIGNvbnN0IHJlbmRlclNhdmVkRGV0YWlscyA9IChpZCkgPT4ge1xuICAgIGNvbnN0IHRvZG8gPSB0b2RvUmVwby50b2Rvc1tpZF07XG4gICAgdGFza05hbWUudmFsdWUgPSB0b2RvLnRpdGxlO1xuICAgIGRlc2NyaXB0aW9uLnZhbHVlID0gdG9kby5kZXNjcmlwdGlvbjtcbiAgICBkdWVEYXRlLnZhbHVlID0gdG9kby5kdWVEYXRlO1xuICAgIHByaW9yaXR5LnZhbHVlID0gdG9kby5wcmlvcml0eTtcbiAgICBwcm9qZWN0LnZhbHVlID0gcHJvamVjdFJlcG8ucHJvamVjdHNbdG9kby5wcm9qZWN0SURdLnRpdGxlO1xuICB9O1xuXG4gIGNvbnN0IGNsb3NlRGV0YWlsc1BvcHVwID0gKCkgPT4ge1xuICAgIGRldGFpbHNQb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuLXBvcHVwJyk7XG4gICAgcmVzZXRGb3JtKCk7XG4gIH07XG5cbiAgY29uc3QgcmVzZXRGb3JtID0gKCkgPT4ge1xuICAgIHRhc2tOYW1lLnZhbHVlID0gJyc7XG4gICAgZGVzY3JpcHRpb24udmFsdWUgPSAnJztcbiAgICBkdWVEYXRlLnZhbHVlID0gJyc7XG4gICAgcHJpb3JpdHkudmFsdWUgPSAnJztcbiAgICBwcm9qZWN0LnZhbHVlID0gJ0luYm94JztcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHJlbmRlclRvZG9JdGVtLFxuICAgIHJlbmRlckluYm94TGlzdCxcbiAgICByZW5kZXJUb2RvTGlzdCxcbiAgICByZW5kZXJDb21wbGV0ZWRMaXN0LFxuICAgIHJlbmRlclJlbW92ZWRJdGVtLFxuICAgIHJlbmRlclByb2plY3RUaXRsZSxcbiAgICByZW5kZXJQcm9qZWN0U2VsZWN0LFxuICAgIGNsb3NlRGV0YWlsc1BvcHVwLFxuICAgIHJlbmRlck1vZGlmaWVkVG9kbyxcbiAgICByZW5kZXJTYXZlZERldGFpbHMsXG4gICAgc2V0Q3VycmVudExpc3RFbGVtZW50LFxuICB9O1xufSkoKTtcblxuZXhwb3J0IHsgcmVuZGVyIH07XG4iLCJpbXBvcnQgeyBldmVudHMgfSBmcm9tICcuL2RvbS9ldmVudHMnO1xuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAnLi9kb20vcmVuZGVyJztcbmltcG9ydCB7IFRvZG9SZXBvIH0gZnJvbSAnLi9yZXBvcy90b2RvUmVwbyc7XG5pbXBvcnQgeyBQcm9qZWN0UmVwbyB9IGZyb20gJy4vcmVwb3MvcHJvamVjdFJlcG8nO1xuXG4vL2ZpeCB0b2RvcyBub3QgbW9kaWZ5aW5nXG5cbi8vcG9wdWxhdGUgcHJvamVjdCBzaWRlYmFyIG9uIHN0YXJ0dXBcblxuLy8gcmVuZGVyIGRhdGUgd2hlbiBuZWVkZWRcblxuLy8gc2V0IHJlcG9zIGlkIGNvdW50IHdoZW5ldmVyICB0b2RvIGRhdGEgaXMgYWRkZWRcblxuLy8gbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG5cbmNvbnN0IHRvZG9SZXBvID0gbmV3IFRvZG9SZXBvKCk7XG5jb25zdCBwcm9qZWN0UmVwbyA9IG5ldyBQcm9qZWN0UmVwbygpO1xuLy8gY2xhc3MgVG9kb0pTT04ge1xuLy8gICBjb25zdHJ1Y3RvcihpZCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdElEKSB7XG4vLyAgICAgdGhpcy5pZCA9IGlkO1xuLy8gICAgICh0aGlzLnRpdGxlID0gdGl0bGUpLCAodGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uKTtcbi8vICAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuLy8gICAgICh0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHkpLCAodGhpcy5wcm9qZWN0SUQgPSBwcm9qZWN0SUQpO1xuLy8gICAgIHRoaXMuY29tcGxldGUgPSBmYWxzZTtcbi8vICAgfVxuLy8gfVxuLy8gY2xhc3MgVG9kb0pTT05NZXRob2RzIGV4dGVuZHMgVG9kb0pTT04ge1xuLy8gICBnZXQgZ2V0RHVlRGF0ZSgpIHtcbi8vICAgICBjb25zdCBzcGxpdCA9IHRoaXMuZHVlRGF0ZS5zcGxpdCgnLScpO1xuLy8gICAgIHJldHVybiBmb3JtYXQobmV3IERhdGUoc3BsaXRbMF0sIE51bWJlcihzcGxpdFsxXSkgLSAxLCBzcGxpdFsyXSksICdQUFBQJyk7XG4vLyAgIH1cbi8vICAgc2V0IHNldENvbXBsZXRlU3RhdHVzKG5ld1N0YXR1cykge1xuLy8gICAgIHRoaXMuY29tcGxldGUgPSBuZXdTdGF0dXM7XG4vLyAgIH1cbi8vICAgc2V0IHNldFRpdGxlKG5ld1RpdGxlKSB7XG4vLyAgICAgdGhpcy50aXRsZSA9IG5ld1RpdGxlO1xuLy8gICB9XG4vLyAgIHNldCBzZXREZXNjcmlwdGlvbihuZXdEZXNjcmlwdGlvbikge1xuLy8gICAgIHRoaXMuZGVzY3JpcHRpb24gPSBuZXdEZXNjcmlwdGlvbjtcbi8vICAgfVxuLy8gICBzZXQgc2V0RHVlRGF0ZShuZXdEdWVEYXRlKSB7XG4vLyAgICAgdGhpcy5kdWVEYXRlID0gbmV3RHVlRGF0ZTtcbi8vICAgfVxuLy8gICBzZXQgc2V0UHJpb3JpdHkobmV3UHJpb3JpdHkpIHtcbi8vICAgICB0aGlzLnByaW9yaXR5ID0gbmV3UHJpb3JpdHk7XG4vLyAgIH1cbi8vICAgc2V0IHNldFByb2plY3RJRChuZXdQcm9qZWN0SUQpIHtcbi8vICAgICB0aGlzLnByb2plY3RJRCA9IG5ld1Byb2plY3RJRDtcbi8vICAgfVxuLy8gfVxuY29uc3Qgc3RvcmFnZSA9ICgoKSA9PiB7XG4gIC8vIGxldCB0b2RvSUQgPSAwO1xuICAvLyBsZXQgcHJvamVjdElEID0gMDtcbiAgLy8gY29uc3QgZ2V0VG9kb0lEID0gKCkgPT4gdG9kb0lEO1xuICAvLyBjb25zdCBnZXRQcm9qZWN0SUQgPSAoKSA9PiBwcm9qZWN0SUQ7XG4gIC8vIGNvbnN0IGluY3JlbWVudFRvZG9JRCA9ICgpID0+IHRvZG9JRCsrO1xuICAvLyBjb25zdCBpbmNyZW1lbnRQcm9qZWN0SUQgPSAoKSA9PiB0b2RvSUQrKztcbiAgbGV0IHRvZG9zSlNPTiA9IFtdO1xuICBsZXQgcHJvamVjdHNKU09OID0gW107XG4gIGlmICghbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZG9zJykpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb3MnLCAnW10nKTtcbiAgICBjb25zb2xlLmxvZygnbm8gdG9kbyBkYXRhJyk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5sb2cobG9jYWxTdG9yYWdlKTtcbiAgICB0b2RvUmVwby50b2RvcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZG9zJykpO1xuICAgIHRvZG9SZXBvLmlkID0gdG9kb1JlcG8udG9kb3MubGVuZ3RoO1xuICAgIGNvbnNvbGUubG9nKHRvZG9SZXBvLnRvZG9zLCAnaGVyZXMgcGFyc2VkIHRvZG8gZGF0YScsIHRvZG9SZXBvLmlkKTtcbiAgfVxuICAvLyBpZiAoIWxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0cycpKSB7XG4gIC8vICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgcHJvamVjdHNKU09OKTtcbiAgLy8gICBjb25zb2xlLmxvZygnbm8gcHJvamVjdCBkYXRhJyk7XG4gIC8vIH0gZWxzZSB7XG4gIC8vICAgdG9kb3NKU09OID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9kb3MnKSk7XG4gIC8vICAgY29uc29sZS5sb2codG9kb3NKU09OLCAnaGVyZXMgcHJvamVjdCBkYXRhJyk7XG4gIC8vICAgcHJvamVjdFJlcG8ucHJvamVjdHMgPSBwcm9qZWN0c0pTT047XG4gIC8vIH1cbiAgLy8gY29uc3Qgc2F2ZVRvU3RvcmFnZSA9ICh0eXBlKSA9PiB7XG4gIC8vICAgaWYgKHR5cGUgPT09ICd0b2RvcycpIHtcbiAgLy8gICAgIHRvZG9zSlNPTiA9IHRvZG9SZXBvLnRvZG9zO1xuICAvLyAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9zJywgSlNPTi5zdHJpbmdpZnkodG9kb3NKU09OKSk7XG4gIC8vICAgICByZXR1cm47XG4gIC8vICAgfVxuICAvLyAgIGlmICh0eXBlID09PSAncHJvamVjdHMnKSB7XG4gIC8vICAgICBwcm9qZWN0c0pTT04gPSBwcm9qZWN0UmVwby5wcm9qZWN0cztcbiAgLy8gICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzSlNPTikpO1xuICAvLyAgICAgcmV0dXJuO1xuICAvLyAgIH1cbiAgLy8gfTtcbiAgY29uc3QgYWRkVG9kbyA9IChpZCkgPT4ge307XG4gIGNvbnN0IG1vZGlmeVRvZG8gPSAoaWQpID0+IHt9O1xuICBjb25zdCBhZGRQcm9qZWN0ID0gKGlkKSA9PiB7fTtcbiAgcmV0dXJuIHtcbiAgICB0b2Rvc0pTT04sXG4gICAgcHJvamVjdHNKU09OLFxuICAgIC8vIGdldFRvZG9JRCxcbiAgICAvLyBnZXRQcm9qZWN0SUQsXG4gICAgLy8gaW5jcmVtZW50VG9kb0lELFxuICAgIC8vIGluY3JlbWVudFByb2plY3RJRCxcbiAgfTtcbn0pKCk7XG5jb25zdCBjcmVhdGVJbmJveFByb2plY3QgPSAoKSA9PiB7XG4gIHByb2plY3RSZXBvLmNyZWF0ZVByb2plY3QoJ0luYm94Jyk7XG4gIHJlbmRlci5yZW5kZXJQcm9qZWN0U2VsZWN0KCdJbmJveCcpO1xufTtcbmNyZWF0ZUluYm94UHJvamVjdCgpO1xucmVuZGVyLnJlbmRlckluYm94TGlzdCgpO1xuXG5leHBvcnQgeyB0b2RvUmVwbywgcHJvamVjdFJlcG8sIHN0b3JhZ2UgfTtcbiIsImV4cG9ydCBjbGFzcyBQcm9qZWN0TW9kZWwge1xuICBjb25zdHJ1Y3RvcihpZCwgdGl0bGUpIHtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBmb3JtYXQgfSBmcm9tICdkYXRlLWZucyc7XG5cbmV4cG9ydCBjbGFzcyBUb2RvTW9kZWwge1xuICBjb25zdHJ1Y3RvcihpZCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdElEKSB7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgICh0aGlzLnRpdGxlID0gdGl0bGUpLCAodGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uKTtcbiAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgICh0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHkpLCAodGhpcy5wcm9qZWN0SUQgPSBwcm9qZWN0SUQpO1xuICAgIHRoaXMuY29tcGxldGUgPSBmYWxzZTtcbiAgfVxufVxuXG4vLyAgZ2V0IGdldER1ZURhdGUoKSB7XG4vLyAgIGNvbnN0IHNwbGl0ID0gdGhpcy5kdWVEYXRlLnNwbGl0KCctJyk7XG4vLyAgIHJldHVybiBmb3JtYXQobmV3IERhdGUoc3BsaXRbMF0sIE51bWJlcihzcGxpdFsxXSkgLSAxLCBzcGxpdFsyXSksICdQUFBQJyk7XG4vLyB9XG4iLCJpbXBvcnQgeyBQcm9qZWN0TW9kZWwgfSBmcm9tICcvc3JjL21vZGVscy9wcm9qZWN0TW9kZWwnO1xuaW1wb3J0IHsgdG9kb1JlcG8gfSBmcm9tICcvc3JjL2luZGV4JztcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tICcuLic7XG5cbmV4cG9ydCBjbGFzcyBQcm9qZWN0UmVwbyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucHJvamVjdHMgPSBbXTtcbiAgICB0aGlzLmlkID0gMDtcbiAgICB0aGlzLmN1cnJlbnRQcm9qZWN0ID0gMDtcbiAgfVxuICBjcmVhdGVQcm9qZWN0KHRpdGxlKSB7XG4gICAgaWYgKHRoaXMuaXNWYWxpZCh0aXRsZSkpIHtcbiAgICAgIGNvbnN0IHByb2plY3QgPSBuZXcgUHJvamVjdE1vZGVsKHRoaXMuaWQsIHRpdGxlKTtcbiAgICAgIHRoaXMucHJvamVjdHMucHVzaChwcm9qZWN0KTtcbiAgICAgIHRoaXMuaWQrKztcbiAgICAgIC8vIHN0b3JhZ2UucHJvamVjdHNKU09OLnB1c2gocHJvamVjdC5jcmVhdGVKU09OKCkpO1xuICAgICAgY29uc29sZS5sb2codGhpcy5wcm9qZWN0cyk7XG4gICAgICAvLyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeShzdG9yYWdlLnByb2plY3RzSlNPTikpO1xuICAgICAgcmV0dXJuIHByb2plY3Q7XG4gICAgfVxuICB9XG4gIGdldFByb2plY3RJRCh0aXRsZSkge1xuICAgIGZvciAoY29uc3QgcHJvamVjdCBvZiB0aGlzLnByb2plY3RzKSB7XG4gICAgICBpZiAodGl0bGUgPT09IHByb2plY3QudGl0bGUpIHtcbiAgICAgICAgcmV0dXJuIHByb2plY3QuaWQ7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGdldFByb2plY3RJdGVtcyhpZCkge1xuICAgIGNvbnN0IHByb2plY3RJdGVtcyA9IHRvZG9SZXBvLnRvZG9zLmZpbHRlcihcbiAgICAgIChpdGVtKSA9PiBpdGVtLnByb2plY3RJRCA9PT0gaWQgJiYgaXRlbS5jb21wbGV0ZSA9PT0gZmFsc2VcbiAgICApO1xuICAgIHJldHVybiBwcm9qZWN0SXRlbXM7XG4gIH1cbiAgaXNWYWxpZCh0aXRsZSkge1xuICAgIHJldHVybiB0aXRsZSAhPT0gJycgJiYgdGhpcy5nZXRQcm9qZWN0SUQodGl0bGUpID09PSB1bmRlZmluZWQ7XG4gIH1cbn1cbiIsImltcG9ydCB7IFRvZG9Nb2RlbCB9IGZyb20gJy9zcmMvbW9kZWxzL3RvZG9Nb2RlbCc7XG5pbXBvcnQgeyBwcm9qZWN0UmVwbyB9IGZyb20gJy9zcmMvaW5kZXgnO1xuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gJy4uJztcbmltcG9ydCB7IFRvZG9KU09OIH0gZnJvbSAnLi4nO1xuXG5leHBvcnQgY2xhc3MgVG9kb1JlcG8ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnRvZG9zID0gW107XG4gICAgdGhpcy5pZCA9IDA7XG4gICAgdGhpcy5jdXJyZW50VG9kbyA9IG51bGw7XG4gIH1cbiAgY3JlYXRlVG9kbyh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0KSB7XG4gICAgaWYgKHRpdGxlICE9PSAnJykge1xuICAgICAgY29uc3QgdG9kbyA9IG5ldyBUb2RvTW9kZWwoXG4gICAgICAgIHRoaXMuaWQsXG4gICAgICAgIHRpdGxlLFxuICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgZHVlRGF0ZSxcbiAgICAgICAgcHJpb3JpdHlcbiAgICAgICk7XG4gICAgICBjb25zdCBwcm9qZWN0SUQgPSBwcm9qZWN0UmVwby5nZXRQcm9qZWN0SUQocHJvamVjdCk7XG4gICAgICB0b2RvLnByb2plY3RJRCA9IHByb2plY3RJRDtcbiAgICAgIHRoaXMudG9kb3MucHVzaCh0b2RvKTtcbiAgICAgIHRoaXMuaWQrKztcbiAgICAgIC8vc2F2ZSB0byBsb2NhbCBzdG9yYWdlXG4gICAgICBjb25zdCBzdG9yYWdlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9kb3MnKSk7XG4gICAgICBzdG9yYWdlLnB1c2godG9kbyk7XG4gICAgICBjb25zdCBzdHJpbmdpZmllZEFyciA9IEpTT04uc3RyaW5naWZ5KHN0b3JhZ2UpO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9zJywgc3RyaW5naWZpZWRBcnIpO1xuICAgICAgY29uc29sZS5sb2cobG9jYWxTdG9yYWdlKTtcbiAgICAgIHJldHVybiB0b2RvO1xuICAgIH1cbiAgfVxuICB1cGRhdGVUb2RvKGlkLCBhY3Rpb24pIHtcbiAgICBjb25zdCByZWNvcmQgPSB0aGlzLnRvZG9zW2lkXTtcbiAgICBhY3Rpb24ocmVjb3JkKTtcbiAgICAvL21vZGlmeSBsb2NhbCBzdG9yYWdlXG4gICAgY29uc3Qgc3RvcmFnZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZG9zJykpO1xuICAgIHN0b3JhZ2VbaWRdID0gcmVjb3JkO1xuICAgIGNvbnN0IHN0cmluZ2lmaWVkQXJyID0gSlNPTi5zdHJpbmdpZnkoc3RvcmFnZSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9zJywgc3RyaW5naWZpZWRBcnIpO1xuICB9XG5cbiAgZ2V0IGdldENvbXBsZXRlZFRvZG9zKCkge1xuICAgIGNvbnN0IGNvbXBsZXRlZCA9IFtdO1xuICAgIHRoaXMudG9kb3MuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKGl0ZW0uY29tcGxldGUpIHtcbiAgICAgICAgY29tcGxldGVkLnB1c2goaXRlbSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGNvbXBsZXRlZDtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==