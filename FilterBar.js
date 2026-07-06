// ══════════════════════════════════════════════════════
// COMPONENT: FilterBar
// PURPOSE: Renders the All / Active / Done buttons. This
// isn't one of the components listed in the assignment spec,
// but my design puts the filters in a vertical sidebar menu
// instead of the workshop's row of buttons up top, so I broke
// it into its own file to keep TaskBoard from getting cluttered
// with markup for something that's really its own little unit.
// TYPE: Client Component - the buttons need onClick handlers.
// PROPS:
//   filter    - the currently active filter string ('all' |
//               'active' | 'done'). Used to highlight whichever
//               button matches the current filter.
//   onChange  - callback fired with the new filter string when
//               a button is clicked. Owned by TaskBoard, since
//               filter state lives up there, not in this component.
// ══════════════════════════════════════════════════════
'use client';

// Keeping the list of filters as data instead of writing three
// near-identical <button> elements by hand. This way if I ever
// wanted to add a fourth filter I'd just add one line here
// instead of copy-pasting a whole button block.
const FILTERS = [
  { key: 'all', label: 'all' },
  { key: 'active', label: 'active' },
  { key: 'done', label: 'done' },
];

export default function FilterBar({ filter, onChange }) {
  return (
    <div>
      <p className="mb-2 text-xs uppercase tracking-widest text-text-muted">
        filter
      </p>
      <div className="flex flex-col gap-1">
        {FILTERS.map((f) => {
          // Conditional styling: figure out if THIS button is the
          // active one by comparing its key to the current filter
          // prop. isActive itself doesn't need to be state - it's
          // just a plain boolean re-computed on every render, thrown
          // away right after we use it to pick classNames below.
          const isActive = filter === f.key;
          return (
            <button
              key={f.key}
              onClick={() => onChange(f.key)}
              className={`rounded px-3 py-1.5 text-left text-sm transition-colors ${
                isActive
                  ? "bg-amber text-bg font-semibold"
                  : "text-text-muted hover:bg-panel-alt hover:text-text"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
