// 文档展示页交互：阅读进度条 + 侧栏目录滚动高亮
// 元素不存在时直接返回，不影响其他页面。
export function initDocPage(): void {
  const progress = document.getElementById("docProgress");
  const tocLinks = Array.from(
    document.querySelectorAll<HTMLAnchorElement>("[data-toc-link]")
  );
  if (!progress && tocLinks.length === 0) return;

  // 1) 阅读进度条
  if (progress) {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const ratio = max > 0 ? doc.scrollTop / max : 0;
      progress.style.width = `${Math.min(100, Math.max(0, ratio * 100))}%`;
    };
    document.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
  }

  // 2) 目录滚动高亮
  if (tocLinks.length > 0) {
    const bySlug = new Map<string, HTMLAnchorElement>();
    const targets: HTMLElement[] = [];
    tocLinks.forEach((link) => {
      const slug = link.dataset.tocLink as string;
      bySlug.set(slug, link);
      const el = document.getElementById(slug);
      if (el) targets.push(el);
    });

    const setActive = (slug: string | null) => {
      tocLinks.forEach((l) => l.classList.remove("is-active"));
      if (slug && bySlug.has(slug)) bySlug.get(slug)!.classList.add("is-active");
    };

    if (targets.length > 0 && "IntersectionObserver" in window) {
      const visible = new Set<string>();
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const id = (entry.target as HTMLElement).id;
            if (entry.isIntersecting) visible.add(id);
            else visible.delete(id);
          });
          // 取可视区间内最靠上的一个作为当前节
          let current: string | null = null;
          for (const t of targets) {
            if (visible.has(t.id)) {
              current = t.id;
              break;
            }
          }
          // 没有任何节进入可视区时，回退到已滚过的最近一节
          if (!current) {
            const scrollY = window.scrollY;
            for (let i = targets.length - 1; i >= 0; i--) {
              const top = targets[i].getBoundingClientRect().top + scrollY;
              if (top - 120 <= scrollY) {
                current = targets[i].id;
                break;
              }
            }
          }
          setActive(current);
        },
        { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
      );
      targets.forEach((t) => observer.observe(t));
    }
  }
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDocPage);
  } else {
    initDocPage();
  }
}
