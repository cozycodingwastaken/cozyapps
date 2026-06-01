# Practice 04: Task App Fix Checklist

## Read Thoroughly First

1. lessons/05-dom-and-events.md
2. lessons/07-callbacks-and-event-object-deep-dive.md
3. lessons/06-debugging-and-common-errors.md

## Fundamentals You Should Have

1. DOM read vs write API awareness (`value`, `innerHTML`, `setAttribute`, `getAttribute`)
2. Event callback understanding (`function (e)`, `e.target`, `e.currentTarget`)
3. Conditional logic patterns (`if`, `switch`, ternary)
4. Iteration basics (`forEach` for collections)
5. Step-by-step debugging with console and small fixes

## Terminal Commands (Copy/Paste)

1. Syntax check your active script:
node --check script.js
2. Syntax check solved reference:
node --check script_solved.js
3. Syntax check instruction-compliant version:
node --check script_instruction_compliant.js
4. Run app in browser for behavior testing:
npx serve .
Then open the localhost URL shown in terminal.

Use this checklist while fixing your current script.js.
Do not jump ahead. Do one box at a time.

## Phase 1: DOM Selection

1. Confirm every element selection method exists on document.
2. Confirm each id string matches real HTML id.
3. Confirm NodeList vs single element usage.

## Phase 2: Submit Event

1. Confirm addEventListener syntax.
2. Confirm callback receives e.
3. Decide preventDefault vs stopPropagation based on behavior.
4. Validate empty input logic.
5. Reset input with correct value type.

## Phase 3: Input Keyup Event

1. Listener attached to correct element.
2. Callback includes e parameter.
3. Use else if syntax correctly.
4. Style applied to element, not event object.

## Phase 4: addTask Function

1. Template literal interpolation syntax is correct.
2. Correct property used for HTML insertion.
3. Correct attribute write method used.
4. Filter function called after append.

## Phase 5: applyFilter Logic

1. Correct query method to get task items.
2. Correct iteration method on list.
3. Use attribute getter for reading values.
4. switch expression references active filter variable.
5. case syntax valid for all priorities.
6. show gets assigned true/false (not just compared).
7. display applied to each task item.
8. ternary syntax is valid.

## Final Validation

1. Add 3 tasks with different priorities.
2. Mark one completed.
3. Test all filters: all, active, completed, high, medium, low.
4. Confirm no Console errors.
