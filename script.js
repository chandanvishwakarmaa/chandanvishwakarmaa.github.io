/* script.js - Interactive State Engine & Micro Animations */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize all modular components
  initThemeEngine();
  initTypingAnimation();
  initScrollObservers();
  initTerminalSim();
  initResumeControls();
  initClockNode();
});

/* 1. APPLE-INSPIRED THEME PERSISTENCE ENGINE */
function initThemeEngine() {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;

  // Retrieve saved state, defaulting to "dark"
  const storedTheme = localStorage.getItem("portfolio-theme") || "dark";
  htmlElement.setAttribute("data-theme", storedTheme);

  if (!themeToggleBtn) return;

  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    
    htmlElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
    
    // Add temporary scaling bounce class
    themeToggleBtn.classList.add("btn-bounce");
    setTimeout(() => themeToggleBtn.classList.remove("btn-bounce"), 300);
  });
}

/* 2. DYNAMIC TYPING IMPACT ANIMATION */
function initTypingAnimation() {
  const targetElement = document.getElementById("typing-tagline");
  if (!targetElement) return;

  const phrase = "Patterns to Decisions_";
  let index = 0;
  targetElement.innerText = "";

  function typeWriter() {
    if (index < phrase.length) {
      // Remove cursor before adding new letter
      if (phrase.charAt(index) === '_') {
        targetElement.innerHTML = targetElement.innerHTML.replace('<span class="cursor animate-pulse">|</span>', '');
        targetElement.innerHTML += '<span class="cursor animate-pulse">|</span>';
      } else {
        targetElement.innerHTML = targetElement.innerHTML.replace('<span class="cursor animate-pulse">|</span>', '');
        targetElement.innerHTML += phrase.charAt(index);
        targetElement.innerHTML += '<span class="cursor animate-pulse">|</span>';
      }
      index++;
      setTimeout(typeWriter, 120);
    } else {
      // Fade-in caret pulse at the end
      setTimeout(() => {
        targetElement.innerHTML = "Patterns to Decisions<span class='cursor animate-pulse' style='color:var(--accent-blue);'>_</span>";
      }, 500);
    }
  }

  // Delay starting slightly for transition
  setTimeout(typeWriter, 600);
}

/* 3. SCROLL PROGRESSION & ACTIVE NAVIGATION OBSERVERS */
function initScrollObservers() {
  const navbar = document.querySelector(".navbar-wrapper");
  const navItems = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll("section");
  const waBtn = document.getElementById("wa-sticky-bubble");
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  // Mobile menu toggle control
  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileMenuToggle.classList.toggle("open");
      navMenu.classList.toggle("open");
    });

    // Close mobile menu when items are clicked
    navItems.forEach(item => {
      item.addEventListener("click", () => {
        mobileMenuToggle.classList.remove("open");
        navMenu.classList.remove("open");
      });
    });
  }

  // Scroll Actions: Navbar Blur & Sticky WhatsApp Bubble Trigger
  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY;

    // Sticky transparent to blur transition
    if (navbar) {
      if (scrollPos > 40) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }

    // Trigger WhatsApp Floating Bubble when scrolled below hero height
    if (waBtn) {
      if (scrollPos > 400) {
        waBtn.classList.add("visible");
      } else {
        waBtn.classList.remove("visible");
      }
    }

    // Traditional Active Class Highlight scrolling calculations
    let activeSectionId = "home";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (scrollPos >= sectionTop) {
        activeSectionId = section.getAttribute("id");
      }
    });

    navItems.forEach(item => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${activeSectionId}`) {
        item.classList.add("active");
      }
    });
  });
}

/* 4. PY-TERMINAL SIMULATOR AUTOMATION */
function initTerminalSim() {
  const terminal = document.getElementById("terminal-code");
  if (!terminal) return;

  const logs = [
    '<span class="line-comment"># Initializing Energy Pipeline Node...</span>',
    '<span class="line-code"><span class="code-kw">import</span> pandas <span class="code-kw">as</span> pd</span>',
    '<span class="line-code"><span class="code-kw">from</span> sklearn.ensemble <span class="code-kw">import</span> RandomForestRegressor</span>',
    '<span class="line-code">df = pd.read_csv(<span class="code-str">"electricity_prices.csv"</span>)</span>',
    '<span class="line-comment"># [INFO] Parse Success: 112,504 temporal rows loaded.</span>',
    '<span class="line-code">X, y = engineer_lags(df, steps=12)</span>',
    '<span class="line-comment"># Features: lag_t1, lag_t2, rolling_mean_24h, cyclical_hour...</span>',
    '<span class="line-code">forest = RandomForestRegressor(n_estimators=100)</span>',
    '<span class="line-comment"># Training estimators across 79 dimension matrices...</span>',
    '<span class="line-code">forest.fit(X_train, y_train)</span>',
    '<span class="line-output">>> Pipeline Optimisation Finished. Metrics logged:</span>',
    '<span class="line-output">>> Target evaluation: <strong>MAPE 7.7%</strong> [OPTIMAL]</span>'
  ];

  let lineIndex = 0;
  terminal.innerHTML = ""; // Clear statically loaded content

  function printNextLine() {
    if (lineIndex < logs.length) {
      terminal.innerHTML += logs[lineIndex] + "<br/>";
      lineIndex++;
      // Auto-scroll terminal view to bottom
      terminal.scrollTop = terminal.scrollHeight;
      
      // Stagger outputs vs coding lines
      const delay = logs[lineIndex - 1].includes(">>") || logs[lineIndex - 1].includes("[INFO]") ? 1200 : 600;
      setTimeout(printNextLine, delay);
    } else {
      // Loop simulator refresh after idle duration
      setTimeout(() => {
        terminal.innerHTML = "";
        lineIndex = 0;
        printNextLine();
      }, 10000);
    }
  }

  setTimeout(printNextLine, 1500);
}

/* 5. INTERACTIVE PORTFOLIO RESUME FUNCTIONALITIES */
function initResumeControls() {
  const bFullscreen = document.getElementById("btn-fullscreen-resume");
  const bDownload = document.getElementById("btn-download-resume");
  const bCopy = document.getElementById("btn-copy-resume");
  const resumeSheet = document.getElementById("resume-sheet-print");

  if (!bFullscreen || !bDownload || !bCopy || !resumeSheet) return;

  // Copy plain structured resume content to clipboard
  bCopy.addEventListener("click", () => {
    const originalText = bCopy.querySelector("span").innerText;
    const resumeText = resumeSheet.innerText;
    
    navigator.clipboard.writeText(resumeText).then(() => {
      bCopy.querySelector("span").innerText = "Copied!";
      setTimeout(() => {
        bCopy.querySelector("span").innerText = originalText;
      }, 2000);
    });
  });

  // Toggle fullscreen modal sheet representation
  bFullscreen.addEventListener("click", () => {
    resumeSheet.classList.toggle("fullscreen-mode");
    if (resumeSheet.classList.contains("fullscreen-mode")) {
      bFullscreen.querySelector("span").innerText = "Exit Fullscreen";
      document.body.style.overflow = "hidden"; // Prevent background scroll
    } else {
      bFullscreen.querySelector("span").innerText = "Fullscreen";
      document.body.style.overflow = "auto";
    }
  });

  // Allow ESC key to break fullscreen mode
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && resumeSheet.classList.contains("fullscreen-mode")) {
      resumeSheet.classList.remove("fullscreen-mode");
      bFullscreen.querySelector("span").innerText = "Fullscreen";
      document.body.style.overflow = "auto";
    }
  });

  // Download Resume as styled dynamic HTML (Self-contained representation)
  bDownload.addEventListener("click", () => {
    const resumeHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Chandan Vishwakarma - Resume</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background: #fff; color: #111; max-width: 800px; margin: 40px auto; padding: 0 20px; line-height: 1.5; font-size: 14px; }
          h3 { text-align: center; margin-bottom: 5px; font-size: 24px; letter-spacing: 1px; }
          .role { text-align: center; font-weight: bold; font-size: 11px; letter-spacing: 1px; color: #0256e4; uppercase; margin-top: 0; }
          .contacts { text-align: center; font-size: 12px; color: #555; margin-bottom: 40px; }
          h4 { border-bottom: 1px solid #ddd; margin-top: 30px; margin-bottom: 10px; font-size: 15px; padding-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
          ul { padding-left: 20px; }
          li { margin-bottom: 6px; }
          a { color: #0256e4; text-decoration: none; }
          a:hover { text-decoration: underline; }
          p { text-align: justify; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        </style>
      </head>
      <body>
        ${resumeSheet.innerHTML}
      </body>
      </html>
    `;

    const blob = new Blob([resumeHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Chandan_Vishwakarma_Resume.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
}

/* 6. REAL-TIME LOCAL DIGITAL TIME (UTC alignment helper) */
function initClockNode() {
  const clockElement = document.getElementById("clock-stream-time");
  if (!clockElement) return;

  function updateClock() {
    // Produce beautiful Apple-styled live local timestamp relative to user system
    const now = new Date();
    const pad = (num) => String(num).padStart(2, '0');
    
    const year = now.getFullYear();
    const month = pad(now.getMonth() + 1);
    const day = pad(now.getDate());
    
    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());

    // Guess timezone
    let tz = "UTC";
    try {
      tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
    } catch(e) {}

    clockElement.innerText = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} (${tz})`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* 7. CUSTOM MODAL LOGIC FOR PROJECT DETAIL SLIDES */
const projectData = {
  electricity: {
    title: "Electricity Price Forecasting using Machine Learning",
    path: "projects / electricity_prediction_model.json",
    metrics: `
      <div class="modal-meta-row">
        <div>
          <span class="modal-meta-label">MAPE ACCURACY:</span>
          <p class="font-bold text-gradient font-gt" style="font-size: 20px;">7.7% [OPTIMIZED]</p>
        </div>
        <div>
          <span class="modal-meta-label">DATASET INTENSITY:</span>
          <p class="font-bold text-gradient font-gt" style="font-size: 20px;">112,504 Lines</p>
        </div>
        <div>
          <span class="modal-meta-label">ENGINEERED WORK:</span>
          <p class="font-bold text-gradient font-gt" style="font-size: 20px;">79 Features</p>
        </div>
      </div>
    `,
    body: `
      <p class="modal-paragraph">
        Predicting trading pricing anomalies on smart electricity distribution networks is highly challenging due to non-liner volatility indices, seasonal generation shifts, and direct impacts of local weather variables. This project frames a highly reproducible prediction pipeline achieving a highly efficient Mean Absolute Percentage Error (MAPE) of 7.7%.
      </p>
      
      <h4 class="modal-bullet-title font-gt">&equiv; Deep Pipeline Engineering Summary</h4>
      <ul class="modal-bullet-list">
        <li><strong>Exploratory Data Isolation:</strong> Processed 112k+ lines of sequential energy flow logs coupled with local temperature forecasts. Identified severe distribution outliers and handled target skewness safely.</li>
        <li><strong>Feature Synthesis Matrix:</strong> Synthesized 79 logical models containing localized rolling statistics (24h/14d means and std-devs), cyclical trigonometric time-transforms, lag metrics, and temporal temperature variances.</li>
        <li><strong>Model Search &amp; Selection:</strong> Conducted nested cross-validation across Baseline Regressions and Random Forest models. Optimized Random Forest hyperparameters (max_depth=15, n_estimators=100) to isolate non-linear trends.</li>
        <li><strong>Deployable Codebase:</strong> Re-packaged training scripts into fully deterministic Scikit-learn pipelines with zero target leakage, complete with a clean local Streamlit dashboard showcasing real-time price trend indices.</li>
      </ul>

      <!-- Simple Interactive Mini Graph Simulator -->
      <div style="background:var(--btn-secondary-bg); border:1px solid var(--border-color); border-radius:12px; padding:15px; margin-top:20px;">
        <p class="font-mono text-xs" style="color:var(--accent-blue); margin-bottom:10px;">HISTORIC TRAJECTORY VS PREDICTED (Random Forest)</p>
        <svg viewBox="0 0 400 120" style="width:100%; height:auto;">
          <!-- Actual Price Path (Gray wave) -->
          <path d="M 10 90 Q 50 20, 100 80 T 200 60 T 300 100 T 390 40" fill="none" stroke="var(--text-muted)" stroke-width="2" stroke-dasharray="2 2" />
          <!-- Predicted Path (Blue wave closely following) -->
          <path d="M 11 88 Q 50 23, 101 78 T 200 58 T 300 97 T 391 42" fill="none" stroke="var(--accent-blue)" stroke-width="2.5" />
          
          <circle cx="391" cy="42" r="5" fill="var(--accent-blue)" />
          <text x="310" y="25" font-family="var(--font-mono)" font-size="9" fill="var(--text-color)">MAPE: 7.7% Model Fit</text>
        </svg>
      </div>
    `
  },
  accident: {
    title: "Smart Accident Risk Classification Using Traffic & Signal Data",
    path: "projects / active_accident_risk_classification.json",
    metrics: `
      <div class="modal-meta-row">
        <div>
          <span class="modal-meta-label">CURRENT STATUS:</span>
          <p class="font-bold font-gt" style="font-size: 16px; color:#f59e0b;">DEVELOPMENT ACTIVE [WIP]</p>
        </div>
        <div>
          <span class="modal-meta-label">CORE TECHNOLOGY:</span>
          <p class="font-bold font-gt" style="font-size: 16px; color:var(--text-color);">Spatial GIS Graphs</p>
        </div>
        <div>
          <span class="modal-meta-label">ESTIMATED PROTOTYPE:</span>
          <p class="font-bold font-gt" style="font-size: 16px; color:var(--text-color);">Q3 2026</p>
        </div>
      </div>
    `,
    body: `
      <p class="modal-paragraph">
        This spatial-temporal modeling engine seeks to classify crash indices and active hotspot coordinates contextually under regional city limits. By combining physical sensor streams, historical signal timing cycles, and spatial coordinates, it flags high-probability danger vectors.
      </p>

      <h4 class="modal-bullet-title font-gt">&equiv; Current Blueprint Boundaries</h4>
      <ul class="modal-bullet-list">
        <li><strong>Dataset Structuring:</strong> Compiling open spatial traffic datasets, geo-mapping municipal bottleneck corridors, and aligning sequential hourly signal phases.</li>
        <li><strong>Engine Architecture Plan:</strong> Creating a multi-tier neural framework to map geographical proximity layers alongside sudden temporal density shifts (e.g. weather changes or rush hour spikes).</li>
        <li><strong>Visual mapping suite:</strong> An interactive map layout mapping dangerous nodes live for logistical dispatch.</li>
      </ul>
      
      <div style="background:var(--accent-glow); border:1px dashed var(--border-focus); border-radius:12px; padding:20px; text-align:center;">
        <p class="font-mono text-sm" style="color:#f59e0b;">&delta; PIPELINE STATE: ACTIVE GRID TRAINING</p>
        <p class="text-xs text-muted mt-1">Estimator and features are being isolated. Check back soon for updated repository assets.</p>
      </div>
    `
  }
};

window.openProjectModal = function(projectId) {
  const modal = document.getElementById("details-modal");
  const modalPath = document.getElementById("modal-path-text");
  const modalBody = document.getElementById("modal-dynamic-body");

  const data = projectData[projectId];
  if (!data) return;

  modalPath.innerText = data.path;
  modalBody.innerHTML = `
    <h3 class="modal-section-title font-gt">${data.title}</h3>
    ${data.metrics}
    ${data.body}
  `;

  modal.classList.remove("hidden");
  // Small trick to enforce slide transition timing
  setTimeout(() => modal.classList.add("visible"), 50);
  document.body.style.overflow = "hidden"; // Block backdrop scrolling
};

window.closeProjectModal = function() {
  const modal = document.getElementById("details-modal");
  modal.classList.remove("visible");
  setTimeout(() => modal.classList.add("hidden"), 300);
  document.body.style.overflow = "auto";
};

window.closeProjectModalOnBgClick = function(event) {
  if (event.target.id === "details-modal") {
    closeProjectModal();
  }
};

/* 8. FAQ ACCORDION TRANSITION UTILITY */
window.toggleAccordion = function(element) {
  // If clicked, toggle "open" class
  const isOpen = element.classList.contains("open");
  
  // Close all other accordions under Apple strict alignment rules
  const allAccordionItems = document.querySelectorAll(".faq-item");
  allAccordionItems.forEach(item => {
    item.classList.remove("open");
  });

  if (!isOpen) {
    element.classList.add("open");
  }
};

/* 9. CONTACT FORM DISPATCH MOCKING */
window.handleFormSubmit = function(event) {
  event.preventDefault();
  const form = document.getElementById("portfolio-contact-form");
  const successAlert = document.getElementById("form-success-alert");
  const submitBtn = document.getElementById("btn-submit-contact");

  const originalBtnText = submitBtn.innerHTML;
  submitBtn.innerHTML = 'Transmitting data... <span class="animate-pulse">●</span>';
  submitBtn.disabled = true;

  // Simulate server network latency
  setTimeout(() => {
    successAlert.classList.remove("hidden");
    submitBtn.innerHTML = "Success Processed";
    
    // Reset fields
    form.reset();
    
    setTimeout(() => {
      successAlert.classList.add("hidden");
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }, 5000);
  }, 1200);
};
