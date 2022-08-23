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
  const todoCategory = document.createElement('div');
  todoCategory.classList.add('badge');
  todoCategory.innerText = value;

  //Create todo div
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  //Create list
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  todoCategory.innerText = value;

  //Save to local
  saveLocalTodos(todoInput.value + '- ' + value);

  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  todoDiv.appendChild(todoCategory);
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
    (() => {
      const list = document.querySelector('ul');
      list.appendChild(todo);
    })();
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
  const todoItems = [...document.querySelectorAll('.todo')];
  todoItems?.forEach(function (todo) {
    todo.textContent.includes(e)
      ? (todo.style.display = 'flex')
      : (todo.style.display = 'none');
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
   let splitted=todo.split("-")
    console.log(splitted[0]+splitted[1]);

    //Create todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Create list
    const newTodo = document.createElement('li');
    newTodo.innerText = splitted[0]
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    
    const todoCategory = document.createElement('div');
    todoCategory.classList.add('badge');
    todoCategory.innerText = splitted[1];
    todoDiv.appendChild(todoCategory);
    
    //Create Completed Button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);

  //attach final Todo
  todoList.appendChild(todoDiv);
    
  });
}
