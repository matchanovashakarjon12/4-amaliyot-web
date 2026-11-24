const konteyner = document.querySelector("#konteyner");
const qidiruv = document.querySelector("#qidiruv");
const kategoriya = document.querySelector("#kategoriya");
const saralash = document.querySelector("#saralash");
const soni = document.querySelector("#soni");
const bosh = document.querySelector("#bosh-xabar");


function statistikaniChiqar() {
  const jami = mahsulotlar.length;
  const jamiNarx = mahsulotlar.reduce((s, m) => s + m.narx, 0);
  const ortacha = Math.round(jamiNarx / jami);
  const engQimmat = mahsulotlar.reduce((a, b) => (b.narx > a.narx ? b : a));
  const eng = mahsulotlar.find(m => m.id === engQimmat.id);

  document.querySelector("#st-jami").textContent = jami;
  document.querySelector("#st-ortacha").textContent = formatla(ortacha);
  document.querySelector("#st-qimmat").textContent = eng.nomi;
}


function kategoriyalarniToldir() {
  const turlar = [...new Set(mahsulotlar.map(m => m.kategoriya))];
  turlar.forEach(t => {
    const opt = document.createElement("option");
    opt.value = t;
    opt.textContent = t;
    kategoriya.append(opt);
  });
}


function chiqar(royxat) {
  konteyner.innerHTML = "";
  royxat.forEach(m => {
    const karta = document.createElement("article");
    karta.className = "karta";
    karta.dataset.id = m.id;

    const rasm = document.createElement("img");
    rasm.src = m.rasm;
    rasm.alt = m.nomi;
    rasm.addEventListener("error", () => rasm.classList.add("yashir")); // rasm yo‘q bo‘lsa

    const h3 = document.createElement("h3");
    h3.textContent = m.nomi;

    const kat = document.createElement("p");
    kat.className = "kat";
    kat.textContent = m.kategoriya;

    const narx = document.createElement("p");
    narx.className = "narx";
    narx.textContent = formatla(m.narx);

    const holat = document.createElement("p");
    holat.className = m.mavjud ? "holat bor" : "holat yoq";
    holat.textContent = m.mavjud ? "Mavjud" : "Mavjud emas";

    const tugma = document.createElement("button");
    tugma.className = "batafsil";
    tugma.type = "button";
    tugma.dataset.id = m.id;
    tugma.textContent = "Batafsil";

    karta.append(rasm, h3, kat, narx, holat, tugma);
    konteyner.append(karta);
  });
  soni.textContent = royxat.length;
  bosh.hidden = royxat.length !== 0;   
}


function yangila() {
  const soz = qidiruv.value.trim().toLowerCase();
  const tur = kategoriya.value;

  let natija = mahsulotlar.filter(m =>
    m.nomi.toLowerCase().includes(soz) && (tur === "hammasi" || m.kategoriya === tur)
  );

  natija = [...natija].sort((a, b) => {
    if (saralash.value === "narx-osish") return a.narx - b.narx;
    if (saralash.value === "narx-kamayish") return b.narx - a.narx;
    if (saralash.value === "nom") return a.nomi.localeCompare(b.nomi, "uz");
    return a.id - b.id;
  });

  chiqar(natija);
}

qidiruv.addEventListener("input", yangila);
kategoriya.addEventListener("change", yangila);
saralash.addEventListener("change", yangila);


konteyner.addEventListener("click", e => {
  const tugma = e.target.closest(".batafsil");
  if (!tugma) return;
  const tanlangan = mahsulotlar.find(m => m.id === Number(tugma.dataset.id));
  modalOch(tanlangan);
});

statistikaniChiqar();
kategoriyalarniToldir();
yangila();