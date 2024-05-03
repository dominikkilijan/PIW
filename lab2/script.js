"use strict";
// przepraszam jak coś jest dalej nie w stylu. Nie byłem na ostatnich zajęciach i uczyłem się z internetu. Przyjdę na zajęcia z innej grupy jeśli jest taka możliwość

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
        let taskContent = document.createElement("div");
        taskContent.classList.add("task-content", "dark-text");
        
        if (undoneTask === "") {
            taskContent.innerHTML = taskInput.value;
        }
        else {
            taskContent.innerHTML = undoneTask;
            undoneTask = "";
            undoButton.classList.add("invisible");
        }
        
        let dateContainer = document.createElement("span");
        dateContainer.classList.add("task-date");
        dateContainer.innerHTML = "";
        
        let deleteButton = document.createElement("button");
        deleteButton.classList.add("button", "x-button");
        deleteButton.innerHTML = "&#x2715;";
        deleteButton.onclick = (event) => deleteTask(event, taskContent, li);
        
        li.appendChild(taskContent);
        li.appendChild(dateContainer);
        li.appendChild(deleteButton);
        
        taskList.appendChild(li);
        
        taskInput.value = '';
    }
}

function deleteTask(event, taskElement, li) {
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
        li.remove();
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
    if (taskToTrim !== "") {
        let task = taskToTrim.innerText.trim();
        return task;
    }
}

function toggleTaskCompleted(event) {
    const taskContent = event.target.closest("li").querySelector(".task-content");
    taskContent.classList.toggle("done");
    taskContent.classList.toggle("dark-text");

    const dateSpan = event.target.closest("li").querySelector(".task-date");
    if (taskContent.classList.contains("done")) {
        const currentDate = new Date().toLocaleDateString();
        dateSpan.textContent = currentDate;
    } else {
        dateSpan.textContent = "";
    }
}

taskList.addEventListener("click", toggleTaskCompleted);
