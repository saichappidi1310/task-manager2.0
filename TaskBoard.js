// ══════════════════════════════════════════════════════
// COMPONENT: TaskBoard (the "brain" of the app)
// PURPOSE: This is the one component that actually owns the
// tasks array and the current filter. Every other component
// in this app (AddTaskForm, FilterBar, TaskList, TaskCard,
// TaskStats) is basically "dumb" - they just display whatever
// props they're handed and call a callback when the user does
// something. This is the "lifting state up" pattern: state
// lives as high as it needs to so every component that cares
// about it can get to it through props.
// TYPE: Client Component - needs useState and useEffect, and
// touches localStorage/window, none of which exist on the
// server, so this has to run in the browser.
// PROPS: none - this is the top-level owner of the feature,
// nothing above it needs to configure it with props.
// ══════════════════════════════════════════════════════
'use client';
import { useState, useEffect } from 'react';
import AddTaskForm from './AddTaskForm';
import FilterBar from './FilterBar';
import TaskList from './TaskList';
import TaskStats from './TaskStats';

const STORAGE_KEY = 'terminal-task-manager:tasks';

export default function TaskBoard() {
  // ── STATE: tasks ───────────────────────────────────
  // This is the actual source of truth for every task in the
  // app, so it has to be state - React only re-renders when
  // state (or props) change, and there's no way to derive "the
  // list of tasks" from anything else, it has to be stored.
  //
  // I'm using the lazy initializer form (passing a function to
  // useState instead of a plain value) so the localStorage read
  // only happens ONCE, on the very first render. If I wrote
  // useState(JSON.parse(localStorage...)) instead, that
  // expression would run on every single re-render even though
  // we only ever need it the first time - wasteful and it would
  // also try to run on the server (see the guard below).
  const [tasks, setTasks] = useState(() => {
    // Next.js renders this component once on the server before
    // it ever reaches the browser (for the initial HTML), and
    // `window`/`localStorage` don't exist in that server
    // environment - trying to read localStorage there would
    // crash the whole render. This guard just says "if there's
    // no window object, we must be on the server, so return an
    // empty array for now" - the real data gets read once this
    // code actually runs in the browser instead.
    if (typeof window === 'undefined') return [];

    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  // ── STATE: filter ──────────────────────────────────
  // filter and tasks change for completely different reasons
  // (one from clicking a filter button, one from adding/toggling/
  // deleting tasks) and at different times, so I gave them their
  // own useState call instead of cramming them into one object -
  // that way updating one doesn't force me to spread the other
  // back in every time.
  const [filter, setFilter] = useState('all');

  // ── EFFECT: persist tasks to localStorage ──────────
  // This effect's whole job is keeping localStorage (an outside
  // system, not part of React) in sync with our tasks state.
  // The dependency array is [tasks], which means: only re-run
  // this after a render where tasks actually changed value -
  // if only `filter` changed, this effect is skipped entirely,
  // so we're not needlessly writing to localStorage every time
  // someone just clicks a filter button.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // ── DERIVED VALUES (deliberately NOT stored in state) ──
  // All of these can be calculated directly from `tasks` and
  // `filter` on every render, so there's no reason to duplicate
  // them into their own useState calls. If I did store them as
  // state, I'd have to remember to manually update them every
  // single time tasks changes, and if I ever forgot one spot,
  // they'd silently go out of sync with the real task list.
  // Recalculating them fresh each render means that can't happen.
  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.done).length;
  const activeCount = totalCount - completedCount;

  // Same idea for the visible list - which tasks show up depends
  // entirely on `filter` and `tasks`, so it's computed here
  // instead of kept as its own state variable.
  const visibleTasks =
    filter === 'active'
      ? tasks.filter((t) => !t.done)
      : filter === 'done'
      ? tasks.filter((t) => t.done)
      : tasks; // filter === 'all', just show everything

  // ── HANDLERS (callback props passed DOWN to children) ──
  // These all follow the same rule: never mutate the tasks
  // array directly (like tasks.push(...) or tasks[i].done = true).
  // Directly mutating would change the array in place without
  // creating a new array reference, and React's useState setter
  // decides whether to re-render by checking if the new value is
  // a *different* reference from the old one - if I mutate in
  // place, React can't tell anything changed and the screen just
  // won't update, even though the data technically did.

  function handleAddTask(title) {
    // Building a brand new array with spread (...tasks) instead
    // of tasks.push(newTask) - push mutates the original array,
    // spread creates a fresh one with everything copied over
    // plus the new task tacked on the end.
    setTasks([
      ...tasks,
      { id: crypto.randomUUID(), title, done: false },
    ]);
  }

  function handleToggleTask(id) {
    // .map() always returns a brand new array, which is exactly
    // what we want here. For the task that matches the id we
    // got, I spread its old fields into a new object and flip
    // `done` - every other task in the list gets returned
    // completely untouched.
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function handleDeleteTask(id) {
    // .filter() also returns a new array - this one just keeps
    // every task EXCEPT the one whose id matches what was clicked.
    setTasks(tasks.filter((t) => t.id !== id));
  }

  function handleClearCompleted() {
    // Same pattern as delete, just removing every done task at
    // once instead of a single id.
    setTasks(tasks.filter((t) => !t.done));
  }

  return (
    // max-w keeps the whole app centered and readable on big
    // monitors instead of stretching a text-heavy list edge to
    // edge, which would be annoying to read.
    <div className="mx-auto max-w-4xl">
      {/* Fake terminal window title bar - purely visual, just
          three colored dots like a macOS window, to sell the
          "this is a terminal app" bit before the user reads
          anything else on the page. */}
      <div className="flex items-center gap-2 rounded-t-lg border border-b-0 border-border bg-panel px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green/70" />
        <span className="ml-2 text-xs text-text-muted">
          task_manager.exe
        </span>
      </div>

      <div className="flex flex-col rounded-b-lg border border-border bg-bg md:flex-row">
        {/* SIDEBAR: title, filters, and stats. Putting the
            filters/stats in a side column instead of the
            workshop's row-of-buttons-up-top is the main layout
            change for my design direction. */}
        <aside className="border-b border-border bg-panel p-5 md:w-56 md:border-b-0 md:border-r">
          <h1 className="mb-1 text-lg font-bold text-amber">
            task_manager
            {/* The blink animation class comes from globals.css -
                this is the "signature element" of my design, a
                cursor that blinks right after the title like a
                real terminal prompt waiting for input. */}
            <span className="cursor-blink">_</span>
          </h1>
          <p className="mb-6 text-xs text-text-muted">v1.0</p>

          <FilterBar filter={filter} onChange={setFilter} />

          <TaskStats
            total={totalCount}
            active={activeCount}
            completed={completedCount}
            onClearDone={handleClearCompleted}
          />
        </aside>

        {/* MAIN PANEL: add-task prompt at the top, task list
            below it. */}
        <section className="flex-1">
          <AddTaskForm onAdd={handleAddTask} />
          <TaskList
            tasks={visibleTasks}
            filter={filter}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
          />
        </section>
      </div>
    </div>
  );
}
