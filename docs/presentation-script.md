# Portfolio Presentation Script
## 00:00 – Introduction (1 minute)

The main objectives were straightforward: build a responsive, interactive portfolio that demonstrates my technical abilities, while keeping the user experience smooth and engaging. Personally, I was motivated by the fact that as developers, our own websites are often the first thing employers see. I wanted mine to stand out — not just with static content, but with real interactivity, animations, and dynamic features.”*

---

## 01:00 – Technical Demonstration: Live Demo of Key Features (~1.5 min)


*“Let me show you the site in action. Right away you’ll notice a clean, modern layout with a sticky navigation bar. As I scroll, the active section is highlighted in real time.

First, this **typing animation** in the Hero section cycles through lines of code that describe me as a developer. It’s built entirely with vanilla JavaScript — no libraries — and runs continuously to add personality.

Next, the **Graduation Countdown**. I'm showing visitors who're possible employers my **months and days** remaining until I graduate on December 24, 2026. The math uses exact calendar months, not just dividing by 30, so it stays accurate.

Moving down, we have the **Projects section** with live filtering. Clicking ‘Web’ or ‘Research’ instantly filters the cards — powered by JavaScript DOM manipulation and localStorage, so the active tab persists even after a page refresh.

Here’s the **Advice of the Day** — it fetches random advice from a public API. Clicking ‘New Advice’ pulls a fresh quote instantly.

The **dark/light theme toggle** switches the full palette and saves the preference to localStorage, so it remembers your choice next time.

And finally, the **Login Modal** — it handles both registration and sign-in using localStorage. Passwords are hashed before storage, a session badge appears in the corner, and the contact form even personalizes its success message with your first name when you’re logged in.”*

---

## 02:45 – Technical Demonstration: Architecture Overview (~1 min)

**[Slide: Simple file structure or diagram]**

*“Under the hood, the architecture is intentionally simple but well-organized. It’s a pure front-end stack: semantic HTML5, vanilla CSS3 with CSS variables for theming, and vanilla JavaScript — no frameworks. 

State is managed through a single `state` object in `script.js`, and DOM references are centralized in an `elements` object to avoid repeated `querySelector` calls. 

For performance, images use `loading="lazy"`, `decoding="async"`, and explicit `width`/`height` attributes to prevent layout shift. An IntersectionObserver adds a smooth fade-in as images enter the viewport.”*

---

## 03:45 – Technical Demonstration: AI Integration Highlights (~1 min)

**[Slide: AI Usage / Tools Mention]**

*“I used Claude AI as my primary development assistant throughout this project. It helped me with everything from hashing algorithms for password storage, to the calendar-based countdown logic, to accessibility patterns like ARIA attributes and keyboard trap handling for the modal.

Rather than copy-pasting blindly, I treated AI as a mentor — I’d ask for an approach, understand the reasoning, then implement and adapt it myself. Amazon AI assisted with final styling polish. The `docs/ai-usage-report.md` file documents exactly where and how AI was used.”*

---

## 04:45 – Technical Deep Dive: Resolved Challenges (~1 min)

**[Slide: Code Snippets / Before-After]**

*“The most challenging aspect was the **countdown logic**. At first I used simple millisecond division, but that gives inaccurate month counts because months have different lengths. The calendar-based solution — calculating exact month differences and then deriving remaining days — was the cleanest fix.

Another challenge was the **login state management**. I needed to distinguish between persistent account data and session tokens, so that logging out removes your session but keeps your account info intact. Separating `portfolioUser` from `userName` in localStorage solved this elegantly.

For the **typing animation**, the difficult part was building the display incrementally across multiple lines while simulating realistic typing and deletion speeds. I ended up using a recursive `setTimeout` loop with separate speeds for typing versus deleting.”*

---

## 05:30 – Technical Deep Dive: Unresolved Challenges & Future Work (~30 sec)

*“One thing I intentionally left out was a backend — the contact form currently shows a success message but doesn’t actually send emails. That’s planned for future work, along with a real email integration or a simple backend service.

I also disabled the GitHub stats widget temporarily because the placeholder username I used returned a 404. Once I create my actual GitHub account, I just need to set the `GITHUB_USERNAME` constant and it will populate automatically.”*

---

## 06:00 – Conclusion (1 minute)

**[Slide: Summary / QR Code / Contact]**

*“To summarize, this portfolio demonstrates responsive design, DOM manipulation, API integration, localStorage state persistence, accessibility considerations, and performance optimizations — all built without external libraries.

Key achievements include the interactive login system, the accurate calendar-based countdown, the live advice API, and the persistent theme and filter preferences.

For future improvements, I plan to add a real backend for contact submissions, integrate my live GitHub stats once the account is ready, expand the project gallery, and possibly add a blog section.

### End