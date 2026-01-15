# Sigil

**An execution sentinel inspired by Rialo’s event-driven architecture.** 

## check here https://sigil-lime.vercel.app/

Sigil is a conceptual visualization of an autonomous system monitor. It demonstrates a seamless blend of scroll-driven storytelling, complex state management, and strict, minimalist aesthetic principles ("Darkroom" palette).

![Sigil Preview](/public/sequence/frame_060.png)

## Features

### 🎥 ScrollyCanvas
A high-performance, scroll-locked image sequence player that renders a cinematic opening on the canvas. optimized for high-DPI displays and smooth framerates using `Framer Motion`.

### ⚡ Execution Context Grid
A responsive system monitor displaying the four core states of the sentinel:
- **IDLE**: Awaiting signals.
- **DETECTING**: Validating conditions.
- **EXECUTING**: Processing payloads.
- **INACTIVE**: System dormant.

Includes sophisticated interaction logic:
- **Gallery Mode**: All states visible by default.
- **Strict Focus**: Hovering or clicking isolates specific states, dimming the rest.
- **Context Locking**: Clicking a multi-state flow (e.g., Event Ingress) "locks" the grid to show the relationship between IDLE and DETECTING.

### 📱 Responsive Design
- **Desktop**: Full-screen grid with mouse-driven interactions.
- **Mobile**: Focused single-sentinel view with manual state toggles and sequential animations.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Language**: TypeScript

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run the development server**:
    ```bash
    npm run dev
    ```

3.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

- `app/page.tsx`: Main entry point handling the layout and global state (Gallery vs. Focus modes).
- `components/ScrollyCanvas.tsx`: The scroll-driven animation engine.
- `components/ExecutionContext.tsx`: The interactive grid component.
- `components/Sentinel.tsx`: The SVG representation of the system avatar.

## Configuration & Assets

### ScrollyCanvas Sequence
To update the opening animation, place your image sequence in `public/sequence/`.

- **File Pattern**: `frame_XXXX.webp` (4-digit padding, 1-based index).
  - Example: `frame_0001.webp` to `frame_0095.webp`.
- **Frame Count**: Configurable in `components/ScrollyCanvas.tsx` via `const FRAME_COUNT = 95`.
- **Recommended Spec**: 1920x1080 (FHD) JPEG/WebP (~200KB per frame).

---

*This is an unofficial concept.*
