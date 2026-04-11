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

// ตรวจภาษาเครื่อง
function detectLang() {
  const sys = navigator.language || navigator.userLanguage;

  if (sys.includes("th")) return "th";
  if (sys.includes("id")) return "id";
  if (sys.includes("my")) return "my";
  return "en";
}

// set language
function setLang(lang) {
  localStorage.setItem("lang", lang);

  document.querySelectorAll("[data-lang]").forEach(el => {
    const key = el.getAttribute("data-lang");
    if (texts[lang] && texts[lang][key]) {
      el.innerText = texts[lang][key];
    }
  });
}

// load
window.onload = () => {
  const lang = localStorage.getItem("lang") || detectLang();
  setLang(lang);
};
