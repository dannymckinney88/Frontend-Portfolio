---
title: 'I Did the "Right Thing" with :focus-visible and the UX Was Still Wrong'
description: "A debugging story about route transitions, programmatic focus, and what accessibility advice doesn't tell you."
date: '2025-03-15'
coverImage: '/writing/modality-aware-landing-focus/cover.png'
---

## TL;DR

`:focus-visible` is not reliable once you introduce `.focus()` during route transitions.
If you want predictable landing focus, you need to make intent explicit.

---

## The flow that finally made it coherent

![Focus Flow](/writing/modality-aware-landing-focus/focus-flow-diagram.png)

---

## The problem

You've read the spec. You've done the right thing. You've wired up `:focus-visible`, you've moved focus on route changes, you've given every input a label. And then you open the app with a keyboard and it feels _off_. Not broken. Just off. Like a sentence that's grammatically correct but doesn't say anything.

That's where I found myself while refining the public client recap page in HeelFlow — a mobile-first dog training follow-up app. Dog owners land here after a training session to review what the trainer wrote, check off homework, and sometimes leave a Google review. The experience needed to feel calm and oriented from the first keypress.

Instead, it felt like you'd been dropped somewhere and hadn't arrived.

Everything was technically correct.
The experience was still wrong.

---

## The Setup

HeelFlow is a Next.js 15 App Router project with two surfaces: authenticated trainer routes and unauthenticated, token-based client pages. Route transitions between them needed to feel correct for keyboard users, screen reader users, and pointer users simultaneously.

---

## The First Wrong Assumption

My initial model was clean:

- `:focus-visible` handles the keyboard/mouse split automatically
- move focus to a heading on route change
- keyboard users see a ring, mouse users don't
- done

It's a reasonable model. It's just not accurate once you introduce programmatic focus.

`:focus-visible` applies based on browser heuristics about whether the user is in a keyboard navigation context. For natural interactions it's mostly predictable — though even then it has edges. Clicking into a `<input type="text">` triggers `:focus-visible` in Chrome and Firefox because the browser expects subsequent keyboard input. It's not a clean keyboard/mouse binary; it's a heuristic that accounts for element type and prior input state.

Under programmatic focus, the heuristics break down further. When you call `element.focus()` after a route transition, the browser has no reliable signal about what caused the call. Whether `:focus-visible` applied depended on what the user did _before_ navigating, which browser they were using, and whether the focus target was interactive or static. The clean mental model dissolved.

---

## What I Tried First

### Attempt 1: Focus the heading directly

```tsx
const headingRef = useRef<HTMLHeadingElement>(null);

useEffect(() => {
  headingRef.current?.focus();
}, []);

<h1 ref={headingRef} tabIndex={-1}>
  {dogName}'s Session Recap
</h1>;
```

**The logic:** headings are near the top of the page and tell the user where they are.

**What went wrong:** On pointer-triggered navigation, a visible focus ring sat on the heading with no user interaction to explain it. It looked like a rendering bug. `:focus-visible` wasn't protecting me — under programmatic focus, sometimes the ring appeared, sometimes it didn't, depending on prior browser state.

### Attempt 2: Focus a Back link instead

**The logic:** a Back link is interactive, has natural focus semantics, immediate action available.

**What went wrong:** Landing with focus already on "← Go back" implies the correct move is to leave. That's the opposite of the intended experience, and it clarified something I hadn't fully articulated: **there's a difference between a landing target and an interactive control.** Headings orient. Links act.

### Attempt 3: Use `:focus-visible` as the visual gate

```css
h1[tabindex='-1']:focus {
  outline: none;
}

h1[tabindex='-1']:focus-visible {
  outline: 2px solid var(--color-blue-600);
  outline-offset: 4px;
  border-radius: 4px;
}
```

This helped, but it still wasn't deterministic. Routes where the ring appeared on pointer navigation. Routes where it didn't appear on keyboard navigation. No way to predict which case I'd get without testing that specific flow.

The problem wasn't the CSS. The problem was that `:focus-visible` under programmatic focus is a browser heuristic I couldn't query or control from JavaScript. Modality needed to be an _explicit value_ in my code, not something I inferred from CSS state. That realization is what pushed me from trying to fix the styling to actually instrumenting the behavior.

---

## The Debugging Turn

I stopped trying to fix the code and started trying to understand the browser. I added a small utility that logged focus state on every route transition:

```ts
// debug/focusInstrumentation.ts
export function logFocusState(label: string) {
  if (process.env.NODE_ENV !== 'development') return;

  const active = document.activeElement;
  console.group(`[Focus Debug] ${label}`);
  console.log('activeElement:', active);
  console.log('tagName:', active?.tagName);
  console.log('id:', active?.id);
  console.log('tabIndex:', (active as HTMLElement)?.tabIndex);
  console.log('textContent:', active?.textContent?.slice(0, 60));
  console.groupEnd();
}
```

I called it in three places: when the navigation intent was stored, when the landing target mounted, and after `focus()` was called. Three specific things fell out of this.

**Case 1:** I was convinced the destination focus logic was broken. The logs showed focus was landing exactly where I expected. The visual output looked wrong because a homework checklist component was calling `.focus()` on its first item on mount, firing _after_ the landing target received focus. The bug wasn't in the route transition at all.

**Case 2:** Focus appeared to land correctly, but the page was effectively untabbable afterward. A user pressing Tab would jump straight to browser chrome. The heading had `tabIndex={-1}`, which correctly removes it from the tab sequence, but the surrounding DOM had no earlier interactive element to anchor the keyboard. Focus had arrived at an island with no bridge back to the page.

**Case 3:** A refactor had renamed the sessionStorage key at the destination without updating the source. Navigation intent was being written under one key and read from another. Without the logs, this would have taken hours to find from the wrong end of the flow.

The lesson from all three: **accessibility bugs often require observing the browser, not just reading the code.** You can have perfectly correct-looking code that produces wrong runtime behavior, and you won't know until you log `document.activeElement` at the moment it matters.

---

## The Mental Model That Finally Made Things Coherent

The debugging forced me to separate three things I'd been conflating:

**1. Keyboard focus** — which element is active in the DOM and responds to keyboard input.

**2. Screen reader reading position** — where the screen reader is reading from, which is structurally independent of DOM focus. NVDA in browse mode (the default) operates with a virtual cursor that is always decoupled from DOM focus except when the user is interacting with form controls. VoiceOver is more coupled but still situational. This isn't an edge case — it's how these tools are built.

**3. Input modality** — whether the user navigated via keyboard, pointer, or touch.

What this meant practically: programmatic focus placement doesn't move the screen reader's reading position directly, but it _does_ establish a new context anchor. Before I added intentional landing targets, the screen reader would start reading from wherever it happened to be — which on a content-heavy page could be deep and disorienting. After adding a meaningful top-of-page anchor, the readout started from a place that made sense. That single insight was worth more than all the `:focus-visible` debugging combined.

---

## The Architecture I Moved Toward

The more robust model has three pieces. I want to be clear about the framing here: this is the pattern I now believe is correct based on what I learned, not a fully battle-hardened system with months of production data behind it. The snippets below are trimmed from the actual HeelFlow implementation for readability, but they reflect the real focus model and file structure in the project.

### 1. Element-Level Modality Detection

My first instinct was to maintain a global modality tracker — a module-level variable updated by window event listeners that any component could read. It worked, but it introduced state that had to be initialized somewhere, could drift, and was more infrastructure than the problem required.

The simpler approach: read modality directly from the element at the moment of navigation.

```tsx
// Any navigation link — modality detected at the call site
onClick={(e) => {
  setFocusIntent(
    e.currentTarget.matches(":focus-visible")
      ? { targetId: "recap-heading", visible: true }
      : { targetId: "main-content", visible: false }
  );
}}
```

`element.matches(":focus-visible")` is synchronous and scoped to the element that triggered the navigation. That made it a cleaner fit for this use case than maintaining separate global modality state. The reason this works where CSS alone didn't: I'm reading the `:focus-visible` state at click time to make a product decision in JavaScript, rather than relying on the browser to apply it correctly after programmatic focus. The CSS heuristic becomes a signal I can read — not something I have to trust.

One structural consequence worth noting: any component that calls `setFocusIntent` in an `onClick` needs to be a client component. The pattern is to keep page-level components as server components and extract just the interactive navigation elements — a `NewSessionLink`, a `ClientDetailBackLink`, an `AddClientLink` — into small, focused client components. The header stays a server component. Only the interactive piece opts into the client bundle.

---

### 2. Focus Intent Storage

```ts
// lib/focus-intent.ts
const INTENT_KEY = 'heelflow:focus-intent';

export type FocusIntent = {
  targetId: string;
  fallbackId?: string;
  visible: boolean;
  ts?: number;
};

export function setFocusIntent(intent: FocusIntent): void {
  try {
    sessionStorage.setItem(INTENT_KEY, JSON.stringify({ ...intent, ts: Date.now() }));
  } catch {
    // sessionStorage unavailable — warns in development, silent in production
    console.warn('[focus-intent] setFocusIntent failed — sessionStorage unavailable');
  }
}

export function peekFocusIntent(): FocusIntent | null {
  try {
    const raw = sessionStorage.getItem(INTENT_KEY);
    if (!raw) return null;
    const intent = JSON.parse(raw) as FocusIntent;
    if (intent.ts && Date.now() - intent.ts > 3000) {
      clearFocusIntent();
      return null;
    }
    return intent;
  } catch {
    return null;
  }
}

export function clearFocusIntent(): void {
  try {
    sessionStorage.removeItem(INTENT_KEY);
  } catch {}
}
```

App Router doesn't pass state between pages the way some client-side routers do. This bridges that gap clearly.

A few things in here came directly from debugging rather than upfront design. The `peek`/`clear` split — rather than a single `consume` that reads and deletes atomically — exists because the component that reads the intent retries with `requestAnimationFrame` when the target element isn't in the DOM yet. If you clear on first read and the element hasn't mounted, you've lost the intent before ever using it. Peek reads without deleting; clear fires only after focus lands successfully or retries are exhausted.

The timestamp check exists because without it, a stale intent from a previous navigation can survive and fire on an unrelated later page load — if the user hits the browser back button or navigates directly by URL before the destination mounts. A stale intent is worse than no intent: it causes a visible focus indicator to appear with no clear source.

---

### 3. The Landing Focus Component

```tsx
// components/LandingFocus.tsx
'use client';

import { useEffect } from 'react';
import { peekFocusIntent, clearFocusIntent } from '@/lib/focus-intent';

export function LandingFocus({ defaultTargetId }: { defaultTargetId?: string } = {}) {
  useEffect(() => {
    const intent = peekFocusIntent();

    const targetId = intent?.targetId ?? defaultTargetId;
    if (!targetId) return;

    const fallbackId = intent?.fallbackId;
    const visible = intent?.visible ?? false;

    let attempt = 0;
    let cancelled = false;
    let rafId: number;

    const tryFocus = () => {
      if (cancelled) return;

      const targetEl = document.getElementById(targetId);
      const fallbackEl = fallbackId ? document.getElementById(fallbackId) : null;
      const el = targetEl ?? fallbackEl;

      if (el instanceof HTMLElement) {
        if (visible) {
          el.dataset.landingFocus = '';
          el.addEventListener('blur', () => delete el.dataset.landingFocus, {
            once: true,
          });
        }

        el.focus();

        if (document.activeElement === el) {
          clearFocusIntent();
          return;
        }
      }

      attempt++;
      if (attempt < 5) {
        rafId = requestAnimationFrame(tryFocus);
      } else {
        clearFocusIntent();
      }
    };

    rafId = requestAnimationFrame(tryFocus);
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, [defaultTargetId]);

  return null;
}
```

A few things here that weren't in my original design:

**The RAF retry loop.** On slower connections or complex pages, the target element may not be in the DOM when the component first mounts. Five attempts with `requestAnimationFrame` covers real-world paint timing without polling indefinitely. The `cancelled` flag on cleanup prevents a stale retry from firing after the component unmounts.

**The blur cleanup.** Setting `data-landing-focus` on the element and removing it on blur means the visible ring only shows while the element is actually focused — not persistently after the user moves on. It sounds obvious in retrospect, but the first version left the attribute in place and produced a stale ring on subsequent interactions.

**`fallbackId`.** For flows where the originating element might not exist on the destination page — a client card that was archived, for example — the intent can carry a fallback target. If the primary target isn't found, focus lands on the fallback silently instead of doing nothing.

```css
/* globals.css */
/*
 * Using :focus (not :focus-visible) here because the attribute is set
 * intentionally — it's always correct to show the ring when it's present.
 */
[data-landing-focus]:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 4px;
}

/* Suppress outline on the skip-to-content anchor and other programmatic
   fallback targets that should not show the landing ring. */
#main-content:focus {
  outline: none;
}
```

**Why `:focus` and not `:focus-visible` on the landing ring rule:** The data attribute is set intentionally by JavaScript that already knows this is a keyboard navigation. At that point, the browser's heuristic is redundant — and as established, unreliable under programmatic focus. The attribute _is_ the signal. `:focus` is correct here.

### 4. Usage at the Call Site

```tsx
// Dashboard page — server component
export default async function DashboardPage() {
  return (
    <div>
      <LandingFocus />
      <DashboardHeader />
      {/* rest of page */}
    </div>
  );
}
```

```tsx
// Back link — client component, sets intent before navigating
export function ClientDetailBackLink({ clientId }: { clientId: string }) {
  return (
    <a
      href="/dashboard"
      onClick={(e) => {
        setFocusIntent(
          e.currentTarget.matches(':focus-visible')
            ? {
                targetId: `client-card-${clientId}`,
                fallbackId: 'dashboard-heading',
                visible: true,
              }
            : { targetId: 'main-content', visible: false },
        );
      }}
    >
      ← Back
    </a>
  );
}
```

The back link restores focus to the exact client card the user came from, with a fallback to the dashboard heading if that card is no longer in the DOM. The complexity is contained in the helpers. The call site states intent clearly and moves on.

---

## What Different Users Now Experience

Pointer-triggered navigation lands quietly — focus moves to the heading, no ring appears, the page is correctly anchored for screen readers without surfacing anything unexpected to sighted users.

Keyboard-triggered navigation lands with a visible indicator on the intended target. The user sees exactly where they are. Tab moves naturally to the first interactive element from there.

Screen reader users get a stable top-of-page anchor regardless of modality. The readout begins from a meaningful place. Where the virtual cursor goes from there is up to the user — but it starts grounded.

The difference from the starting point wasn't dramatic visually. It was dramatic experientially. The page went from feeling like you'd been dropped somewhere to feeling like you'd arrived.

---

## The Actual Lesson

Route-change accessibility isn't just about moving focus. It's about moving focus _intentionally_ — based on modality, context, and what the user is trying to do.

The bug was never "focus not moving." The bug was moving focus without intent.

The spec gives you tools. Product judgment comes from debugging what the browser actually does.

---

## What I’d do differently

- I would not rely on `:focus-visible` for programmatic focus
- I would treat focus as part of navigation, not styling
- I would make modality explicit instead of inferred

_HeelFlow is a Next.js 15 / Supabase / Tailwind CSS project. The public client recap page is a token-based, unauthenticated route serving as the primary dog owner-facing surface for session summaries, homework, and follow-up._
