import { ui, defaultLang, STORAGE_KEY } from "../i18n/ui";

type Lang = "zh" | "en";

// 切换语言是高频交互：初始化时一次性收集目标节点，apply 只遍历缓存数组，
// 避免每次切换都做 4 轮全文档 querySelectorAll。
let i18nNodes: HTMLElement[] = [];
let zhEnNodes: HTMLElement[] = [];
let altNodes: HTMLElement[] = [];
let attrNodes: HTMLElement[] = [];
let langButtons: HTMLButtonElement[] = [];

function getLang(): Lang {
  const saved =
    typeof localStorage !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
  return saved === "en" || saved === "zh" ? saved : defaultLang;
}

function apply(lang: Lang): void {
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";

  for (const el of i18nNodes) {
    const key = el.dataset.i18n!;
    el.textContent = ui[lang][key] ?? ui.zh[key] ?? key;
  }

  for (const el of zhEnNodes) {
    el.textContent = lang === "en" ? el.dataset.en! : el.dataset.zh!;
  }

  for (const el of altNodes) {
    el.setAttribute("alt", lang === "en" ? el.dataset.altEn! : el.dataset.altZh!);
  }

  for (const el of attrNodes) {
    el.dataset.i18nAttr!.split(";").forEach((pair) => {
      const [attr, key] = pair.split(":").map((part) => part.trim());
      if (attr && key) {
        el.setAttribute(attr, ui[lang][key] ?? ui.zh[key] ?? "");
      }
    });
  }

  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", ui[lang]["meta.description"] ?? "");
  document.title = ui[lang]["meta.title"] ?? document.title;

  for (const btn of langButtons) {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", String(active));
  }

  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* ignore */
  }
}

function init(): void {
  i18nNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-i18n]"));
  zhEnNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-zh][data-en]"));
  altNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-alt-zh][data-alt-en]"));
  attrNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-i18n-attr]"));
  langButtons = Array.from(document.querySelectorAll<HTMLButtonElement>(".lang-button"));

  apply(getLang());
  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => apply(btn.dataset.lang as Lang));
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
