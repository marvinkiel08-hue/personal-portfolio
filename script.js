"use strict";

const navigation = document.getElementById("primary-navigation");
const menuToggle = document.getElementById("mobile-menu-toggle");
const navigationLinks = Array.from(
  document.querySelectorAll("#primary-navigation [data-path]"),
);
const sections = Array.from(document.querySelectorAll("main section[id]"));
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function setActiveSection(sectionId) {
  navigationLinks.forEach((link) => {
    const isActive = link.dataset.path === sectionId;
    link.classList.toggle("text-primary", isActive);
    link.classList.toggle("font-bold", isActive);
    link.classList.toggle("text-on-surface-variant", !isActive);

    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function closeMobileMenu() {
  if (!navigation || !menuToggle) return;

  navigation.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  menuToggle.querySelector(".material-symbols-outlined").textContent = "menu";
}

if (navigation && menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );
    menuToggle.querySelector(".material-symbols-outlined").textContent = isOpen
      ? "close"
      : "menu";
  });

  navigation.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href").slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({
      behavior: reducedMotion.matches ? "auto" : "smooth",
      block: "start",
    });
    history.replaceState(null, "", `#${targetId}`);
    setActiveSection(targetId);
  });
});

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => second.intersectionRatio - first.intersectionRatio);
      if (visibleSections[0]) {
        setActiveSection(visibleSections[0].target.id);
      }
    },
    { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

const projectModal = document.getElementById("project-modal");
const modalTitle = document.getElementById("project-modal-title");
const modalDescription = document.getElementById("project-modal-description");
const modalTech = document.getElementById("project-modal-tech");
const projectGallery = document.getElementById("project-modal-gallery");
const galleryImage = document.getElementById("project-gallery-image");
const galleryCaption = document.getElementById("project-gallery-caption");
const galleryCounter = document.getElementById("project-gallery-counter");
const projectGalleries = {
  practifolio: [
    { src: "images/practifolio/practifolio-01-login.png", caption: "Portal sign in" },
    { src: "images/practifolio/practifolio-02-overview.png", caption: "Student dashboard" },
    { src: "images/practifolio/practifolio-03-logbook.png", caption: "Daily time record" },
    { src: "images/practifolio/practifolio-04-requirements.png", caption: "Practicum requirements" },
    { src: "images/practifolio/practifolio-05-journals.png", caption: "Weekly journals" },
    { src: "images/practifolio/practifolio-06-profile.png", caption: "Student profile" },
    { src: "images/practifolio/practifolio-07-evaluation.png", caption: "Practicum evaluation" },
    { src: "images/practifolio/practifolio-08-grades.png", caption: "Grades and document progress" },
    { src: "images/practifolio/practifolio-09-applications.png", caption: "Practicum applications" },
    { src: "images/practifolio/practifolio-10-messages.png", caption: "Messages" },
    { src: "images/practifolio/practifolio-11-directory.png", caption: "Suggested directory" },
  ],
  "jump-game": [
    { src: "images/jump-game/jump-game-01-menu.png", caption: "Level selection menu" },
    { src: "images/jump-game/jump-game-02-level-one.png", caption: "Level one gameplay" },
    { src: "images/jump-game/jump-game-03-game-over.png", caption: "Game over screen" },
    { src: "images/jump-game/jump-game-04-level-two.png", caption: "Level two gameplay" },
  ],
  taskmate: [
    { src: "images/taskmate/taskmate-01-sign-in.png", caption: "Sign-in screen" },
    { src: "images/taskmate/taskmate-02-dashboard.png", caption: "Task dashboard" },
    { src: "images/taskmate/taskmate-03-pending-filter.png", caption: "Pending task filter" },
    { src: "images/taskmate/taskmate-04-completed-filter.png", caption: "Completed task filter" },
    { src: "images/taskmate/taskmate-05-overdue-filter.png", caption: "Overdue task filter" },
    { src: "images/taskmate/taskmate-06-add-task.png", caption: "Add task form" },
    { src: "images/taskmate/taskmate-07-verse-modal.png", caption: "Verse of the day" },
    { src: "images/taskmate/taskmate-08-logout-dialog.png", caption: "Logout confirmation" },
    { src: "images/taskmate/taskmate-09-registration.png", caption: "Account registration" },
  ],
};
let activeScreenshots = [];
let activeProjectName = "";
let activeScreenshot = 0;

function showScreenshot(index) {
  if (
    !galleryImage ||
    !galleryCaption ||
    !galleryCounter ||
    activeScreenshots.length === 0
  ) {
    return;
  }

  activeScreenshot =
    (index + activeScreenshots.length) % activeScreenshots.length;
  const screenshot = activeScreenshots[activeScreenshot];
  galleryImage.src = screenshot.src;
  galleryImage.alt = `${activeProjectName} ${screenshot.caption.toLowerCase()} screenshot`;
  galleryCaption.textContent = screenshot.caption;
  galleryCounter.textContent = `${activeScreenshot + 1} / ${activeScreenshots.length}`;
}

function moveScreenshot(direction) {
  showScreenshot(activeScreenshot + direction);
}

document.querySelectorAll("[data-project-trigger]").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".group");
    const title = card?.querySelector("h3");
    const description = card?.querySelector("p.font-body-sm");
    const technologies = card?.querySelectorAll(".project-tech span");

    if (
      !projectModal ||
      !title ||
      !description ||
      !modalTitle ||
      !modalDescription ||
      !modalTech ||
      !projectGallery
    ) {
      return;
    }

    modalTitle.textContent = title.textContent.trim();
    modalDescription.textContent = description.textContent.trim();
    const galleryKey = button.dataset.projectGallery;
    activeScreenshots = projectGalleries[galleryKey] || [];
    activeProjectName = title.textContent.trim();
    projectGallery.hidden = activeScreenshots.length === 0;
    if (!projectGallery.hidden) {
      showScreenshot(0);
    }
    modalTech.replaceChildren();

    technologies?.forEach((technology) => {
      const item = document.createElement("li");
      item.className =
        "px-2.5 py-1 rounded bg-surface-container font-code-sm text-code-sm text-secondary";
      item.textContent = technology.textContent.trim();
      modalTech.append(item);
    });

    projectModal.showModal();
  });
});

projectModal?.querySelector("[data-gallery-previous]")?.addEventListener("click", () => {
  moveScreenshot(-1);
});

projectModal?.querySelector("[data-gallery-next]")?.addEventListener("click", () => {
  moveScreenshot(1);
});

projectModal?.addEventListener("keydown", (event) => {
  if (projectGallery?.hidden) return;

  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    moveScreenshot(event.key === "ArrowRight" ? 1 : -1);
  }
});

projectModal?.querySelector("[data-close-modal]")?.addEventListener("click", () => {
  projectModal.close();
});

projectModal?.addEventListener("click", (event) => {
  if (event.target === projectModal) {
    projectModal.close();
  }
});

const contactFeedback = document.getElementById("contact-feedback");
const emailAddress = document
  .getElementById("contact-email")
  ?.textContent.trim();

document.querySelector("[data-copy-email]")?.addEventListener("click", async () => {
  if (!contactFeedback || !emailAddress) return;

  if (!navigator.clipboard?.writeText) {
    contactFeedback.textContent =
      "Copy is unavailable in this browser. Select the email address to copy it.";
    return;
  }

  try {
    await navigator.clipboard.writeText(emailAddress);
    contactFeedback.textContent = "Email address copied.";
  } catch {
    contactFeedback.textContent =
      "Could not copy the email address. Select it directly to copy.";
  }
});

document.getElementById("contact-form")?.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("contact-name").value.trim();
  const senderEmail = document.getElementById("form-email").value.trim();
  const subject =
    document.getElementById("contact-subject").value.trim() ||
    "Portfolio Inquiry";
  const message = document.getElementById("contact-message").value.trim();

  if (!contactFeedback) return;

  if (!name || !senderEmail || !message) {
    contactFeedback.textContent =
      "Please enter your name, email address, and message.";
    return;
  }

  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(
    `Name: ${name}\nEmail: ${senderEmail}\n\nMessage:\n${message}`,
  );
  const composeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=marvin.kiel08@gmail.com&su=${encodedSubject}&body=${encodedBody}`;
  window.open(composeUrl, "_blank", "noopener");
  contactFeedback.textContent = "Gmail compose opened in a new tab.";
});
