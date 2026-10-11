document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initTables();
  initPageTransitions();
});

/**
 * Menu mobile
 */
function initMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");

    const isOpen = nav.classList.contains("open");
    toggle.setAttribute("aria-expanded", isOpen);
    toggle.textContent = isOpen ? "×" : "☰";
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.textContent = "☰";
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/**
 * Tableaux modifiables
 */
function initTables() {
  const addButtons = document.querySelectorAll(".add-row");

  addButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tableId = button.dataset.table;
      const table = document.querySelector(
        `table[data-table-id="${tableId}"]`
      );

      if (!table) return;

      const tbody = table.querySelector("tbody");
      const columnCount = table.querySelectorAll("thead th").length;
      const row = document.createElement("tr");

      for (let i = 0; i < columnCount - 1; i++) {
        const cell = document.createElement("td");
        cell.contentEditable = "true";
        cell.textContent = "";
        row.appendChild(cell);
      }

      const actionCell = document.createElement("td");
      actionCell.innerHTML = '<button class="delete-row">×</button>';
      row.appendChild(actionCell);

      tbody.appendChild(row);
      attachDeleteButton(row.querySelector(".delete-row"));
      row.querySelector("td")?.focus();
    });
  });

  document.querySelectorAll(".delete-row").forEach((button) => {
    attachDeleteButton(button);
  });
}

function attachDeleteButton(button) {
  button.addEventListener("click", () => {
    const row = button.closest("tr");

    if (row) {
      row.remove();
    }
  });
}

/**
 * Transition discrète lors des changements de pages
 */
function initPageTransitions() {
  const links = document.querySelectorAll('a[href$=".html"]');

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const destination = link.getAttribute("href");

      if (
        !destination ||
        destination.startsWith("#") ||
        link.target === "_blank"
      ) {
        return;
      }

      event.preventDefault();
      document.body.style.opacity = "0";
      document.body.style.transform = "translateY(7px)";

      setTimeout(() => {
        window.location.href = destination;
      }, 180);
    });
  });
}