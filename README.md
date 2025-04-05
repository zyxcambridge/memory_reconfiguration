# memory_reconfiguration

项目名称：职场危机应对系统（升级版）

⸻

1. 技术栈
	•	使用 HTML + Tailwind CSS + JavaScript 开发，页面需支持 手机、平板、PC多端适配，交互简洁高效。
	•	集成 心理训练模块、法律策略模拟模块、证据管理工具 和 谈判演练系统。
	•	前端实现交互式选择题、场景对话模拟、情绪调节小组件等。
	•	支持 离线备份 + 本地数据存储加密，保障用户隐私安全。

flowchart LR
    subgraph   User
        User[用户]
    end
    subgraph   Application
        App[App.tsx]
        Header[Header.tsx]
        Hero[Hero.tsx]
        Features[Features.tsx]
        HowItWorks[HowItWorks.tsx]
        Testimonials[Testimonials.tsx]
        Toolkit[Toolkit.tsx]
        EmergencyKit[EmergencyKit.tsx]
        PaymentPage[PaymentPage.tsx]
        PaymentService[PaymentService.tsx]
        StripePayment[StripePayment.tsx]
        CrisisForm[CrisisForm.tsx]
    end
    subgraph   Server
        Server[server/index.ts]
    end
    subgraph   Database
        DB[数据库]
    end
    User -->|访问| App
    App -->|渲染| Header
    App -->|渲染| Hero
    App -->|渲染| Features
    App -->|渲染| HowItWorks
    App -->|渲染| Testimonials
    App -->|渲染| Toolkit
    App -->|渲染| EmergencyKit
    App -->|渲染| PaymentPage
    App -->|渲染| PaymentService
    App -->|渲染| StripePayment
    App -->|渲染| CrisisForm
    PaymentPage -->|调用| Server
    Server -->|处理| DB
    Server -->|返回| PaymentPage
    PaymentService -->|调用| StripePayment
    StripePayment -->|调用| Server
    Server -->|处理| DB
    Server -->|返回| StripePayment
    StripePayment -->|返回| PaymentService
    CrisisForm -->|调用| Server
    Server -->|处理| DB
    Server -->|返回| CrisisForm
⸻

2. 核心功能

✅ 场景重现模拟器（Prompt式记忆重写）
	•	用户输入过往遗憾场景（如“被HR当天辞退”），系统将以 AI剧本还原+角色扮演 的方式帮助用户重新体验当时场景。
	•	支持：
	•	对话重构（HR话术 & 你的应答）
	•	可选行动路径（继续沉默 vs 提出异议 vs 寻求协商）
	•	后悔/遗憾点识别（AI自动总结错过的关键决策节点）

✅ 职场急救包生成器
	•	遭遇突发事件（如辞退、PUA、变相降薪）时，一键生成“法律+心理+行动”三位一体应对清单：
	•	📌法律处理：模板话术 + 录音建议 + 律师联系方式
	•	🧠心理稳定：478呼吸法、焦虑笔记法、冥想引导音频
	•	⚒️行动清单：备份资料→录音→拖延话术→咨询律师→澄清协议

✅ 心理反刍终止系统
	•	提供 认知切割+生理脱敏组合方案，包括：
	•	可交互焦虑时间表（可设置“15分钟焦虑窗口”）
	•	写下负面想法后数字化封存（或“燃烧动画”释放心情）
	•	精油嗅觉/冥想背景音乐辅助功能

✅ 职场谈判力训练营（交互式）
	•	包括：
	•	✅ 拒绝练习（如何不愧疚地说“不”）
	•	✅ 拖延战术演练（应对HR紧迫安排）
	•	✅ 澄清措辞设计（不主动辞职也不激化矛盾）
	•	✅ 权利申明模块（自动识别劳动法条文 + 生成话术）

✅ 证据管理工具
	•	快速收集以下内容并导出至本地/加密云端：
	•	📸工时截图 / 📄绩效文件 / 📑HR发言录音 / 💰薪资条
	•	内置证据分类系统（“解雇证明”、“绩效证明”、“工资记录”）

⸻

3. 页面结构建议

Header
	•	项目Logo + 主导航（功能模块 | 危机指南 | 法律资源 | 用户故事 | 联系我们）

Hero Section
	•	强烈视觉提示：“你不是孤立无援的个体，你有权利、有工具、有出路。”
	•	配置焦虑转化按钮：“我今天很难受 → 一键启动危机应对模式”

Features 展示区
	•	记忆重写：让你在“如果重来一次”的场景中，学习最优应对路径
	•	职场急救包：关键时刻不慌乱，有章可循
	•	谈判演练系统：从沉默到主导，你只差一个剧本
	•	心理调适区：从“内耗”中脱身，回归现实

How It Works
	•	Step 1: 输入你曾经历或担心的职场危机，文本框，输入离职的录音文字版本
	•	Step 2: 系统生成“剧本+策略+应对动作”
	•	Step 3: 你可以选择“训练”“模拟”“行动”

Testimonials
	•	职场人真实反馈：“我本来以为自己完了，没想到可以这样冷静处理！”

Toolkit Download Area
	•	提供《职场危机应对清单》《澄清话术模板》《谈判准备手册》等资源包下载

⸻

4. 核心文案风格
	•	全部中文，语言风格要求：
	•	共情+权威
	•	既有温度（承认用户焦虑）也有锚点（给出明确操作）
	•	强调“行动比情绪更有力量”、“掌控权从行动开始”

⸻

5. 互动亮点
	•	✅ 情景对话模拟（基于GPT角色扮演）
	•	✅ AI生成“最佳反应话术”
	•	✅ 焦虑记录器（每次写完就有一句“心理打气语”）
	•	✅ 法律地图导航（全国仲裁委员会联系方式）

⸻

6. 优化与扩展建议
	•	法律对话知识图谱扩展：让用户提出问题时可追溯法条+解读
	•	社群互助模块：大家匿名分享经历、交流策略
	•	语音版训练包：让用户上下班路上也能做练习
	•	数据安全加密：用户隐私使用 WebCrypto 加密后存储于本地或云端

