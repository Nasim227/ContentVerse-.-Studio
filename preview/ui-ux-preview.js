const menuButton = document.getElementById("previewMenuButton");
const mobileNav = document.getElementById("previewMobileNav");
const menuIcon = menuButton?.querySelector("i");

function closeMobileNav() {
  if (!menuButton || !mobileNav) return;

  mobileNav.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
  menuIcon?.classList.remove("fa-xmark");
  menuIcon?.classList.add("fa-bars");
}

menuButton?.addEventListener("click", () => {
  const isOpening = mobileNav.hidden;
  mobileNav.hidden = !isOpening;
  menuButton.setAttribute("aria-expanded", String(isOpening));
  menuIcon?.classList.toggle("fa-bars", !isOpening);
  menuIcon?.classList.toggle("fa-xmark", isOpening);
});

mobileNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMobileNav);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 820) closeMobileNav();
});

const projectGrid = document.getElementById("previewVideoGrid");
const viewAllButton = document.getElementById("viewAllProjects");

viewAllButton?.addEventListener("click", () => {
  const isExpanded = projectGrid?.classList.toggle("is-expanded") ?? false;
  viewAllButton.setAttribute("aria-expanded", String(isExpanded));
  viewAllButton.textContent = isExpanded
    ? "View Fewer Projects"
    : "View All Projects";
});

const videoDialog = document.getElementById("videoDialog");
const videoDialogTitle = document.getElementById("videoDialogTitle");
const videoDialogFrame = document.getElementById("videoDialogFrame");
const closeVideoDialogButton = document.getElementById("closeVideoDialog");

function clearVideoDialog() {
  if (videoDialogFrame) videoDialogFrame.replaceChildren();
  document.body.classList.remove("dialog-open");
}

function closeVideoDialog() {
  videoDialog?.close();
}

document.querySelectorAll(".video-project[data-video]").forEach((project) => {
  project.addEventListener("click", () => {
    if (!videoDialog || !videoDialogFrame || !videoDialogTitle) return;

    const iframe = document.createElement("iframe");
    const projectTitle = project.dataset.title || "ContentVerse Studio project";
    iframe.src = `https://www.youtube-nocookie.com/embed/${project.dataset.video}?autoplay=1&rel=0`;
    iframe.title = projectTitle;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;

    videoDialogTitle.textContent = projectTitle;
    videoDialogFrame.replaceChildren(iframe);
    document.body.classList.add("dialog-open");
    videoDialog.showModal();
  });
});

closeVideoDialogButton?.addEventListener("click", closeVideoDialog);

videoDialog?.addEventListener("click", (event) => {
  const bounds = videoDialog.getBoundingClientRect();
  const clickedBackdrop =
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom;

  if (clickedBackdrop) closeVideoDialog();
});

videoDialog?.addEventListener("close", clearVideoDialog);

document.getElementById("previewContactForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
});

const year = document.getElementById("previewYear");
if (year) year.textContent = new Date().getFullYear();
