const activeClasses = [
  "text-white",
  "bg-blue-700",
  "md:bg-transparent",
  "md:text-blue-700",
  "md:dark:text-blue-500",
];

document.addEventListener("DOMContentLoaded", () => {
  // --- Lógica de Scroll-Spy ---
  const sections = document.querySelectorAll(".scroll-section");
  const navLinks = document.querySelectorAll("nav a.nav-link");

  console.log("scroll-section", sections);
  console.log("nav-links", navLinks);

  const header = document.getElementById("main-header");

  const getHeaderOffset = () => {
    return header ? header.offsetHeight + 20 : 80;
  };

  const onScroll = () => {
    const scrollPos = window.scrollY;
    const headerOffset = getHeaderOffset();
    let currentSectionId = null;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      // Ajuste para el offset de la sección
      const sectionTop = section.offsetTop - headerOffset;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        currentSectionId = section.id;
        break;
      }
    }

    // Si no se encontró ninguna (estamos muy arriba), forzar a "inicio"
    // O si la primera sección está visible pero el scroll aún no la pasó completamente
    if (
      currentSectionId === null &&
      sections.length > 0 &&
      scrollPos < sections[0].offsetTop + sections[0].offsetHeight / 2
    ) {
      currentSectionId = sections[0].id;
    }

    // Actualizar los estilos de los enlaces
    navLinks.forEach((link) => {
      const linkId = link.getAttribute("href").substring(1);
      if (linkId === currentSectionId) {
        link.classList.add(...activeClasses);
      } else {
        link.classList.remove(...activeClasses);
      }
    });
  };

  window.addEventListener("scroll", onScroll);
  onScroll(); // Ejecutar al cargar la página

  // Smooth scroll para enlaces #id
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - getHeaderOffset();
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });

        // Si es un enlace del menú móvil, cerrar el menú
        if (this.dataset.closeMenu) {
          closeMobileMenu();
        }
      }
    });
  });
});
