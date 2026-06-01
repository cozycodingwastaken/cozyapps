# Lesson 02: Variables and Types for Task Apps

## Layer 1: What you need

In this drill, you mostly use these types:

1. String: task text, priority values ("high", "medium", "low")
2. Boolean: logic checks inside JS (isCompleted true/false)
3. Array/Object: multiple tasks and task data structures

Use:

1. const for references that should not be reassigned
2. let for values that change (for example currentFilter)

## Layer 2: Why bugs happen

Many bugs are type mismatch bugs.

Examples:

1. Writing `taskInput.value = true` (boolean) instead of `""` (string)
2. Comparing `setAttribute(...) === "true"` even though setAttribute is a write call

## Layer 3: Deeper model

DOM APIs often return strings.
That means attributes like `data-completed` are strings like `"true"`, not booleans.

You can think of conversion as:

1. DOM storage form: string
2. JS logic form: boolean

Example:

```js
const isCompleted = li.getAttribute("data-completed") === "true";
```

## Required mini tools

1. `.trim()` for empty-input protection
2. `===` strict equality checks
3. `dataset` or `getAttribute` for reading DOM data
