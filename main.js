const inputTasks = document.querySelector('.inpTasks');
const buttonTasks = document.querySelector('.btnTasks');
const listTasks = document.querySelector('.tasks');
const titleNumberTasks = document.querySelector('.title-number-tasks');
let counter = 0;

function createLi(){
    const li = document.createElement('li');
    return li;
}

function createButtonDelete(li){
    const buttonDelete = document.createElement('button');
    buttonDelete.innerText = 'Excluir';
    buttonDelete.setAttribute('class', 'delete');
    buttonDelete.setAttribute('title', 'Deletar tarefa');
    li.appendChild(buttonDelete);
}

function saveTasks(){
    const liTasks = listTasks.querySelectorAll('li');
    const listOfTasks = [];

    for (let task of liTasks) {
        let taskText = task.innerText;
        taskText = taskText.replace('Excluir', '').trim();
        listOfTasks.push(taskText);
    }
    const tasksJSON = JSON.stringify(listOfTasks);
    localStorage.setItem('tasks', tasksJSON);
}

function createTask(textInput){
    const li = createLi();
    li.innerText = textInput;
    listTasks.appendChild(li);
    clearInput();
    createButtonDelete(li);
    addCounter();
    saveTasks();
}

function addCounter(){
    counter++;
    titleNumberTasks.innerHTML = `Número de tarefas: ${counter}`;
}

function removeCounter(){
    counter--;
    titleNumberTasks.innerHTML = `Número de tarefas: ${counter}`
}

function clearInput(){
    inputTasks.value = '';
    inputTasks.focus();
}

buttonTasks.addEventListener('click', (e) =>{
    if(!inputTasks.value) return;
    createTask(inputTasks.value);
});

inputTasks.addEventListener('keypress', (e) =>{
    if(e.keyCode === 13){
        if(!inputTasks.value) return;
        createTask(inputTasks.value);
    }
});

document.addEventListener('click', (e) =>{
    const el = e.target;
    if(el.classList.contains('delete')){
        el.parentElement.remove();
        removeCounter();
        saveTasks();
    }
});

function recoverTasks(){
    const tasks = localStorage.getItem('tasks');
    const listOfTasks = JSON.parse(tasks);
    
    for (const task of listOfTasks) {
        createTask(task);
    }
}

recoverTasks();