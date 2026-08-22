import type { TimelineEntry } from "./types";

// 核心数据条
export const stats = [
  { value: "237", labelKey: "stats.tasks" },
  { value: "88", labelKey: "stats.shots" },
  { value: "100k+", labelKey: "stats.docs" },
  { value: "6", labelKey: "stats.projects" },
];

// 能力证明卡片（标题/描述复用 i18n 字典键，单一数据源）
export const capabilities = [
  { titleKey: "proof.erpTitle", descKey: "proof.erp" },
  { titleKey: "proof.fullstackTitle", descKey: "proof.fullstack" },
  { titleKey: "proof.deliveryTitle", descKey: "proof.delivery" },
  { titleKey: "proof.docsTitle", descKey: "proof.docs" },
];

// 经历脉络
export const timeline: TimelineEntry[] = [
  {
    time: { zh: "2025.06 - 2026.04", en: "Jun 2025 - Apr 2026" },
    title: { zh: "商业 ERP 生产系统开发", en: "Commercial ERP production system development" },
    desc: {
      zh: "参与百万级商业管理 ERP 二次开发与维护，覆盖客户、合同、账单、报表、审批和小程序集成。",
      en: "Participated in the secondary development and maintenance of a large commercial ERP platform covering customers, contracts, billing, reports, approvals, and mini-program integrations.",
    },
  },
  {
    time: { zh: "2026.05 - 至今", en: "May 2026 - Present" },
    title: { zh: "独立产品与全栈交付", en: "Independent product and full-stack delivery" },
    desc: {
      zh: "将 ERP 经验沉淀到点餐系统、看雪论坛、蕴宇 ERP、生鲜商城、JX 高校论坛 + 跑腿与 VR 实景展厅，保留截图、源码、文档和上线证据。",
      en: "Turned ERP experience into an ordering system, Kanxue forum, YunYu ERP, Fresh Mall, JX campus forum + errand, and VR digital showroom — all with screenshots, source code, documentation, and launch evidence.",
    },
  },
  {
    time: { zh: "持续补强", en: "Ongoing" },
    title: { zh: "Corp IT / Oracle ERP 方向准备", en: "Corp IT / Oracle ERP readiness" },
    desc: {
      zh: "围绕 SQL、报表、系统集成、L1/L2 问题处理、UAT、变更记录与文档沉淀补齐岗位关键词。",
      en: "Strengthening SQL, reporting, system integration, L1/L2 troubleshooting, UAT, change records, and documentation for enterprise IT roles.",
    },
  },
];

// 联系信息
export const contact = {
  emails: [
    { label: "tearhacker@outlook.com", href: "mailto:tearhacker@outlook.com" },
  ],
  gitee: { label: "gitee.com/yunyustudio", href: "https://gitee.com/yunyustudio" },
  wechat: { qrcode: "assets/mywxchat.jpg" },
};
