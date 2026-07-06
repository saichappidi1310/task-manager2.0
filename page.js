// ══════════════════════════════════════════════════════
// COMPONENT: Home (default export of page.js)
// PURPOSE: This is the actual page the user lands on at "/".
// It doesn't hold any state or logic of its own - all it
// does is render TaskBoard, which is where all the real
// work happens. Keeping page.js this thin means the "brain"
// of the app stays in one place (TaskBoard) instead of
// being split between the page and the component.
// TYPE: Server Component - there's no 'use client' directive,
// no hooks, and no event handlers here, so Next.js is free
// to render this on the server. It's basically just static
// markup wrapped around the client component.
// PROPS: none - this is a page, not a reusable component.
// ══════════════════════════════════════════════════════
import TaskBoard from "@/components/TaskBoard";

export default function Home() {
  return (
    // min-h-screen so the dark background always fills the
    // whole viewport even if there are only 1-2 tasks in the
    // list (otherwise the page would be shorter than the
    // screen and you'd see white/default background below it).
    <main className="min-h-screen bg-bg px-4 py-10 md:px-10">
      <TaskBoard />
    </main>
  );
}
