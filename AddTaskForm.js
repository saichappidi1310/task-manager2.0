// ══════════════════════════════════════════════════════
// COMPONENT: AddTaskForm
// PURPOSE: Lets the user type a new task and submit it. It
// is styled like a command line prompt ("$ ") to match the
// terminal theme. This component does NOT touch the tasks
// array at all - it just hands the finished string up to
// TaskBoard through the onAdd callback and lets TaskBoard
// decide what to do with it (that's the parent's job).
// TYPE: Client Component - needs useState for the input and
// an onSubmit handler, both of which only work in the browser.
// PROPS:
//   onAdd - callback fired with the trimmed title string when
//           the form is submitted with valid (non-blank) text.
//           Owned by TaskBoard, since TaskBoard is the one
//           that actually knows how to build a new task object.
// ══════════════════════════════════════════════════════
'use client';
import { useState } from 'react';

export default function AddTaskForm({ onAdd }) {
  // STATE: the text currently sitting in the input box.
  // This has to be state (not a derived value) because it
  // changes from user typing, which React has no other way
  // to know about - nothing else in the app can calculate
  // "what the user is currently typing" for us.
  const [title, setTitle] = useState('');

  function handleSubmit(e) {
    // By default, submitting a <form> makes the browser do a
    // full page reload/navigation (like it's sending a GET/POST
    // request somewhere). preventDefault() stops that so React
    // can handle the submission itself instead of the page
    // refreshing and wiping out all our state.
    e.preventDefault();

    // Guard against blank/whitespace-only tasks. .trim() removes
    // leading/trailing spaces so someone can't sneak in a task
    // that's just spacebar mashing and have it count as "valid".
    if (!title.trim()) return;

    // Hand the cleaned-up title up to TaskBoard. This component
    // doesn't create the task object itself (no id, no done
    // field) because TaskBoard owns the task shape - if I built
    // the object here I'd be duplicating logic that should only
    // live in one place.
    onAdd(title.trim());

    // Reset the field back to empty now that the task has been
    // submitted, so the input is ready for the next task.
    setTitle('');
  }

  return (
    // onSubmit (not just an onClick on the button) so pressing
    // Enter while focused in the input also submits the form -
    // that's just how native <form> elements behave, and it's
    // better for accessibility/keyboard users than onClick alone.
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border-b border-border bg-panel px-4 py-3"
    >
      {/* The "$" prompt symbol - purely decorative, part of the
          terminal look, not an actual form control. */}
      <span className="text-amber select-none">$</span>

      {/* Controlled input: value is always whatever is in state,
          and onChange is the only thing allowed to update that
          state. This means React is the single source of truth
          for what's in the box, instead of the DOM tracking its
          own separate copy of the text. */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="type a new task and hit enter..."
        className="min-w-0 flex-1 bg-transparent text-sm text-text placeholder:text-text-muted focus:outline-none md:text-base"
      />

      <button
        type="submit"
        className="shrink-0 rounded border border-amber-dim px-3 py-1 text-xs font-semibold text-amber hover:bg-amber hover:text-bg md:text-sm"
      >
        add
      </button>
    </form>
  );
}
