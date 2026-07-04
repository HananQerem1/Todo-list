const addTaskForm = document.forms['addTask'];

let tasks = [];
if(localStorage.getItem("tasks") != null){
    tasks = JSON.parse(localStorage.getItem("tasks"))
}

addTaskForm.onsubmit = (e)=>{
    e.preventDefault();
    task = {
        name:addTaskForm.taskName.value,
        isCompleted: false
    };
    tasks.push(task);
    localStorage.setItem("tasks",JSON.stringify(tasks));
    displayTasks();
}

const displayTasks = ()=> {
    const result = tasks.map( (task,index)=> {
        const isDone = task.isCompleted;
        const icon = isDone? "./assets/img/icons/reset.svg":"./assets/img/icons/circle-check-mark.svg";
        const imgAlt = isDone? "reset icon":"circle check mark icon";
        const taskStatusBtnText = isDone? "undo":"completed";
        return `<div class="panel-fg column task-card">
            <h2 class="${task.isCompleted? "line-through text-success": ""}">${task.name}</h2>
            <div class="row-end gap-4 w-full">
                <button class="button-secondary row-start center ${isDone? "text-warning":"text-success"}" onclick="taskStatus(${index})">
                    <img src="${icon}" alt="${imgAlt}" />
                    ${taskStatusBtnText}
                </button>
                <button class="button-secondary text-danger row-start center" onclick="removeTask(${index})">
                    <img src="./assets/img/icons/trash.svg" alt="trash icon" />
                    delete
                </button>
            </div>
        </div>
        `
    })
    document.querySelector(".task-container").innerHTML = result;
}
displayTasks();

const taskStatus = (index)=>{
    tasks[index].isCompleted = !tasks[index].isCompleted;
    localStorage.setItem("tasks",JSON.stringify(tasks));
    displayTasks();
}

const removeTask = (index)=>{
    tasks.splice(index,1);
    localStorage.setItem("tasks",JSON.stringify(tasks));
    displayTasks();
}


