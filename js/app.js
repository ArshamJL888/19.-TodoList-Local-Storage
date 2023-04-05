
// Variables
const inputElem = document.querySelector('.input');
let addElem = document.querySelector('.add');
let clearElem = document.querySelector('.clear');
let todoList = document.querySelector('.todoList')
let todoArray = [];

// Attributes
inputElem.setAttribute('placeholder', 'Todo Name ...');


// Events
addElem.addEventListener('click', addTodo);
clearElem.addEventListener("click", clearAll);
window.addEventListener('load', pageTodoHandler);
inputElem.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        addTodo();
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

function addTodo() {
    let newDiv = document.createElement('div');
    newDiv.classList.add('todo');
    todoList.append(newDiv);
    let newPar = document.createElement('p');
    newPar.textContent = inputElem.value;
    newDiv.append(newPar);
    let newDel = document.createElement('button');
    newDel.classList.add('delete');
    newDiv.append(newDel);
    newDel.innerText = 'Delete'

    let newComp = document.createElement('button');
    newComp.classList.add('complete');
    newDiv.append(newComp);
    newComp.innerHTML = 'Complete'
    newComp.addEventListener('click', completeTodo);
    newDel.addEventListener('click', deleteTodo);
    let newObj = {
        content: inputElem.value,
        status: "incompleted"
    };
    todoArray.push(newObj);
    localStorage.setItem('TodoList', JSON.stringify(todoArray));
    inputElem.value = ""
    inputElem.focus();
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
        todoArray[todoIndex].status = 'Completed';
    }
    else {
        event.target.parentElement.style.color = 'black';
        event.target.previousElementSibling.previousElementSibling.style.textDecoration = "none";
        event.target.innerHTML = 'Complete';
        todoArray[todoIndex].status = 'Incompleted';
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
        todoArray.forEach(function (obj) {
            let newDiv = document.createElement('div');
            newDiv.classList.add('todo');
            todoList.append(newDiv);
            let newPar = document.createElement('p');
            newPar.textContent = obj.content;
            newDiv.append(newPar);
            let newDel = document.createElement('button');
            newDel.classList.add('delete');
            newDiv.append(newDel);
            newDel.innerText = 'Delete'
            let newComp = document.createElement('button');
            newComp.classList.add('complete');
            newComp.innerText = obj.status === 'Completed' ? 'Incomplete' : 'Complete';
            // if (obj.status === 'Completed') {
            //     newPar.style.color = '#757575';
            //     newPar.style.textDecoration = "line-through";
            //     newComp.innerHTML = 'Incomplete';
            // }
            // else if( obj.status === 'Incompleted') {
            //     newPar.style.color = '#000000';
            //     newPar.style.textDecoration = "none";
            //     newComp.innerHTML = 'Complete';
            // }
            console.log(obj);
            newComp.addEventListener('click', completeTodo);
            newDiv.append(newComp);
            newDel.addEventListener('click', deleteTodo);
        })
    }
    else {
        todoArray = [];
    }

}