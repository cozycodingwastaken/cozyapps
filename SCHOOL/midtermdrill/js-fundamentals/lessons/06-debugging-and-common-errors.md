# Lesson 06: Debugging and Testing for Submission

## Layer 1: What you need to pass

Before submission, verify these in browser:

1. Submit adds task
2. Keyup validation changes border
3. Done toggles completed state
4. Edit/save updates text
5. Delete removes task
6. Filters all work
7. At least 3 additional features work

## Layer 2: Why most failures happen

Most failures come from these categories:

1. Syntax: code cannot parse
2. Runtime: method/property not found at runtime
3. Logic: code runs but behavior is wrong

Examples:

1. `elseif` instead of `else if` (syntax)
2. `document.setElementById` (runtime)
3. `show || condition` with no assignment (logic)

## Layer 3: Deep debug workflow

Use this exact sequence:

1. Reproduce bug with one action
2. Check Console error line
3. Print values before broken line
4. Ask: read API or write API?
5. Fix smallest possible line
6. Re-test only that behavior
7. Run full checklist after local fix

## Console log strategy for grading proof

Use clear logs such as:

1. "Task added"
2. "Task completed"
3. "Task deleted"

This also helps your required screenshot evidence.
