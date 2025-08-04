const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;

// 中間件設定
app.use(express.json());
app.use(express.static('public')); // 提供靜態檔案

const baseURL = "https://hapi.fhir.tw/fhir";

// 根路由 - 提供表單頁面
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API 路由 - 處理病患資料上傳
app.post('/api/patient', async (req, res) => {
    try {
        console.log('正在上傳病患資料到 FHIR 伺服器...');
        console.log('接收到的資料:', req.body);
        
        const response = await axios.post(`${baseURL}/Patient`, req.body);
        
        console.log("✅ 傳送成功！");
        res.json({
            success: true,
            message: '病患資料上傳成功',
            data: response.data
        });
        
    } catch (error) {
        console.log("❌ 發生錯誤！");
        
        let errorInfo = {
            success: false,
            message: '上傳失敗'
        };
        
        if (error.response) {
            console.log("錯誤狀態：", error.response.status);
            console.log("錯誤訊息：", error.response.data);
            errorInfo.status = error.response.status;
            errorInfo.details = error.response.data;
        } else {
            console.log("網路錯誤：", error.message);
            errorInfo.details = error.message;
        }
        
        res.status(500).json(errorInfo);
    }
});

// 啟動服務器
app.listen(port, () => {
    console.log(`🚀 服務器運行在 http://localhost:${port}`);
    console.log(`📝 開啟瀏覽器訪問表單頁面`);
});