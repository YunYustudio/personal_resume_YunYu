// 画廊筛选 + 灯箱（卡片由服务端渲染，脚本做增强；无 JS 时所有卡片仍可见）
function initGallery(): void {
  const grid = document.querySelector<HTMLElement>("#galleryGrid");
  if (!grid) return;

  const filterButtons = Array.from(
    document.querySelectorAll<HTMLButtonElement>(".filter-button")
  );
  const cards = Array.from(
    grid.querySelectorAll<HTMLElement>("[data-gallery-card]")
  );

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const filter = btn.dataset.filter;
      cards.forEach((card) => {
        const match = !filter || filter === "all" || card.dataset.category === filter;
        card.style.display = match ? "" : "none";
      });
    });
  });

  // 灯箱
  const modal = document.querySelector<HTMLElement>("#imageModal");
  if (!modal) return;
  const modalEl = modal; // 闭包内 TS 无法沿用上方判空收窄，固定为非空引用
  const modalImage = modal.querySelector<HTMLImageElement>("#modalImage");
  const modalTitle = modal.querySelector<HTMLElement>("#modalTitle");
  const modalMeta = modal.querySelector<HTMLElement>("#modalMeta");
  let lastFocused: HTMLElement | null = null;

  function open(card: HTMLElement): void {
    const img = card.querySelector("img");
    const strong = card.querySelector("strong");
    const span = card.querySelector("span");
    if (!img || !modalImage || !modalTitle || !modalMeta) return;
    lastFocused = document.activeElement as HTMLElement;
    modalImage.src = img.currentSrc || img.src;
    modalImage.alt = img.alt;
    modalTitle.textContent = strong?.textContent ?? "";
    modalMeta.textContent = span?.textContent ?? "";
    modalEl.hidden = false;
    document.body.style.overflow = "hidden";
    modalEl.querySelector<HTMLButtonElement>(".modal-close")?.focus();
  }

  function close(): void {
    modalEl.hidden = true;
    if (modalImage) modalImage.src = "";
    document.body.style.overflow = "";
    lastFocused?.focus();
  }

  grid.addEventListener("click", (event) => {
    const card = (event.target as HTMLElement).closest<HTMLElement>(
      "[data-gallery-card]"
    );
    if (card) open(card);
  });

  modal.addEventListener("click", (event) => {
    if ((event.target as HTMLElement).hasAttribute("data-close-modal")) close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modalEl.hidden) close();
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGallery);
} else {
  initGallery();
}
