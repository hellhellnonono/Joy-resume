
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".mobile-menu-toggle");
  const menu = document.querySelector("#mobileNav");
  const languageButtons = document.querySelectorAll("[data-language]");
  const panels = document.querySelectorAll("[data-lang-panel]");
  const mobileScreen = window.matchMedia("(max-width: 768px)");

  function setLanguage(language) {
    panels.forEach(panel => {
      panel.hidden =
        mobileScreen.matches &&
        panel.dataset.langPanel !== language;
    });

    languageButtons.forEach(button => {
      const active = button.dataset.language === language;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function closeMenu() {
    menu.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "開啟選單");
  }

  menuButton.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "關閉選單" : "開啟選單"
    );
  });

  languageButtons.forEach(button => {
    button.addEventListener("click", () => {
      setLanguage(button.dataset.language);
      closeMenu();
      if (mobileScreen.matches) {
        document.querySelector("#about").scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });

  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  mobileScreen.addEventListener("change", () => {
    const selected = document.querySelector(
      ".language-switch button.is-active"
    );
    setLanguage(selected?.dataset.language || "zh");
    closeMenu();
  });

  setLanguage("zh");
});
