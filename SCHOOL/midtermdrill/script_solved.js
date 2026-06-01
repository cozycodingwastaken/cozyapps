const taskForm = document.getElementById("taskForm");
// WHAT ADDED: Replaced the input binding call with getElementById.
// WHY: setElementById is not a real DOM API; the element would not be selected correctly.
// ORIGINAL: const taskInput = document.setElementById("taskInput");
const taskInput = document.getElementById("taskInput");
// WHAT ADDED: Corrected the id used for priority select lookup.
// WHY: The old id pointed to a non-existent/wrong element, causing incorrect priority reads.
// ORIGINAL: const prioritySelect = document.getElementById("prioritySelectorAll");
const prioritySelect = document.getElementById("prioritySelect");
const taskList = document.getElementById("taskList");
const filterBtns = document.querySelectorAll(".filter-btn");

// WHAT ADDED: Added a dedicated filter state variable.
// WHY: The filtering function needs one current value to decide which tasks to show.
// ORIGINAL: (no currentFilter variable)
let currentFilter = "all";

// Add task on form submit
// WHAT ADDED: Replaced placeholder submit syntax with addEventListener callback.
// WHY: The original line was incomplete and could not register the submit event.
// ORIGINAL: taskForm._________________("submit") {
taskForm.addEventListener("submit", function (e) {
  // WHAT ADDED: Switched from stopPropagation to preventDefault in submit handler.
  // WHY: We need to stop form page refresh, not just bubbling.
  // ORIGINAL: e.stopPropagation();
  e.preventDefault();
  const taskText = taskInput.value.trim();
  // WHAT ADDED: Read selected option using .value on the select element.
  // WHY: Placeholder property could not produce actual priority data.
  // ORIGINAL: const priority = prioritySelect.________;
  const priority = prioritySelect.value;

  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  addTask(taskText, priority);
  // WHAT ADDED: Reset input to an empty string after submit.
  // WHY: Input values are strings; using true creates incorrect state.
  // ORIGINAL: taskInput.value = true;
  taskInput.value = "";
  // WHAT ADDED: Clear temporary validation border styling.
  // WHY: Keeps UI consistent after successful submission.
  // ORIGINAL: (no border reset)
  taskInput.style.borderColor = "";
});

// Add keyup event for input validation
// WHAT ADDED: Attached keyup listener directly to taskInput with event parameter.
// WHY: Placeholder receiver/callback could not run and access e.target.
// ORIGINAL: _______________.addEventListener("keyup", function() {
taskInput.addEventListener("keyup", function (e) {
  const value = e.target.value.trim();

  if (value.length > 0) {
    e.target.style.borderColor = "#28a745";
    // WHAT ADDED: Replaced invalid event-object style write with element border styling in else branch.
    // WHY: e.style is invalid because style belongs to an element, not the event object.
    // ORIGINAL: e.style.background = "#ddd";
    // WHAT ADDED: Replaced invalid elseif token with proper else block.
    // WHY: JavaScript syntax requires else if or else.
    // ORIGINAL: } elseif {
  } else {
    e.target.style.borderColor = "#ddd";
  }
});

// WHAT ADDED: Implemented click handlers for all filter buttons.
// WHY: Without handlers, currentFilter never changes from "all".
// ORIGINAL: (no filter button click handlers)
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

// Function to add task
function addTask(text, priority) {
  const li = document.createElement("li");
  // WHAT ADDED: Built class string using actual priority variable.
  // WHY: The old template used literal text and did not interpolate value.
  // ORIGINAL: li.className = `priority-{priority}`;
  li.className = "priority-" + priority;
  // WHAT ADDED: Used setAttribute to write data-priority.
  // WHY: Placeholder call did not write the attribute used by filtering.
  // ORIGINAL: li._________________("data-priority", priority);
  li.setAttribute("data-priority", priority);
  li.setAttribute("data-completed", "false");

  // WHAT ADDED: Replaced placeholder property assignment with innerHTML markup.
  // WHY: The original placeholder could not render task controls.
  // ORIGINAL: li.____________________ = `...`;
  li.innerHTML =
    '<span class="task-text"></span>' +
    '<input type="text" class="edit-input" style="display:none;">' +
    '<div class="task-actions">' +
    '<button class="done">Done</button>' +
    '<button class="edit">Edit</button>' +
    '<button class="save" style="display:none;">Save</button>' +
    '<button class="delete">Delete</button>' +
    "</div>";

  // WHAT ADDED: Assigned task text via textContent after creating markup.
  // WHY: Keeps text insertion explicit and safe.
  // ORIGINAL: <span class="task-text">${text}</span>
  li.querySelector(".task-text").textContent = text;
  li.querySelector(".edit-input").value = text;

  taskList.appendChild(li);
  // WHAT ADDED: Called applyFilter after append.
  // WHY: New tasks must respect the active filter immediately.
  // ORIGINAL: _______________________();
  applyFilter();
}

// Event delegation for task actions
// WHAT ADDED: Replaced placeholder event registration with addEventListener.
// WHY: Placeholder call could not wire click actions.
// ORIGINAL: taskList.__________________("click", function(e) {
taskList.addEventListener("click", function (e) {
  const li = e.target.closest("li");
  if (!li) return;

  // WHAT ADDED: Read completion state using getAttribute.
  // WHY: setAttribute writes values and is wrong for comparisons.
  // ORIGINAL: const isCompleted = li.__________("data-completed") === "true";
  const isCompleted = li.getAttribute("data-completed") === "true";

  // DELETE
  // WHAT ADDED: Checked clicked button using e.target.classList.contains.
  // WHY: event.classList is invalid in this context.
  // ORIGINAL: if (event.classList.contains("delete")) {
  if (e.target.classList.contains("delete")) {
    // WHAT ADDED: Removed unnecessary preventDefault for this branch.
    // WHY: Deleting a list item here does not require canceling default form behavior.
    // ORIGINAL: e.preventDefault();
    // Not needed for button clicks here; remove item directly.
    li.remove();
    return;
  }

  // DONE
  if (e.target.classList.contains("done")) {
    // WHAT ADDED: Corrected function name typo to toggleComplete.
    // WHY: toggleisComplete was undefined and caused runtime errors.
    // ORIGINAL: toggleisComplete(li);
    toggleComplete(li);
    return;
  }

  // Edit task
  // WHAT ADDED: Replaced invalid classList.button call with contains.
  // WHY: button is not a classList method.
  // ORIGINAL: if (e.target.classList.button("edit")) {
  if (e.target.classList.contains("edit")) {
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
    return;
  }
});

// Mouseover event for task items
// WHAT ADDED: Fixed callback declaration from invalid f(e) to function (e).
// WHY: f(e) is invalid syntax in addEventListener.
// ORIGINAL: taskList.addEventListener("mouseover", f(e) {
taskList.addEventListener("mouseover", function (e) {
  // WHAT ADDED: Fixed closest call by removing stray semicolon.
  // WHY: The previous punctuation split the statement and broke method call.
  // ORIGINAL: const li = e.target;closest("li");
  const li = e.target.closest("li");
  if (li) {
    li.style.backgroundColor = "#e9ecef";
  }
});

taskList.addEventListener("mouseout", function (e) {
  // WHAT ADDED: Used e.target.closest("li") for row-level mouseout handling.
  // WHY: e.currentTarget is the ul and does not identify the hovered row.
  // ORIGINAL: const li = e.currentTarget.closest("li");
  const li = e.target.closest("li");
  if (li) {
    li.style.backgroundColor = "";
  }
});

// Toggle complete function
function toggleComplete(li) {
  // WHAT ADDED: Switched to getAttribute for reading completion status.
  // WHY: setAttribute does not return current attribute value for comparisons.
  // ORIGINAL: const isCompleted = li.setAttribute("data-completed") === "true";
  const isCompleted = li.getAttribute("data-completed") === "true";

  if (isCompleted) {
    li.classList.remove("completed");
    // WHAT ADDED: Corrected setAttribute syntax to comma-separated arguments.
    // WHY: Colon syntax is invalid JavaScript.
    // ORIGINAL: li.setAttribute("data-completed": "false");
    li.setAttribute("data-completed", "false");
    li.querySelector(".edit").disabled = false;
  } else {
    li.classList.add("completed");
    // WHAT ADDED: Replaced placeholder method with setAttribute.
    // WHY: Completion flag must be written as data-completed="true".
    // ORIGINAL: li._______________("data-completed", "true");
    li.setAttribute("data-completed", "true");
    li.querySelector(".edit").disabled = true;

    // WHAT ADDED: Forced exit from edit mode when marking complete.
    // WHY: Prevents completed tasks from remaining in editable UI state.
    // ORIGINAL: (no forced exit from edit mode when completing)
    li.querySelector(".task-text").style.display = "inline";
    li.querySelector(".edit-input").style.display = "none";
    li.querySelector(".edit").style.display = "inline-block";
    li.querySelector(".save").style.display = "none";
  }

  applyFilter();
}

// Start edit function
function startEdit(li) {
  const taskText = li.querySelector(".task-text");
  // WHAT ADDED: Fixed typo in selector call from comma to dot.
  // WHY: li,querySelector is invalid syntax and fails at runtime.
  // ORIGINAL: const editInput = li,querySelector(".edit-input");
  const editInput = li.querySelector(".edit-input");
  const editBtn = li.querySelector(".edit");
  const saveBtn = li.querySelector(".save");

  // WHAT ADDED: Switched from class toggles to direct display control for edit mode.
  // WHY: CSS editing class behavior was undefined in this script; display toggles are explicit.
  // ORIGINAL: taskText.classList.add("editing");
  taskText.style.display = "none";
  // WHAT ADDED: Show edit input directly with display style.
  // WHY: Ensures input appears even without supporting CSS class rules.
  // ORIGINAL: editInput.classList.add("editing");
  editInput.style.display = "inline-block";
  editBtn.style.display = "none";
  // WHAT ADDED: Show save button directly with display style.
  // WHY: Guarantees save action visibility while editing.
  // ORIGINAL: saveBtn.classList.add("editing");
  saveBtn.style.display = "inline-block";

  // WHAT ADDED: Corrected focos property typo to focus() method.
  // WHY: focos does not exist and never focuses the input.
  // ORIGINAL: editInput.focos;
  editInput.focus();
  editInput.select();
}

// Save edit function
function saveEdit(li) {
  // WHAT ADDED: Changed querySelectorAll("task-text") to querySelector(".task-text").
  // WHY: Needed a single element and correct class selector syntax.
  // ORIGINAL: const taskText = li.querySelectorAll("task-text");
  const taskText = li.querySelector(".task-text");
  const editInput = li.querySelector(".edit-input");
  // WHAT ADDED: Changed querySelectorAll to querySelector for edit button.
  // WHY: style.display must target one button element, not a NodeList.
  // ORIGINAL: const editBtn = li.querySelectorAll(".edit");
  const editBtn = li.querySelector(".edit");
  const saveBtn = li.querySelector(".save");

  // WHAT ADDED: Read trimmed text from editInput variable.
  // WHY: saveInput was undefined and caused reference errors.
  // ORIGINAL: const newText = saveInput.value.trim();
  const newText = editInput.value.trim();
  if (newText === "") {
    alert("Task cannot be empty");
    return;
  }

  taskText.textContent = newText;
  editInput.value = newText;

  // WHAT ADDED: Replaced broken classList statement with display reset.
  // WHY: taskText.classList;remove(...) is invalid syntax.
  // ORIGINAL: taskText.classList;remove("editing");
  taskText.style.display = "inline";
  editInput.style.display = "none";
  editBtn.style.display = "inline-block";
  // WHAT ADDED: Replaced invalid saveBtn.classList call with display hide.
  // WHY: saveBtn.classList.(...) is invalid syntax.
  // ORIGINAL: saveBtn.classList.("editing");
  saveBtn.style.display = "none";
}

// Apply filter function
function applyFilter() {
  // WHAT ADDED: Replaced placeholder query with querySelectorAll("li").
  // WHY: Filtering requires all task elements, not a placeholder call.
  // ORIGINAL: const tasks = taskList.____________________("li");
  const tasks = taskList.querySelectorAll("li");

  // WHAT ADDED: Replaced placeholder iterator with forEach callback.
  // WHY: Need to evaluate each task item individually.
  // ORIGINAL: tasks.____________(task => {
  tasks.forEach(function (task) {
    // WHAT ADDED: Read completion state using getAttribute.
    // WHY: setAttribute would overwrite values instead of reading.
    // ORIGINAL: const isCompleted = task.setAttribute("data-completed") === "true";
    const isCompleted = task.getAttribute("data-completed") === "true";
    // WHAT ADDED: Read priority using getAttribute.
    // WHY: setAttribute is for writes and breaks filter comparisons.
    // ORIGINAL: const priority = task.setAttribute("data-priority");
    const priority = task.getAttribute("data-priority");
    let show = false;

    // WHAT ADDED: Switched placeholder switch target to currentFilter.
    // WHY: Filter mode must come from selected filter button state.
    // ORIGINAL: switch (________________) {
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
      // WHAT ADDED: Removed invalid extra string expression from medium case.
      // WHY: case labels must be valid standalone labels.
      // ORIGINAL: case "medium": "medium"
      case "high":
      case "medium":
      case "low":
        // WHAT ADDED: Assigned comparison result back to show.
        // WHY: show || ... computes a value but does not store it.
        // ORIGINAL: show || priority === currentFilter;
        show = priority === currentFilter;
        break;
      default:
        show = true;
        break;
    }

    // WHAT ADDED: Applied ternary to each task item with valid syntax.
    // WHY: Original line used wrong target (tasks) and invalid ternary operator.
    // ORIGINAL: tasks.style.display = show ! "flex" : "none";
    task.style.display = show ? "flex" : "none";
  });
}
