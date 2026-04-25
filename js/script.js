// Change this later
const GRADUATION_DATE = new Date('2027-05-15T09:00:00');

// GitHub username for the widget
const GITHUB_USERNAME = 's202333090';

// ========================================
// State Management
// ========================================

const state = {
  isLoggedIn: false,
  user: null,
  theme: 'light',
  activeFilter: 'all'
};

// ========================================
// DOM Elements
// ========================================

const elements = {
  // Theme
  themeToggle: document.getElementById('themeToggle'),

  // Modal
  loginModal: document.getElementById('loginModal'),
  closeModal: document.getElementById('closeModal'),
  loginForm: document.getElementById('loginForm'),
  loginView: document.getElementById('loginView'),
  loggedInView: document.getElementById('loggedInView'),
  loginBtn: document.getElementById('loginBtn'),
  logoutBtn: document.getElementById('logoutBtn'),
  welcomeName: document.getElementById('welcomeName'),
  userEmail: document.getElementById('userEmail'),

  // User Badge
  userBadge: document.getElementById('userBadge'),
  badgeName: document.getElementById('badgeName'),

  // Countdown
  monthsEl: document.getElementById('months'),
  daysEl: document.getElementById('days'),

  // Filter
  filterBtns: document.querySelectorAll('.filter-btn'),
  projectCards: document.querySelectorAll('.project-card'),

  // Contact Form
  contactForm: document.getElementById('contactForm'),
  formMessage: document.getElementById('formMessage'),

  // GitHub Widget
  githubWidget: document.getElementById('githubWidget'),
  repoCount: document.getElementById('repoCount'),
  followers: document.getElementById('followers'),
  stars: document.getElementById('stars'),

  // Hero typing
  typingCode: document.getElementById('typingCode')
};

// ========================================
// Countdown Timer
// ========================================

function updateCountdown() {
  const now = new Date();
  const graduation = GRADUATION_DATE;

  if (graduation < now) {
    elements.monthsEl.textContent = '00';
    elements.daysEl.textContent = '00';
    return;
  }

  // Calculate full calendar months
  let months = (graduation.getFullYear() - now.getFullYear()) * 12;
  months += graduation.getMonth() - now.getMonth();

  const tempDate = new Date(now);
  tempDate.setMonth(tempDate.getMonth() + months);

  // Adjust if we've overshot the target date
  if (tempDate > graduation) {
    months--;
    tempDate.setMonth(tempDate.getMonth() - 1);
  }

  const days = Math.floor((graduation - tempDate) / (1000 * 60 * 60 * 24));

  elements.monthsEl.textContent = String(Math.max(0, months)).padStart(2, '0');
  elements.daysEl.textContent = String(Math.max(0, days)).padStart(2, '0');
}

// ========================================
// Theme Management
// ========================================

function initTheme() {
  // Check localStorage first
  const savedTheme = localStorage.getItem('portfolioTheme');
  if (savedTheme) {
    state.theme = savedTheme;
  } else {
    // Check system preference
    state.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  applyTheme();
}

function applyTheme() {
  document.body.classList.remove('light', 'dark');
  document.body.classList.add(state.theme);
  localStorage.setItem('portfolioTheme', state.theme);

  // Update theme icon
  const icon = elements.themeToggle.querySelector('.theme-icon');
  if (icon) {
    icon.textContent = state.theme === 'dark' ? '☀️' : '🌙';
  }
}

function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  applyTheme();
}

// ========================================
// Login System
// ========================================

// Simple hash function for password storage
function hashPassword(password) {
  let hash = 5381;
  for (let i = 0; i < password.length; i++) {
    hash = ((hash << 5) + hash) + password.charCodeAt(i);
  }
  return hash.toString();
}

function getStoredUser() {
  const stored = localStorage.getItem('portfolioUser');
  return stored ? JSON.parse(stored) : null;
}

function saveUser(userData) {
  localStorage.setItem('portfolioUser', JSON.stringify(userData));
}

function initLoginState() {
  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');

  if (userName) {
    state.isLoggedIn = true;
    state.user = { name: userName, email: userEmail };
    applyLoggedInState();
  }
}

function applyLoggedInState() {
  if (state.isLoggedIn && state.user) {
    // Update login button in nav
    const firstName = state.user.name.split(' ')[0];
    elements.loginBtn.textContent = `Hi, ${firstName}`;

    // Show user badge
    elements.badgeName.textContent = firstName;
    elements.userBadge.classList.remove('hidden');

    // Update logged-in view
    elements.welcomeName.textContent = firstName;
    if (elements.userEmail && state.user.email) {
      elements.userEmail.textContent = state.user.email;
    }
  } else {
    elements.loginBtn.textContent = 'Login';
    elements.userBadge.classList.add('hidden');
  }
}

function openModal() {
  if (state.isLoggedIn) {
    elements.loginView.classList.add('hidden');
    elements.loggedInView.classList.remove('hidden');
  } else {
    elements.loginView.classList.remove('hidden');
    elements.loggedInView.classList.add('hidden');
  }
  elements.loginModal.removeAttribute('aria-hidden');
  elements.loginModal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  elements.loginModal.setAttribute('aria-hidden', 'true');
}

function handleLogin(e) {
  e.preventDefault();

  const name = document.getElementById('loginName').value.trim();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  // Validation
  if (!name) {
    alert('Please enter your name');
    return;
  }

  if (!validateEmail(email)) {
    alert('Please enter a valid email address');
    return;
  }

  if (password.length < 6) {
    alert('Password must be at least 6 characters');
    return;
  }

  // Check for existing account
  const stored = getStoredUser();
  let isValidLogin = false;

  if (stored) {
    // Verify password
    if (stored.email === email && stored.passwordHash === hashPassword(password)) {
      isValidLogin = true;
    } else if (stored.email === email && stored.passwordHash !== hashPassword(password)) {
      alert('Incorrect password. Please try again.');
      return;
    } else {
      // Different email - create new account
      stored.email = email;
      stored.passwordHash = hashPassword(password);
      saveUser(stored);
      isValidLogin = true;
    }
  } else {
    // New account
    const newUser = {
      name: name,
      email: email,
      passwordHash: hashPassword(password)
    };
    saveUser(newUser);
    isValidLogin = true;
  }

  if (isValidLogin) {
    // Save session
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);

    state.isLoggedIn = true;
    state.user = { name, email };

    applyLoggedInState();
    closeModal();

    // Clear form
    elements.loginForm.reset();
  }
}

function handleLogout() {
  localStorage.removeItem('userName');
  localStorage.removeItem('userEmail');

  state.isLoggedIn = false;
  state.user = null;

  applyLoggedInState();
  closeModal();
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// ========================================
// Project Filter
// ========================================

function initFilter() {
  // Restore saved filter
  const savedFilter = localStorage.getItem('projectFilter');
  if (savedFilter) {
    state.activeFilter = savedFilter;
    applyFilter(savedFilter);
  } else {
    applyFilter('all');
  }
}

function applyFilter(category) {
  state.activeFilter = category;
  localStorage.setItem('projectFilter', category);

  // Update button states
  elements.filterBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === category);
  });

  // Filter projects
  elements.projectCards.forEach(card => {
    const cardCategory = card.dataset.category;
    if (category === 'all' || cardCategory === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// ========================================
// Contact Form
// ========================================

function handleContactSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // Validation
  if (!name || !email || !message) {
    showFormMessage('Please fill in all fields', 'error');
    return;
  }

  if (!validateEmail(email)) {
    showFormMessage('Please enter a valid email address', 'error');
    return;
  }

  // Success - personalize message
  let successMsg = 'Thanks for your message! ';
  if (state.isLoggedIn && state.user) {
    successMsg += `${state.user.name.split(' ')[0]}! I'll get back to you soon.`;
  } else {
    successMsg += "I'll get back to you soon!";
  }

  showFormMessage(successMsg, 'success');
  elements.contactForm.reset();

  // Hide message after 5 seconds
  setTimeout(() => {
    elements.formMessage.classList.add('hidden');
  }, 5000);
}

function showFormMessage(text, type) {
  elements.formMessage.textContent = text;
  elements.formMessage.className = `form-message ${type} hidden`;
  elements.formMessage.classList.remove('hidden');
}

// ========================================
// GitHub API Integration
// ========================================

async function fetchGitHubStats() {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);

    if (!response.ok) throw new Error('Failed to fetch GitHub data');

    const data = await response.json();

    // Update widget
    elements.repoCount.textContent = data.public_repos || '0';
    elements.followers.textContent = data.followers || '0';

    // Fetch total stars
    const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
    if (reposResponse.ok) {
      const repos = await reposResponse.json();
      const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
      elements.stars.textContent = totalStars;
    }

    elements.githubWidget.classList.remove('hidden');
  } catch (error) {
    console.log('GitHub stats unavailable:', error.message);
  }
}

// ========================================
// Hero Typing Animation
// ========================================

function initTypingAnimation() {
  const codeLines = [
    '<span class="keyword">const</span> <span class="variable">developer</span> = {',
    '  name: <span class="string">"Hawraa Al-Majed"</span>,',
    '  passion: <span class="string">"Building things"</span>,',
    '  skills: [<span class="string">"JavaScript"</span>, <span class="string">"Python"</span>, <span class="string">"Java"</span>],',
    '  goal: <span class="string">"Create impact"</span>',
    '};'
  ];

  let lineIndex = 0;
  let charIndex = 0;
  let currentLine = '';
  let isDeleting = false;

  function type() {
    const line = codeLines[lineIndex];

    if (!isDeleting) {
      currentLine = line.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === line.length) {
        isDeleting = true;
        setTimeout(type, 2000); // Pause before deleting
        return;
      }
    } else {
      currentLine = line.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        lineIndex = (lineIndex + 1) % codeLines.length;
      }
    }

    // Build display with all completed lines
    let display = '';
    for (let i = 0; i < lineIndex; i++) {
      display += codeLines[i] + '\n';
    }
    display += currentLine;

    if (elements.typingCode) {
      elements.typingCode.innerHTML = display;
    }

    // Adjust typing speed
    const speed = isDeleting ? 30 : 50;
    setTimeout(type, speed);
  }

  type();
}

// ========================================
// Navigation Active State
// ========================================

function initNavigation() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);
}

// ========================================
// Image Performance - Intersection Observer
// ========================================

function initImageLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          // Add fade-in effect when loaded
          img.addEventListener('load', () => {
            img.classList.add('loaded');
          });
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    document.querySelectorAll('.project-img img').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// ========================================
// Initialize Everything
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  // Core features
  initTheme();
  initLoginState();
  initFilter();
  initNavigation();
  initImageLoading();
  initTypingAnimation();

  // Start countdown
  updateCountdown();
  setInterval(updateCountdown, 60000);

  // Fetch GitHub data
  fetchGitHubStats();

  // Event Listeners
  elements.themeToggle.addEventListener('click', toggleTheme);

  // Modal controls
  if (elements.loginBtn) {
    elements.loginBtn.addEventListener('click', openModal);
  }
  if (elements.closeModal) {
    elements.closeModal.addEventListener('click', closeModal);
  }
  if (elements.loginModal) {
    elements.loginModal.addEventListener('click', (e) => {
      if (e.target === elements.loginModal) closeModal();
    });
  }

  // Login/Logout
  elements.loginForm.addEventListener('submit', handleLogin);
  if (elements.logoutBtn) {
    elements.logoutBtn.addEventListener('click', handleLogout);
  }

  // Filter buttons
  elements.filterBtns.forEach(btn => {
    btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
  });

  // Contact form
  elements.contactForm.addEventListener('submit', handleContactSubmit);

  // Keyboard accessibility
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && elements.loginModal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });

  // Console welcome message
  console.log('%c👋 Welcome to my portfolio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
  console.log('%cBuilt with HTML, CSS, and JavaScript as part of Assignment 3', 'color: #64748b;');
});