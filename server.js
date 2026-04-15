const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const LINE_TOKEN = "YOUR_LINE_TOKEN";

// ส่งข้อมูลเข้า LINE
app.post("/send", async (req, res) => {
  try {
    const msg = `
📌 มีคนกรอกฟอร์มจากเว็บไซต์
--------------------
ชื่อ: ${req.body.fullname}
โทร: ${req.body.phone}
LINE: ${req.body.lineid}
ที่อยู่: ${req.body.address}
--------------------
`;

    await axios.post(
      "https://notify-api.line.me/api/notify",
      new URLSearchParams({ message: msg }),
      {
        headers: {
          Authorization: `Bearer ${LINE_TOKEN}`
        }
      }
    );

    res.send("ok");
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
});

// เปิด server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
