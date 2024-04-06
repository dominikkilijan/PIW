
const form = document.getElementById("todo-sheet");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");


function addTask(event) {
    event.preventDefault();

    if (taskInput.value === '') {
        alert("You must write your task first");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = taskInput.value;
        
        let deleteButton = document.createElement("button");
        deleteButton.classList.add("button", "x-button");
        deleteButton.innerHTML = "&#x2715;";
        deleteButton.onclick = deleteTask;


        taskList.appendChild(li);
        li.appendChild(deleteButton);
        
        taskInput.value = '';
    }
}

function deleteTask(event) {
    event.preventDefault();
    const taskContent = this.parentElement.innerText;
    console.log(taskContent);

    const modal = document.getElementById("modal");
    // const modalTaskContent = document.getElementById("modalTaskContent");
    // modalTaskContent.innerText = taskContent;
    // console.log(modalTaskContent);

    modal.showModal();
    modal.classList.remove("hidden");

    const modalYesButton = document.getElementById("modalYesButton");
    const modalCancelButton = document.getElementById("modalCancelButton");

    modalCancelButton.addEventListener('click', () => {
        modal.close();
        modal.classList.add("hidden");
    })
}