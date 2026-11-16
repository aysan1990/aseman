# آسمان (Aseman) - تحلیل هوش مصنوعی ارز دیجیتال

سایت سیگنال گیری ارز دیجیتال با بک‌اند Node.js + Express برای استقرار روی رندر (Render).

## امکانات

- 📊 چارت زنده کندل‌ستیک (دیتای واقعی از Binance)
- 💰 قیمت زنده از CoinGecko
- 🔍 اسکنر بازار با تغییرات ۲۴ساعته
- 🤖 چت هوش مصنوعی آسمان
- 📈 ابزارهای تحلیلی: ساختار بازار، زون عرضه و تقاضا، أوردر بلاک، FVG
- 🎯 فرصت‌های معامله با ستاپ، حد ضرر و هدف
- 🐋 بخش آماده برای اتصال API Hyperliquid
- ⚡ دکمه Ctrl K برای چت سریع
- 📱 طراحی رسponsive و RTL

## ساختار فایل‌ها

```
aseman-web/
├── server.js              # بک‌اند Express
├── package.json           # وابستگی‌ها
├── .env.example           # نمونه متغیرهای محیطی
├── render.yaml            # تنظیمات استقرار رندر
├── README.md
└── public/                # فریم‌تند (استاتیک)
    ├── index.html
    ├── css/
    │   └── style.css
    └── js/
        ├── config.js
        ├── api.js         # تماس با بک‌اند (proxy)
        ├── chart.js
        ├── ai.js
        ├── scanner.js
        └── app.js
```

## استقرار روی رندر (Render)

### روش ۱: با render.yaml (ساده ترین)

1. کد را در ریپوزیتوری گیت‌هاب آپلود کنید
2. به [render.com](https://render.com) بروید
3. دکمه **New » Web Service** را بزنید
4. ریپوزیتوری `aseman-web` را انتخاب کنید
5. تنظیمات به شکل زیر:
   - **Name:** `aseman`
   - **Environment:** `Node`
   - **Branch:** `main`
   - **Region:** `Frankfurt` (یا نزدیک به شما)
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. دکمه **Create Web Service** را بزنید

### روش ۲: تنظیم دستی

اگر render.yaml کار نکرد، به صورت دستی مقادیر زیر را وارد کنید:

| فیلد | مقدار |
|------|-------|
| Name | `aseman` |
| Environment | `Node` |
| Branch | `main` |
| Build Command | `npm install` |
| Start Command | `npm start` |

## اجرا محلی (Development)

```bash
cd /home/user/aseman-web
npm install
npm start
```

سایت در `http://localhost:5000` در دسترس می‌باشد.

## اتصال API صرافی (بعدی)

هنگامی که کلید API صرافی (بایننس، بایت‌بیت و ...) را دارید:

1. فایل `.env.example` را کپی کنید و نام آن را `.env` بگذارید
2- کلیدها را در `.env` وارد کنید
3- در `server.js` متدهای جدید برای استفاده از API کلید اضافه کنید

## مهم

- این سایت **وب سرویس (Web Service)** است و برای رندر باید از نوع **Web Service / Node** انتخاب شود
- اگر **Static Site** انتخاب کنید، بک‌اند اجرا نمی‌شود و APIها کار نمی‌کنند

---

**آسمان** - تحلیل هوش مصنوعی ارز دیجیتال  
داده‌ها از منابع رایگان اینترنتی دریافت می‌شوند و توصیه‌ی خرید و فروش نیستند.