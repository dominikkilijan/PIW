"use strict"

const form = document.getElementById("todo-sheet");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const undoButton = document.getElementById("undo-button");

let deletedTask = "";

function addTask(event, undoneTask) {
    event.preventDefault();

    if (undoneTask
     === "" && taskInput.value === "") {
        alert("You must write your task first");
    }
    else {
        let li = document.createElement("li");
        
        if (undoneTask
         === "") {
            console.log("taskInput.value = " + taskInput.value);
            li.innerHTML = taskInput.value;
        }
        else {
            console.log("deletedTask = " + undoneTask
    );
            li.innerHTML = undoneTask
        ;
            undoneTask
         = "";
            undoButton.classList.add("invisible");
        }
        
        let deleteButton = document.createElement("button");
        deleteButton.classList.add("button", "x-button");
        deleteButton.innerHTML = "&#x2715;";
        deleteButton.onclick = (event) => deleteTask(event, li);
        
        taskList.appendChild(li);
        li.appendChild(deleteButton);
        
        taskInput.value = '';
    }
}

function deleteTask(event, taskElement) {
    event.preventDefault();
    event.stopPropagation();

    const modal = document.getElementById("modal");
    const modalTaskContent = document.getElementById("modal-task-content");
    modalTaskContent.innerHTML = trimTask(taskElement);

    modal.showModal();
    modal.classList.remove("hidden");

    const modalYesButton = document.getElementById("modalYesButton");
    const modalCancelButton = document.getElementById("modalCancelButton");

    modalCancelButton.addEventListener('click', () => {
        modal.close();
        modal.classList.add("hidden");
        taskElement = "";
    })

    modalYesButton.addEventListener('click', () => {
        modal.close();
        modal.classList.add("hidden");
        deletedTask = trimTask(taskElement);
        console.log("deleted task = " + deletedTask);
        taskElement.remove();
        taskElement = "";
        undoButton.classList.remove("invisible");

    })
}

function undoDelete(event) {
    if (deletedTask !== "") {
        console.log("task to undo = " + deletedTask);
        addTask(event, deletedTask);
    }
}

function trimTask(taskToTrim) {
    if (taskToTrim != null) {
        let task = taskToTrim.innerText.trim();
        let trimmedTask = task.slice(0, -1);
        console.log("trimmedTask = " + trimmedTask);
        return trimmedTask;
    }
}