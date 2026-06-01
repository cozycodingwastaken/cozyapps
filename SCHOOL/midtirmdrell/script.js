const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("prioritySelect");
const taskList = document.getElementById("taskList");
const filterBtns = document.querySelectorAll(".filter-btn");

let currentFilter = "all";
let selectedTask = null;

const charCount = document.createElement("p");
charCount.id = "charCount";
charCount.textContent = "0 / 30";
taskForm.insertAdjacentElement("afterend", charCount);

function updateCharCount(value) {
    charCount.textContent = value.length + " / 30";
}

taskForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const taskText = taskInput.value.trim();
    const priority = prioritySelect.value;

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    addTask(taskText, priority);
    taskInput.value = "";
    taskInput.style.borderColor = "#888";
    updateCharCount("");
});

taskInput.addEventListener("keyup", function (e) {
    const value = e.target.value;

    if (value.trim().length > 0) {
        e.target.style.borderColor = "#3a9a3a";
    } else {
        e.target.style.borderColor = "#888";
    }

    updateCharCount(value);
});

taskInput.addEventListener("keydown", function (e) {
    const value = e.target.value;
    const controlKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];

    if (value.length >= 30 && !controlKeys.includes(e.key)) {
        e.preventDefault();
    }
});

function addTask(text, priority) {
    const li = document.createElement("li");
    li.className = "priority-" + priority;
    li.setAttribute("data-priority", priority);
    li.setAttribute("data-completed", "false");

    li.innerHTML = `
        <span class="task-text"></span>
        <input type="text" class="edit-input" maxlength="30">
        <div class="task-actions">
            <button class="done">Done</button>
            <button class="edit">Edit</button>
            <button class="save">Save</button>
            <button class="delete">Delete</button>
        </div>
    `;

    li.querySelector(".task-text").textContent = text;
    li.querySelector(".edit-input").value = text;

    taskList.appendChild(li);
    applyFilter();
}

taskList.addEventListener("click", function (e) {
    const li = e.target.closest("li");
    if (!li) return;

    selectedTask = li;

    if (e.target.classList.contains("delete")) {
        e.stopPropagation();
        li.remove();
        return;
    }

    if (e.target.classList.contains("done")) {
        e.stopPropagation();
        toggleComplete(li);
        return;
    }

    if (e.target.classList.contains("edit")) {
        const isCompleted = li.getAttribute("data-completed") === "true";

        if (isCompleted) {
            alert("Cannot edit completed tasks");
            return;
        }

        startEdit(li);
        return;
    }

    if (e.target.classList.contains("save")) {
        saveEdit(li);
    }
});

// can double click task to toggle complete

taskList.addEventListener("dblclick", function (e) {
    const li = e.target.closest("li");
    if (!li) return;

    toggleComplete(li);
});

taskList.addEventListener("mouseover", function (e) {
    const li = e.target.closest("li");
    if (li) {
        li.style.backgroundColor = "#f5f5f5";
    }
});

taskList.addEventListener("mouseout", function (e) {
    const li = e.target.closest("li");
    if (li) {
        li.style.backgroundColor = "";
    }
});

function toggleComplete(li) {
    const isCompleted = li.getAttribute("data-completed") === "true";

    if (isCompleted) {
        li.classList.remove("completed");
        li.setAttribute("data-completed", "false");
        li.querySelector(".edit").disabled = false;
    } else {
        li.classList.add("completed");
        li.setAttribute("data-completed", "true");
        li.querySelector(".edit").disabled = true;
    }

    applyFilter();
}

function startEdit(li) {
    const taskText = li.querySelector(".task-text");
    const editInput = li.querySelector(".edit-input");
    const editBtn = li.querySelector(".edit");
    const saveBtn = li.querySelector(".save");

    taskText.classList.add("editing");
    editInput.classList.add("editing");
    editBtn.style.display = "none";
    saveBtn.classList.add("editing");

    editInput.focus();
    editInput.select();
}

function saveEdit(li) {
    const taskText = li.querySelector(".task-text");
    const editInput = li.querySelector(".edit-input");
    const editBtn = li.querySelector(".edit");
    const saveBtn = li.querySelector(".save");

    const newText = editInput.value.trim();
    if (newText === "") {
        alert("Task cannot be empty");
        return;
    }

    taskText.textContent = newText;
    editInput.value = newText;

    taskText.classList.remove("editing");
    editInput.classList.remove("editing");
    editBtn.style.display = "inline-block";
    saveBtn.classList.remove("editing");
}

filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
        filterBtns.forEach(function (b) {
            b.classList.remove("active");
        });

        btn.classList.add("active");
        currentFilter = btn.getAttribute("data-filter");
        applyFilter();
    });
});

function applyFilter() {
    const tasks = taskList.querySelectorAll("li");

    tasks.forEach(function (task) {
        const isCompleted = task.getAttribute("data-completed") === "true";
        const priority = task.getAttribute("data-priority");
        let show = false;

        switch (currentFilter) {
            case "all":
                show = true;
                break;
            case "active":
                show = !isCompleted;
                break;
            case "completed":
                show = isCompleted;
                break;
            case "high":
            case "medium":
            case "low":
                show = priority === currentFilter;
                break;
            default:
                show = true;
        }

        task.style.display = show ? "flex" : "none";
    });
}

// Enter = save, Escape = cancel, Ctrl+D = delete selected task

taskList.addEventListener("keydown", function (e) {
    const li = e.target.closest("li");
    if (!li) return;

    const isEditing = e.target.classList.contains("edit-input");

    if (isEditing && e.key === "Enter") {
        e.preventDefault();
        saveEdit(li);
    }

    if (isEditing && e.key === "Escape") {
        e.preventDefault();
        const taskText = li.querySelector(".task-text");
        const editInput = li.querySelector(".edit-input");
        const editBtn = li.querySelector(".edit");
        const saveBtn = li.querySelector(".save");

        editInput.value = taskText.textContent;
        taskText.classList.remove("editing");
        editInput.classList.remove("editing");
        editBtn.style.display = "inline-block";
        saveBtn.classList.remove("editing");
    }

    if (e.ctrlKey && e.key.toLowerCase() === "d") {
        e.preventDefault();
        if (selectedTask && taskList.contains(selectedTask)) {
            selectedTask.remove();
        }
    }
});
