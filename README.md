# MEECROSS

Toshkentdagi MEECROSS krossovka do'koni uchun 3D sayt: aylantiriladigan krossovka, 71 modelli katalog va Telegram orqali buyurtma. Tillari: o'zbekcha va ruscha.

**Sayt:** https://sjz0606.github.io/meecross/

- **Do'kon:** Shota Rustaveli 57, Yakkasaroy, 10:00–22:00
- **Instagram:** [@meecross_uz](https://www.instagram.com/meecross_uz/)
- **Telegram:** [@Mekross_uz](https://t.me/Mekross_uz)

## Imkoniyatlar

- **3D krossovka:** sudrab va sahifani aylantirib buriladi, 3 rangi bor, tanlangan rang katalogga bog'lanadi.
- **Katalog:** o'lcham (36–46), rang va narx bo'yicha filtr.
- **Buyurtma:** admin Telegram'iga model raqami, o'lcham va post havolasi bilan tayyor xabar ochiladi.
- **Do'kon materiallari:** 3D halqadagi reels, javon va fasad videolari, mijozlar fikrlari.
- **Manzil:** Yandex xarita.

## Texnologiyalar

Build bosqichi yo'q, sof HTML, CSS va JavaScript.

- [three.js](https://threejs.org/) r170: 3D sahna, GLB va `KHR_materials_variants`
- [GSAP](https://gsap.com/) va ScrollTrigger: aylantirish animatsiyalari
- Kutubxonalar `vendor/` ichida, tashqi CDN kerak emas

## Ishga tushirish

three.js modullari `file://` orqali ishlamaydi, shuning uchun server kerak:

```bash
python -m http.server 8177 --bind 127.0.0.1
```

Keyin http://127.0.0.1:8177/ ni oching.

## Tuzilma

```text
index.html      sahifa
css/style.css   uslublar
js/app.js       tarjimalar, filtrlar, buyurtma, reels
js/scene.js     3D sahna
js/data.js      katalog ma'lumotlari
assets/         3D model, mahsulot rasmlari, video va posterlar
vendor/         three.js va GSAP
```

Yangi model yoki narx `js/data.js` da o'zgartiriladi.

## Manbalar va litsenziyalar

- **Katalog:** Telegram @Mekross_uz, 2026-yil iyul–noyabr postlari. Ranglar rasmga qarab qo'lda belgilangan.
- **Video va fotolar:** Instagram @meecross_uz.
- **Fikrlar:** kanaldagi mijoz xabarlari; lotinga o'girilgan va imlosi tahrirlangan, ruschasi tarjima qilingan.
- **3D model:** [MaterialsVariantsShoe](https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/MaterialsVariantsShoe), Shopify, CC BY 4.0. Bu do'kon mahsuloti emas; footerdagi muallif yozuvini olib tashlamang.
- **Kutubxonalar:** har biri o'z litsenziyasi asosida (`vendor/` ichidagi fayllar).

Do'kon rasm, video va matnlari egasiga tegishli. Bu materiallarga ochiq litsenziya berilmagan.

## Sinov

2026-11-02, headless Edge, dasturiy GPU, 1440x900 va 390x844:

- Gorizontal siljish, konsol xatosi va buzilgan rasm yo'q
- UZ rejimida kirill matn yo'q
- O'lcham filtri sonlari ma'lumotga mos, 3 rang piksel bilan tekshirilgan
- Videolar va xarita ishlaydi

Haqiqiy telefon, haqiqiy GPU va sekin tarmoqda sinalmagan.
