import type { Localized, ResumeExperience, ResumeProjectRef } from "./types";

export const resume = {
  name: { zh: "蕴宇", en: "YunYu" },
  initials: "YY",
  role: { zh: "企业应用全栈开发者", en: "Enterprise Application Full-Stack Developer" },
  location: { zh: "中国 · 深圳", en: "Shenzhen, China" },
  // 基本信息
  basics: [
    { label: { zh: "求职意向", en: "Target" }, value: { zh: "Java 全栈 / IT 应用系统 / ERP 应用开发", en: "Java Full-Stack / IT Application Systems / ERP Development" } },
    { label: { zh: "经验年限", en: "Experience" }, value: { zh: "商业 ERP 生产系统 1 年 + 独立产品交付", en: "1+ yr commercial ERP systems + independent product delivery" } },
    { label: { zh: "语言", en: "Languages" }, value: { zh: "中文（母语）、English（可读写）", en: "Chinese (native), English (working)" } },
  ],
  // 技能分组
  skills: [
    {
      group: { zh: "后端", en: "Backend" },
      items: [
        { zh: "Java / Spring Boot", en: "Java / Spring Boot" },
        { zh: "PHP / Hyperf", en: "PHP / Hyperf" },
        { zh: "MySQL 8.0", en: "MySQL 8.0" },
        { zh: "Redis / Redisson", en: "Redis / Redisson" },
        { zh: "RabbitMQ", en: "RabbitMQ" },
        { zh: "Sa-Token / Nacos", en: "Sa-Token / Nacos" },
      ],
    },
    {
      group: { zh: "前端", en: "Frontend" },
      items: [
        { zh: "Vue3", en: "Vue3" },
        { zh: "uni-app 小程序", en: "uni-app Mini Program" },
        { zh: "微信小程序", en: "WeChat Mini Program" },
        { zh: "HTML / CSS / JS", en: "HTML / CSS / JS" },
        { zh: "Tailwind / 响应式", en: "Tailwind / Responsive" },
      ],
    },
    {
      group: { zh: "工程与交付", en: "Engineering & Delivery" },
      items: [
        { zh: "Docker 部署", en: "Docker Deployment" },
        { zh: "XXL-Job 调度", en: "XXL-Job Scheduling" },
        { zh: "微信支付 V3", en: "WeChat Pay V3" },
        { zh: "需求拆解 / 技术方案", en: "Requirement / Tech Design" },
        { zh: "禅道任务管理", en: "ZenTao Task Management" },
        { zh: "文档与 UAT", en: "Docs & UAT" },
      ],
    },
  ],
  // 工作经历
  experience: [
    {
      time: { zh: "2025.06 - 2026.04", en: "Jun 2025 - Apr 2026" },
      title: { zh: "商业管理 ERP 二次开发工程师", en: "Commercial ERP Secondary Development Engineer" },
      org: { zh: "深圳某软件公司", en: "A software company in Shenzhen" },
      points: [
        { zh: "参与百万级商业 ERP 系统二次开发，覆盖客户、合同、销售、账单、财务报表与审批。", en: "Secondary development of a large commercial ERP platform covering customers, contracts, sales, billing, finance reports, and approvals." },
        { zh: "从零补齐商户/企业入驻、合同签署、销售数据联动、财务账单打通等业务链路。", en: "Built merchant/company onboarding, e-sign contracts, sales-data linkage, and finance billing workflows." },
        { zh: "处理合同续签、付款边界、账单生成、收据打印、水电报表等生产级问题，禅道累计 237 条任务。", en: "Handled production issues (contract renewal, payment boundaries, billing, receipts, utility reports); 237 ZenTao tasks completed." },
      ],
    },
    {
      time: { zh: "2026.05 - 至今", en: "May 2026 - Present" },
      title: { zh: "独立全栈产品开发者", en: "Independent Full-Stack Product Developer" },
      org: { zh: "自有产品 / 开源项目", en: "Own products / open-source" },
      points: [
        { zh: "独立交付 B2C 点餐系统、看雪校园论坛小程序、蕴宇 ERP 与生鲜商城小程序，均保留上线与文档证据。", en: "Independently delivered B2C ordering, Kanxue campus forum, YunYu ERP, and Fresh Mall — all with launch and documentation evidence." },
        { zh: "搭建「小程序 + PC 后台 + 后端」三端协同架构，沉淀约 10 万字项目文档。", en: "Built three-tier mini-program + PC admin + backend architectures; produced ~100k characters of documentation." },
        { zh: "自研订单状态机与微信支付 V3 退款体系，以分布式锁保障并发安全。", en: "Built an idempotent order state machine and WeChat Pay V3 refund system with distributed-lock safety." },
      ],
    },
  ] as ResumeExperience[],
  // 教育
  education: [
    {
      time: { zh: "2019 - 2023", en: "2019 - 2023" },
      title: { zh: "计算机科学与技术（本科）", en: "Computer Science (B.Sc.)" },
      org: { zh: "某高校", en: "University" },
      points: [
        { zh: "主修数据结构、数据库、网络、软件工程。", en: "Focused on data structures, databases, networking, software engineering." },
      ],
    },
  ],
  // 精选项目（关联作品集）
  projects: [
    { title: { zh: "B2C 微信小程序点餐系统", en: "B2C WeChat Ordering System" }, summary: { zh: "Spring Boot + Vue3 前后端分离，含 RBAC、会员、营销与报表。", en: "Spring Boot + Vue3, with RBAC, membership, marketing, and reporting." } },
    { title: { zh: "看雪校园微信小程序论坛", en: "Kanxue Campus Forum" }, summary: { zh: "全栈独立交付并上线商用的校园论坛小程序。", en: "Full-stack independent forum mini-program launched commercially." } },
    { title: { zh: "生鲜商城小程序系统", en: "Fresh Mall Mini-Program" }, summary: { zh: "三端协同电商，约 84 个接口，完整交易闭环。", en: "Three-tier e-commerce with ~84 APIs and a complete transaction loop." } },
  ] as ResumeProjectRef[],
};
