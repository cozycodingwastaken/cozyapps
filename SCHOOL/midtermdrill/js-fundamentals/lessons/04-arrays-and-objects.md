# Lesson 04: Arrays and Objects in a To-Do Architecture

## Layer 1: What you need

You can build the drill with direct DOM operations only.
But understanding arrays/objects makes your logic cleaner.

Minimum concepts:

1. Array: list of values
2. Object: one structured record
3. Loop: apply same action to each item

## Layer 2: Why this matters even with DOM-only code

Your app has two states:

1. Visual state in DOM (li rows)
2. Logical state in JS (completion, priority, filter)

When these disagree, bugs happen.

## Layer 3: Deeper design option

A robust pattern is:

1. Keep source of truth in an array of task objects
2. Render UI from that array
3. Re-render when state changes

Example model:

```js
const tasks = [
  { text: "Study", priority: "high", completed: false }
];
```

You are not required to fully refactor this way for the midterm, but understanding it helps with debugging and scaling features.
