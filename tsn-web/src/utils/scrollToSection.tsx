// src/utils/scrollToSection.ts

export type SectionKey = "home" | "services" | "resources" | "about" | "faq" | "contact";

export const NAV_OFFSET = 96; // keep same as Navbar

export function scrollToSection(id: SectionKey) {
  const el = document.getElementById(id);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}