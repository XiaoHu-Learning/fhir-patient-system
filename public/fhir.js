function convertToFhir(data) {
    const fhirData = {
        resourceType: "Patient",
        identifier: [{
            use: "official",
            type: {
                "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
                "code": "NI",
                "display": "身分證字號"
            },
            value: data.uid
        }],
        name: [{
            use: "official",
            text: data.name
        }],
        birthDate: data.birthDate,
        gender: data.gender,
        telecom: [
            {
                system: "phone",
                value: data.phone_home,
                use: "home"
            },
            {
                system: "phone",
                value: data.phone_work,
                use: "work"
            }, 
            {
                system: "phone",
                value: data.phone_mobile,
                use: "mobile"
            }, 
            {
                system: "email",
                value: data.mail,
                use: "home"
            }
        ],
        address: [{
            use: "home",
            text: data.address
        }],
        contact: [{
            relationship: [{
                text: data.contact_relationship
            }],
            name: {
                use: "official",
                text: data.contact_name
            },
            telecom: [{
                system: "phone",
                value: data.contact_phone,
                use: "home"
            }]
        }],
    };
    return fhirData;
}

function uploadFhirData() {
    // 從表單抓取資料（基於教學文章，但改進性別取得方式）
    const data = {
        name: document.getElementById("name").value, // 姓名
        birthDate: document.getElementById("birthDate").value, // 生日
        gender: document.getElementById("gender_male").checked ? "male" : "female", // 性別
        uid: document.getElementById("uid").value, // 身份證字號
        phone_work: document.getElementById("phone_work").value, // 連絡電話(公)
        phone_home: document.getElementById("phone_home").value, // 連絡電話 (宅)
        phone_mobile: document.getElementById("phone_mobile").value, // 連絡電話 (手機)
        address: document.getElementById("address").value, // 聯絡地址
        mail: document.getElementById("mail").value, // 電子信箱
        contact_name: document.getElementById("contact_name").value, // 緊急聯絡人－姓名
        contact_relationship: document.getElementById("contact_relationship").value, // 緊急聯絡人－關係
        contact_phone: document.getElementById("contact_phone").value // 連絡電話
    }
    
    // 轉換為 FHIR 格式
    const fhirPatient = convertToFhir(data);
    console.log('轉換後的 FHIR 資料:', fhirPatient);

 　// 顯示在右側 FHIR 輸出區塊
    document.getElementById("fhir-output").textContent = JSON.stringify(fhirPatient, null, 2);
    
    // 發送到後端 API
    fetch('/api/patient', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(fhirPatient)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            alert('✅ 病患資料上傳成功！');
            console.log('上傳成功:', result);
        } else {
            alert('❌ 上傳失敗: ' + result.message);
            console.error('上傳錯誤:', result);
        }
    })
    .catch(error => {
        alert('❌ 網路錯誤: ' + error.message);
        console.error('網路錯誤:', error);
    });
}