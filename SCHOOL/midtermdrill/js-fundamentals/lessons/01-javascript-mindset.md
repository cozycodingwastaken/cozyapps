# Lesson 01: JavaScript Mindset for the Midterm

## Layer 1: What you need

To pass the drill, you only need to think in this sequence:

1. User does an action (submit, keyup, click, mouseover)
2. Event runs your function
3. Your function reads DOM values
4. Your function updates DOM values

That is the whole app loop.

## Layer 2: Why this works

Browsers run JavaScript line by line.
When an event happens, the browser calls your callback function later.

So your app is not "always running" by itself.
It is "waiting for events" and responding.

## Layer 3: Deeper model

Use this mental model:

1. State: data (task text, priority, completed flag, currentFilter)
2. View: what user sees (li rows, input border, button states)
3. Events: bridges from user action to state/view update

If something is wrong, ask which layer is broken.

## Debug starter habit

For every bug, print three things:

1. "what event fired"
2. "what values were read"
3. "what values were written"

That quickly shows if issue is read, logic, or write.
