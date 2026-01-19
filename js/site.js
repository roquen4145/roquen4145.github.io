(() => {
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const label = document.getElementById("theme-label");
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  const applyAuto = () => {
    root.dataset.theme = prefersDark.matches ? "dark" : "light";
  };

  const setTheme = (mode) => {
    if (!label) return;
    if (mode === "auto") {
      localStorage.removeItem("theme");
      label.textContent = "Auto";
      applyAuto();
      return;
    }
    root.dataset.theme = mode;
    localStorage.setItem("theme", mode);
    label.textContent = mode === "dark" ? "Dark" : "Light";
  };

  const initTheme = () => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      setTheme(saved);
    } else {
      label.textContent = "Auto";
      applyAuto();
    }
  };

  const cycleTheme = () => {
    const order = ["auto", "light", "dark"];
    const current = localStorage.getItem("theme") || "auto";
    const idx = order.indexOf(current);
    const next = order[(idx + 1) % order.length];
    setTheme(next);
  };

  prefersDark.addEventListener("change", () => {
    if (!localStorage.getItem("theme")) {
      applyAuto();
    }
  });

  initTheme();

  if (toggle) {
    toggle.addEventListener("click", cycleTheme);
  }

  if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", () => {
      const isOpen = sidebar.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    sidebar.addEventListener("click", (e) => {
      if (e.target.tagName === "A" && sidebar.classList.contains("open")) {
        sidebar.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }
})();
