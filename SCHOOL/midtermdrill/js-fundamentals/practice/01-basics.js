// Practice 01: Variables and Types
// Read Thoroughly First:
// - lessons/01-javascript-mindset.md
// - lessons/02-variables-and-types.md
// Fundamentals You Should Have:
// - Variables: let vs const
// - Core types: string, boolean
// - String cleanup with .trim()
// - Basic console.log checks
// Terminal Test Command (copy/paste from project root):
// node js-fundamentals/practice/01-basics.js
// Instructions:
// 1) Fill each TODO.
// 2) Run in browser console or Node.
// 3) Compare your output with comments.

// TODO 1: Create a variable taskName with value "Review notes"
let taskName = "Review notes"

// TODO 2: Create a variable priority with value "high"
let priority = "high"

// TODO 3: Create a boolean variable isCompleted with value false
let isCompleted = false

// TODO 4: Trim this text and save into cleanText
const rawText = "   hello js   ";
let cleanText = rawText.trim();

// TODO 5: Print all values with console.log
console.log(taskName, priority, isCompleted, cleanText)

// Expected ideas:
// - taskName and priority are strings
// - isCompleted is boolean
// - cleanText should become "hello js"
