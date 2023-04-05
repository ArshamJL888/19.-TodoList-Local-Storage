
// Variables
const inputElem = document.querySelector('.input');
let addElem = document.querySelector('.add');
let clearElem = document.querySelector('.clear');
let todoList = document.querySelector('.todoList')
let todoArray = [];

// Attributes
inputElem.setAttribute('placeholder', 'Todo Name ...');


// Events
addElem.addEventListener('click', addNewTodo);
clearElem.addEventListener("click", clearAll);
window.addEventListener('load', pageTodoHandler);
inputElem.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        addNewTodo();
    }
})


// Functions
function clearAll() {
    inputElem.value = "";
    // localStorage.clear();
    localStorage.removeItem('TodoList');
    let list = document.querySelectorAll('.todo');
    list.forEach(function (todo) {
        todo.remove();
    })
    todoArray = [];
}
function addNewTodo() {

    inputElem.focus();
    let newTodo = {
        content: inputElem.value,
        status: "incomplete"
    }
    todoArray.push(newTodo);
    localStorage.setItem('TodoList', JSON.stringify(todoArray));
    todoGenerator(todoArray);
}
function todoGenerator(todo) {
    todoList.innerHTML = "";
    todo.forEach(function (todoItem) {
        let newDiv = document.createElement('div');
        newDiv.classList.add('todo');
        todoList.append(newDiv);
        let newPar = document.createElement('p');
        newPar.textContent = todoItem.content;
        newDiv.append(newPar);
        let newDel = document.createElement('button');
        newDel.classList.add('delete');
        newDiv.append(newDel);
        newDel.innerText = 'Delete'
        let newComp = document.createElement('button');
        newComp.classList.add('complete');
        newDiv.append(newComp);
        todoItem.status === 'complete' ? newComp.innerHTML = 'Incomplete' : newComp.innerHTML = 'Complete'
        newComp.addEventListener('click', completeTodo);
        newDel.addEventListener('click', deleteTodo);
        inputElem.value = ""
    })

}

function completeTodo(event) {
    let todoIndex = todoArray.findIndex(function (item) {
        return item.content === event.target.previousElementSibling.previousElementSibling.innerHTML;
    });
    console.log(todoArray[todoIndex]);
    if (event.target.innerHTML === 'Complete') {
        event.target.parentElement.style.color = '#757575';
        event.target.previousElementSibling.previousElementSibling.style.textDecoration = "line-through";
        event.target.innerHTML = 'Incomplete';
        todoArray[todoIndex].status = 'Complete';
    }
    else {
        event.target.parentElement.style.color = 'black';
        event.target.previousElementSibling.previousElementSibling.style.textDecoration = "none";
        event.target.innerHTML = 'Complete';
        todoArray[todoIndex].status = 'Incomplete';
    }
    localStorage.setItem('TodoList', JSON.stringify(todoArray));
}
function deleteTodo(event) {
    let todoIndex = todoArray.findIndex(function (item) {
        return item.content === event.target.previousElementSibling.innerHTML;
    });
    todoArray.splice(todoIndex, 1);
    localStorage.setItem('TodoList', JSON.stringify(todoArray));
    event.target.parentElement.remove();
}

function pageTodoHandler() {
    todoArray = JSON.parse(localStorage.getItem('TodoList'));
    if (todoArray) {
        todoGenerator(todoArray);
    }
    else {
        todoArray = [];
    }

}


