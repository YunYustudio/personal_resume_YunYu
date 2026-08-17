// 粒子背景 + 樱花飘落 + 滚动入场动画（移植自原 script.js，TS 化）
const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ----------------------------- 粒子 ----------------------------- */
function initParticles(): void {
  const canvas = document.querySelector<HTMLCanvasElement>("#particleCanvas");
  if (!canvas || reduceMotion) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const pointer = { x: -9999, y: -9999 };
  const particles: {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    hue: number;
  }[] = [];
  const particleCount = Math.min(90, Math.max(42, Math.floor(window.innerWidth / 18)));

  function resize(): void {
    const ratio = window.devicePixelRatio || 1;
    canvas!.width = Math.floor(window.innerWidth * ratio);
    canvas!.height = Math.floor(window.innerHeight * ratio);
    canvas!.style.width = `${window.innerWidth}px`;
    canvas!.style.height = `${window.innerHeight}px`;
    ctx!.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function createParticles(): void {
    particles.length = 0;
    for (let i = 0; i < particleCount; i += 1) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: Math.random() * 1.8 + 0.7,
        hue: Math.random() > 0.72 ? 340 : 176,
      });
    }
  }

  function drawLine(a: (typeof particles)[number], b: (typeof particles)[number], alpha: number): void {
    ctx!.strokeStyle = `hsla(${a.hue}, 90%, 68%, ${alpha})`;
    ctx!.lineWidth = 1;
    ctx!.beginPath();
    ctx!.moveTo(a.x, a.y);
    ctx!.lineTo(b.x, b.y);
    ctx!.stroke();
  }

  function tick(): void {
    ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let i = 0; i < particles.length; i += 1) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -20) p.x = window.innerWidth + 20;
      if (p.x > window.innerWidth + 20) p.x = -20;
      if (p.y < -20) p.y = window.innerHeight + 20;
      if (p.y > window.innerHeight + 20) p.y = -20;

      const pd = Math.hypot(p.x - pointer.x, p.y - pointer.y);
      if (pd < 140) {
        p.x += (p.x - pointer.x) * 0.003;
        p.y += (p.y - pointer.y) * 0.003;
      }

      ctx!.fillStyle = `hsla(${p.hue}, 90%, 68%, 0.72)`;
      ctx!.beginPath();
      ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx!.fill();

      for (let j = i + 1; j < particles.length; j += 1) {
        const other = particles[j];
        const distance = Math.hypot(p.x - other.x, p.y - other.y);
        if (distance < 118) {
          drawLine(p, other, (1 - distance / 118) * 0.16);
        }
      }
    }
    requestAnimationFrame(tick);
  }

  window.addEventListener("resize", () => {
    resize();
    createParticles();
  });
  window.addEventListener("pointermove", (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
  });
  window.addEventListener("pointerleave", () => {
    pointer.x = -9999;
    pointer.y = -9999;
  });

  resize();
  createParticles();
  tick();
}

/* ----------------------------- 樱花 ----------------------------- */
function initSakura(): void {
  const canvas = document.querySelector<HTMLCanvasElement>("#sakuraCanvas");
  if (!canvas || reduceMotion) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const petals: {
    x: number;
    y: number;
    size: number;
    fall: number;
    drift: number;
    rotation: number;
    rotationSpeed: number;
    wobble: number;
    alpha: number;
    hue: number;
  }[] = [];
  const petalCount = Math.min(42, Math.max(18, Math.floor(window.innerWidth / 36)));
  let width = window.innerWidth;
  let height = window.innerHeight;
  let time = 0;

  function resize(): void {
    const ratio = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas!.width = Math.floor(width * ratio);
    canvas!.height = Math.floor(height * ratio);
    canvas!.style.width = `${width}px`;
    canvas!.style.height = `${height}px`;
    ctx!.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function makePetal(fromTop = false): (typeof petals)[number] {
    return {
      x: Math.random() * width,
      y: fromTop ? -40 - Math.random() * height : Math.random() * height,
      size: 7 + Math.random() * 12,
      fall: 0.45 + Math.random() * 0.9,
      drift: -0.28 + Math.random() * 0.72,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: -0.018 + Math.random() * 0.036,
      wobble: Math.random() * Math.PI * 2,
      alpha: 0.42 + Math.random() * 0.38,
      hue: Math.random() > 0.35 ? 340 : 352,
    };
  }

  function resetPetals(): void {
    petals.length = 0;
    for (let i = 0; i < petalCount; i += 1) petals.push(makePetal(false));
  }

  function drawPetal(petal: (typeof petals)[number]): void {
    ctx!.save();
    ctx!.translate(petal.x, petal.y);
    ctx!.rotate(petal.rotation);
    ctx!.scale(petal.size / 12, petal.size / 12);
    const gradient = ctx!.createRadialGradient(-2, -2, 1, 0, 0, 13);
    gradient.addColorStop(0, `hsla(${petal.hue}, 92%, 96%, ${petal.alpha})`);
    gradient.addColorStop(0.62, `hsla(${petal.hue}, 86%, 82%, ${petal.alpha * 0.86})`);
    gradient.addColorStop(1, `hsla(${petal.hue}, 78%, 67%, ${petal.alpha * 0.18})`);
    ctx!.fillStyle = gradient;
    ctx!.beginPath();
    ctx!.moveTo(0, -11);
    ctx!.bezierCurveTo(9, -9, 12, -1, 4, 10);
    ctx!.bezierCurveTo(2, 13, -2, 13, -4, 10);
    ctx!.bezierCurveTo(-12, -1, -9, -9, 0, -11);
    ctx!.closePath();
    ctx!.fill();
    ctx!.restore();
  }

  function tick(): void {
    time += 0.012;
    ctx!.clearRect(0, 0, width, height);
    petals.forEach((petal) => {
      petal.wobble += 0.018;
      petal.x += petal.drift + Math.sin(petal.wobble + time) * 0.5;
      petal.y += petal.fall;
      petal.rotation += petal.rotationSpeed;
      if (petal.y > height + 44 || petal.x < -80 || petal.x > width + 80) {
        Object.assign(petal, makePetal(true));
      }
      drawPetal(petal);
    });
    requestAnimationFrame(tick);
  }

  window.addEventListener("resize", () => {
    resize();
    resetPetals();
  });

  resize();
  resetPetals();
  tick();
}

/* ----------------------------- 滚动入场 ----------------------------- */
function initReveal(): void {
  const items = document.querySelectorAll<HTMLElement>(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );
  items.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 8, 5) * 45}ms`;
    observer.observe(item);
  });
}

function boot(): void {
  initParticles();
  initSakura();
  initReveal();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
