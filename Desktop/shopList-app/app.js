//Select DOM
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('#complete');
const shoppingitems = document.querySelector('#shoppingitems');
const todoContainer = document.querySelector('.todo-container');
//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteTodo);
filterOption.addEventListener('click', filterTodo);

shoppingitems.addEventListener('change', (e) => {
  selectedValue = e.target.value;

  filteredCategory(selectedValue);
});

//Functions

function addTodo(e) {
  //Prevent natural behaviour
  e.preventDefault();

  //Select checkbox

  var value = shoppingitems.options[shoppingitems.selectedIndex].value;

  //Create todo div
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  //Create list
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value + '-' + value;

  //Save to local
  saveLocalTodos(todoInput.value + '- ' + value);
  //
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  todoInput.value = '';
  //Create Completed Button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);

  //attach final Todo
  todoList.appendChild(todoDiv);
}

function deleteTodo(e) {
  const item = e.target;

  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
    console.log(todo);
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
    }
  });
}

function filteredCategory(e) {
  let todos = JSON.parse(localStorage.getItem('todos'));
  console.log({ todos });
  console.log({ e });
  const todoItems = [...document.querySelectorAll('.todo-item')];
  todoItems?.forEach(function (todo) {
    if (todo.textContent.includes(e)) {
      todo.parentElement.style.display = 'flex';
    } else {
      todo.parentElement.style.display = 'none';
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}

// item object div appent
function list(item) {
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  //Create list
  const newTodo = document.createElement('li');
  newTodo.innerText = item.value + '-' + item.category;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  todoInput.value = '';

  //Create Completed Button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);

  //final Todo
  todoList.appendChild(todoDiv);
}

function getTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function (todo) {
    console.log(todo);
    //Create todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Create list
    const newTodo = document.createElement('li');
    newTodo.innerText = todo.value + '-' + todo.category;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    todoInput.value = '';

    //Create Completed Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    //final Todo
    todoList.appendChild(todoDiv);
  });
}
