// Practice 03: DOM and Events
// Read Thoroughly First:
// - lessons/03-conditions-loops-functions.md
// - lessons/05-dom-and-events.md
// - lessons/07-callbacks-and-event-object-deep-dive.md
// Fundamentals You Should Have:
// - DOM selection with getElementById
// - Event callback shape: function (e) { ... }
// - preventDefault vs normal browser behavior
// - e.target and updating element styles
// Terminal Commands (copy/paste from project root):
// 1) Syntax check only:
//    node --check js-fundamentals/practice/03-dom-mini-practice.js
// 2) Run app in browser for real DOM testing:
//    npx serve .
// Then open the localhost URL shown in terminal.
// Use this in a browser page that has:
// - <form id="taskForm">
// - <input id="taskInput">
// - <ul id="taskList"></ul>

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

taskForm.addEventListener("submit", function (e) {
  // TODO 1: Prevent default submit refresh

  const text = taskInput.value.trim();

  // TODO 2: If text is empty, alert and return

  const li = document.createElement("li");
  li.textContent = text;

  // TODO 3: Append li to taskList

  // TODO 4: Clear input
});

taskInput.addEventListener("keyup", function (e) {
  const value = e.target.value.trim();

  // TODO 5: If value has text, set borderColor to green
  // TODO 6: Else set borderColor to gray
});
