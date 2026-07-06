// ══════════════════════════════════════════════════════
// COMPONENT: TaskCard
// PURPOSE: Renders one single task as a "log line" in the
// terminal-style list. It does not know anything about the
// full task array - it only knows about the one task it was
// given, plus two callbacks it can call when the user clicks
// something. All the actual state living is done up in
// TaskBoard.
// TYPE: Client Component - it needs onClick handlers, so it
// has to run in the browser (Server Components can't attach
// event listeners).
// PROPS:
//   id       - the task's unique id (string, from crypto.randomUUID)
//   title    - the text of the task the user typed in
//   done     - boolean, true if the task has been marked complete
//   onToggle - callback, called with this task's id when the
//              checkbox is clicked. Owned by TaskBoard.
//   onDelete - callback, called with this task's id when the
//              delete button is clicked. Also owned by TaskBoard.
// ══════════════════════════════════════════════════════
'use client';

export default function TaskCard({ id, title, done, onToggle, onDelete }) {
  return (
    // Each row is a flex container so the checkbox, title, and
    // delete button all sit on one line. border-b + border-border
    // gives the "rows in a log file" look instead of boxed cards.
    // hover:bg-panel-alt is a small visual hint that the row is
    // interactive, without needing any JS state for it.
    <div className="flex items-center gap-3 border-b border-border px-4 py-3 last:border-b-0 hover:bg-panel-alt">
      {/* This button IS the checkbox. I didn't use a real
          <input type="checkbox"> because I wanted full control
          over the [ ] / [x] look to match the terminal theme -
          styling a native checkbox to look like ASCII art is a
          lot messier than just using a button and swapping text. */}
      <button
        onClick={() => onToggle(id)}
        aria-label={done ? "Mark task as active" : "Mark task as done"}
        className={`shrink-0 font-semibold ${done ? "text-green" : "text-amber-dim"}`}
      >
        {/* Conditional render: which bracket text shows depends
            entirely on the "done" boolean passed down as a prop. */}
        {done ? "[x]" : "[ ]"}
      </button>

      {/* The task title itself. line-through + a dimmer color
          only gets applied when done is true, so completed tasks
          are visually different at a glance like the assignment
          asks for. Using a ternary here instead of two separate
          <span> elements keeps this from being duplicated JSX. */}
      <span
        className={`flex-1 break-words text-sm md:text-base ${
          done ? "text-text-muted line-through" : "text-text"
        }`}
      >
        {title}
      </span>

      {/* Delete button. Styled in red since this is the one
          destructive action on this row - color is doing the
          job of warning the user before they even read the text. */}
      <button
        onClick={() => onDelete(id)}
        aria-label="Delete task"
        className="shrink-0 text-xs font-semibold text-red/80 hover:text-red"
      >
        rm
      </button>
    </div>
  );
}
