// 公网视频播放器：点击播放后懒加载 B 站官方播放器 iframe
// 第三方公网视频（B 站等）不自行托管，直接用用户提供的公网链接播放；
// 播放/暂停/进度/全屏由 B 站原生播放器控件提供。
export function initVideoPlayer(): void {
  const frames = document.querySelectorAll<HTMLElement>("[data-video-frame]");
  frames.forEach((frame) => {
    if (frame.dataset.loaded === "1") return;
    const trigger = frame.querySelector<HTMLButtonElement>("[data-video-trigger]");
    if (!trigger) return;
    trigger.addEventListener("click", () => {
      const embed = frame.dataset.embed;
      if (!embed || frame.dataset.loaded === "1") return;
      const iframe = document.createElement("iframe");
      iframe.src = embed;
      iframe.className = "video-iframe";
      iframe.setAttribute("allow", "autoplay; encrypted-media; fullscreen; picture-in-picture");
      iframe.setAttribute("scrolling", "no");
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("allowfullscreen", "true");
      iframe.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
      iframe.setAttribute("title", trigger.getAttribute("aria-label") || "Bilibili video");
      frame.innerHTML = "";
      frame.appendChild(iframe);
      frame.dataset.loaded = "1";
    });
  });
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initVideoPlayer);
  } else {
    initVideoPlayer();
  }
}
