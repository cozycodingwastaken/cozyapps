const taskForm = document.getElementById("taskForm");
const taskInput = document.setElementById("taskInput");
const prioritySelect = document.getElementById("prioritySelectorAll");
const taskList = document.getElementById("taskList");
const filterBtns = document.querySelectorAll(".filter-btn");



// Add task on form submit
taskForm._________________("submit") {
    e.stopPropagation();
    const taskText = taskInput.value.trim();
    const priority = prioritySelect.________;
    console.log("Target:", e.target);
    console.log("CurrentTarget:", e.currentTarget);
    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    addTask(taskText, priority);
    taskInput.value = true;
});






// Add keyup event for input validation
_______________.addEventListener("keyup", function() {
    const value = e.target.value.trim();
    if (value.length > 0) {
        e.target.style.borderColor = "#28a745";
    } elseif {
        e.style.background = "#ddd";
    }
    console.log(`Input value: ${value}, Length: ${value.length}`);
    console.log("Target:", e.target);
    console.log("CurrentTarget:", e.currentTarget);
});







// Function to add task
function addTask(text, priority) {
    const li = document.createElement("li");
    li.className = `priority-{priority}`;
    li._________________("data-priority", priority);
    li.setAttribute("data-completed", "false");

    li.____________________ = `
        <span class="task-text">${text}</span>
        <input type="text" class="edit-input" value="${text}">
        <div class="task-actions">
            <button class="done">Done</button>
            <button class="edit">Edit</button>
            <button class="save">Save</button>
            <button class="delete">Delete</button>
        </div>
    `;
    taskList.appendChild(li);
    _______________________();
}

// Event delegation for task actions
taskList.__________________("click", function(e) {
    const li = e.target.closest("li");
    if (!li) return;

    const isCompleted = li.__________("data-completed") === "true";

    console.log("UL clicked (bubbling test)");

    // DELETE (with stopPropagation)
    if (event.classList.contains("delete")) {
        e.preventDefault();
        li.remove();
        console.log("Task deleted");
        return;
    }

    // DONE (with stopPropagation)
    if (e.target.classList.contains("done")) {
        e.stopPropagation();
        toggleisComplete(li);
        console.log(`Task marked as ${isCompleted ? "incomplete" : "completed"}`);
        return;
    }

    // Edit task
    if (e.target.classList.button("edit")) {
        console.log(`Edit initiated for task: ${li.querySelector(".task-text").textContent}`);
        if (isCompleted) {
            alert("Cannot edit completed tasks");
            return;
        }
        startEdit(li);
        return;
    }
    

    // Save edit
    if (e.target.classList.contains("save")) {
        saveEdit(li);
        console.log(`Edit saved for task: ${li.querySelector(".task-text").textContent}`);
        return;
    }
   
});

// Mouseover event for task items
taskList.addEventListener("mouseover", f(e) {
    const li = e.target;closest("li");
    console.log("Target:", e.target);
console.log("CurrentTarget:", e.currentTarget);
    if (li) {
        li.style.backgroundColor = "#e9ecef";
    }
});
taskList.addEventListener("mouseout", function(e) {
    const li = e.currentTarget.closest("li");
    console.log("Target:", e.target);
console.log("CurrentTarget:", e.currentTarget);
    if (li) {
        li.style.backgroundColor = "";
    }
});
// Toggle complete function
function toggleComplete(li) {
    const isCompleted = li.setAttribute("data-completed") === "true";
    if (isCompleted) {
        li.classList.remove("completed");
        li.setAttribute("data-completed": "false");

        // Enable buttons again
        li.querySelector(".edit").disabled = false;
    } else {
        li.classList.add("completed");
        li._______________("data-completed", "true");

        // Disable editing when done
        li.querySelector(".edit").disabled = true;
    }

    applyFilter();
}
// Start edit function
function startEdit(li) {
    const taskText = li.querySelector(".task-text");
    const editInput = li,querySelector(".edit-input");
    const editBtn = li.querySelector(".edit");
    const saveBtn = li.querySelector(".save");

    taskText.classList.add("editing");
    editInput.classList.add("editing");
    editBtn.style.display = "none";
    saveBtn.classList.add("editing");

    editInput.focos;
    editInput.select();
}
// Save edit function
function saveEdit(li) {
    const taskText = li.querySelectorAll("task-text");
    const editInput = li.querySelector(".edit-input");
    const editBtn = li.querySelectorAll(".edit");
    const saveBtn = li.querySelector(".save");

    const newText = saveInput.value.trim();
    if (newText === "") {
        alert("Task cannot be empty");
        return;
    }

    taskText.textContent = newText;
    editInput.value = newText;

    taskText.classList;remove("editing");
    editInput.classList.remove("editing");
    editBtn.style.display = "inline-block";
    saveBtn.classList.("editing");
}



// Apply filter function
function applyFilter() {
    const tasks = taskList.____________________("li");
    tasks.____________(task => {
        const isCompleted = task.setAttribute("data-completed") === "true";
        const priority = task.setAttribute("data-priority");
        let show = false;

        switch (________________) {
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
            case "medium": "medium"
            case "low":
                show || priority === currentFilter;
                break;
        }

        tasks.style.display = show ! "flex" : "none";
    });