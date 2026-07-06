// ══════════════════════════════════════════════════════
// COMPONENT: TaskList
// PURPOSE: Takes an already-filtered array of tasks and turns
// each one into a TaskCard. It doesn't do any filtering
// itself - TaskBoard works out which tasks should be visible
// and just passes that final array down here. TaskList's only
// job is turning data into rows on the screen, plus handling
// the "there's nothing to show" case.
// TYPE: Client Component - it renders TaskCard, which needs
// onClick handlers, so this whole subtree has to be client-side.
// PROPS:
//   tasks    - array of task objects to render, already
//              filtered by whatever the active filter is
//   filter   - the current filter string, only used here to
//              pick the right wording for the empty state
//   onToggle - passed straight through to each TaskCard
//   onDelete - passed straight through to each TaskCard
// ══════════════════════════════════════════════════════
'use client';
import TaskCard from './TaskCard';

export default function TaskList({ tasks, filter, onToggle, onDelete }) {
  // Conditional render: if there are no tasks to show (either
  // because the list is genuinely empty, or because the current
  // filter hides everything), show a message instead of an
  // empty, confusing blank box. The exact wording changes based
  // on which filter is active so the message actually makes sense.
  if (tasks.length === 0) {
    const message =
      filter === 'done'
        ? 'no completed tasks yet'
        : filter === 'active'
        ? 'nothing active - you\'re all caught up'
        : 'no tasks yet - add one above to get started';

    return (
      <p className="px-4 py-10 text-center text-sm text-text-muted">
        {message}
      </p>
    );
  }

  return (
    <div>
      {/* .map() turns each task object into a TaskCard. I'm using
          task.id (a stable, unique value from crypto.randomUUID)
          as the key instead of the array index, because if a task
          in the middle of the list gets deleted, index-based keys
          would shift and React could get confused about which
          DOM node belongs to which task (e.g. it might reuse the
          wrong input/animation state for the wrong row). */}
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          id={task.id}
          title={task.title}
          done={task.done}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
