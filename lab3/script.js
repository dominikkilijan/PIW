"use strict"

const form = document.getElementById("todo-sheet");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const undoButton = document.getElementById("undo-button");

let deletedTask = "";

function addTask(event, undoneTask) {
    event.preventDefault();

    if (undoneTask === "" && taskInput.value === "") {
        alert("You must write your task first");
    }
    else {
        let li = document.createElement("li");
        
        if (undoneTask === "") {
            li.innerHTML = taskInput.value;
        }
        else {
            li.innerHTML = undoneTask;
            undoneTask = "";
            undoButton.classList.add("invisible");
        }

        let dateContainer = document.createElement("span");
        dateContainer.classList.add("task-date");
        dateContainer.innerHTML = "";
        
        let deleteButton = document.createElement("button");
        deleteButton.classList.add("button", "x-button");
        deleteButton.innerHTML = "&#x2715;";
        deleteButton.onclick = (event) => deleteTask(event, li);
        
        li.appendChild(dateContainer);
        li.appendChild(deleteButton);
        
        taskList.appendChild(li);
        
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
        let trimmedTask = task.slice(0, -1); // usuwanie x
        task = trimmedTask.trim();

        if (taskToTrim.classList.contains("done")) {
            let lastNewLineIndex = task.lastIndexOf("\n");
            trimmedTask = task.slice(0, lastNewLineIndex); // usuwanie daty
            task = trimmedTask.trim();
        }
        return task;
    }
}

function toggleTaskCompleted(event) {
    const listItem = event.target.closest("li");
    listItem.classList.toggle("done");

    const dateSpan = listItem.querySelector(".task-date");
    if (listItem.classList.contains("done")) {
        const currentDate = new Date().toLocaleDateString();
        dateSpan.textContent = currentDate;
    } else {
        dateSpan.textContent = "";
    }
}

taskList.addEventListener("click", toggleTaskCompleted);
