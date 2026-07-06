// ══════════════════════════════════════════════════════
// FILE: layout.js
// PURPOSE: This is the root layout that wraps every page in
// the app (there's only one page here, but Next.js still
// wants a root layout to set up the <html> and <body> tags).
// TYPE: Server Component (no 'use client' at the top, so this
// just renders once on the server - it doesn't need any
// interactivity of its own).
// ══════════════════════════════════════════════════════
import "./globals.css";

// I originally tried to pull in a Google Font (IBM Plex Mono)
// here using next/font/google, since a monospace font fits the
// terminal theme. But next/font needs to reach out to Google's
// servers at build time, and that request got blocked in the
// environment I was building this in, which broke the whole
// build. So instead I'm just leaning on a stack of monospace
// fonts that are already installed on basically every OS
// (defined in globals.css as --font-mono). A little less
// unique than a custom font, but it means the app doesn't
// depend on an external network call just to render text.

// Metadata here controls the browser tab title / description.
// Next.js reads this export automatically, I don't have to
// manually set document.title anywhere.
export const metadata = {
  title: "task_manager.exe",
  description: "A terminal-themed task manager built with Next.js + Tailwind",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* font-mono here pulls in the monospace stack I defined
          in globals.css (--font-mono), applied once at the body
          level so every element inside inherits it automatically -
          I don't have to add font-mono to every single component. */}
      <body className="font-mono antialiased">{children}</body>
    </html>
  );
}
