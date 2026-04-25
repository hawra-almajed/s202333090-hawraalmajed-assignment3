# Assignment 2 – Interactive Portfolio

A modern portfolio website built on top of Assignment 1, with enhanced interactivity, animation, and dynamic user experience.

## Project Overview

This portfolio has been upgraded with interactive features that make it more engaging and user-friendly. Visitors can filter project cards, fetch live advice from an API, toggle themes, and submit the contact form with immediate feedback.

## New Features Added

- Project tab filtering (All / Web / Research) — filters cards dynamically without page reload
- Advice of the Day — fetches a random piece of advice from a public API with refresh and error handling
- CSS animations — fade-in section transitions and hover lift effect on project cards
- Active tab highlighting with smooth transitions
- Custom form feedback message on submission

## Technologies Used

- HTML5 for semantic page structure
- CSS3 for responsive layout, animations, and theming
- JavaScript (ES6+) for interactive controls, DOM updates, and API communication
- Fetch API for retrieving advice data
- LocalStorage API for storing theme preference

## Running the Project Locally

### Prerequisites
- Modern browser (Chrome, Firefox, Safari, Edge)
- Optional: local server for development

### Steps
1. Clone or download the repository:
   ```bash
   git clone <repository-url>
   cd s202333090-hawraalmajed-assignment1
   ```
2. Open `index.html` directly, or start a local server:
   ```bash
   # Python
   python -m http.server 8000

   # Node.js
   npx http-server
   ```
3. Visit `http://localhost:8000` if using a server.

## Project Structure

```
s202333090-hawraalmajed-assignment1/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   └── images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── README.md
```

## Feature Details

### Project Filtering
- Clicking the tabs updates project cards instantly
- Supports filtering by `web`, `research`, or all categories
- Provides active state styling for clear navigation

### Advice of the Day
- Retrieves a fresh quote from `https://api.adviceslip.com/advice`
- Shows a loading message during the request
- Displays an error message if the API call fails

### Theme Toggle
- Dark/light theme switch available in the header
- Saves the selected theme in `localStorage`
- Remembers the preference on page reload

### Contact Form
- Prevents default form submission behavior
- Displays a custom success message when submitted
- Clears form fields after submission

## AI Tools Used

This assignment used Claude AI for mentorship, guidance, and code review throughout the development process. Claude helped refine feature requirements, troubleshoot JavaScript logic, and improve the structure of this README.

Final styling and visual polish were completed with assistance from Amazon AI.

## Learning Outcomes

This project helped reinforce:
- DOM manipulation and event-driven JavaScript
- Fetching and handling external API data
- Responsive and animated UI design
- Local state persistence with browser storage

## Future Improvements

- Add backend integration for contact submissions
- Expand the project gallery with more examples
- Add a blog or testimonials section
- Improve accessibility and keyboard support

## Author

Hawra Almajed (s202333090)
Computer Science Student at KFUPM

---

For detailed technical documentation, see [docs/technical-documentation.md](docs/technical-documentation.md).

---

## Assignment 3 – Advanced Functionality

### New Features Added

**Graduation Countdown Timer**
A live countdown (months / days) in its own section that ticks down to graduation day in July 2027.

**Login & Session State Management**
A modal with Name, Email, and Password fields handles both registration and sign-in using `localStorage`. Passwords are stored as a djb2 hash (never plain text). On every page load, the session is restored automatically. A fixed badge in the bottom-right corner always shows the logged-in user's first name. The nav Login button also updates to say "Hi, [Name]". Logging out removes only the session token, so the account persists for next time.

**Remembered User Preferences**
The active project filter tab is saved to `localStorage` and restored on reload. The dark/light theme preference was already persisted and continues to work. All choices survive a browser refresh.

**Image Performance**
Every project image now has `loading="lazy"` (deferred network load), `decoding="async"` (off-main-thread decode), explicit `width` and `height` attributes (prevents layout shift), and `object-fit: cover` in CSS (fills the container without stretching). An IntersectionObserver in `script.js` adds a `.loaded` fade-in class once each image enters the viewport.

**GitHub Live Stats Widget**
Fetches public repo count, follower count, and total star count from the GitHub API and displays them in a compact widget. If the API is unreachable, the widget stays hidden — no broken UI.

**Hero Typing Animation**
The About section now includes a styled code block with a typewriter animation cycling through lines of JavaScript that describe the developer, adding personality without images.

**Active Navigation Highlighting**
A scroll listener marks the current section's nav link as active in real time.

**Personalized Contact Form**
If the user is logged in, the success message after submitting the contact form addresses them by first name.

### File Structure (updated)

```
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   └── images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── README.md
```

### Performance Notes

Lighthouse / PageSpeed tips:
- Images use `loading="lazy"` and explicit dimensions — run Lighthouse and the LCP / CLS scores should both improve.
- Compress project images to WebP for further gains (tools: Squoosh, ImageOptim).
- No external fonts or libraries are loaded — the only external calls are the GitHub API and Advice Slip API.

### AI Tools Used (Assignment 3)

Claude AI was used for the full implementation of Assignment 3 features. See `docs/ai-usage-report.md` for details.