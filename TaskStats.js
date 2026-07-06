// ══════════════════════════════════════════════════════
// COMPONENT: TaskStats
// PURPOSE: Shows the live total/active/completed counts and
// gives the user a button to clear every completed task at
// once. It's purely a "display + trigger" component - it
// doesn't calculate the counts itself, TaskBoard does that
// and just passes the finished numbers down as props. That
// way the counting logic only lives in one place.
// TYPE: Client Component - technically this component has no
// hooks of its own, but it needs an onClick handler for the
// clear button, and it lives inside the client-rendered
// sidebar, so I marked it as a client component too.
// PROPS:
//   total       - number of tasks total (all of them)
//   active      - number of tasks not yet done
//   completed   - number of tasks marked done
//   onClearDone - callback fired when "clear completed" is
//                 clicked. Owned by TaskBoard, since only
//                 TaskBoard can actually filter its own state.
// ══════════════════════════════════════════════════════
'use client';

export default function TaskStats({ total, active, completed, onClearDone }) {
  return (
    <div className="border-t border-border pt-4">
      <p className="mb-2 text-xs uppercase tracking-widest text-text-muted">
        stats
      </p>

      {/* Three little rows instead of one paragraph so each
          number gets its own label - easier to scan than a
          sentence like "3 total, 1 active, 2 done". */}
      <dl className="space-y-1 text-sm">
        <div className="flex justify-between">
          <dt className="text-text-muted">total</dt>
          <dd className="text-text">{total}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-text-muted">active</dt>
          <dd className="text-amber">{active}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-text-muted">done</dt>
          <dd className="text-green">{completed}</dd>
        </div>
      </dl>

      {/* Conditional render: there's no point showing a "clear
          completed" button if nothing is completed yet, so it
          only renders when completed > 0. This is the standard
          "condition && <jsx>" pattern - if completed is 0 (which
          is falsy) React just renders nothing for that spot. */}
      {completed > 0 && (
        <button
          onClick={onClearDone}
          className="mt-4 w-full rounded border border-red/60 py-1 text-xs font-semibold text-red/80 hover:bg-red hover:text-bg"
        >
          clear completed
        </button>
      )}
    </div>
  );
}
