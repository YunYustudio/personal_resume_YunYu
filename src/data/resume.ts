import type { Localized, ResumeExperience, ResumeProjectRef } from "./types";

export const resume = {
  name: { zh: "蕴宇", en: "YunYu" },
  initials: "YY",
  role: { zh: "企业应用全栈开发者", en: "Enterprise Application Full-Stack Developer" },
  location: { zh: "江西 · 宜春", en: "Yichun, Jiangxi" },
  // 基本信息
  basics: [
    { label: { zh: "求职意向", en: "Target" }, value: { zh: "Java 全栈 / IT 应用系统 / ERP 应用开发", en: "Java Full-Stack / IT Application Systems / ERP Development" } },
    { label: { zh: "经验年限", en: "Experience" }, value: { zh: "商业 ERP 生产系统 1 年 + 独立产品交付 6 项", en: "1+ yr commercial ERP + 6 independent product deliveries" } },
    { label: { zh: "开源仓库", en: "Open-Source" }, value: { zh: "github.com/YunYustudio", en: "github.com/YunYustudio" } },
    { label: { zh: "语言", en: "Languages" }, value: { zh: "中文（母语）、English（可读写）", en: "Chinese (native), English (working)" } },
  ],
  // 个人优势
  strengths: [
    { zh: "全栈独立交付能力：熟练 Java 21 + Spring Boot 3.x 后端、uni-app / Vue3 前端与微信小程序生态，已独立交付 5 个开源项目 + 1 个 VR 数字展厅，覆盖电商、论坛、跑腿、ERP 与点餐多场景。", en: "Full-stack independent delivery: proficient in Java 21 + Spring Boot 3.x backend, uni-app / Vue3 frontend and WeChat mini-program ecosystem; delivered 5 open-source projects + 1 VR digital showroom across e-commerce, forum, errand, ERP, and ordering scenarios." },
    { zh: "微信支付 V3 资金安全：自研支付中心（支付单/退款/转账三表状态机 + RSA-SHA256 回调验签 + AES-256-GCM 解密 + 幂等三重防护 + 定时对账兜底），以 Redisson 分布式锁保障并发安全。", en: "WeChat Pay V3 fund security: self-built payment center (three-table state machine + RSA-SHA256 callback verification + AES-256-GCM decryption + triple idempotency + scheduled reconciliation), with Redisson distributed locks for concurrency safety." },
    { zh: "架构取舍与务实落地：轻量微服务三进程部署在单台 4 核 4GB 服务器，不引入 Nacos/Docker/MQ 的场景下用静态路由 + 裸 jar + systemd 实现客户可运维的方案。", en: "Architecture trade-off and practical delivery: lightweight three-process microservices on a single 4-core 4GB server; without Nacos/Docker/MQ, uses static routing + bare jar + systemd for an operator-friendly deployment." },
    { zh: "商业实战经验：参与百万级商业 ERP 二次开发 10 个月，禅道累计 237 条生产任务，覆盖客户、合同、销售、账单、财务报表与审批全链路。", en: "Commercial hands-on experience: 10 months on a million-level commercial ERP secondary development, 237 ZenTao production tasks covering customer, contract, sales, billing, finance reports, and approval workflows." },
    { zh: "工程沉淀：每个项目均产出架构设计文档、部署说明、踩坑记录与面试备战材料，累计约 10 万字技术文档，3 个项目发布 CSDN 技术博客。", en: "Engineering documentation: each project includes architecture design, deployment guides, lessons-learned, and interview-prep materials — ~100k characters total, with 3 projects featured on CSDN technical blogs." },
  ] as Localized[],
  // 技能分组
  skills: [
    {
      group: { zh: "后端", en: "Backend" },
      items: [
        { zh: "Java 21 / Spring Boot 3.x", en: "Java 21 / Spring Boot 3.x" },
        { zh: "Spring Cloud Gateway", en: "Spring Cloud Gateway" },
        { zh: "PHP / Hyperf", en: "PHP / Hyperf" },
        { zh: "MySQL 8.4", en: "MySQL 8.4" },
        { zh: "Redis 7 / Redisson", en: "Redis 7 / Redisson" },
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
        { zh: "three.js / WebGL", en: "three.js / WebGL" },
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
        { zh: "AES / RSA 加密", en: "AES / RSA Encryption" },
        { zh: "Python / DrissionPage", en: "Python / DrissionPage" },
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
        { zh: "独立交付 B2C 点餐系统、看雪校园论坛小程序、蕴宇 ERP、生鲜商城小程序、JX 高校论坛 + 校园跑腿与 VR 实景展厅，均保留上线与文档证据。", en: "Independently delivered B2C ordering, Kanxue campus forum, YunYu ERP, Fresh Mall, JX campus forum + errand, and VR digital showroom — all with launch and documentation evidence." },
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
        { zh: "主修数据结构、数据库原理、计算机网络、软件工程，具备扎实的工程基础。", en: "Focused on data structures, database principles, computer networking, and software engineering." },
        { zh: "在校期间独立完成多个课程项目，涵盖 Web 开发、数据库设计与系统建模。", en: "Completed multiple course projects independently, covering web development, database design, and system modeling." },
      ],
    },
  ],
  // 精选项目（关联作品集）
  projects: [
    { title: { zh: "服装品牌三端展示系统", en: "Apparel Brand Three-End Showcase" }, summary: { zh: "PC官网 / H5 / 小程序 + Spring Boot 后端，商用上线交付，双语数据层与 2 核 4GB 低配性能工程。", en: "PC / H5 / Mini-Program + Spring Boot backend, commercially launched, with a bilingual data layer and 2-core 4GB performance engineering." } },
    { title: { zh: "JX 蕴宇高校论坛 + 校园跑腿", en: "JX YunYu Campus Forum + Errand" }, summary: { zh: "UGC 社区 + C2C 跑腿撮合全栈小程序，三进程轻量微服务，完整接入微信支付 V3。", en: "UGC community + C2C errand matching mini-program, three-process lightweight microservices, full WeChat Pay V3 integration." } },
    { title: { zh: "B2C 微信小程序点餐系统", en: "B2C WeChat Ordering System" }, summary: { zh: "Spring Boot + Vue3 前后端分离，含 RBAC、会员、营销与报表，约 10 万字文档。", en: "Spring Boot + Vue3, with RBAC, membership, marketing, and reporting; ~100k characters of docs." } },
    { title: { zh: "看雪校园微信小程序论坛", en: "Kanxue Campus Forum" }, summary: { zh: "全栈独立交付并上线商用的校园论坛小程序。", en: "Full-stack independent forum mini-program launched commercially." } },
    { title: { zh: "生鲜商城小程序系统", en: "Fresh Mall Mini-Program" }, summary: { zh: "三端协同电商，约 84 个接口，6 天完成需求到部署全流程，完整交易闭环。", en: "Three-tier e-commerce with ~84 APIs, requirements-to-deployment in 6 days, complete transaction loop." } },
    { title: { zh: "蕴宇 ERP 管理系统", en: "YunYu ERP Management System" }, summary: { zh: "面向小型软件团队的内部管理系统，覆盖获客、合同、项目、任务、绩效与知识库。", en: "Internal management system for small software teams, covering customer acquisition, contracts, projects, tasks, performance, and knowledge base." } },
    { title: { zh: "VR 实景展厅 · PhotoSphereViewer", en: "VR Hall · PhotoSphereViewer" }, summary: { zh: "360° 全景数字展厅，19 个实景场景 + 42 个产品热点，纯前端零后端零商业 SDK。", en: "360° panoramic digital showroom, 19 real scenes + 42 product hotspots, pure front-end with zero backend and zero commercial SDK." } },
  ] as ResumeProjectRef[],
};
