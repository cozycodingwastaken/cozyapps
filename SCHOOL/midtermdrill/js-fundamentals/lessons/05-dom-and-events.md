# Lesson 05: DOM and Events (Directly for the Midterm)

## Layer 1: What you need

Required APIs for this drill:

1. `document.getElementById(...)`
2. `document.querySelectorAll(...)`
3. `element.addEventListener(type, callback)`
4. `element.setAttribute(...)` and `element.getAttribute(...)`
5. `element.closest("li")` for delegated clicks

Required events from handout:

1. `submit`
2. `keyup` and `keydown`
3. `click`, `mouseover`, `mouseout`

## Layer 2: Why this works

Events decouple user actions from your logic.

Pattern:

```js
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const text = taskInput.value.trim();
  // use text
});
```

Meaning:

1. Browser listens for submit
2. Submit happens
3. Browser calls your callback
4. Callback reads input and updates DOM

## Layer 3: Deeper DOM API understanding

Read/write pairs are critical:

1. Input value read: `input.value`
2. Input value write: `input.value = ""`
3. Attribute read: `getAttribute(...)`
4. Attribute write: `setAttribute(...)`

If you swap these, logic breaks silently.

Event delegation deeper idea:

```js
taskList.addEventListener("click", function (e) {
  const li = e.target.closest("li");
  if (!li) return;
});
```

Why delegation is powerful:

1. You attach one listener on parent
2. It works for future child rows added later
3. Less repetitive code
