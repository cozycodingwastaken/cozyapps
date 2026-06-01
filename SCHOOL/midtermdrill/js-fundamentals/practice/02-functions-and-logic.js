// Practice 02: Conditions, Functions, and Ternary
// Read Thoroughly First:
// - lessons/02-variables-and-types.md
// - lessons/03-conditions-loops-functions.md
// Fundamentals You Should Have:
// - if / else if / else decision flow
// - Function declaration and return values
// - String normalization with .trim()
// - Ternary format: condition ? a : b
// Terminal Test Command (copy/paste from project root):
// node js-fundamentals/practice/02-functions-and-logic.js

// TODO 1: Write a function called isEmptyTask(text)
// It should trim text and return true if empty, else false.

function isEmptyTask(text) {
    return text.trim() === "";
}

// TODO 2: Write a function called getBadge(priority)
// Return:
// - "HIGH" for "high"
// - "MED" for "medium"
// - "LOW" for "low"
// - "UNKNOWN" for anything else
function getBadge(priority) {
    switch(priority){
        case "high":
            return "HIGH";
            break;
        case "medium":
            return "MED";
            break;
        case "low":
            return "LOW";
            break;
        default:
            return "UNKNOWN"
            break;
    }
}

// TODO 3: Use ternary to set display
// If show is true => "flex"
// If show is false => "none"
const show = false;

// TODO 4: Test your functions using console.log
