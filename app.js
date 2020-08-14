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
    // DOM load event 
    document.addEventListener('DOMContentLoaded', getTasks);
    // add task event
    form.addEventListener('submit', addTask);
    // remove task event
    taskList.addEventListener('click', removeTask);
    // clear all tasks even
    clearBtn.addEventListener('click', clearTasks);
    // filter tasks events
    filter.addEventListener('keyup', filterTasks);
}

// get tasks from ls
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
    // create li elements
    const li = document.createElement('li');

    // add class
    li.className = 'collection-item';

    // create text node and appent to li (taskInput is the form value you add)
    li.appendChild(document.createTextNode(task));

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
    });
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

    // store in local storage
    storeTaskInLocalStorage(taskInput.value);


    //clear input
    taskInput.value = '';
    
    e.preventDefault();
}

// store task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove an unic task
function removeTask(e){
    // will target the 'x' icon to delete the task li from ul
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
        // a -> li removed..
        e.target.parentElement.parentElement.remove();

        // remove from local storage (ls)
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// remove from local storage
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove all tasks
function clearTasks(){
    //first approach
    // taskList.innerHTML = '';

    // second approach  faster..
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    // clear all tasks from local storage
    clearTasksFromLocalStorage();
}

// clear all tasks from local storage
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

// filter tasks
function filterTasks(e){
    // gets the input value and transform into lowercase
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(
        function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1 ){
        // only display items same as input typed 
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    });
}