# Lesson 03: Conditions, Loops, Functions, and switch-case

## Layer 1: What you need

You need four patterns for the handout:

1. `if / else` for validation and edit rules
2. `forEach` for looping tasks/buttons
3. Functions for reusable logic (`addTask`, `saveEdit`, `applyFilter`)
4. `switch` for filter categories

## Layer 2: Why each pattern is used

1. `if` is best for short yes/no checks
2. `forEach` is best when you do same action on many elements
3. Functions prevent repeated code
4. `switch` is cleaner for many exact options like `all`, `active`, `completed`, `high`, `medium`, `low`

## Layer 3: Deeper understanding of function forms

You will see both:

1. Function declaration

```js
function applyFilter() {
  // ...
}
```

2. Function expression (callback)

```js
taskForm.addEventListener("submit", function (e) {
  // ...
});
```

The second one is "a function value passed into another function".
This matters a lot for event handling.

## switch-case pattern you need

```js
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
```

Key rule: `break` prevents fall-through unless you intentionally group cases.
