import { ui, defaultLang, STORAGE_KEY } from "../i18n/ui";

type Lang = "zh" | "en";

function getLang(): Lang {
  const saved =
    typeof localStorage !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
  return saved === "en" || saved === "zh" ? saved : defaultLang;
}

function apply(lang: Lang): void {
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";

  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n!;
    el.textContent = ui[lang][key] ?? ui.zh[key] ?? key;
  });

  document.querySelectorAll<HTMLElement>("[data-zh][data-en]").forEach((el) => {
    el.textContent = lang === "en" ? el.dataset.en! : el.dataset.zh!;
  });

  document.querySelectorAll<HTMLElement>("[data-alt-zh][data-alt-en]").forEach((el) => {
    el.setAttribute("alt", lang === "en" ? el.dataset.altEn! : el.dataset.altZh!);
  });

  document.querySelectorAll<HTMLElement>("[data-i18n-attr]").forEach((el) => {
    el.dataset.i18nAttr!.split(";").forEach((pair) => {
      const [attr, key] = pair.split(":").map((part) => part.trim());
      if (attr && key) {
        el.setAttribute(attr, ui[lang][key] ?? ui.zh[key] ?? "");
      }
    });
  });

  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", ui[lang]["meta.description"] ?? "");
  document.title = ui[lang]["meta.title"] ?? document.title;

  document.querySelectorAll<HTMLButtonElement>(".lang-button").forEach((btn) => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", String(active));
  });

  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* ignore */
  }
}

function init(): void {
  const lang = getLang();
  apply(lang);
  document.querySelectorAll<HTMLButtonElement>(".lang-button").forEach((btn) => {
    btn.addEventListener("click", () => apply(btn.dataset.lang as Lang));
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
