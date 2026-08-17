// GitHub Pages project page 子路径处理：所有 public 资源与内部链接都需加 BASE_URL 前缀
export const BASE = import.meta.env.BASE_URL || "/";

export function withBase(path: string): string {
  if (!path) return path;
  // 已是绝对外链或 data URI 则原样返回
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;
  return BASE + path.replace(/^\/+/, "");
}

// 取双语字段中对应语言的文本
export function pick(value: { zh: string; en: string }, lang: "zh" | "en"): string {
  return value[lang] ?? value.zh;
}
