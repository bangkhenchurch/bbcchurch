const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔴 TOKEN ของคุณ
const LINE_TOKEN = "3VxTLRjbFLA6Agy0Z8srtRh6O6jZTO2YEx+zxhvfDlYYLx2ZcR2jymh/Lby85r3y0fe/uTLYOW4SJ98MNkh6Z0XnLFx1PcQibOBAdOpNohtObHX25m//ULk7+AWpwApTN13L1Fe1u7pEEM53JoqtFQdB04t89/1O/w1cDnyilFU=";
const GROUP_ID = "C32a6bb4b962262c82131209a6bc4fac4";

// ✅ หน้าเช็ค
app.get("/", (req, res) => {
  res.send("✅ BBC Church API is running");
});

// ✅ รับฟอร์ม
app.post("/send", async (req, res) => {
  try {
    const {
      fullname,
      phone,
      lineid,
      address,
      worship, // ✅ เพิ่มตรงนี้
      study    // ✅ เพิ่มตรงนี้
    } = req.body;

    // 🔥 validation
    if (!fullname || !phone) {
      return res.status(400).send("กรอกชื่อและเบอร์ก่อน");
    }

    // 🔥 ข้อความ
    const msg = `
📌 มีคนกรอกฟอร์มจากเว็บไซต์
--------------------
ชื่อ: ${fullname}
โทร: ${phone}
LINE: ${lineid || "-"}
ที่อยู่: ${address || "-"}
--------------------
ความต้องการ:
${worship ? "☑ ต้องการไปร่วมนมัสการพระเจ้าที่คริสต์จักร" : "☐ ต้องการไปร่วมนมัสการพระเจ้าที่คริสต์จักร"}
${study ? "☑ ต้องการเอกสาร เพื่อศึกษาที่บ้าน" : "☐ ต้องการเอกสาร เพื่อศึกษาที่บ้าน"}
`;

    // 🔥 ส่งเข้า LINE
    await axios.post(
      "https://api.line.me/v2/bot/message/push",
      {
        to: GROUP_ID,
        messages: [
          {
            type: "text",
            text: msg
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${LINE_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.send("ok");

  } catch (err) {
    console.error("❌ ERROR:", err.response?.data || err.message);
    res.status(500).send("error");
  }
});

// ✅ เปิด server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Server running on port " + PORT);
});
