// Define UI vars
const form = document.querySelector('#task-form'); // or get elementById...
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListeners();

// load all event listeners
function loadEventListeners() {
    // add task event
    form.addEventListener('submit', addTask);
    // remove task event
    taskList.addEventListener('click', removeTask);
    // clear all tasks even
    clearBtn.addEventListener('click', clearTasks);
}

// add task
function addTask(e) {
    if(taskInput.value === ''){
        alert('Add a task');
    }
    // create li elements
    const li = document.createElement('li');

    // add class
    li.className = 'collection-item';

    // create text node and appent to li (taskInput is the form value you add)
    li.appendChild(document.createTextNode(taskInput.value));

    // create new link element
    const link = document.createElement('a');

    // add class
    link.className = 'delete-item secondary-content';

    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // append the link to li
    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);

    //clear input
    taskInput.value = '';
    
    e.preventDefault();
}

// remove an unic task
function removeTask(e){
    // will target the 'x' icon to delete the task li from ul
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
        // a -> li removed..
        e.target.parentElement.parentElement.remove();
        }
    }
}

// remove all tasks
function clearTasks(e){
    //first approach
    // taskList.innerHTML = '';

    // second approach
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
}