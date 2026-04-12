const texts = {
  th: {
    home: "หน้าแรก",
    about: "เกี่ยวกับเรา",
    schedule: "ตารางนมัสการ",
    news: "ข่าวสาร",
    contact: "ติดต่อ",
    welcome: "ยินดีต้อนรับ",
    word: "พระคำพระเจ้า",
    verse: '"พระเจ้าทรงเป็นความรัก"',
    contact_title: "ติดต่อเรา",
    send: "ส่งข้อความ",
    news_title: "ข่าวสาร",
    news_event_title: "กิจกรรมพิเศษ",
    news_event_desc: "นมัสการพิเศษวันอาทิตย์นี้"
  },
  en: {
    home: "Home",
    about: "About Us",
    schedule: "Schedule",
    news: "News",
    contact: "Contact",
    welcome: "Welcome",
    word: "Word of God",
    verse: '"God is Love"',
    contact_title: "Contact Us",
    send: "Send",
    news_title: "News",
    news_event_title: "Special Event",
    news_event_desc: "Special Sunday Worship"
  },
  id: {
    home: "Beranda",
    about: "Tentang Kami",
    schedule: "Jadwal",
    news: "Berita",
    contact: "Kontak",
    welcome: "Selamat Datang",
    word: "Firman Tuhan",
    verse: '"Tuhan adalah Kasih"',
    contact_title: "Hubungi Kami",
    send: "Kirim",
    news_title: "Berita",
    news_event_title: "Acara Khusus",
    news_event_desc: "Ibadah hari Minggu"
  },
  my: {
    home: "ပင်မစာမျက်နှာ",
    about: "အကြောင်း",
    schedule: "အချိန်ဇယား",
    news: "သတင်း",
    contact: "ဆက်သွယ်ရန်",
    welcome: "ကြိုဆိုပါသည်",
    word: "ဘုရားသခင်၏ နှုတ်ကပတ်တော်",
    verse: '"ဘုရားသခင်သည် ချစ်ခြင်းမေတ္တာဖြစ်သည်"',
    contact_title: "ဆက်သွယ်ရန်",
    send: "ပို့ရန်",
    news_title: "သတင်း",
    news_event_title: "အထူးအစီအစဉ်",
    news_event_desc: "တနင်္ဂနွေနေ့ ဝတ်ပြုမှု"
  }
};

/**
 * 1. ตรวจสอบภาษาที่ควรใช้ (Priority: Storage > System > Default)
 */
function getTargetLang() {
  const saved = localStorage.getItem("lang");
  if (saved) return saved;

  const sys = navigator.language || navigator.userLanguage;
  const langKey = sys.split('-')[0]; // ตัดค่าเช่น 'en-US' ให้เหลือแค่ 'en'

  return texts[langKey] ? langKey : "en"; // ถ้าไม่มีในลิสต์ให้ใช้ภาษาอังกฤษ
}

/**
 * 2. ฟังก์ชันเปลี่ยนภาษา พร้อมอัปเดต UI
 */
function setLang(lang) {
  // บันทึกค่าลง Storage
  localStorage.setItem("lang", lang);
  
  // อัปเดต Attribute 'lang' ของ HTML (ช่วยเรื่อง SEO และ Screen Reader)
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-lang]").forEach(el => {
    const key = el.getAttribute("data-lang");
    
    // ค้นหาข้อความ (Fallback ไปที่ภาษาอังกฤษถ้าหาคีย์ในภาษานั้นไม่เจอ)
    const translation = (texts[lang] && texts[lang][key]) || texts['en'][key];
    
    if (translation) {
      // ถ้าเป็น Input หรือ Textarea ให้เปลี่ยน placeholder แทน
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = translation;
      } else {
        el.innerText = translation;
      }
    }
  });
}

/**
 * 3. เริ่มทำงานเมื่อ DOM โหลดเสร็จ (เร็วกว่า window.onload)
 */
document.addEventListener("DOMContentLoaded", () => {
  setLang(getTargetLang());
});
