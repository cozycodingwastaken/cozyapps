const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("prioritySelect");
const taskList = document.getElementById("taskList");
const filterBtns = document.querySelectorAll(".filter-btn");

let currentFilter = "all";

// Input upgrade feature: live character counter and max length enforcement.
const charCounter = document.createElement("small");
charCounter.id = "charCounter";
charCounter.textContent = "0/30";
charCounter.style.display = "block";
charCounter.style.marginTop = "6px";
charCounter.style.color = "#666";
taskInput.insertAdjacentElement("afterend", charCounter);

// Activity log feature: add a log panel dynamically.
const appRoot = document.querySelector(".app") || document.body;
const logTitle = document.createElement("h5");
logTitle.textContent = "Activity Log";
const logList = document.createElement("ul");
logList.id = "activityLog";
logList.style.listStyle = "disc";
logList.style.paddingLeft = "20px";
logList.style.marginTop = "8px";
appRoot.appendChild(logTitle);
appRoot.appendChild(logList);

function logActivity(message) {
  const item = document.createElement("li");
  item.textContent = message;
  logList.prepend(item);
}

function getPriorityColor(priority) {
  switch (priority) {
    case "high":
      return "#dc3545";
    case "medium":
      return "#ffc107";
    case "low":
      return "#28a745";
    default:
      return "#ced4da";
  }
}

function applyPriorityIndicator(li, priority) {
  li.style.borderLeft = "6px solid " + getPriorityColor(priority);
  li.setAttribute("data-priority", priority);
  li.className = "priority-" + priority + (li.classList.contains("completed") ? " completed" : "");
}

function updateCharCounter() {
  charCounter.textContent = taskInput.value.length + "/30";
  charCounter.style.color = taskInput.value.length >= 30 ? "#dc3545" : "#666";
}

// Form submission event
// Requirements met: prevent reload and capture input values.
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const taskText = taskInput.value.trim();
  const priority = prioritySelect.value;

  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  addTask(taskText, priority);
  logActivity("Task added: " + taskText + " (" + priority + ")");

  taskInput.value = "";
  taskInput.style.borderColor = "";
  updateCharCounter();
});

// Keyboard input events: keyup + keydown.
// keyup validation and counter refresh.
taskInput.addEventListener("keyup", function (e) {
  const value = e.target.value.trim();
  e.target.style.borderColor = value.length > 0 ? "#28a745" : "#ddd";
  updateCharCounter();
});

// keydown max length protection (except control/navigation keys).
taskInput.addEventListener("keydown", function (e) {
  const allowKeys = [
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Tab",
    "Home",
    "End"
  ];

  if (allowKeys.includes(e.key) || e.ctrlKey || e.metaKey) {
    return;
  }

  if (taskInput.value.length >= 30) {
    e.preventDefault();
  }
});

// Filter system using switch-case.
filterBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    currentFilter = btn.dataset.filter;

    filterBtns.forEach(function (b) {
      b.classList.remove("active");
    });

    btn.classList.add("active");
    applyFilter();
  });
});

// Create task function
function addTask(text, priority) {
  const li = document.createElement("li");
  li.setAttribute("data-completed", "false");

  li.innerHTML =
    '<span class="task-text"></span>' +
    '<input type="text" class="edit-input" style="display:none;">' +
    '<select class="edit-priority" style="display:none;">' +
    '<option value="low">Low</option>' +
    '<option value="medium">Medium</option>' +
    '<option value="high">High</option>' +
    "</select>" +
    '<div class="task-actions">' +
    '<button class="done">Done</button>' +
    '<button class="edit">Edit</button>' +
    '<button class="save" style="display:none;">Save</button>' +
    '<button class="delete">Delete</button>' +
    "</div>";

  li.querySelector(".task-text").textContent = text;
  li.querySelector(".edit-input").value = text;
  li.querySelector(".edit-priority").value = priority;

  applyPriorityIndicator(li, priority);

  taskList.appendChild(li);
  applyFilter();
}

// Event delegation for click interactions.
taskList.addEventListener("click", function (e) {
  const li = e.target.closest("li");
  if (!li) {
    return;
  }

  if (e.target.classList.contains("delete")) {
    // Additional feature A: stopPropagation on delete.
    e.stopPropagation();
    li.remove();
    logActivity("Task deleted");
    return;
  }

  if (e.target.classList.contains("done")) {
    // Additional feature A: stopPropagation on done.
    e.stopPropagation();
    toggleComplete(li);
    const doneState = li.getAttribute("data-completed") === "true" ? "completed" : "reopened";
    logActivity("Task " + doneState);
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
    return;
  }
});

// Mouse interaction events.
taskList.addEventListener("mouseover", function (e) {
  const li = e.target.closest("li");
  if (li) {
    li.style.backgroundColor = "#e9ecef";
  }
});

taskList.addEventListener("mouseout", function (e) {
  const li = e.target.closest("li");
  if (li) {
    li.style.backgroundColor = "";
  }
});

// Additional feature B (choose one): double-click task to mark complete.
taskList.addEventListener("dblclick", function (e) {
  const li = e.target.closest("li");
  if (!li) {
    return;
  }

  const isCompleted = li.getAttribute("data-completed") === "true";
  if (!isCompleted) {
    toggleComplete(li);
    logActivity("Task completed by double-click");
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

    // Exit edit mode if user marks task done while editing.
    li.querySelector(".task-text").style.display = "inline";
    li.querySelector(".edit-input").style.display = "none";
    li.querySelector(".edit-priority").style.display = "none";
    li.querySelector(".edit").style.display = "inline-block";
    li.querySelector(".save").style.display = "none";
  }

  applyFilter();
}

function startEdit(li) {
  const taskText = li.querySelector(".task-text");
  const editInput = li.querySelector(".edit-input");
  const editPriority = li.querySelector(".edit-priority");
  const editBtn = li.querySelector(".edit");
  const saveBtn = li.querySelector(".save");

  taskText.style.display = "none";
  editInput.style.display = "inline-block";
  editPriority.style.display = "inline-block";
  editBtn.style.display = "none";
  saveBtn.style.display = "inline-block";

  editInput.focus();
  editInput.select();
}

function saveEdit(li) {
  const taskText = li.querySelector(".task-text");
  const editInput = li.querySelector(".edit-input");
  const editPriority = li.querySelector(".edit-priority");
  const editBtn = li.querySelector(".edit");
  const saveBtn = li.querySelector(".save");

  const newText = editInput.value.trim();
  const newPriority = editPriority.value;

  if (newText === "") {
    alert("Task cannot be empty");
    return;
  }

  taskText.textContent = newText;
  editInput.value = newText;

  // Additional feature D: dynamic priority indicator update during edit/save.
  applyPriorityIndicator(li, newPriority);

  taskText.style.display = "inline";
  editInput.style.display = "none";
  editPriority.style.display = "none";
  editBtn.style.display = "inline-block";
  saveBtn.style.display = "none";

  logActivity("Task updated: " + newText + " (" + newPriority + ")");
  applyFilter();
}

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
        break;
    }

    task.style.display = show ? "flex" : "none";
  });
}

updateCharCounter();
