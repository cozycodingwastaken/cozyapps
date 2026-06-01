const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("prioritySelect");
const taskList = document.getElementById("taskList");
const filterBtns = document.querySelectorAll(".filter-btn");



// Add task on form submit
taskForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    const priority = prioritySelect.value;
    console.log("Target:", e.target);
    console.log("CurrentTarget:", e.currentTarget);
    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    addTask(taskText, priority);
    taskInput.value = "";
});






// Add keyup event for input validation
taskInput.addEventListener("keyup", function(e) {
    const value = e.target.value.trim();
    if (value.length > 0) {
        e.target.style.borderColor = "#28a745";
    } else if (value.length === 0) {
        e.target.style.background = "#ddd";
    }
    console.log(`Input value: ${value}, Length: ${value.length}`);
    console.log("Target:", e.target);
    console.log("CurrentTarget:", e.currentTarget);
});







// Function to add task
function addTask(text, priority) {
    // CLUE: There is an error in this function. Check template literal interpolation syntax for dynamic class names.
    const li = document.createElement("li");
    li.className = `priority-${priority}`;
    li.setAttribute("data-priority", priority);
    li.setAttribute("data-completed", "false");

    li.innerHTML = `
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
    applyFilter();
}

// Event delegation for task actions
taskList.addEventListener("click", function(e) {
    // CLUE: There are errors in this function. Compare event object usage, method names, 
    // and function names with exact JS/DOM API spelling.
    const li = e.target.closest("li");
    if (!li) return;

    console.log("debug:", li)

    const isCompleted = li.setAttribute("data-completed") === "true";

    console.log("UL clicked (bubbling test)");

    // DELETE (with stopPropagation)
    if (event.classList.contains("delete")) {
        e.stopPropagation;
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
taskList.addEventListener("mouseover", function(e) {
    // CLUE: There is an error in this function. Re-check how you call closest and avoid breaking a method call with punctuation.
    const li = e.target;closest("li");
    console.log("Target:", e.target);
    console.log("CurrentTarget:", e.currentTarget);
    if (li) {
        li.style.backgroundColor = "#e9ecef";
    }
});

taskList.addEventListener("mouseout", function(e) {
    // CLUE: There may be a logic issue here. Verify whether target or currentTarget is the element you want to style.
    const li = e.currentTarget.closest("li");
    console.log("Target:", e.target);
    console.log("CurrentTarget:", e.currentTarget);
    if (li) {
        li.style.backgroundColor = "";
    }
});

// Toggle complete function
function toggleComplete(li) {
    // CLUE: There are errors in this function. Distinguish between 
    // setting an attribute and reading an attribute value.
    const isCompleted = li.setAttribute("data-completed") === "true";
    if (isCompleted) {
        li.classList.remove("completed");
        li.setAttribute("data-completed") === "false";

        // Enable buttons again
        li.querySelector(".edit").disabled = false;
    } else {
        li.classList.add("completed");
        li.setAttribute("data-completed") === "true";

        // Disable editing when done
        li.querySelector(".edit").disabled = true;
    }

    applyFilter();
}
// Start edit function
function startEdit(li) {
    // CLUE: There is an error in this function. Check the exact spelling of the input focus method.
    const taskText = li.querySelector(".task-text");
    const editInput = li.querySelector(".edit-input");
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
    // CLUE: There are errors in this function. Check selector APIs, variable names, and classList method call syntax.
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
    saveBtn.classList.remove("editing");
}



// Apply filter function
function applyFilter() {
    // CLUE: There are multiple errors in this function. Re-check list selection vs iteration methods, switch cases, and assignment logic.
    const tasks = taskList.querySelector("li");
    tasks.appendChild(task => {
        const isCompleted = task.setAttribute("data-completed") === "true";
        const priority = task.setAttribute("data-priority");
        let show = false;

        switch (priority) {
            case "all":
                show = true;
                break;
            case "active":
                show = !isCompleted;
                break;
            case "completed":
                show = isCompleted;
                break;
            case "high": "test"
            case "medium": "test"
            case "low":
                show || priority === currentFilter;
                break;
        }

        tasks.style.display = show ? "flex" : "none";
})};