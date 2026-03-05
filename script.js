const dockLinks = [...document.querySelectorAll(".dock a")];
const sections = dockLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const updateActiveLink = () => {
  const offset = window.scrollY + window.innerHeight * 0.25;

  let activeId = "#top";
  for (const section of sections) {
    if (section.offsetTop <= offset) {
      activeId = `#${section.id}`;
    }
  }

  dockLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === activeId);
  });
};

const updateParallax = (event) => {
  const x = (event.clientX / window.innerWidth - 0.5) * 16;
  const y = (event.clientY / window.innerHeight - 0.5) * 16;

  document.querySelectorAll(".orb").forEach((orb, index) => {
    const drift = (index + 1) * 0.55;
    orb.style.transform = `translate(${x * drift}px, ${y * drift}px)`;
  });
};

document.getElementById("year-range").textContent = String(new Date().getFullYear());
updateActiveLink();

window.addEventListener("scroll", updateActiveLink, { passive: true });
window.addEventListener("mousemove", updateParallax, { passive: true });
