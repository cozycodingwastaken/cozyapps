# Lesson 07: function(e), e, and Callbacks Deep Dive

This lesson answers exactly:

1. What is `function (e)`?
2. What is `e`?
3. Why is `function (...)` inside `addEventListener(...)`?
4. Why do we pass functions into other functions at all?

## Layer 1: What you need

Basic pattern:

```js
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(e.target);
});
```

Read it as plain English:

"When submit happens, run this function, and give it the event object as e."

## Layer 2: Why this works

`addEventListener` takes two things:

1. Event name string
2. Callback function

The callback is not run immediately.
It is stored by the browser and run later when the event happens.

So this is wrong for event callbacks:

```js
someButton.addEventListener("click", doThing());
```

It calls `doThing` right now.

This is correct:

```js
someButton.addEventListener("click", doThing);
```

Or:

```js
someButton.addEventListener("click", function (e) {
  doThing(e);
});
```

## Layer 3: What e really is

`e` is just a variable name.
You can call it `event`, `evt`, or anything.

The browser creates an event object and passes it to your callback.

Useful properties:

1. `e.target`: the actual element that triggered the event
2. `e.currentTarget`: the element where listener is attached
3. `e.type`: event type string (`click`, `submit`, etc.)

Useful methods:

1. `e.preventDefault()`: stop default browser action
2. `e.stopPropagation()`: stop bubbling to parent listeners

## Why function(e) appears in many places

Because many APIs are callback-based, not just events.

Examples:

1. `forEach(function (item) { ... })`
2. `setTimeout(function () { ... }, 500)`
3. `addEventListener("click", function (e) { ... })`

Same idea every time:

1. You give a function to another function
2. That outer function decides when to run it
3. It may pass arguments into your callback

## Visual mental model

1. You register callback now
2. Browser waits
3. User acts
4. Browser creates event object
5. Browser calls your callback with that event object

## Common beginner confusions

1. Confusion: "Why not write code directly without function?"
Reason: events happen later; callback is the delayed response.

2. Confusion: "Where did e come from?"
Reason: browser passes it to your callback parameter.

3. Confusion: "Why e.target and not e.style?"
Reason: `e` is event data object; style belongs to elements like `e.target`.

## Practice prompts

1. In a click handler, log `e.type`, `e.target.tagName`, `e.currentTarget.id`.
2. Add `e.preventDefault()` in submit and observe page behavior.
3. Add a parent click listener and test `e.stopPropagation()` in child button clicks.
