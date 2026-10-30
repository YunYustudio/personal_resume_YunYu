# 一个人、1920 个 Java 文件、130 张表：我用 Spring Boot 3.5 + Vue3 从零写了一套「一人公司 ERP」

> **摘要**：这是一篇复盘长文。我用约半年时间，以一个人的力量写完了一套面向"一人公司/独立开发者"的全栈 ERP：8 个 Spring Boot 微服务、1920 个 Java 文件、157 个 Controller、约 130 张表、134 个前端页面，跑通了"线索 → 合同 → 项目 → 交付 → 申报 → 账单 → 凭证 → 收款"的完整业务闭环。本文不讲空泛的架构名词，只讲**为什么这么选、代码怎么落地、哪里踩了坑**。

---

## 0. 写在前面

网上关于 ERP 的文章很多，但大多有两类问题：要么是厂商软文，通篇"赋能、抓手、闭环"；要么是玩具 demo，一个 CRUD 加个登录页就敢叫"企业级"。

我这套系统不太一样——它是**真的在给自己用**的。我不是在做技术练习，我是在解决一个具体问题：**一个人开公司，怎么不请会计、不请销售、不请项目经理，还能把生意跑合规。**

所以这篇文章会有一些"不太像技术文章"的内容，比如：为什么我把"审批流"设计成可以整体跳过、为什么数据权限在"一人公司"形态下要自动降级成 ALL、为什么我宁可多写 200 行代码也不用 Seata。

如果你正在做 SaaS、做管理系统、或者单纯好奇"一个人能写出什么样的系统"，希望这篇对你有用。

---

## 1. 缘起：一人公司到底需要什么样的 ERP

先说清楚问题域，否则后面的技术选型都是空中楼阁。

一人公司（OPC，One Person Company）的典型画像是：一个懂技术的独立开发者，接了 3~5 个客户的外包项目，年营收几十万到一百万。他同时是老板、销售、开发、客服、财务。

他真正痛的地方不是"没有工具"，而是：

1. **信息散**。客户在微信、合同在邮箱、进度在脑子里、账在 Excel。月底想算"这个项目到底赚了多少"，要翻三个地方。
2. **合规怕**。不知道什么时候该报税、小规模纳税人月销 10 万免征到底怎么算、合同里少写一条"验收标准"会不会被赖账。
3. **请不起人**。请个会计一年 6 万，请个销售底薪加提成一年 15 万——对年营收 50 万的公司来说，这是致命的。

所以这套系统的目标不是"功能多"，而是**把原本需要 5 个岗位做的事，压缩进一套软件里**：

| 原本的岗位 | 系统承担的部分 |
|---|---|
| 代账会计 | 业务事件自动生成凭证、税额自动计算、申报日历提醒 |
| 销售 | 线索池、商机漏斗、报价单、销售申报 |
| 项目经理 | 项目阶段、里程碑、工时、交付物、验收 |
| 法务 | 合同模板库、条款库、审批流、变更留痕 |
| 运维 | 服务器/域名/证书台账、到期自动提醒 |

**关键认知**：一人公司 ERP 和传统 ERP 最大的区别，不是"功能少一点"，而是**默认所有流程都可以一个人走完**。传统 ERP 里"制单 → 审核 → 记账 → 复核"四道岗，在一人公司里必须能一键穿透。

这个认知直接决定了后面很多设计。

---

## 2. 五条设计铁律

我在动手写第一行代码之前，先给自己定了五条不能破的规矩。事后看，这五条比任何技术选型都重要。

### 铁律一：合规内嵌，而不是外挂

反面例子：系统提供一个"合同"输入框，让用户自己贴 Word 内容。
正面做法：合同模板、条款库、印花税算法、凭证生成规则**全部内置**，用户做业务动作，系统自动完成合规动作。

落到代码上，就是 `VoucherEngine`（凭证引擎）这样的东西：不是让财务手工做分录，而是监听"应收已确认""成本已发生"这类业务事件，按预置规则自动借贷。

### 铁律二：自动化优先，而不是工具堆叠

反面例子：给你 50 个工具让你自己组合。
正面做法：给端到端的流程，用户只做决策。

比如"合同签署"这一个动作，背后自动触发：建应收 → 按付款节点拆分 → 生成账单 → 生成凭证 → 通知。用户只点了"确认签署"。

### 铁律三：决策可解释

反面例子：弹一个"该合同有风险"。
正面做法：告诉他"风险来自第 7 条违约责任未约定上限，建议补充'违约金不超过合同总额 20%'"。

这条在技术上体现为：所有校验提示都带 `reason` 字段，前端不只显示红字，还显示"为什么"。

### 铁律四：逐步引导，不阻塞

反面例子：注册第一天要求填完 30 个字段，否则不能用。
正面做法：缺什么就软提示，先让用户跑起来。

技术上就是：**所有非核心字段允许 NULL，缺失项在仪表盘高亮**，而不是在表单上加 `required`。

### 铁律五：成本透明

任何需要外部付费的能力（电子签章、短信、对象存储），在启用前明确告知年费和依赖。这条不是技术，是产品诚信，但它影响架构——**所有外部依赖都做成可插拔**，没配置就降级，而不是启动失败。

---

## 3. 技术选型：我为什么先拒绝 Spring Cloud，后来又用了 Nacos

这一段我想讲得诚实一点，因为它记录了一次真实的架构演进。

### 3.1 最初的判断：不要 Spring Cloud 全家桶

我最初在架构文档里写的是"多 JAR + 轻量网关，不引入 Nacos/Sentinel/Sleuth"。理由很朴素：

| 维度 | Spring Cloud 全家桶 | 多 JAR + 轻量网关 |
|---|---|---|
| 中间件数量 | MySQL + Redis + MQ + Nacos + Sentinel + Zipkin | MySQL + Redis + MQ |
| 运维人力 | 需要专人 | 一个人能扛 |
| 适用规模 | 10+ 开发 / 50+ 服务 | 1~5 开发 / 8 服务 |

一个只有 8 个服务的系统，引入服务发现和配置中心，收益是"改配置不用重启"，成本是"多一个必须高可用的组件"。当时我认为不划算。

### 3.2 打脸：配置散落在 7 个 application.yml

写到第 3 个月，问题来了。8 个服务，每个都有一份 `application.yml`，里面重复着数据源、Redis、RabbitMQ、JWT 密钥、日志格式……**改一次数据库密码要改 7 个文件**，还漏过一次，导致 finance 服务连的是旧库。

更麻烦的是环境隔离：开发、测试、生产三套配置，靠 `spring.profiles.active` 切，但敏感信息（数据库密码、JWT 密钥）又不能明文写在仓库里。

### 3.3 最终方案：Nacos 只做两件事

我最后引入了 Nacos，但**只用它的配置中心和服务发现，不用 Sentinel、不用 Seata、不用链路追踪**。

现在每个服务的 `application.yml` 只剩 40 行，核心是这一段：

```yaml
spring:
  application:
    name: yunyuopc-core
  config:
    import:
      - optional:nacos:common-redis.yml?group=SHARED_GROUP&refreshEnabled=true
      - optional:nacos:common-datasource.yml?group=SHARED_GROUP&refreshEnabled=true
      - optional:nacos:common-rabbitmq.yml?group=SHARED_GROUP&refreshEnabled=true
      - optional:nacos:common-mybatis.yml?group=SHARED_GROUP&refreshEnabled=true
      - optional:nacos:common-xxljob.yml?group=SHARED_GROUP&refreshEnabled=true
      - optional:nacos:common-jwt.yml?group=SHARED_GROUP&refreshEnabled=true
      - optional:nacos:common-logging.yml?group=SHARED_GROUP&refreshEnabled=true
      - optional:nacos:common-actuator.yml?group=SHARED_GROUP&refreshEnabled=true
      - optional:nacos:yunyuopc-core.yml?refreshEnabled=true
  cloud:
    nacos:
      discovery:
        server-addr: ${NACOS_SERVER_ADDR:127.0.0.1:8848}
        namespace: ${NACOS_NAMESPACE:dev}
        group: CORE
        username: ${NACOS_USERNAME:nacos}
        password: ${NACOS_PASSWORD:nacos}
```

这里有两个细节值得说：

**第一，`optional:` 前缀**。这是 Spring Boot 2.4+ 的配置导入语法，加 `optional:` 意味着"Nacos 上没有这个配置也不报错"。为什么这么设计？因为我要保证**新克隆仓库的人，在没搭 Nacos 的情况下也能把服务启动起来**（用本地默认值），而不是一启动就 `ConfigNotFoundException`。

**第二，8 个 `common-*.yml` 分文件**。一开始我把所有公共配置塞一个 `common.yml`，结果发现改 Redis 配置要动一个 800 行的大文件，很容易误伤。拆成 8 个文件后，职责清晰：`common-datasource.yml` 只放数据源，`common-jwt.yml` 只放 JWT 参数。

**代价是什么？** 我多了一个必须维护的组件。所以我在 `SECURITY.md` 里明确写了：Nacos 密码默认 `nacos`，上线必须改，否则配置中心被人改掉，等于系统被人接管。

### 3.4 这段经历给我的教训

**架构决策没有对错，只有"当时的约束下是否最优"。**

我最初的判断在"8 个服务、一个人"的约束下是对的；三个月后约束变了（配置重复成了主要矛盾），判断就该变。真正糟糕的不是"改主意"，而是**为了维护当初的判断，硬扛着 7 份重复配置不改**。

---

## 4. 整体架构

### 4.1 服务拆分

最终是 8 个 Spring Boot 3.5 服务 + 1 个公共库：

| 服务 | 端口 | 职责 | 数据库 |
|---|---|---|---|
| gateway | 8080 | 路由、JWT 鉴权、限流 | - |
| auth | 8081 | 登录、JWT 签发、员工自动建档 | yunyuopc_erp |
| core | 8082 | 公司/合同/客户/销售/服务商/员工 | yunyuopc_erp |
| finance | 8083 | 凭证/发票/账单/应收应付/税务 | yunyuopc_erp |
| task | 8084 | 项目/任务/缺陷/迭代/绩效 | yunyuopc_task |
| message | 8085 | 知识库/通知/文件 | yunyuopc_message |
| system | 8086 | 平台管理、字典、日志 | yunyuopc_system |
| common | - | 7 个子模块公共库 | - |

`common` 拆成 7 个子模块：`core`（统一响应、异常、工具）、`redis`、`rabbitmq`、`mybatis`（BaseEntity、数据权限拦截器、加密 TypeHandler）、`security`（JWT 过滤器）、`xxljob`、`log`（`@OperLog` 切面）。

**为什么这么拆？** 不是为了"微服务"这个名头，而是按**写入热点和变更频率**拆：

- `task` 服务的工时填报、缺陷流转写入最频繁，独立库独立扩容；
- `finance` 的凭证计算密集，独立部署避免拖慢合同查询；
- `message` 的知识库读多写少，缓存策略完全不同。

### 4.2 拆分粒度的一个反例

我一开始想把"项目"放在 `core`（因为合同和项目强关联），后来发现错了。

项目域下面挂着：阶段、里程碑、成员、交付物、文档、成本分摊、风险、验收、标签、模板——**15 个 Controller**。如果放 `core`，`core` 会有 64 + 15 = 79 个 Controller，一个服务 79 个 Controller，编译一次 3 分钟，改一行代码重启 40 秒，开发体验极差。

所以最终：**项目、任务、绩效全归 `task`**（40 个 Controller），`core` 保留 64 个（公司 7 + 员工 7 + 合同 14 + 客户 10 + 销售 10 + 服务商 14 + 其他）。

判断依据很简单：**同一个服务里的 Controller 数量超过 50，就该考虑再拆了**。

### 4.3 网关只做三件事

```yaml
# 路由示意
- id: yunyuopc-core
  uri: lb://yunyuopc-core
  predicates:
    - Path=/api/core/**
  filters:
    - AuthFilter       # 校验 JWT + Redis 黑名单
    - RateLimitFilter  # Redis 滑动窗口
```

路由、鉴权、限流。**不做协议转换、不做数据聚合、不做业务逻辑**。网关一旦开始写业务，就会变成"分布式单体"。

### 4.4 模块拓扑：为什么是"3 中心 + 8 业务"的星型结构

这是我在需求阶段推翻过两版的设计，值得单独说。

第一版是"9 大业务模块平行"：销售、项目、研发、财务、运营、运维、营销、传媒、企划，九个方块并排。看着整齐，但一画数据流就崩了——销售和客户是什么关系？合同属于销售还是独立？服务商归谁管？

第二版改成了星型：

```
        客户（给我钱的人）
              │ 签订
              ▼
        合同（中心枢纽）
              ▲ 采购
              │
        服务商（收我钱的人）

合同 ──驱动──> 销售 / 项目 / 研发 / 财务
```

核心洞察是一句话：**一人公司的经营矛盾，本质是"对家关系"**——一边是给我付钱的人（客户），一边是收我钱的人（服务商），而合同是跟这两类对家建立商业关系的**唯一法律载体**。

所以客户、合同、服务商必须是三个独立的一级模块，且合同居中。这个结构直接影响了后面的数据库设计和事件流：

- 合同表同时有 `party_a_id`（客户）和 `party_b_id`（服务商），两个方向都通
- `contract.signed` 事件同时被 finance（建应收）和 task（建项目）消费
- 采购合同走的是**镜像链路**：`purchase.approved` → 应付 → 账单 → 凭证

**如果当初按"9 个平行模块"做，合同会被拆成"销售合同"和"采购合同"两套代码，后面所有跨模块链路都要写两遍。**

这个教训是：**模块划分不是按"部门"分，是按"数据流向"分。** 传统企业按部门分（销售部、采购部），因为部门是组织边界；一人公司没有部门，只有业务流，所以必须按流转分。

---

## 5. 数据库：三个库、130 张表、不跨库 JOIN

### 5.1 分库依据

| 库 | 表数 | 服务 | 表前缀 |
|---|---|---|---|
| yunyuopc_erp | ~90 | auth + core + finance | `sys_` `biz_` `fin_` |
| yunyuopc_task | ~40 | task | `biz_` `perf_` |
| yunyuopc_message | ~20 | message | `kb_` `msg_` |
| yunyuopc_system | ~12 | system | `sys_` |
| nacos_config / xxl_job | - | 基础设施 | - |

分库原则只有一条：**强关联、频繁 JOIN 的必须同库**。

合同 → 客户 → 应收 → 账单 → 凭证，这是主链路，天天 JOIN，必须都在 `yunyuopc_erp`。而项目 → 任务 → 缺陷，是独立闭环，可以拆出去。

### 5.2 跨库怎么办？不 JOIN，用 ID + 冗余快照

`yunyuopc_task` 里的项目表存 `customer_id`，但不建外键、不 JOIN。展示时有两种做法：

1. **实时调用**：`task` 通过 RestTemplate 调 `core` 的 `/api/core/customer/{id}`；
2. **冗余快照**：建项目时把 `customer_name` 一起存下来。

我两种都用，但**关键业务单据一律用快照**。

原因很实际：客户改名了，历史合同上的客户名**不应该跟着变**。财务凭证、已开出的发票、已归档的合同，这些是法律凭证，必须保留当时的快照。如果靠 JOIN 实时取名，客户一改名，三年前的凭证全变了——这在审计上是灾难。

所以你会看到 `biz_contract` 里同时有 `customer_id` 和 `customer_name`，`biz_sales_declaration` 里同时有 `opportunity_id`/`opportunity_name`、`project_id`/`project_name`、`owner_user_id`/`owner_name`。看着冗余，其实是**有意的历史快照**。

### 5.3 每张业务表的固定套路

```sql
CREATE TABLE `biz_contract` (
  `id`          BIGINT NOT NULL AUTO_INCREMENT,
  `company_id`  BIGINT NOT NULL COMMENT '租户隔离',
  `contract_no` VARCHAR(32) NOT NULL COMMENT '业务唯一号',
  -- 业务字段...
  `creator_id`  BIGINT DEFAULT NULL,
  `updater_id`  BIGINT DEFAULT NULL,
  `is_deleted`  TINYINT NOT NULL DEFAULT 0,
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_contract_no` (`contract_no`),
  KEY `idx_company_status` (`company_id`, `status`),
  KEY `idx_company_time` (`company_id`, `create_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

三个细节：

- **`company_id` 每张表都有**。这是多租户隔离的物理基础，配合 MyBatis 拦截器自动追加 `WHERE company_id = ?`。
- **联合索引永远是 `(company_id, xxx)`**。因为所有查询都带租户条件，单列索引 `idx_status` 基本用不上——选择性太低。
- **逻辑删除 `is_deleted`**。财务数据不能物理删除，只能标记。

### 5.4 索引设计的三条纪律

建了 130 张表之后，我总结出三条不能破的索引纪律。

**纪律一：联合索引永远以 `company_id` 打头。**

```sql
-- ✅ 对：多租户查询走这个
KEY `idx_company_status` (`company_id`, `status`)

-- ❌ 错：选择性太低，几乎不会被用到
KEY `idx_status` (`status`)
```

因为所有查询都被拦截器自动追加了 `WHERE company_id = ?`，单列 `idx_status` 在 MySQL 看来是"从 130 万行里筛出 60 万行"，优化器会直接放弃它去全表扫。

**纪律二：不在低选择性字段上建单列索引。**

`status` 只有 7 个值、`type` 只有 3 个值、`is_deleted` 只有 2 个值——这类字段单独建索引，除了拖慢写入没有任何收益。

**纪律三：外键字段必须建索引，但绝不建物理外键。**

```sql
KEY `idx_contract_id` (`contract_id`)      -- 索引要建
-- FOREIGN KEY (`contract_id`) REFERENCES ...  -- 外键不要建
```

不建外键的原因有三个：分库之后跨库外键根本不可能；`DELETE` 时会因为外键约束失败；批量导入数据时外键检查会让速度慢一个数量级。**引用完整性交给应用层校验**，这是分库场景的通用做法。

顺带说一个真实的性能问题：`sys_operation_log`（操作日志表）是最容易失控的表。它每天都在写，一年就是几百万行。我的处理是：

```sql
KEY `idx_company_module` (`company_id`, `module`),
KEY `idx_create_time` (`create_time`)
```

配合每月归档（把 6 个月前的日志导到历史表），主表始终保持在 50 万行以内。**日志表不做归档，早晚会拖垮整个库。**

---

## 6. 事件驱动：10 条链路把 8 个服务串起来

### 6.1 交换机与队列

```java
// 交换机
yunyuopc.erp.exchange          // 主业务事件
yunyuopc.erp.sales.exchange    // 销售申报事件
yunyuopc.knowledge             // 知识库事件
```

消费者一共 12 个 `@RabbitListener`。核心链路 10 条，我挑三条最典型的讲。

### 6.2 链路一：合同签署 → 财务自动建账

```
core: ContractServiceImpl.confirmSign()
  └─ 更新合同状态 = SIGNED
  └─ 发 contract.signed 事件
        ↓
finance: BusinessEventConsumer.handleContractSigned()
  ├─ 按付款节点拆分创建 FinReceivable（应收）
  ├─ BillAutoCreateService.createBillFromReceivable()（账单）
  └─ VoucherEngine.generateVoucher()（凭证）
```

这条链路的价值在于：**销售点一下"确认签署"，财务侧自动出现应收、账单、凭证三张单**。一人公司没有财务岗，这一步如果靠手工，基本就是"月底补账"的开始。

### 6.3 链路二：里程碑完成 → 激活付款节点

合同里通常写"验收后付 40%"。里程碑在 `task` 服务，付款节点在 `core` 服务，钱在 `finance` 服务。

```
task: ProjectMilestoneServiceImpl.complete()
  └─ 发 milestone.completed
        ↓
finance: handleMilestoneCompleted()
  └─ 调 core: ContractRemoteService.activatePaymentNode(nodeId)
  └─ 激活后出账
```

这里有个坑：**跨服务调用不能放在事务里**。我最初把"激活付款节点"写在 `@Transactional` 方法内，结果 core 那边成功了、finance 这边回滚了，数据不一致。

最终方案：**先本地事务提交，再发 MQ，MQ 消费端做幂等**。

### 6.4 链路三：销售申报 → 自动出账（最复杂的一条）

这条链路我单独开一节讲，因为它是整个系统里设计最重的部分。

### 6.5 事件设计的三个约定

写了 10 条链路之后，我发现事件设计如果不立规矩，很快就会乱。最后定下三条：

**约定一：事件名用"名词.动词过去式"，表示"已经发生的事实"。**

```
✅ contract.signed / project.accepted / sales.declared
❌ signContract / doAccept / createBill
```

事件是**事实陈述**，不是**命令**。`contract.signed` 的意思是"合同已经签了"，而不是"请去建应收"。这个区别很重要：如果是命令，发事件方就要知道谁在监听；如果是事实，发事件方完全不用关心下游有几个消费者。

**约定二：事件体只放 ID 和最少的上下文，不放整个对象。**

```java
// ✅ 对
{ "contractId": 1001, "customerId": 2001, "totalAmount": 100000.00, "signedAt": "..." }

// ❌ 错：把整个 Contract 对象序列化进去
{ "contract": { ...50 个字段... } }
```

原因有两个：消息体积小，MQ 压力小；消费者拿到 ID 后自己查最新数据，避免"消息里的金额是旧的，库里已经改了"。

但有个例外：**金额、状态这类关键字段必须放在消息里**。因为消费者要用它做幂等判断和快速校验，不能为了一个字段再查一次库。

**约定三：一条消息只有一个主要消费者，其余都是旁路。**

`contract.signed` 的主消费者是 finance（建应收），旁路消费者是 message（发通知）。主消费者失败要重试到成功，旁路消费者失败可以丢弃——**通知丢了用户能忍，应收丢了不能忍**。

所以代码里对两类消费者的异常处理完全不同：

```java
// 主消费者：抛异常，让 MQ 重投
@RabbitListener(queues = FINANCE_CONTRACT_SIGNED_QUEUE)
public void handleContractSigned(BusinessEventMessage msg) {
    billAutoCreateService.createFromContract(msg);  // 失败直接抛
}

// 旁路消费者：catch 住，只记日志
@RabbitListener(queues = MESSAGE_CONTRACT_SIGNED_QUEUE)
public void notifyContractSigned(BusinessEventMessage msg) {
    try {
        notificationService.push(msg);
    } catch (Exception e) {
        log.warn("通知发送失败，忽略：{}", e.getMessage());  // 不重投
    }
}
```

**这个区分如果搞错，会出现两种灾难**：主消费者吞异常 → 账丢了没人知道；旁路消费者抛异常 → 通知服务挂了导致合同签署全部回滚。

### 6.6 定时任务：事件驱动覆盖不到的那一半

事件驱动很优雅，但它有个前提：**必须有人先"发生"一个动作**。

而 ERP 里有一大类需求是"没有动作也要触发"的：

- 合同 30 天后到期 → 没人点任何按钮，但必须提醒
- 应收账款逾期 90 天 → 必须标红
- 每月 15 号前 → 必须提醒报税
- 每天 0 点 → 必须生成资金日报

这些只能用定时任务。最后是 **40 个 `@XxlJob` 方法，分布在 24 个调度类**里。

**组织方式：按"业务域 + 频率"分组，而不是按服务分组。**

```java
@Component
public class FinanceJobHandler {

    @XxlJob("arOverdueScan")           // 每日 8:00
    public void arOverdueScan() { ... }

    @XxlJob("apOverdueScan")           // 每日 8:10
    public void apOverdueScan() { ... }

    @XxlJob("taxDeadlineRemind")       // 每日 9:00
    public void taxDeadlineRemind() { ... }

    @XxlJob("dailyBalanceReport")      // 每日 0:10
    public void dailyBalanceReport() { ... }

    @XxlJob("taxDeclarationAutoCreate")// 每月 1 日 1:00
    public void taxDeclarationAutoCreate() { ... }
}
```

**为什么时间要错开 10 分钟？** 因为 40 个任务如果都写 `0 0 8 * * ?`，早上 8 点整会同时唤醒 40 个线程，数据库连接池瞬间打满，所有任务一起超时。错开之后，每个任务都有独立的连接窗口。

**每个任务必须满足三个条件，否则不准上线：**

1. **幂等**。重复执行不产生重复数据。做法是"先查后写 + 唯一索引兜底"，比如生成应收前先查 `source_type + source_id` 是否已存在。
2. **时间窗**。不用 `now()`，用"上次执行时间到现在"的区间。否则任务失败重跑时，会把中间漏掉的数据全补一遍，也可能重复处理。
3. **可观测**。每个任务结束时打一行结构化日志：处理条数、耗时、失败条数。没有这行日志，出了问题只能靠猜。

```java
@XxlJob("arOverdueScan")
public void arOverdueScan() {
    long start = System.currentTimeMillis();
    int total = 0, failed = 0;
    List<FinReceivable> list = receivableMapper.selectOverdue(LocalDate.now());
    for (FinReceivable r : list) {
        try {
            receivableService.markOverdue(r.getId());
            total++;
        } catch (Exception e) {
            failed++;
            log.error("应收逾期标记失败，id={}", r.getId(), e);
        }
    }
    log.info("arOverdueScan 完成：总数={} 成功={} 失败={} 耗时={}ms",
             list.size(), total, failed, System.currentTimeMillis() - start);
}
```

**一个容易被忽略的点：定时任务要不要做分布式锁？**

XXL-Job 本身有路由策略，默认是"第一个"或"轮询"，正常情况下不会重复执行。但如果 Admin 配置了"分片广播"或者任务执行超时被重复调度，就会出现两个实例同时跑同一个任务。

所以我在关键任务（凭证生成、应收核销）里加了 Redis 分布式锁：

```java
String lockKey = "lock:job:arOverdueScan";
Boolean ok = redis.opsForValue().setIfAbsent(lockKey, "1", Duration.ofMinutes(10));
if (Boolean.FALSE.equals(ok)) {
    log.warn("arOverdueScan 已在执行，跳过本次");
    return;
}
try {
    doScan();
} finally {
    redis.delete(lockKey);
}
```

**这 40 个任务里，真正产生业务价值的是哪几个？**

说实话，是这三个：

| 任务 | 价值 |
|---|---|
| `taxDeadlineRemind` | 一人公司最容易忘的就是报税，逾期一次罚款 200 起 |
| `arOverdueScan` | 应收账款逾期不提醒，等于白干 |
| `dailyBalanceReport` | 每天早上看一眼余额，比月底看报表有用得多 |

其余 37 个是"锦上添花"。**做 ERP 要分清"必须有"和"有了更好"，不然 40 个任务会把你的时间吃光。**

---

## 7. 深挖一条链路：合同签署 → 应收 → 账单 → 凭证

### 7.1 为什么要拆成三张单

新手容易问：合同金额都知道了，为什么还要"应收""账单""凭证"三层？

因为它们是三个不同的东西：

| 单据 | 回答的问题 | 谁看 |
|---|---|---|
| 应收（Receivable） | 客户**欠我多少** | 销售、老板 |
| 账单（Bill） | 这一期**该收多少**、收没收 | 财务、客户 |
| 凭证（Voucher） | 会计上**怎么记** | 会计、税务 |

一份 10 万的合同，分 3 期付款，就产生 3 条应收、3 张账单，收款后产生凭证。**合同是"承诺"，账单是"请求"，凭证是"事实"**。混在一起，账就乱了。

### 7.2 付款节点拆分逻辑

```java
// 伪代码，实际在 ContractServiceImpl
for (PaymentNode node : contract.getPaymentNodes()) {
    FinReceivable r = new FinReceivable();
    r.setSourceType(10);              // 10 = 合同
    r.setSourceId(contract.getId());
    r.setPaymentNodeId(node.getId());
    r.setAmount(node.getAmount());    // 按节点金额，不是合同总额
    r.setDueDate(node.getDueDate());
    receivableMapper.insert(r);
}
```

关键点：**`source_type` + `source_id` 溯源字段**。有了它，任何一张应收都能反查到"从哪来"——是合同、是里程碑、是销售申报、还是采购。这个字段后来救了无数次"这笔钱到底哪来的"的排查。

### 7.3 凭证引擎

```java
public interface VoucherEngine {
    void generateVoucher(VoucherSourceType sourceType, Long sourceId);
}
```

只暴露一个方法，内部按 `sourceType` 查规则表，生成借贷分录。规则表长这样：

| rule_code | 业务场景 | 借方 | 贷方 |
|---|---|---|---|
| AR_CONFIRM | 应收确认 | 1122 应收账款 | 6001 主营业务收入 |
| AR_CONFIRM | 应收确认（税额） | 1122 应收账款 | 2221 应交税费 |
| COST_OCCUR | 成本发生 | 5401 主营业务成本 | 2202 应付账款 |

**为什么不把规则写死在代码里？** 因为税率会变、科目会调。写在表里，改配置不用发版。

---

## 8. 销售申报 V2：主子表、状态机、幂等出账

### 8.1 背景：一个隐蔽但致命的缺口

系统上线跑了一段，发现一个诡异现象：**账单列表是空的**。

排查半天才明白：收入侧只有一条"合同签署 → 应收"的链路。但现实中很多收入不走合同——比如老客户的零星增补、按月结算的技术支持。这些收入没有源头，财务只能手工建账单。

**手工建账 = 账实不符的开始。**

所以补了一个"销售申报"模块：业务侧先申报一笔收入，冻结、审批，通过后自动出账。

### 8.2 状态机

```
0 草稿 → 10 已申报 → 20 已冻结 → 30 审批通过 → 50 已出账（终态）
                        ↓
                     40 已驳回 → 回到 0
                     
60 已作废（未出账前可作废）
```

三条硬规则：

1. **金额只能在 0/10 状态改**。进了 20（冻结），金额锁死，要改先解冻。
2. **不许越级**。`10 → 30` 非法，必须经过 20。
3. **出账幂等**。`sales.declared` 消息重发不能重复建应收。

### 8.3 主子表拆分

V1 我把明细塞在主表的一个 JSON 数组里，结果：不能按商品查、不能算税、不能对接开票。

V2 拆成两张表：

```sql
-- 主表：30 个字段
biz_sales_declaration (
  id, company_id, declaration_no, customer_id, customer_name,
  opportunity_id, opportunity_name, contract_id, contract_no,
  project_id, project_name, owner_user_id, owner_name,
  currency, amount, tax_rate, tax_amount, net_amount,
  discount_amount, total_quantity, item_count,
  declaration_date, status, freeze_time, frozen_amount,
  reject_reason, remark, creator_id, updater_id, is_deleted, ...
)

-- 明细表：24 个字段
biz_sales_declaration_item (
  id, declaration_id, item_no, item_type, product_id,
  item_name, spec, unit, tax_category_code,
  quantity, price, discount_rate, discount_amount,
  line_amount, tax_rate, tax_amount, net_amount,
  delivery_date, remark, source_type, source_id, ...
)
```

### 8.4 金额计算：前后端必须同一口径

这是最容易出错的地方。我的做法是：**服务端是唯一权威，前端只做实时预估**。

```
行毛利额   gross       = 数量 × 含税单价              （2 位小数）
行折扣     discount    = gross × 折扣率 ÷ 100         （2 位小数）
行价税合计 line_amount = gross − discount             （2 位小数）
行未税     net_amount  = line_amount ÷ (1 + 税率)     （2 位小数，HALF_UP）
行税额     tax_amount  = line_amount − net_amount     （2 位小数）

主表：
amount     = Σ line_amount
net_amount = Σ net_amount
tax_amount = amount − net_amount   ← 用汇总反算，不逐行累加
```

最后一行是关键：**税额用"总额减未税总额"反算，而不是把每行税额加起来**。因为逐行四舍五入会累积误差，10 行明细能差出 0.03 元，财务对账时就是"差一分钱"的经典事故。

### 8.5 幂等出账

```java
// 唯一索引兜底
UNIQUE KEY `uk_source` (`source_type`, `source_id`)
```

消费 `sales.declared` 时，先查 `source_type=20 AND source_id=申报ID` 的应收是否存在，存在就直接返回。即使并发进来两条消息，唯一索引也会让第二条抛 `DuplicateKeyException`，捕获后视为成功。

**这个思路是从采购单号的坑里学来的**（见第 12 节）。

---

## 9. 一致性：为什么我不用 Seata

### 9.1 对比

| 维度 | Seata AT | 本地消息表 + MQ |
|---|---|---|
| 额外组件 | Seata Server（必须高可用） | 无 |
| 性能 | 全局锁，TPS 下降 30%+ | 无锁 |
| 一致性 | 强一致 | 最终一致（秒级） |
| 运维 | 多一个组件要盯 | 只靠已有的 RabbitMQ |

ERP 场景并发很低（一人公司，一天几十单），但**一致性要求不低**（钱不能错）。看起来该选 Seata，但我选了最终一致，理由是：**最终一致 + 幂等 + 补偿，比强一致更容易做对**。

强一致的难点在于"全局锁 + 回滚"，回滚本身就可能失败；而最终一致的难点在于"消息不能丢 + 消费要幂等"，这两个都是可以工程化解决的。

### 9.2 本地消息表

```sql
CREATE TABLE `local_message` (
  `id`              BIGINT NOT NULL AUTO_INCREMENT,
  `message_id`      VARCHAR(64) NOT NULL COMMENT 'UUID，用于消费端幂等',
  `exchange`        VARCHAR(100) NOT NULL,
  `routing_key`     VARCHAR(100) NOT NULL,
  `message_body`    TEXT NOT NULL,
  `status`          TINYINT NOT NULL DEFAULT 0 COMMENT '0待发送 1已发送 2失败',
  `retry_count`     INT NOT NULL DEFAULT 0,
  `next_retry_time` DATETIME DEFAULT NULL,
  `business_type`   VARCHAR(50) NOT NULL,
  `business_id`     VARCHAR(64) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_message_id` (`message_id`),
  KEY `idx_status_retry` (`status`, `next_retry_time`)
) ENGINE=InnoDB;
```

流程：

1. 开事务
2. 执行业务 SQL（比如更新合同状态）
3. 写 `local_message`（status=0）
4. **提交事务**（业务和消息原子）
5. 发 MQ
6. 更新 status=1

第 5 步失败怎么办？定时任务每 30 秒扫 `status=0 OR (status=2 AND retry_count < max)`，指数退避重发。

### 9.3 消费端幂等

```java
String key = "mq:consumed:" + message.getMessageId();
Boolean isNew = redisTemplate.opsForValue()
    .setIfAbsent(key, "1", Duration.ofHours(24));
if (Boolean.FALSE.equals(isNew)) {
    return;  // 已消费，直接 ACK
}
```

`SETNX` + 24 小时 TTL。为什么是 24 小时？因为消息补偿最多重试 3 次、间隔不超过 1 小时，24 小时足够覆盖。

---

## 10. 认证与权限

### 10.1 JWT 设计

```json
{
  "userId": 1,
  "employeeId": 1,
  "companyId": 1,
  "username": "admin",
  "roles": ["SUPER_ADMIN"],
  "jti": "uuid-xxxx",
  "iat": 1717500000,
  "exp": 1717586400
}
```

- 算法 HS512，access token 2 小时，refresh token 7 天
- `jti` 用于登出黑名单：`auth:token:black:{jti}`，TTL = token 剩余有效期
- 多端隔离：PC / 门户 / 小程序用不同的 token 前缀，互不影响

### 10.2 数据权限：一人公司的特殊处理

RBAC 控制"能不能点这个按钮"，数据权限控制"能看到哪些行"。

```java
@DataScope(scope = DataScopeType.DEPARTMENT)
List<Contract> selectContractList(ContractQuery query);
```

拦截器解析注解，往 SQL 里追加 `AND department_id = ?`。

但一人公司只有一个部门、一个人，做这层隔离纯属自找麻烦。所以：

```java
if (company.getOrgType() == OrgType.ONE_PERSON) {
    return DataScopeType.ALL;   // 直接跳过
}
```

**这是产品设计，不是安全漏洞**——一个人看自己的全部数据，本来就该看得到。

### 10.3 三个必做的越权防护

权限这块，我踩过的最深的坑不是"功能没做"，而是"做了但漏了"。有三个地方最容易漏：

**第一，水平越权：改 URL 里的 ID。**

`GET /api/core/contract/1001`，用户把 1001 改成 1002，如果只校验"有没有合同查看权限"、不校验"这合同是不是你的"，就能看到别人的数据。

正确做法是**在 Service 层做归属校验**，而不是只靠拦截器：

```java
Contract c = contractMapper.selectById(id);
if (c == null) throw new BusinessException(404, "合同不存在");
if (!c.getCompanyId().equals(UserContext.getCompanyId())) {
    throw new BusinessException(403, "无权访问该合同");
}
```

注意这里的 404 和 403 的区别：**查不到返回 404，查到了但不是你的返回 403**。如果两者都返回 404，攻击者可以通过"返回码差异"枚举出哪些 ID 存在。

**第二，垂直越权：普通用户调管理员接口。**

`/api/admin/**` 全部要求 `@PreAuthorize("hasRole('ADMIN')")`，这个好办。麻烦的是那些"看起来不像管理员接口"的接口，比如"导出全部客户"——普通员工也能点，但导出的是全公司数据。

这类接口要在 Service 层显式判断数据范围，不能指望前端隐藏按钮。**前端的隐藏只是体验，不是安全。**

**第三，租户越权：`company_id` 被前端传进来。**

最危险的一种。如果 `company_id` 从请求参数里取，用户改个数字就能操作别的公司的数据。

铁律：**`company_id` 只能从 JWT 里取，永远不从请求体里取**。

```java
// ❌ 错：从 DTO 里取
contract.setCompanyId(dto.getCompanyId());

// ✅ 对：从上下文取
contract.setCompanyId(UserContext.getCompanyId());
```

我在 `common-mybatis` 里做了强制：`BaseEntity` 的 `companyId` 字段加了 `@TableField(fill = FieldFill.INSERT)`，插入时由 `MetaObjectHandler` 自动填充当前租户，业务代码根本拿不到"设置租户"的机会。

**这三条如果只做一条，做第三条。** 因为前两条是"看到不该看的"，第三条是"改到别人的"，性质完全不同。

---

## 11. 前端：两套 Vue3 应用的分工

| 应用 | 技术栈 | 页面数 | 使用者 |
|---|---|---|---|
| yunyuopc-erp-portal | Vue 3.5 + TS 5.7 + Vite 6.3 + Element Plus 2.9 + ECharts 6.1 | 134 | 老板/员工日常办公 |
| yunyu-erp-admin | Vue 3.4 + TS 5.3 + Tailwind + lucide | 21 | 平台管理员 |

**为什么不用一套？** 因为定位完全不同。

`portal` 是业务系统，表单重、表格多、要图表，Element Plus 的 `el-table` / `el-form` 能省一半工作量。

`admin` 是平台管理，只有用户、角色、菜单、字典、日志几个页面，追求的是"轻"和"好看"，Tailwind 手写更快，也更容易做出差异化视觉。

### 11.1 API 分层：四层，每层只做一件事

前端 134 个页面、99 个 API 文件，如果不分层，三个月后没人能看懂。

我定的是四层：

```
views/         页面：只管布局、交互、调用 store 或 api
stores/        Pinia：跨页面共享的状态（当前用户、公司、字典）
api/           接口：一个模块一个文件，只做 request 封装
api/types/     TS 类型：和后端 DTO 一一对应
```

关键约束是：**页面里不许直接写 `axios`**。

```ts
// ✅ 对：api/contract/index.ts
export function getContractList(params: ContractQuery) {
  return request.get<PageResult<ContractListVO>>('/core/contract', { params })
}

// ❌ 错：页面里直接拼 URL
const res = await axios.get('/api/core/contract?page=1')
```

为什么要这么严？因为后端接口前缀会变（`/api/core/**` → 网关路由调整），如果 URL 散落在 134 个页面里，改一次要改 134 个地方。收敛到 `api/` 层，只改 1 个文件。

### 11.2 类型定义先行

后端有 209 个 Entity、一堆 DTO/VO。前端如果全用 `any`，等于放弃了 TypeScript 的全部价值。

我的做法是：**先写类型，再写页面**。

```ts
// api/types/sales.ts
export interface SalesDeclarationItem {
  id?: number
  declarationId?: number
  itemNo: number
  itemType: 1 | 2                    // 1=商品 2=服务
  itemName: string
  spec?: string
  unit?: string
  quantity: number
  price: number                      // 含税单价
  discountRate: number               // 0~100
  discountAmount: number             // 只读，后端算
  lineAmount: number                 // 只读，后端算
  taxRate: number
  taxAmount: number                  // 只读
  netAmount: number                  // 只读
  deliveryDate?: string
  remark?: string
}
```

注意注释里标的"只读，后端算"。**这几个字段在前端永远不允许用户直接编辑**，否则前后端算出来的金额不一致，对账时就是灾难（第 8.4 节讲过）。

类型定义先行还有一个隐性收益：**写类型的时候会逼你重新想一遍字段设计**。我在写 `SalesDeclarationItem` 时才发现"折扣"应该分 `discountRate`（折扣率）和 `discountAmount`（折扣金额）两个字段——只存金额的话，用户改数量后折扣不会重算。

**踩过的坑**：两套应用共用一套后端，但 `admin` 的接口前缀是 `/api/admin/**`，`portal` 是 `/api/core/**` 等。开发时 Vite 代理要分别配置，否则 CORS 和 401 会混在一起排查不清。

---

## 12. 踩坑实录

这一节是我最想写的，因为技术文章里"成功经验"最不值钱，"踩过的坑"才值钱。

### 坑 1：`id_card` NOT NULL 让登录直接挂掉

**现象**：用户登录成功，但页面白屏，后端 500。

**日志**：`java.sql.SQLException: Field 'id_card' doesn't have a default value`

**原因**：登录成功后会自动创建员工记录（一人公司场景：注册即员工）。但 `sys_employee.id_card` 是 `NOT NULL` 且无默认值，而代码里没设这个字段（当时注释写的是"避免占位符污染"）。

**修复**：
1. DB 层：`ALTER TABLE sys_employee MODIFY COLUMN id_card VARCHAR(18) NULL`（身份证本来就是可选信息）
2. 代码层：`employee.setIdCard("")` 兜底
3. **防御层**：员工自动创建包 try-catch，失败不阻断登录

第 3 点最重要。**登录是系统唯一入口，任何附属逻辑都不该让它失败。**

### 坑 2：XXL-Job 未启动时每 30 秒刷一次 ERROR

**现象**：开发环境控制台被 `ConnectException` 刷屏，日志文件一天几百 MB。

**原因**：`XxlJobSpringExecutor` 启动后会开一个注册线程，每 30 秒尝试注册到 Admin。Admin 没起，就每次打印完整堆栈。

**修复**：

```java
@Configuration
@ConditionalOnProperty(name = "xxl.job.enabled", havingValue = "true")
public class XxlJobConfig {
    @Bean
    public XxlJobSpringExecutor xxlJobExecutor() { ... }
}
```

在 Nacos 的 `common-xxljob.yml` 里配 `xxl.job.enabled: true`，本地开发设 `false`，不创建 Bean，世界清净。

**同类问题**：RabbitMQ 健康检查。Actuator 的 `RabbitHealthIndicator` 在 MQ 未启动时也会打完整堆栈。解法是 `management.health.rabbit.enabled: false`，把可用性检测交给自己的 `rabbitMQAutoStartRunner`（它只打 WARN）。

### 坑 3：编号生成器撞唯一索引

**现象**：采购单号偶尔重复，`DuplicateKeyException`。

**原因**：编号规则是 `YN-PO-202608-001`，序号存在 Redis 里 `INCR`。Redis 重启或 key 过期，计数从 1 重新开始，就撞上了库里已有的 `001`。

**修复**：**取 `max(Redis 值, 库里当天最大值 + 1)` 作为最终序号，并回写 Redis**。

```java
long redisSeq = redis.increment(key);
long dbSeq = mapper.selectMaxSeqByDate(today) + 1;
long finalSeq = Math.max(redisSeq, dbSeq);
redis.set(key, finalSeq);   // 回写，修正计数器
```

这个"Redis 计数 + DB 兜底"的模式，后来在销售申报单号、合同编号上都用了一遍。

**教训**：**任何依赖 Redis 自增的业务编号，都必须有 DB 兜底**。Redis 是缓存，不是数据库。

### 坑 4：UTF-16 的 SQL dump 让所有 grep 失效

这个是做开源脱敏时踩的，很有代表性。

我要扫描仓库里有没有真实客户数据，用 `grep -r "客户名"` 扫了一遍，结果干净。差点就信了。

后来发现 `backup_before_alter_20260628.sql` 是 **UTF-16 编码**（Windows 下 PowerShell 重定向的默认行为）。这种文件在 grep 眼里是"二进制文件"，直接跳过不报错。用 Python 一读，758KB 文件里有 **341,789 个 NUL 字节**——典型的 UTF-16 LE。

解码后：**140 张表、37 条 INSERT，真实客户名、员工手机号、邮箱全在里面。**

**教训**：**安全扫描不能只靠 grep**。至少要：
1. 检查文件编码（`file` 命令或读前几个字节看 BOM）；
2. 用能处理多编码的工具（Python `chardet`）；
3. 对"应该没有敏感数据却异常大"的文件保持怀疑。

### 坑 5：把"禁止商用"写进了 Apache-2.0 项目

这个不是代码 bug，是法律 bug。

我在 1690 个源文件头部写了"本代码原创，已申请国家软件著作权，禁止侵权盗用"，README 里又写"本项目完全开源"。

问题：**没有 LICENSE 文件的"完全开源"，法律上等于"保留所有权利"**。别人 clone 了也不能用，一用就侵权。

后来补了 Apache-2.0 全文，并把版权头改成"已申请国家软件著作权登记；开源许可条款见根目录 LICENSE"。

**教训**：**"开源"是一个法律动作，不是一个态度**。想让人用，就必须给明确的许可证。

### 坑 6：JavaScript 的浮点数，让金额差了 0.01

做销售申报的实时合计时，前端算出 `¥199.99999999999997`。

原因不用多解释：`0.1 + 0.2 !== 0.3`，IEEE 754 双精度浮点数的老问题。Java 那边用 `BigDecimal` 没这问题，但 JSON 传到前端变成 `number` 就还原成浮点了。

**我的处理分三层：**

1. **后端是唯一权威**。所有金额字段在 `SalesDeclarationServiceImpl` 里用 `BigDecimal` + `RoundingMode.HALF_UP` 计算，前端传上来的金额一律**不信**，重新算一遍。
2. **前端只做预估展示**，且展示前统一 `toFixed(2)`，不参与任何后续计算。
3. **税额用汇总反算**，不逐行累加：

```java
// ❌ 错：逐行税额相加，10 行能差 0.03
totalTax = items.stream().map(Item::getTaxAmount).reduce(ZERO, BigDecimal::add);

// ✅ 对：总额减未税总额
totalTax = totalAmount.subtract(totalNetAmount);
```

**这条不只是技术问题，是财务问题。** 发票上的税额如果和申报表差一分钱，税务系统会直接驳回。所以"金额口径统一"这件事，必须在设计阶段就定死，不能等测试发现问题再改——那时候 134 个页面里已经有 40 个在各自算金额了。

---

## 13. 开源前的脱敏工程

这部分很少有技术文章写，但我觉得比架构更有价值——因为它是一个"把私有项目变成公开项目"的完整工程。

### 13.1 三类必须清理的东西

| 类别 | 例子 | 危害 |
|---|---|---|
| 真实业务数据 | 数据库 dump、上传的合同附件 | 泄露客户隐私，可能违法 |
| 凭据 | 数据库密码、JWT 密钥、云厂商 AK | 被人直接接管系统 |
| 个人信息 | 真实姓名、手机、住址、简历 | 隐私泄露，被人肉 |

### 13.2 我实际清出来的东西

1. **真实数据库全量快照**（741KB，UTF-16）→ 移到仓外私有目录
2. **批量重置密码的运维脚本**（把所有用户密码改成同一个 BCrypt 哈希）→ 移出
3. **个人简历直链**（带现居地址的 IP 地址）→ 改成"邮件索取"
4. **英文素材说明里的真实姓名和注册地址**（`Yuanzhou District, Yichun City`）→ 改成品牌名

第 4 条是最容易漏的。因为前几轮扫描我都只扫了主 README 和源码，没扫 `产品素材/readme.en.md` 这种附属文件。

**教训**：**脱敏扫描要覆盖"所有会被人读到的文本"，包括那些你写完就忘了的说明文件。**

### 13.3 配置脱敏

```yaml
# 改之前
RABBITMQ_DEFAULT_PASS: yunyuopc123
--spring.datasource.password=123456
--xxl.job.accessToken=yunyuopc-token-2026

# 改之后
RABBITMQ_DEFAULT_PASS: ${RABBITMQ_PASSWORD:?RABBITMQ_PASSWORD is required, see .env.example}
--spring.datasource.password=${MYSQL_PASSWORD:?MYSQL_PASSWORD is required}
--xxl.job.accessToken=${XXL_JOB_ACCESS_TOKEN:?XXL_JOB_ACCESS_TOKEN is required}
```

注意 `:?` 语法——**变量缺失时直接报错退出，而不是静默用弱口令**。这个细节能防住 90% 的"上线忘改密码"事故。

### 13.4 第三方内容的授权

我仓库里还有 224 个 AI 角色定义文件（写代码时给 AI 助手用的），其中 215 个来自开源项目 `agency-agents-zh`（MIT 协议）。

这些文件里**没有任何版权声明**。按 MIT 要求，再分发必须保留版权声明和许可全文。所以我补了：

- `.trae/rules/LICENSE-MIT`（原文，含双版权行）
- `.trae/rules/ATTRIBUTION.md`（说明 215 个归 MIT、9 个自研归 Apache-2.0）
- 根 `NOTICE` 增加一节说明混合授权

**教训**：**开源前要审一遍"哪些代码不是自己写的"**。第三方依赖的许可证（比如 XXL-JOB 是 GPL-3.0）也要在 NOTICE 里说清楚。

---

## 14. 工程数据盘点

不吹不黑，实测数据（`find` + `grep` 统计）：

| 维度 | 数量 |
|---|---|
| 后端 Java 文件 | 1,920 |
| 后端代码行数 | 约 17.9 万行 |
| Controller | 157 |
| Entity / Mapper | 209 / 212 |
| Service 接口 + 实现 | 324 |
| 数据库表 | 约 130 张（3 个业务库） |
| RabbitMQ 队列 | 12 个 `@RabbitListener` |
| 跨模块事件链路 | 10 条 |
| XXL-Job 定时任务 | 40 个方法 / 24 个调度类 |
| 前端页面（portal） | 134 个 Vue |
| 前端 API 文件 | 99 个 TS |
| 前端页面（admin） | 21 个 |

**开发周期**：约 6 个月，全部业余时间，一个人。

**代码构成**：业务逻辑大约占 60%，剩下 40% 是 DTO/VO 转换、Mapper XML、配置、注释。这也是为什么企业级 Java 项目"看起来很臃肿"——**真正的业务逻辑可能只有 10 万行，但外围的样板代码是它的 3 倍**。

---

## 15. 反思：一个人做 ERP 的边界

写了半年，有几个想法想说。

### 15.1 一个人能写多大

能写得比想象中大，但**写不快**。

1920 个 Java 文件听着多，其实大量是 CRUD。真正难的是：

- 业务闭环怎么设计（合同 → 应收 → 账单 → 凭证怎么拆）
- 状态机怎么定（销售申报 7 个状态，每条边都要想清楚）
- 幂等和一致性怎么保证
- 前端 134 个页面的交互一致性

这些都不是"写代码"的问题，是"想清楚"的问题。**一个人做 ERP 的瓶颈不是编码速度，是业务理解的深度。**

### 15.2 我做得不好的地方

诚实说几个：

1. **0 个单元测试**。全靠手工点。这在开源项目里是硬伤，但一个人补测试的成本太高——我现在更倾向于"关键链路（凭证引擎、金额计算）补测试，CRUD 不补"。
2. **没有 CI**。每次发版手工 `mvn package` + `scp`。
3. **接口文档靠手写**。没接 Swagger，`系统API接口总览.md` 是人工维护的，容易过期。
4. **小程序端只有脚手架**。三端里最弱的一环。

### 15.3 值不值得

值得。

不是因为"我做了一个 ERP"，而是因为这半年里我被迫想清楚了很多事：什么是应收账款、为什么要计提、合同变更为什么必须留痕、幂等为什么比性能重要。

**这些东西，看十本书也不如自己写一遍。**

### 15.4 如果重来一次，我会怎么改

这个问题我想过很多次，答案有五条。

**第一，先写凭证引擎，再写业务模块。**

我最初的顺序是"合同 → 客户 → 项目 → 财务"，结果写财务时发现：前面所有业务模块都要回头改，因为凭证生成需要的字段（税率、成本归属、结算方式）前面根本没设计。

正确的顺序应该是：**先把会计科目、凭证规则、借贷逻辑想清楚**，因为财务是终局，所有业务最终都要落到凭证上。终局没想清楚，前面全是返工。

**第二，DTO 不要和 Entity 共用。**

我一开始图省事，Controller 直接收 Entity。结果：前端能改 `id`、能改 `createTime`、能改 `isDeleted`；接口文档看不出哪些字段必填；后面加字段校验只能在 Service 里写 if。

后来全改成 DTO + `@Valid`，虽然多写了 200 个类，但接口契约清晰了，前端也不再乱传字段。

**第三，第一天就接 Swagger。**

我到现在还是手写 `系统API接口总览.md`，132 个接口靠人工维护，已经过期了。`springdoc-openapi` 接进去只要 30 分钟，能省下后面几十个小时的沟通成本。

**第四，把"金额计算"抽成独立的、有测试的模块。**

现在金额计算散在 `ContractServiceImpl`、`SalesDeclarationServiceImpl`、`VoucherEngine` 三处，各算各的。理想状态是有一个 `MoneyCalculator`，纯函数、无副作用、100% 单测覆盖。

**第五，别急着拆微服务。**

如果能重来，我会先用单体把业务跑通（8 个服务合并成 1 个），确认链路没问题，再按写入热点拆。**先拆后合的成本，远高于先合后拆。**

---

## 16. 结语

如果你看到这里，说明你对"一个人造一套系统"这件事有兴趣。给你三个建议：

1. **先想业务闭环，再想技术架构**。我见过太多人一上来就纠结"用不用微服务"，结果业务链路都没跑通。
2. **一致性方案选简单的**。最终一致 + 幂等 + 补偿，比强一致好落地得多。
3. **把踩过的坑记下来**。这篇文的第 12 节，是我这半年最值钱的资产。

项目已开源，采用 Apache-2.0 协议：

- 仓库地址：https://gitee.com/yunyustudio/YunYuSoftDevSystem.git
- 技术栈：Spring Boot 3.5 / Spring Cloud Alibaba / MyBatis-Plus / MySQL 8 / Redis 7 / RabbitMQ / XXL-Job / Vue 3 / TypeScript
- 文档：仓库内 `开发过程完整文档/` 有 100+ 篇设计与复盘文档

如果你也在做类似的事，欢迎交流。一个人写系统很孤独，但写完之后回头看，那条路是值得的。

最后说一句可能有点反直觉的话：**这套系统最大的价值，不是它现在能干什么，而是它逼着我把"一家公司到底怎么运转"想清楚了。**

写合同模块之前，我不知道什么叫"履约偏差"；写凭证引擎之前，我不知道"借贷必相等"为什么要反复校验；写销售申报之前，我以为"收入"就是"收到钱"。这些认知上的修正，比 1900 个 Java 文件更值钱。

所以如果你也在纠结"要不要自己造一个"，我的建议是：**先想清楚你要解决的业务问题，然后动手，哪怕只写一个模块。** 写出来的东西会教你很多，而想出来的架构不会。

---

*本文基于真实项目写成，所有数据、代码、踩坑记录均来自实际开发过程。*
