# Portfolio — Style Guide

## Purpose

This document defines the UI, design, and interaction style for the portfolio.

The portfolio should reflect:

- real-world frontend work
- strong accessibility practices
- clean, production-ready UI

This is NOT:

- a design experiment
- a flashy landing page
- a generic template

---

## Core Principle

Clarity > Flash

The portfolio should feel:

- intentional
- readable
- professional

---

## Visual Style

- clean and modern
- restrained use of color
- minimal decoration
- strong typography and spacing

Avoid:

- excessive gradients
- heavy shadows
- overly playful or trendy visuals
- inconsistent styling across sections

---

## Hierarchy

Hierarchy must be obvious at a glance.

Use:

- font size and weight
- spacing and grouping
- alignment
- contrast

Avoid:

- equal visual weight across all sections
- cluttered layouts
- inconsistent spacing

---

## Layout

- use simple grid and flex layouts
- maintain consistent spacing rhythm
- keep sections clearly separated
- avoid deep nesting

Pages should feel:

- structured
- easy to scan
- balanced

---

## Content Structure

The homepage should guide the user:

1. clear introduction (hero)
2. primary/featured work
3. supporting projects
4. background / strengths
5. contact

Do not:

- treat all projects equally
- bury the strongest work

---

## Emphasis Rules

### Emphasize

- featured project
- key actions (view project, contact)
- important headings

### De-emphasize

- secondary projects
- supporting text
- less important metadata

---

## Components

- keep components simple and focused
- avoid over-abstraction
- reuse patterns where appropriate

Rules:

- components should be easy to read
- avoid complex prop APIs
- prefer composition over configuration

---

## Data & UI Patterns

- avoid unnecessary complexity
- keep UI patterns predictable
- ensure information is easy to scan

If using data-heavy UI (tables, lists):

- precompute values before rendering
- avoid heavy logic in JSX
- prioritize readability

---

## Styling Rules

- use Tailwind utilities consistently
- follow existing spacing and layout patterns
- avoid one-off styles when possible
- keep styles readable and maintainable

---

## Accessibility (Required)

Always enforce:

- semantic HTML
- keyboard accessibility
- visible focus states
- proper labeling
- meaningful text for interactive elements

Avoid:

- divs acting as buttons
- missing labels
- color-only meaning

Accessibility should feel natural, not bolted on.

---

## Interaction

- interactions should be predictable
- hover, focus, and active states must be clear
- clickable areas must be obvious

Avoid:

- hidden interactions
- inconsistent behavior
- unclear click targets

---

## Content Tone

- direct and human
- no buzzwords
- no generic filler language

Prefer:

- specific, concrete descriptions
- real implementation details

---

## Final Rule

If something looks impressive but reduces clarity or usability, remove it.
