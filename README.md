# task_manager.exe

My Module 10 task manager project. went with a retro terminal
theme instead of the workshop's default look .

Running it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000 in your browser. That's it, no
environment variables or database, everything just lives in
localStorage 

To build for production:

```bash
npm run build
npm start
```

## Tech stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4

## Design decisions

I wanted to do something different from the plain light-mode
card list from the workshop, so I went with a "retro terminal /
command line" theme:

- **Colour palette** — near-black background (`#0d0f0b`) instead
  of white, with an amber accent (`#ffb454`) instead of blue.
  I picked amber over the more obvious green-on-black terminal
  look because old amber phosphor monitors were a real thing and
  it felt slightly less cliché. Green is reserved *only* for
  "done" tasks so it still has a clear meaning in the UI instead
  of being used everywhere.
- **Typography** — everything is monospace (`font-mono`), so it
  actually reads like a terminal instead of a normal web app.
  I originally tried to load Google's IBM Plex Mono font with
  `next/font/google`, but that request got blocked in the
  sandbox I was building this in, so I fell back to a system
  monospace font stack instead (see the comment in `layout.js`).
- **Layout** — filters and stats live in a sidebar on the left
  instead of a row of buttons above the list, and the whole
  thing is wrapped in a fake terminal window (little coloured
  dots up top, like a Mac window) so it reads as one cohesive
  "app" rather than a plain list.
- **Checkboxes** — instead of a real checkbox input, toggling a
  task uses `[ ]` / `[x]` text buttons to keep the ASCII feel
  consistent everywhere.
- **Signature detail** — there's a blinking cursor (`_`) next to
  the title in the sidebar, done with a CSS `steps()` animation
  so it "snaps" instead of fading, like a real terminal cursor.
  It respects `prefers-reduced-motion` too.

Project structure

```
src/app/layout.js        - root layout, sets up <html>/<body>
src/app/page.js           - Server Component, just renders TaskBoard
src/app/globals.css       - Tailwind import + my colour/font theme tokens
src/components/TaskBoard.js  - owns all state (tasks + filter)
src/components/AddTaskForm.js - controlled input for new tasks
src/components/FilterBar.js   - All / Active / Done buttons (sidebar)
src/components/TaskList.js    - maps the filtered tasks to TaskCards
src/components/TaskCard.js    - one task row (toggle + delete)
src/components/TaskStats.js   - counts + clear completed button
```

`FilterBar.js` isn't in the original required file list, but the
assignment says extra components are fine if the design calls
for them — since my filters live in a sidebar instead of a row
of buttons, it made more sense to give them their own file
instead of stuffing that markup into `TaskBoard.js`.

## AI usage log

I used Claude (Anthropic) to help build this project. Roughly
what it helped with:

- Scaffolding the Next.js project (`create-next-app`) with the
  right versions of Next 16 / React 19 / Tailwind v4.
- Writing the initial component structure and JSX for all
  components, following the required file layout from the
  assignment.
- Coming up with the terminal/amber design direction and the
  Tailwind theme tokens (colours, font stack) in `globals.css`.
- Running `npm run build` and `npx eslint .` to confirm there
  were no build errors, lint warnings, or unused imports before
  calling it done.

I reviewed all the generated code, understand what each piece is
doing, and can explain any part of it.
