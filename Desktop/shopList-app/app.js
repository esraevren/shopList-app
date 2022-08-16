//Select DOM
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('#complete');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteTodo);
filterOption.addEventListener('click', filterTodo);

//Functions

function addTodo(e) {
  //Prevent natural behaviour
  e.preventDefault();

  //Select checkbox
  var shopitems = document.getElementById('shoppingitems');
  var value = shopitems.options[shopitems.selectedIndex].value;

  //Create todo div
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  
  //Create list
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value + '-' + value;

  //Save to local
  saveLocalTodos(todoInput.value + '-'+ value);
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
function getTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function (todo) {
    //Create todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Create list
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
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
