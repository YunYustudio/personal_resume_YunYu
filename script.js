const translations = {
  zh: {
    "meta.title": "刘峰宇 | Java 全栈与 ERP 应用作品集",
    "meta.description": "刘峰宇的在线作品集：Java 全栈、ERP 应用开发、微信小程序、Corp IT 应用系统。",
    "person.name": "刘峰宇",
    "nav.skip": "跳到主要内容",
    "nav.homeAria": "返回首页",
    "nav.aria": "主导航",
    "nav.proof": "能力证明",
    "nav.projects": "项目案例",
    "nav.gallery": "截图画廊",
    "nav.contact": "联系",
    "hero.eyebrow": "Full-Stack Software Developer | ERP Applications | Corp IT",
    "hero.title": "Java 全栈开发工程师 / ERP 应用开发 / 企业内部系统交付",
    "hero.lead": "2025 届软件工程本科，做过真实商业 ERP 二次开发，也能独立把微信小程序、后台管理、文档、部署和上线交付跑通。",
    "hero.actionsAria": "主要操作",
    "hero.ctaProjects": "查看项目案例",
    "hero.ctaGitee": "Gitee 主页",
    "hero.ctaEmail": "邮件联系",
    "hero.signalsAria": "职业亮点",
    "hero.signal1": "生产级 ERP",
    "hero.signal2": "全栈独立交付",
    "hero.signal3": "小程序上线",
    "hero.mediaAria": "项目截图预览",
    "hero.desktopCaption": "B2C 点餐系统 - 老板视图",
    "stats.aria": "核心数据",
    "stats.tasks": "禅道任务记录",
    "stats.shots": "项目截图素材",
    "stats.docs": "项目文档字数",
    "stats.projects": "离职后独立项目",
    "proof.eyebrow": "Capability Proof",
    "proof.title": "把业务流程拆成可交付系统",
    "proof.lead": "强项不是只做页面或接口，而是把客户、合同、销售、账单、报表、审批、小程序和文档沉淀串成一个可维护的业务闭环。",
    "proof.erp": "客户、合同、销售、账单、财务报表、审批、水电表、商户入驻、收据打印等真实业务模块。",
    "proof.fullstackTitle": "全栈工程",
    "proof.fullstack": "Java、Spring Boot、Vue3、PHP、Hyperf、RESTful API、微信小程序和后台管理页面。",
    "proof.deliveryTitle": "中间件与交付",
    "proof.delivery": "MySQL、Redis、RabbitMQ、Nacos、XXL-Job、Docker、接口联调、日志排查、生产问题修复。",
    "proof.docsTitle": "文档与协作",
    "proof.docs": "需求分析、技术方案、部署说明、操作文档、禅道任务管理、跨职能沟通和问题定位。",
    "projects.eyebrow": "Selected Work",
    "projects.title": "项目案例",
    "projects.lead": "每个项目都保留了真实截图，重点展示业务理解、系统范围和交付证据。",
    "p1.kicker": "个人开源项目 | 2026.05 - 2026.07",
    "p1.title": "B2C 微信小程序点餐系统",
    "p1.desc": "面向个体餐饮商户的前后端分离点餐系统，覆盖小程序点餐、后台管理、订单流转、前台/后厨协同、语音播报、会员、营销、支付、报表和运维文档。",
    "p1.b1": "Spring Boot + Vue3 + RabbitMQ + Redis，支持订单状态流转和业务消息处理。",
    "p1.b2": "沉淀约 10 万字文档，包含部署、功能说明、销售材料和运维维护说明。",
    "p1.b3": "具备完整商业化模块：RBAC、会员分析、老板视图、毛利报表、积分商城、优惠券和活动营销。",
    "p1.link1": "Gitee 源码",
    "p1.link2": "Bilibili 演示",
    "p2.kicker": "商业上线项目 | 2026.05",
    "p2.title": "看雪校园微信小程序论坛系统",
    "p2.desc": "独立完成全栈微信小程序论坛系统，负责需求拆解、数据结构设计、接口开发、前端页面、上线交付和维护。项目已通过“看雪校园”小程序入口上线商用。",
    "p2.b1": "小程序端覆盖登录、首页信息流、帖子详情、个人中心和校园服务入口。",
    "p2.b2": "业务细节因商业属性不公开，作品集保留可展示的端侧页面证据。",
    "p2.b3": "交付链路包含从需求到上线后的维护，不停在 Demo 层面。",
    "p2.link": "项目介绍",
    "p3.kicker": "个人 ERP 产品 | 2026.06",
    "p3.title": "蕴宇软件公司 ERP 管理系统",
    "p3.desc": "为一人软件公司或小型工作室设计的内部管理系统，目标是把获客、客户、合同、销售、项目、任务、绩效、知识库和收支管理流程系统化。",
    "p3.b1": "模块覆盖公司、员工、绩效、客户、服务商、财务、销售、项目、任务和知识库。",
    "p3.b2": "后台页面包含登录、客户管理、合同展示、项目管理、任务关联和知识库空间。",
    "p3.b3": "用流程化系统减少手工管理成本，提高小团队经营效率。",
    "p3.link": "开放文档",
    "p4.kicker": "企业 ERP 二次开发 | 2025.06 - 2026.04",
    "p4.title": "商业管理 ERP 与生产任务证据",
    "p4.desc": "在深圳软件公司参与百万级商业管理 ERP 系统二次开发与维护，负责客户、合同、销售、账单、财务报表、审批和多个小程序业务模块。",
    "p4.b1": "从零补齐商户/企业入驻、合同签署、销售数据联动、财务账单打通等业务链路。",
    "p4.b2": "处理合同续签、付款日期边界、账单生成、收据打印、水电报表、审批通知等生产级问题。",
    "p4.b3": "禅道累计完成任务 237 条，截图保留了任务数量、任务列表和具体问题记录。",
    "tag.wechat": "微信小程序",
    "tag.fullstackDelivery": "全栈交付",
    "tag.commercial": "上线商用",
    "tag.requirement": "需求拆解",
    "tag.admin": "管理后台",
    "tag.projectManagement": "项目管理",
    "tag.knowledge": "知识库",
    "tag.contract": "合同管理",
    "gallery.eyebrow": "Gallery",
    "gallery.title": "截图画廊",
    "gallery.lead": "按项目筛选，也可以点击任意截图查看大图。",
    "gallery.filterAria": "截图筛选",
    "gallery.viewLarge": "查看大图：",
    "filter.all": "全部",
    "filter.ordering": "点餐系统",
    "filter.forum": "论坛小程序",
    "filter.erp": "个人 ERP",
    "filter.work": "工作证据",
    "timeline.eyebrow": "Timeline",
    "timeline.title": "经历脉络",
    "timeline.lead": "从商业 ERP 到个人产品，主线始终是把业务系统跑通、交付、维护，再把经验沉淀成文档和可复用项目。",
    "timeline.t1": "软件工程本科毕业",
    "timeline.d1": "南昌大学共青学院，2025 届。",
    "timeline.t2": "深圳软件公司 ERP / 全栈开发",
    "timeline.d2": "参与商业管理 ERP 二次开发与维护，累计完成 237 条禅道任务。",
    "timeline.t3": "个人自研与独立交付",
    "timeline.d3": "完成点餐系统、论坛小程序和个人 ERP，持续补强 Corp IT / Oracle ERP 方向。",
    "contact.eyebrow": "Contact",
    "contact.title": "面向 Software Developer / IT Application System Engineer / ERP 应用开发",
    "contact.lead": "适合需要全栈开发、内部应用支持、ERP 周边开发、SQL 排查、流程自动化、文档沉淀和跨职能沟通的岗位。",
    "footer.copy": "© 2026 刘峰宇",
    "modal.closeAria": "关闭大图",
    "alt.orderingBoss": "点餐系统老板视图数据看板",
    "alt.forumList": "看雪校园论坛小程序帖子列表",
    "alt.orderingMini": "点餐小程序商品列表页面",
    "alt.memberAnalytics": "会员分析后台页面",
    "alt.architecture": "面享点餐系统架构图",
    "alt.forumLogin": "看雪校园登录页",
    "alt.forumDetail": "看雪校园帖子详情",
    "alt.erpLogin": "蕴宇 ERP 登录页",
    "alt.erpProject": "蕴宇 ERP 项目管理页面",
    "alt.zentaoStats": "禅道完成任务数量统计",
    "alt.zentaoTask": "禅道具体任务截图"
  },
  en: {
    "meta.title": "Liu Fengyu | Full-Stack and ERP Application Portfolio",
    "meta.description": "Liu Fengyu's portfolio: full-stack software development, ERP applications, WeChat mini-programs, and Corp IT application delivery.",
    "person.name": "Liu Fengyu",
    "nav.skip": "Skip to main content",
    "nav.homeAria": "Back to home",
    "nav.aria": "Primary navigation",
    "nav.proof": "Proof",
    "nav.projects": "Projects",
    "nav.gallery": "Gallery",
    "nav.contact": "Contact",
    "hero.eyebrow": "Full-Stack Software Developer | ERP Applications | Corp IT",
    "hero.title": "Java Full-Stack Developer / ERP Application Developer / Internal Business Systems",
    "hero.lead": "Software Engineering graduate from the class of 2025, with hands-on commercial ERP development experience and the ability to independently deliver mini-programs, admin systems, documentation, deployment, and launch-ready workflows.",
    "hero.actionsAria": "Primary actions",
    "hero.ctaProjects": "View Projects",
    "hero.ctaGitee": "Gitee Profile",
    "hero.ctaEmail": "Email Me",
    "hero.signalsAria": "Professional highlights",
    "hero.signal1": "Production ERP",
    "hero.signal2": "Full-stack Delivery",
    "hero.signal3": "Mini Program Launch",
    "hero.mediaAria": "Project screenshots preview",
    "hero.desktopCaption": "B2C Ordering System - Owner Dashboard",
    "stats.aria": "Key metrics",
    "stats.tasks": "ZenTao task records",
    "stats.shots": "project screenshots",
    "stats.docs": "documentation characters",
    "stats.projects": "independent projects after layoff",
    "proof.eyebrow": "Capability Proof",
    "proof.title": "Turning business workflows into deliverable systems",
    "proof.lead": "My strength is not only building pages or APIs. I connect customers, contracts, sales, billing, reports, approvals, mini-programs, and documentation into maintainable business workflows.",
    "proof.erp": "Real business modules including customer, contract, sales, billing, finance-related reporting, approvals, utility-meter workflows, merchant onboarding, and receipt printing.",
    "proof.fullstackTitle": "Full-Stack Engineering",
    "proof.fullstack": "Java, Spring Boot, Vue3, PHP, Hyperf, RESTful APIs, WeChat Mini Program, and business admin interfaces.",
    "proof.deliveryTitle": "Middleware and Delivery",
    "proof.delivery": "MySQL, Redis, RabbitMQ, Nacos, XXL-Job, Docker, API integration, log analysis, and production issue fixing.",
    "proof.docsTitle": "Documentation and Collaboration",
    "proof.docs": "Requirement analysis, technical design, deployment notes, user guides, ZenTao task management, cross-functional communication, and troubleshooting.",
    "projects.eyebrow": "Selected Work",
    "projects.title": "Project Cases",
    "projects.lead": "Each project includes real screenshots and focuses on business understanding, system scope, and delivery evidence.",
    "p1.kicker": "Independent open-source project | May 2026 - Jul 2026",
    "p1.title": "B2C WeChat Mini-Program Ordering System",
    "p1.desc": "A front-end/back-end separated ordering system for small restaurant operations, covering mini-program ordering, admin management, order workflow, front-kitchen/back-kitchen coordination, voice broadcasting, membership, marketing, payment, reporting, and operations documentation.",
    "p1.b1": "Built with Spring Boot + Vue3 + RabbitMQ + Redis to support order status transitions and business messaging.",
    "p1.b2": "Produced around 100,000 Chinese characters of documentation, including deployment, feature notes, sales materials, and operations guides.",
    "p1.b3": "Includes commercial modules such as RBAC, member analytics, owner dashboard, gross-profit reports, points mall, coupons, and marketing campaigns.",
    "p1.link1": "Gitee Source",
    "p1.link2": "Bilibili Demo",
    "p2.kicker": "Commercial launched project | May 2026",
    "p2.title": "Kanxue Campus WeChat Mini-Program Forum",
    "p2.desc": "Independently delivered a full-stack WeChat Mini-Program forum system, covering requirement breakdown, data structure design, API development, front-end pages, launch delivery, and maintenance. The project has been commercially launched through the Kanxue Campus mini-program entry.",
    "p2.b1": "The mini-program covers login, home feed, post detail, personal center, and campus service entry points.",
    "p2.b2": "Detailed business information is not publicly disclosed due to commercial confidentiality; the portfolio keeps displayable page evidence.",
    "p2.b3": "The delivery chain covers requirement analysis, launch, and post-launch maintenance, not just a demo.",
    "p2.link": "Project Page",
    "p3.kicker": "Personal ERP product | Jun 2026",
    "p3.title": "Yunyu Software Company ERP Management System",
    "p3.desc": "An internal management system for one-person software companies or small studios, designed to systematize customer acquisition, customers, contracts, sales, projects, tasks, performance, knowledge base, and income/expense workflows.",
    "p3.b1": "Modules cover company, employees, performance, customers, service providers, finance, sales, projects, tasks, and knowledge base.",
    "p3.b2": "Admin pages include login, customer management, contract display, project management, task association, and knowledge-base space.",
    "p3.b3": "The workflow-oriented design reduces manual management overhead and improves small-team operation efficiency.",
    "p3.link": "Documentation",
    "p4.kicker": "Enterprise ERP secondary development | Jun 2025 - Apr 2026",
    "p4.title": "Commercial ERP and Production Task Evidence",
    "p4.desc": "Participated in the secondary development and maintenance of a large commercial ERP platform in a Shenzhen software company, working on customer, contract, sales, billing, finance-related reports, approvals, and mini-program business modules.",
    "p4.b1": "Built and improved merchant/company onboarding, contract signing, sales-data linkage, and finance billing workflows.",
    "p4.b2": "Handled production issues involving contract renewal, payment-date boundaries, billing generation, receipt printing, utility reports, and approval notifications.",
    "p4.b3": "Completed 237 ZenTao tasks, with screenshot evidence of task counts, lists, and concrete issue records.",
    "tag.wechat": "WeChat Mini Program",
    "tag.fullstackDelivery": "Full-stack Delivery",
    "tag.commercial": "Commercial Launch",
    "tag.requirement": "Requirement Breakdown",
    "tag.admin": "Admin System",
    "tag.projectManagement": "Project Management",
    "tag.knowledge": "Knowledge Base",
    "tag.contract": "Contract Management",
    "gallery.eyebrow": "Gallery",
    "gallery.title": "Screenshot Gallery",
    "gallery.lead": "Filter by project or click any screenshot to inspect it in a larger view.",
    "gallery.filterAria": "Screenshot filters",
    "gallery.viewLarge": "View large image: ",
    "filter.all": "All",
    "filter.ordering": "Ordering",
    "filter.forum": "Forum Mini Program",
    "filter.erp": "Personal ERP",
    "filter.work": "Work Evidence",
    "timeline.eyebrow": "Timeline",
    "timeline.title": "Career Timeline",
    "timeline.lead": "From commercial ERP to personal products, the core thread is delivering, maintaining, and documenting real business systems.",
    "timeline.t1": "Bachelor's degree in Software Engineering",
    "timeline.d1": "Nanchang University Gongqing College, class of 2025.",
    "timeline.t2": "ERP / Full-Stack Developer in Shenzhen",
    "timeline.d2": "Participated in commercial ERP secondary development and maintenance, completing 237 ZenTao tasks.",
    "timeline.t3": "Self-developed and independently delivered projects",
    "timeline.d3": "Built an ordering system, forum mini-program, and personal ERP while strengthening Corp IT / Oracle ERP knowledge.",
    "contact.eyebrow": "Contact",
    "contact.title": "Targeting Software Developer / IT Application System Engineer / ERP Application roles",
    "contact.lead": "A good fit for roles involving full-stack development, internal application support, ERP-adjacent development, SQL troubleshooting, workflow automation, documentation, and cross-functional communication.",
    "footer.copy": "© 2026 Liu Fengyu",
    "modal.closeAria": "Close large image",
    "alt.orderingBoss": "Owner dashboard of the ordering system",
    "alt.forumList": "Post list page of the Kanxue Campus mini-program",
    "alt.orderingMini": "Product list page of the ordering mini-program",
    "alt.memberAnalytics": "Member analytics admin page",
    "alt.architecture": "Architecture diagram of the ordering system",
    "alt.forumLogin": "Login page of Kanxue Campus",
    "alt.forumDetail": "Post detail page of Kanxue Campus",
    "alt.erpLogin": "Login page of Yunyu ERP",
    "alt.erpProject": "Project management page of Yunyu ERP",
    "alt.zentaoStats": "ZenTao completed task count statistics",
    "alt.zentaoTask": "Specific ZenTao task screenshot"
  }
};

const galleryItems = [
  { category: "ordering", project: { zh: "B2C 点餐系统", en: "B2C Ordering System" }, title: { zh: "DIY 装修小程序首页", en: "DIY Mini-Program Home" }, src: "assets/images/ordering/ordering-01.webp", shape: "phone" },
  { category: "ordering", project: { zh: "B2C 点餐系统", en: "B2C Ordering System" }, title: { zh: "RBAC 角色控制", en: "RBAC Role Control" }, src: "assets/images/ordering/ordering-02.webp" },
  { category: "ordering", project: { zh: "B2C 点餐系统", en: "B2C Ordering System" }, title: { zh: "会员分析", en: "Member Analytics" }, src: "assets/images/ordering/ordering-03.webp" },
  { category: "ordering", project: { zh: "B2C 点餐系统", en: "B2C Ordering System" }, title: { zh: "会员系统小程序", en: "Membership Mini Program" }, src: "assets/images/ordering/ordering-04.webp", shape: "phone" },
  { category: "ordering", project: { zh: "B2C 点餐系统", en: "B2C Ordering System" }, title: { zh: "开源文档说明", en: "Open-Source Documentation" }, src: "assets/images/ordering/ordering-05.webp" },
  { category: "ordering", project: { zh: "B2C 点餐系统", en: "B2C Ordering System" }, title: { zh: "支付对接", en: "Payment Integration" }, src: "assets/images/ordering/ordering-06.webp" },
  { category: "ordering", project: { zh: "B2C 点餐系统", en: "B2C Ordering System" }, title: { zh: "毛利报表", en: "Gross-Profit Report" }, src: "assets/images/ordering/ordering-07.webp" },
  { category: "ordering", project: { zh: "B2C 点餐系统", en: "B2C Ordering System" }, title: { zh: "活动营销", en: "Campaign Marketing" }, src: "assets/images/ordering/ordering-08.webp" },
  { category: "ordering", project: { zh: "B2C 点餐系统", en: "B2C Ordering System" }, title: { zh: "点餐小程序展示", en: "Ordering Mini-Program UI" }, src: "assets/images/ordering/ordering-09.webp", shape: "phone" },
  { category: "ordering", project: { zh: "B2C 点餐系统", en: "B2C Ordering System" }, title: { zh: "积分与优惠券说明", en: "Points and Coupon Flow" }, src: "assets/images/ordering/ordering-10.webp", shape: "phone" },
  { category: "ordering", project: { zh: "B2C 点餐系统", en: "B2C Ordering System" }, title: { zh: "积分商城页面", en: "Points Mall Page" }, src: "assets/images/ordering/ordering-11.webp", shape: "phone" },
  { category: "ordering", project: { zh: "B2C 点餐系统", en: "B2C Ordering System" }, title: { zh: "老板视图", en: "Owner Dashboard" }, src: "assets/images/ordering/ordering-12.webp" },
  { category: "ordering", project: { zh: "B2C 点餐系统", en: "B2C Ordering System" }, title: { zh: "软件销售功能介绍", en: "Sales Feature Document" }, src: "assets/images/ordering/ordering-13.webp" },
  { category: "ordering", project: { zh: "B2C 点餐系统", en: "B2C Ordering System" }, title: { zh: "运维维护文档", en: "Operations Guide" }, src: "assets/images/ordering/ordering-14.webp" },
  { category: "ordering", project: { zh: "B2C 点餐系统", en: "B2C Ordering System" }, title: { zh: "系统架构图", en: "System Architecture" }, src: "assets/images/ordering/ordering-15.webp" },
  { category: "work-evidence", project: { zh: "工作经验记录", en: "Work Evidence" }, title: { zh: "完成任务数量", en: "Completed Task Count" }, src: "assets/images/work-evidence/work-evidence-01.webp" },
  { category: "work-evidence", project: { zh: "工作经验记录", en: "Work Evidence" }, title: { zh: "最高任务量记录", en: "Peak Task Volume" }, src: "assets/images/work-evidence/work-evidence-02.webp" },
  { category: "work-evidence", project: { zh: "工作经验记录", en: "Work Evidence" }, title: { zh: "禅道任务列表", en: "ZenTao Task List" }, src: "assets/images/work-evidence/work-evidence-03.webp" },
  { category: "work-evidence", project: { zh: "工作经验记录", en: "Work Evidence" }, title: { zh: "禅道任务详情", en: "ZenTao Task Detail" }, src: "assets/images/work-evidence/work-evidence-04.webp" },
  { category: "work-evidence", project: { zh: "工作经验记录", en: "Work Evidence" }, title: { zh: "精准任务证据", en: "Concrete Task Evidence" }, src: "assets/images/work-evidence/work-evidence-05.webp" },
  { category: "forum", project: { zh: "看雪校园论坛", en: "Kanxue Campus Forum" }, title: { zh: "服务选择页", en: "Service Selection Page" }, src: "assets/images/forum/forum-01.webp", shape: "phone" },
  { category: "forum", project: { zh: "看雪校园论坛", en: "Kanxue Campus Forum" }, title: { zh: "校园服务入口", en: "Campus Service Entry" }, src: "assets/images/forum/forum-02.webp", shape: "phone" },
  { category: "forum", project: { zh: "看雪校园论坛", en: "Kanxue Campus Forum" }, title: { zh: "登录页面", en: "Login Page" }, src: "assets/images/forum/forum-03.webp", shape: "phone" },
  { category: "forum", project: { zh: "看雪校园论坛", en: "Kanxue Campus Forum" }, title: { zh: "订单/跑腿页面", en: "Order / Errand Page" }, src: "assets/images/forum/forum-04.webp", shape: "phone" },
  { category: "forum", project: { zh: "看雪校园论坛", en: "Kanxue Campus Forum" }, title: { zh: "个人中心", en: "Personal Center" }, src: "assets/images/forum/forum-05.webp", shape: "phone" },
  { category: "forum", project: { zh: "看雪校园论坛", en: "Kanxue Campus Forum" }, title: { zh: "帖子详情", en: "Post Detail" }, src: "assets/images/forum/forum-06.webp", shape: "phone" },
  { category: "forum", project: { zh: "看雪校园论坛", en: "Kanxue Campus Forum" }, title: { zh: "帖子列表", en: "Post List" }, src: "assets/images/forum/forum-07.webp", shape: "phone" },
  { category: "yunyu-erp", project: { zh: "蕴宇 ERP", en: "Yunyu ERP" }, title: { zh: "人事绩效薪资统计", en: "HR Performance and Salary Statistics" }, src: "assets/images/yunyu-erp/yunyu-erp-01.webp" },
  { category: "yunyu-erp", project: { zh: "蕴宇 ERP", en: "Yunyu ERP" }, title: { zh: "合同展示列表", en: "Contract List" }, src: "assets/images/yunyu-erp/yunyu-erp-02.webp" },
  { category: "yunyu-erp", project: { zh: "蕴宇 ERP", en: "Yunyu ERP" }, title: { zh: "合同详情展示", en: "Contract Detail" }, src: "assets/images/yunyu-erp/yunyu-erp-03.webp" },
  { category: "yunyu-erp", project: { zh: "蕴宇 ERP", en: "Yunyu ERP" }, title: { zh: "客户管理模块", en: "Customer Management Module" }, src: "assets/images/yunyu-erp/yunyu-erp-04.webp" },
  { category: "yunyu-erp", project: { zh: "蕴宇 ERP", en: "Yunyu ERP" }, title: { zh: "登录页", en: "Login Page" }, src: "assets/images/yunyu-erp/yunyu-erp-05.webp" },
  { category: "yunyu-erp", project: { zh: "蕴宇 ERP", en: "Yunyu ERP" }, title: { zh: "知识库空间", en: "Knowledge-Base Space" }, src: "assets/images/yunyu-erp/yunyu-erp-06.webp" },
  { category: "yunyu-erp", project: { zh: "蕴宇 ERP", en: "Yunyu ERP" }, title: { zh: "项目关联任务管理", en: "Project-Task Association" }, src: "assets/images/yunyu-erp/yunyu-erp-07.webp" },
  { category: "yunyu-erp", project: { zh: "蕴宇 ERP", en: "Yunyu ERP" }, title: { zh: "项目管理", en: "Project Management" }, src: "assets/images/yunyu-erp/yunyu-erp-08.webp" }
];

const galleryGrid = document.querySelector("#galleryGrid");
const filterButtons = document.querySelectorAll(".filter-button");
const langButtons = document.querySelectorAll(".lang-button");
const modal = document.querySelector("#imageModal");
const modalImage = document.querySelector("#modalImage");
const modalTitle = document.querySelector("#modalTitle");
const modalMeta = document.querySelector("#modalMeta");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let lastFocusedElement = null;
let currentFilter = "all";
let currentLang = localStorage.getItem("portfolio-language") || "zh";

function t(key) {
  return translations[currentLang][key] || translations.zh[key] || key;
}

function localized(value) {
  return typeof value === "string" ? value : value[currentLang] || value.zh;
}

function applyTranslations() {
  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
  document.title = t("meta.title");

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
    element.dataset.i18nAttr.split(";").forEach((pair) => {
      const [attr, key] = pair.split(":").map((part) => part.trim());
      if (attr && key) {
        element.setAttribute(attr, t(key));
      }
    });
  });

  langButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === currentLang);
    button.setAttribute("aria-pressed", String(button.dataset.lang === currentLang));
  });

  renderGallery(currentFilter);
}

function renderGallery(filter = "all") {
  currentFilter = filter;
  const visibleItems = filter === "all" ? galleryItems : galleryItems.filter((item) => item.category === filter);
  galleryGrid.innerHTML = visibleItems
    .map((item, index) => {
      const title = localized(item.title);
      const project = localized(item.project);
      return `
        <article class="gallery-card reveal is-visible">
          <button type="button" data-gallery-index="${galleryItems.indexOf(item)}" aria-label="${t("gallery.viewLarge")}${title}">
            <span class="gallery-image-wrap ${item.shape === "phone" ? "phone" : ""}">
              <img src="${item.src}" alt="${project} - ${title}" loading="${index < 4 ? "eager" : "lazy"}" />
            </span>
            <span class="gallery-caption">
              <strong>${title}</strong>
              <span>${project}</span>
            </span>
          </button>
        </article>
      `;
    })
    .join("");
}

function openModal(item) {
  const title = localized(item.title);
  const project = localized(item.project);
  lastFocusedElement = document.activeElement;
  modalImage.src = item.src;
  modalImage.alt = `${project} - ${title}`;
  modalTitle.textContent = title;
  modalMeta.textContent = project;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  modal.querySelector(".modal-close").focus();
}

function closeModal() {
  modal.hidden = true;
  modalImage.src = "";
  document.body.style.overflow = "";
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

function initLanguageSwitch() {
  langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentLang = button.dataset.lang;
      localStorage.setItem("portfolio-language", currentLang);
      applyTranslations();
    });
  });
}

function initFilters() {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      renderGallery(button.dataset.filter);
    });
  });
}

function initModal() {
  galleryGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-gallery-index]");
    if (!button) {
      return;
    }
    const item = galleryItems[Number(button.dataset.galleryIndex)];
    openModal(item);
  });

  modal.addEventListener("click", (event) => {
    if (event.target.matches("[data-close-modal]")) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");
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

function initParticles() {
  const canvas = document.querySelector("#particleCanvas");
  if (!canvas || reduceMotion) {
    return;
  }
  const ctx = canvas.getContext("2d");
  const pointer = { x: -9999, y: -9999 };
  const particles = [];
  const particleCount = Math.min(90, Math.max(42, Math.floor(window.innerWidth / 18)));

  function resize() {
    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.floor(window.innerWidth * ratio);
    canvas.height = Math.floor(window.innerHeight * ratio);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function createParticles() {
    particles.length = 0;
    for (let i = 0; i < particleCount; i += 1) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: Math.random() * 1.8 + 0.7,
        hue: Math.random() > 0.72 ? 340 : 176
      });
    }
  }

  function drawLine(a, b, alpha) {
    ctx.strokeStyle = `hsla(${a.hue}, 90%, 68%, ${alpha})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  function tick() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let i = 0; i < particles.length; i += 1) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -20) p.x = window.innerWidth + 20;
      if (p.x > window.innerWidth + 20) p.x = -20;
      if (p.y < -20) p.y = window.innerHeight + 20;
      if (p.y > window.innerHeight + 20) p.y = -20;

      const pointerDistance = Math.hypot(p.x - pointer.x, p.y - pointer.y);
      if (pointerDistance < 140) {
        p.x += (p.x - pointer.x) * 0.003;
        p.y += (p.y - pointer.y) * 0.003;
      }

      ctx.fillStyle = `hsla(${p.hue}, 90%, 68%, 0.72)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

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

function initSakura() {
  const canvas = document.querySelector("#sakuraCanvas");
  if (!canvas || reduceMotion) {
    return;
  }
  const ctx = canvas.getContext("2d");
  const petals = [];
  const petalCount = Math.min(42, Math.max(18, Math.floor(window.innerWidth / 36)));
  let width = window.innerWidth;
  let height = window.innerHeight;
  let time = 0;

  function resize() {
    const ratio = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function makePetal(fromTop = false) {
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
      hue: Math.random() > 0.35 ? 340 : 352
    };
  }

  function resetPetals() {
    petals.length = 0;
    for (let i = 0; i < petalCount; i += 1) {
      petals.push(makePetal(false));
    }
  }

  function drawPetal(petal) {
    ctx.save();
    ctx.translate(petal.x, petal.y);
    ctx.rotate(petal.rotation);
    ctx.scale(petal.size / 12, petal.size / 12);
    const gradient = ctx.createRadialGradient(-2, -2, 1, 0, 0, 13);
    gradient.addColorStop(0, `hsla(${petal.hue}, 92%, 96%, ${petal.alpha})`);
    gradient.addColorStop(0.62, `hsla(${petal.hue}, 86%, 82%, ${petal.alpha * 0.86})`);
    gradient.addColorStop(1, `hsla(${petal.hue}, 78%, 67%, ${petal.alpha * 0.18})`);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(0, -11);
    ctx.bezierCurveTo(9, -9, 12, -1, 4, 10);
    ctx.bezierCurveTo(2, 13, -2, 13, -4, 10);
    ctx.bezierCurveTo(-12, -1, -9, -9, 0, -11);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function tick() {
    time += 0.012;
    ctx.clearRect(0, 0, width, height);
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

initLanguageSwitch();
initFilters();
initModal();
applyTranslations();
initReveal();
initParticles();
initSakura();
