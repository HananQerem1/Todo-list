const addTaskForm = document.forms['addTask'];
let taskCount = 0;
let doneTaskCount = 0;
let tasks = [];
if(localStorage.getItem("tasks") != null){
    tasks = JSON.parse(localStorage.getItem("tasks"));
    taskCount = tasks.length;
}

addTaskForm.onsubmit = (e)=>{
    e.preventDefault();
    task = {
        name:addTaskForm.taskName.value,
        isCompleted: false
    };
    tasks.push(task);
    localStorage.setItem("tasks",JSON.stringify(tasks));
    taskCount++;
    displayTasks();
    document.querySelector("#taskName").value = "";
}

const displayTasks = ()=> {
    const result = tasks.map( (task,index)=> {
        const isDone = task.isCompleted;
        const icon = isDone? "./assets/img/icons/reset.svg":"./assets/img/icons/circle-check-mark.svg";
        const imgAlt = isDone? "reset icon":"circle check mark icon";
        const taskStatusBtnText = isDone? "undo":"completed";
        return `<div class="${isDone? "bg-success-card": "bg-fg"} panel column">
            <h2 class="${isDone? "line-through": ""}">${task.name}</h2>
            <div class="row-end gap-4 w-full">
                <button class="button-secondary row-start center bg-fg ${isDone? "text-warning":"text-success"}" onclick="taskStatus(${index})">
                    <img src="${icon}" alt="${imgAlt}" />
                    ${taskStatusBtnText}
                </button>
                <button class="button-secondary row-start center bg-fg text-danger" onclick="removeTask(${index})">
                    <img src="./assets/img/icons/trash.svg" alt="trash icon" />
                    delete
                </button>
            </div>
        </div>
        `
    }).join("");
    document.querySelector(".task-container").innerHTML = result;
    document.querySelector(".remainTaskNum").textContent = taskCount-doneTaskCount;
    document.querySelector(".doneTaskNum").textContent = doneTaskCount;
}
displayTasks();

const taskStatus = (index)=>{
    tasks[index].isCompleted = !tasks[index].isCompleted;
    localStorage.setItem("tasks",JSON.stringify(tasks));
    if (tasks[index].isCompleted){
        doneTaskCount++;
    }
    if (!tasks[index].isCompleted){
        doneTaskCount--;
    }
    displayTasks();
}

const removeTask = (index)=>{
    tasks.splice(index,1);
    localStorage.setItem("tasks",JSON.stringify(tasks));
    taskCount--;
    displayTasks();
}




