# AI Usage Report – Portfolio Assignment 3

## Project Overview

Assignment 3 extended the portfolio with advanced features: a graduation countdown timer, a login/session system with localStorage, improved image performance, a GitHub stats widget, a typing animation, and active nav highlighting. Claude AI was the primary tool used throughout.

---

## Tools Used & Use Cases

### Claude AI (Anthropic)
**Use Case:** Feature design, code generation, review, and documentation

Claude was used in a guided, iterative way — not as a one-shot generator. Workflow for each feature:

1. Describe the requirement and constraints
2. Review Claude's proposed approach before any code was written
3. Ask Claude to explain trade-offs (e.g., djb2 hash vs. plain text password, IntersectionObserver vs. pure lazy loading attribute)
4. Accept, modify, or reject suggestions based on understanding

**Specific areas where Claude assisted:**

- **Login system:** Explained the difference between session tokens and persistent accounts, and why removing only `userName` on logout (not the stored password hash) lets users stay registered.
- **Countdown math:** Walked through the millisecond subtraction and modulo chain for extracting days/hours/minutes/seconds cleanly.
- **IntersectionObserver:** Explained how it defers image processing until the element is near the viewport, versus `loading="lazy"` which only defers the network request.
- **CSS tabular-nums:** Introduced `font-variant-numeric: tabular-nums` to prevent the countdown layout from jumping when digits change width.
- **Modal accessibility:** Suggested `aria-hidden`, `role="dialog"`, `aria-modal`, and Escape-key handling.
- **Code structure:** Recommended grouping all DOM references in one `elements` object and all state in a `state` object for readability and maintainability.

### GitHub Copilot
**Use Case:** CSS property completion and minor JS boilerplate

Used for autocompleting repetitive CSS (e.g., vendor-prefixed properties, repeated grid patterns) and small JS snippets like `padStart` usage. All suggestions were reviewed before acceptance.

### AWS CodeWhisperer (carry-forward from Assignment 1)
**Use Case:** Original HTML/CSS scaffold

The base HTML and CSS from Assignment 1 was generated with CodeWhisperer and has been progressively modified. No new CodeWhisperer output was added in Assignment 3.

---

## What I Wrote vs. What AI Generated

| Feature | Source |
|---|---|
| Overall HTML structure | Me (with Claude review) |
| Login modal HTML | Claude (reviewed and adapted) |
| Countdown HTML/CSS | Claude (reviewed and adapted) |
| Countdown JS logic | Claude (explained, then accepted after understanding) |
| Login/logout JS logic | Claude (reviewed, tested manually, modified alert → inline validation messages) |
| Project filter + localStorage | Me (from Assignment 2, extended) |
| GitHub API fetch | Claude (reviewed) |
| Typing animation JS | Claude (reviewed and traced through manually) |
| IntersectionObserver for images | Claude (explained concept first, then generated) |
| Contact form personalization | Me |
| CSS custom properties / theming | Me (carry-forward) |
| README & documentation | Me (Claude assisted with structure) |

---

## Benefits

1. **Speed on well-understood patterns:** Features like `localStorage` session restore and modal open/close logic were generated quickly and correctly, saving time on boilerplate.
2. **Concept-first explanations:** Claude explained *why* before *how* — for example, explaining that `aria-hidden` on a modal needs to be toggled (not just set once) for screen readers to track state changes.
3. **Trade-off awareness:** Learned that `loading="lazy"` + `decoding="async"` + explicit dimensions is the correct three-part image optimization combination, not just one of the three.
4. **Code organization:** The `state` object + `elements` object pattern made the JS much easier to read and debug.

## Challenges

1. **Avoiding copy-paste without understanding:** Required deliberately reading each function before accepting it. The typing animation in particular needed tracing through on paper to understand the `charIndex`/`lineIndex` state machine.
2. **Alert vs. inline validation:** Claude initially used `alert()` for form errors. Replaced with inline error messages in the modal for better UX — this required modifying the generated code.
3. **Modal display approach:** Claude's first suggestion used `display: none` toggled by JS. Switched to `aria-hidden` attribute toggling with CSS `[aria-hidden="true"] { display: none }` for better accessibility semantics.

---

## Learning Outcomes

- **IntersectionObserver API:** How to lazily execute JS logic (not just load images) when elements enter the viewport.
- **localStorage scoping:** Why storing a session token (`userName`) separately from account data (`portfolioUser`) allows logout without deleting the account.
- **CSS font-variant-numeric:** A small but impactful typographic property that prevents layout jitter in countdowns and live numbers.
- **ARIA for modals:** The correct combination of `role`, `aria-modal`, `aria-hidden`, and keyboard trap patterns.
- **Async/await vs. .then():** Continued reinforcement — Assignment 2 used `.then()` chains; Assignment 3 uses `async/await` for the GitHub fetch, which is cleaner for sequential API calls.

---

## Responsible Use Statement

Every AI-generated code block was read, traced through, and tested before inclusion. In two cases (alert-based validation, display-toggle modal), the generated approach was rejected and rewritten. Claude was used as a senior collaborator explaining reasoning — not as a replacement for understanding the code. All final decisions about what to include were made independently.