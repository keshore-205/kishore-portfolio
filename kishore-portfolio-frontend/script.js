/* ============================================
   KISHORE S — Portfolio JavaScript
   ============================================ */

"use strict";

/* -------- NAVBAR SCROLL -------- */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
});

/* -------- HAMBURGER -------- */
const hamburger = document.getElementById("hamburger");
const navMobile = document.getElementById("navMobile");

hamburger.addEventListener("click", () => {
  navMobile.classList.toggle("open");
});

document.querySelectorAll(".mob-link").forEach(link => {
  link.addEventListener("click", () => navMobile.classList.remove("open"));
});

/* -------- THEME TOGGLE -------- */
const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;

const saved = localStorage.getItem("theme") || "dark";
html.setAttribute("data-theme", saved);

themeToggle.addEventListener("click", () => {
  const current = html.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

/* -------- PARTICLE CANVAS -------- */
(function initParticles() {
  const canvas = document.getElementById("particleCanvas");
  const ctx = canvas.getContext("2d");

  let W, H, particles;
  const PARTICLE_COUNT = 90;
  const MAX_DIST = 140;
  const SPEED = 0.4;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function createParticles() {
    particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      r: Math.random() * 2.5 + 1,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Connect particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.25;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(79,142,247,${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw dots
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(79,142,247,0.5)";
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", () => {
    resize();
    createParticles();
  });

  resize();
  createParticles();
  draw();
})();

/* -------- TYPING ANIMATION -------- */
(function initTyping() {
  const el = document.getElementById("typedText");
  const phrases = [
    "Software",
    "Python & ML Solutions",
    "AI-Powered Systems",
    "Full-Stack Applications",
    "Data-Driven Products",
  ];

  let pIdx = 0, cIdx = 0, deleting = false;
  const TYPING_SPEED = 80;
  const DELETE_SPEED = 45;
  const PAUSE = 1800;

  function type() {
    const current = phrases[pIdx];
    if (!deleting) {
      el.textContent = current.slice(0, cIdx + 1);
      cIdx++;
      if (cIdx === current.length) {
        deleting = true;
        setTimeout(type, PAUSE);
        return;
      }
      setTimeout(type, TYPING_SPEED);
    } else {
      el.textContent = current.slice(0, cIdx - 1);
      cIdx--;
      if (cIdx === 0) {
        deleting = false;
        pIdx = (pIdx + 1) % phrases.length;
      }
      setTimeout(type, DELETE_SPEED);
    }
  }

  setTimeout(type, 500);
})();

/* -------- SCROLL REVEAL -------- */
(function initReveal() {
  const items = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // stagger children of same parent
          const siblings = entry.target.parentElement.querySelectorAll(".reveal");
          let delay = 0;
          siblings.forEach((s, idx) => {
            if (s === entry.target) delay = idx * 80;
          });
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach(el => observer.observe(el));
})();

/* -------- SKILL BAR ANIMATION -------- */
(function initSkillBars() {
  const bars = document.querySelectorAll(".bar-fill");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const w = entry.target.getAttribute("data-w");
        entry.target.style.width = w + "%";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  bars.forEach(b => observer.observe(b));
})();

/* -------- CONTACT FORM -------- */
/* -------- CONTACT FORM — EmailJS -------- */
(function initForm() {

  emailjs.init("kmdhQC2zOalPoi1vW"); // 🔴 Replace with your Public Key

  const EMAILJS_SERVICE_ID  = "service_2asvmc4";   // 🔴 Replace with your Service ID
  const EMAILJS_TEMPLATE_ID = "template_fz1f2qs";  // 🔴 Replace with your Template ID

  const form       = document.getElementById("contactForm");
  const btnText    = document.getElementById("btnText");
  const btnSpinner = document.getElementById("btnSpinner");
  const submitBtn  = document.getElementById("submitBtn");
  const success    = document.getElementById("formSuccess");
  const error      = document.getElementById("formError");

  form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const phone   = form.phone.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      alert("Please fill in Name, Email and Message.");
      return;
    }

    // Show loading
    btnText.style.display    = "none";
    btnSpinner.style.display = "inline";
    submitBtn.disabled = true;
    success.classList.remove("visible");
    error.classList.remove("visible");

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name:  name,
        from_email: email,
        phone:      phone || "Not provided",
        message:    message,
        reply_to:   email,
      });

      form.reset();
      success.classList.add("visible");
      setTimeout(() => success.classList.remove("visible"), 5000);

    } catch (err) {
      console.error("EmailJS error:", err);
      const errMsg = err?.text || err?.message || JSON.stringify(err);
      error.textContent = "✗ Error: " + errMsg;
      error.classList.add("visible");
      setTimeout(() => { error.classList.remove("visible"); error.textContent = "✗ Something went wrong. Please try again."; }, 15000);
    }

    // Reset button
    btnText.style.display    = "inline";
    btnSpinner.style.display = "none";
    submitBtn.disabled = false;
  });

})();
/* -------- SMOOTH ANCHOR HIGHLIGHT -------- */
(function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(sec => {
      const top = sec.offsetTop - 90;
      if (window.scrollY >= top) current = sec.getAttribute("id");
    });
    links.forEach(a => {
      a.style.color = "";
      if (a.getAttribute("href") === "#" + current) {
        a.style.color = "var(--accent1)";
      }
    });
  });
})();

/* -------- CURSOR GLOW (desktop only) -------- */
(function initCursorGlow() {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const glow = document.createElement("div");
  glow.style.cssText = `
    position: fixed;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(79,142,247,0.06) 0%, transparent 70%);
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: 9998;
    transition: opacity 0.3s;
  `;
  document.body.appendChild(glow);

  let mx = -999, my = -999;
  document.addEventListener("mousemove", e => {
    mx = e.clientX; my = e.clientY;
    glow.style.left = mx + "px";
    glow.style.top = my + "px";
  });
})();
