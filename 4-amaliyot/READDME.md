# 4-amaliy ish — MoliyaviyYo‘l (JavaScript)

**Loyiha mavzusi:** MoliyaviyYo‘l — jamg‘arma va investitsiya bo‘yicha maslahatlar sayti.

## Qo‘shilgan imkoniyatlar
- Ma’lumotlar massivi (12 ta obyekt) va statistika bloki
- Kartalarni JS orqali yaratish (createElement, textContent)
- Qidiruv, kategoriya filtri va saralash (birgalikda ishlaydi)
- «Hech narsa topilmadi» xabari va elementlar sonini yangilash
- Modal oyna (×, fon ustiga bosish, Escape)
- Event delegation (kartalar konteyneriga bitta tinglovchi)
- Aloqa formasi tekshiruvi (bo‘sh maydon, email, +998 telefon, matn uzunligi)
- Tungi rejim (localStorage) va mobil menyu

## Massiv metodlari qayerda
| Metod | Fayl | Vazifasi |
|---|---|---|
| reduce | js/katalog.js, `statistikaniChiqar` | jami narx, eng qimmat element |
| find | js/katalog.js | statistika; modal uchun tanlangan element |
| map | js/katalog.js, `kategoriyalarniToldir` | kategoriyalar ro‘yxati |
| filter | js/katalog.js, `yangila` | qidiruv va kategoriya filtri |
| sort | js/katalog.js, `yangila` | narx va nom bo‘yicha saralash |