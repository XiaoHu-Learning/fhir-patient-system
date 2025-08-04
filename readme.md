\# FHIR 病患資料管理系統



一個使用 Node.js 與純前端技術實作的病患資料轉換與上傳工具，能將使用者輸入的初診資料轉換為符合 FHIR 標準格式的 JSON 並成功送往台灣 HAPI FHIR 測試伺服器。

\## 📌 專案目的

透過此專案學習並實作 FHIR（Fast Healthcare Interoperability Resources）資料模型轉換與結構規範，結合表單資料收集、格式轉換、API 串接與視覺輸出，是一個針對醫療資料標準化的入門專案。

---

\## 🛠 技術架構

\- \*\*前端\*\*：HTML + CSS + 原生 JavaScript（無框架）

\- \*\*後端\*\*：Node.js + Express

\- \*\*FHIR 標準\*\*：R4

\- \*\*測試伺服器\*\*：HAPI FHIR 台灣實驗伺服器 \[https://hapi.fhir.tw/fhir](https://hapi.fhir.tw/fhir)

---



\## 📂 專案結構



```

fhir-patient-system/

├── package.json        # 專案依賴

├── app.js              # Node.js 伺服器與 API 路由

├── payload.json        # 測試資料（選用）

├── fhir.js             # 前端 FHIR JSON 格式組裝邏輯

├── public/

│   ├── index.html      # 前端頁面：表單輸入 + JSON 顯示區

│   ├── style.css       # 雙欄響應式美化樣式

│   └── fhir.js         # 表單事件處理與 JSON 顯示邏輯

└── README.md           # 專案說明文件

```



---



\## 🖥 使用方式



\### 1. 安裝與啟動伺服器



```bash

npm install

node app.js

```



啟動後開啟瀏覽器： \[http://localhost:3000](http://localhost:3000)



\### 2. 操作流程



\- 左側填寫病患資料表單

\- 點擊【轉換為 FHIR】 → 右側顯示 FHIR JSON 結構

\- 成功上傳後，顯示 `✅ 病患資料上傳成功！`



---



\## 🔍 FHIR 結構簡例



```json

{

&nbsp; "resourceType": "Patient",

&nbsp; "name": \[{

&nbsp;   "use": "official",

&nbsp;   "text": "王小明"

&nbsp; }],

&nbsp; "gender": "male",

&nbsp; "birthDate": "1995-01-01",

&nbsp; "telecom": \[{

&nbsp;   "system": "phone",

&nbsp;   "value": "0912345678",

&nbsp;   "use": "mobile"

&nbsp; }],

&nbsp; "address": \[{

&nbsp;   "use": "home",

&nbsp;   "text": "高雄市小港區大馬路999號"

&nbsp; }]

}

```
\## 🔧 開發背景與學習歷程

本專案參考以下教學文章進行實作：

📖 \[FHIR 專案教學（by Lorex L. Yang）](https://hackmd.io/rte-MW7\_SuOX1Yg5sMGXtA)

並結合 ChatGPT 與 Claude.ai 的對話協作，引導我這位：
\- 🔰 前端開發初學者
\- 🔰 FHIR 概念入門者

完成了一個具備功能、可實際執行並成功上傳至 FHIR Server 的應用作品，作為學習展示之用。

---

\## 👩‍💻 作者

\- Ruby

---

\## 📝 聲明

本專案僅用於學習與展示之用途，所連結之 HAPI FHIR 測試伺服器為公開環境，不涉及任何真實病患資料。

---
