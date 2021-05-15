/*   Selectors   */
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


/*   Event Listeners   */
document.addEventListener('DOMContentLoaded', getTodos);
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
// activate eventListener by changing option in drop-down
filterOption.addEventListener('change', filterTodo);


/*   Functions   */
function addTodo(event) {
  // The Event interface's preventDefault() method tells the user agent that if the event does not get explicitly handled, 
  // its default action should not be taken as it normally would be.
  // Prevent form from submitting
  event.preventDefault();

  if (todoInput.value === '') return;
  
  // create <div>
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo-item');

  // create <li>
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-text');
  todoDiv.appendChild(newTodo);

  // add todo in LS
  saveLocalTodos(todoInput.value)

  // create check button
  const completedBtn = document.createElement('button');
  completedBtn.innerHTML = '<i class="fas fa-check"></i>';
  completedBtn.classList.add('complete-btn');
  todoDiv.appendChild(completedBtn);

  // create trash button
  const trashBtn = document.createElement('button');
  trashBtn.classList.add('trash-btn');
  trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
  todoDiv.appendChild(trashBtn);

  // append <div> to Todo-List
  todoList.appendChild(todoDiv);

  // clear Todo Input
  todoInput.value = '';
}

function deleteCheck(e) {
  // get item whatever we click on
  const item = e.target;

  // Trash-Button functionality
  if (item.classList[0] === 'trash-btn') {
    // get parent element from item class="trash-btn"
    const todoItem = item.parentElement;
    // add class="fall" to style in CSS (delete-animation)
    todoItem.classList.add('fall');

    // remove todo from LS
    removeLocalTodos(todoItem);

    // wait till Animation ends then execute function
    todoItem.addEventListener('transitionend', () => {
      // remove item
      todoItem.remove();
    });
  }

  // Check-Button functionality
  if (item.classList[0] === 'complete-btn') {
    const todoItem = item.parentElement;
    // toggle class="completed" to style in CSS
    todoItem.classList.toggle('completed');
  }
}

function filterTodo(e) {
  // childNodes counts comments and whitespace as childs too!!! So remove them
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function getLS() {
  let todos;
  // if Local Storage doesnt exist then create new empty one
  if (localStorage.getItem('todos') === null) {
    return [];
  } else {
    return JSON.parse(localStorage.getItem('todos'));
  }
}

function saveLocalTodos(todo) {
  let todos = getLS();
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  let todos = getLS();

  todos.forEach(function (todo) {
    // create <div>
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo-item');

    // create <li>
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-text');
    todoDiv.appendChild(newTodo);

    // create check button
    const completedBtn = document.createElement('button');
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    completedBtn.classList.add('complete-btn');
    todoDiv.appendChild(completedBtn);

    // create trash button
    const trashBtn = document.createElement('button');
    trashBtn.classList.add('trash-btn');
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(trashBtn);

    // append <div> to Todo-List
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos = getLS();

  // get text from todo item
  todo = todo.children[0].innerText;
  // return index from todos list where it matches todo
  todoIndex = todos.indexOf(todo);
  // delete value from array
  todos.splice(todoIndex, 1);
  // set todo list to LS again
  localStorage.setItem('todos', JSON.stringify(todos));
}
