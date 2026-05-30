(function() {
    // ลบ window.toggleAddress เดิมออก (ถ้ามี) เพื่อล้างค่าฟังก์ชันเก่า
    window.toggleAddress = null;

    const footerHTML = `
    <div style="max-width: 1300px; margin: auto; padding: 0 20px;">
        <div class="rating-form" style="background: #1e1e1e; padding: 25px; border-radius: 15px; margin-bottom: 30px; border: 1px solid #333;">
            <h3 style="font-family: 'Prompt'; color: white; margin-bottom: 15px;">⭐️ ให้คะแนนและแบ่งปันพระพร</h3>
            <select id="uStars" class="u-input" style="width: 100%; padding: 12px; margin-bottom: 12px; border-radius: 8px; background: #2a2a2a; color: #f1c40f; border: 1px solid #444; font-size: 16px;">
                <option value="5">⭐⭐⭐⭐⭐ (ยอดเยี่ยม)</option>
                <option value="4">⭐⭐⭐⭐ (ดีมาก)</option>
                <option value="3">⭐⭐⭐ (ดี)</option>
                <option value="2">⭐⭐ (พอใช้)</option>
                <option value="1">⭐ (ควรปรับปรุง)</option>
            </select>
            <input type="text" id="uName" class="u-input" style="width: 100%; padding: 12px; margin-bottom: 12px; border-radius: 8px; background: #2a2a2a; color: white; border: 1px solid #444;" placeholder="ชื่อของคุณ">
            <textarea id="uMsg" class="u-input" rows="3" style="width: 100%; padding: 12px; margin-bottom: 12px; border-radius: 8px; background: #2a2a2a; color: white; border: 1px solid #444;" placeholder="เขียนความประทับใจของคุณ..."></textarea>
            <button id="submitRatingBtn" style="width: 100%; padding: 15px; background: #4dabff; color: white; border: none; border-radius: 8px; cursor: pointer; font-family: 'Prompt'; font-weight: 600;">ส่งความคิดเห็น</button>
        </div>

        <div style="text-align: center; margin-bottom: 50px; padding: 40px 20px; background: #1e1e1e; border: 1px solid #333; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.4); max-width: 600px; margin: 40px auto;">
            <h2 style="font-family: 'Prompt'; color: #4dabff; margin-bottom: 10px;">💬 ติดต่อคริสตจักร</h2>
            <p style="font-family: 'Sarabun'; color: #eeeeee; font-size: 18px; margin-bottom: 25px; line-height: 1.6;">
                <b>โปรดสแกน QR Code ด้านล่างนี้</b><br>
                เพื่อบอกความต้องการของคุณให้เราทราบ
            </p>
            
            <div style="margin-bottom: 25px;">
                <a href="https://lin.ee/QSq98F6" target="_blank">
                    <img src="https://qr-official.line.me/gs/M_082xyooj_BW.png?oat_สารบัญ" alt="LINE" style="width: 180px; border: 5px solid #2a2a2a; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.3); background: #000000;">
                </a>
            </div>

            <div style="background: #181818; padding: 15px; border: 1px solid #2d2d2d; border-radius: 12px; display: inline-block; text-align: left;">
                <p style="font-family: 'Prompt'; color: #4dabff; margin: 0; font-size: 14px; line-height: 1.6;">
                    📍 <b style="color: #fff;">ท่านสามารถแจ้งความต้องการได้ทันที เช่น:</b><br>
                    • สนใจมาร่วมคริสตจักร<br>
                    • ต้องการศึกษาพระคัมภีร์ที่บ้าน<br>
                    • ขอคำปรึกษาหรือให้เราอธิษฐานเผื่อ
                </p>
            </div>
            
            <div style="margin-top: 30px; border-top: 1px solid #333; padding-top: 20px;">
                <h3 style="margin-bottom: 10px; font-family: 'Prompt'; color: #666; font-size: 12px; font-weight: 400;">สถิติผู้เยี่ยมชม</h3>
                <a href="https://info.flagcounter.com/iWY4" style="display: inline-block; max-width: 100%;">
                    <img src="https://s01.flagcounter.com/countxl/iWY4/bg_FFFFFF/txt_000000/border_CCCCCC/columns_5/maxflags_20/viewers_0/labels_1/pageviews_1/flags_0/percent_0/" alt="Flag Counter" border="0" style="max-width: 100%; height: auto; display: block;">
                </a>
            </div>
        </div>
    </div>

    <div class="marquee-box">
        <marquee scrollamount="5" style="color: #4dabff; font-family: 'Prompt';">
            เพราะว่าพระเจ้าทรงรักโลก จนได้ทรงประทานประบุตรของพระองค์ เพื่อทุกคนที่วางใจในพระบุตรนั้นจะไม่พินาศ แต่มีชีวิตนิรันดร์ ยอห์น 3 : 16 
        </marquee>
    </div>

    <footer style="background: #0a2c6d; color: white; text-align: center; padding: 60px 20px; border-top: 6px solid #4dabff;">
        <img src="logo.png" onerror="this.src='logo.png'" style="width: 80px; border-radius: 50%; margin-bottom: 20px; border: 2px solid rgba(255,255,255,0.2);">
        <br>
        <strong style="font-family:'Prompt'; font-size: 24px; display: block; margin-bottom: 15px; letter-spacing: 1px;">คริสตจักรแบ๊พติสต์บางเขน</strong>
        
        <div style="max-width: 700px; margin: 0 auto; line-height: 1.8; font-family: 'Sarabun'; font-size: 16px;">
            <p style="margin-bottom: 10px;">🕒 <b style="color: #4dabff;">เวลานมัสการ:</b> ทุกวันอาทิตย์ เวลา 09.00 - 12.00 น.</p>
            <p style="margin-bottom: 10px;">📍 2172/145-147 ซอยพหลโยธิน 36 ถนนพหลโยธิน<br>แขวงลาดยาว เขตจตุจักร กรุงเทพมหานคร 10900</p>
            <div style="margin-top: 20px; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 10px; display: inline-block;">
                <p style="font-size: 22px; color: #4dabff; font-weight: bold; margin: 0;">📞 โทร: 02-579-8764</p>
            </div>
        </div>
        
        <div style="margin-top: 40px; font-size: 13px; opacity: 0.4;">
            © 2026 Bangkhen Baptist Church | All Rights Reserved
        </div>
    </footer>
    `;

    // ค้นหาตำแหน่งและใส่ HTML
    document.body.insertAdjacentHTML('beforeend', footerHTML);
})();
