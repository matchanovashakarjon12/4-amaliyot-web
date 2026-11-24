function formatla(son) {
  return String(son).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so‘m";
}

const modal = document.querySelector("#modal");

function modalOch(m) {
  if (!modal) return;
  modal.querySelector("#modal-nomi").textContent = m.nomi;
  modal.querySelector("#modal-tavsif").textContent = m.tavsif;
  modal.querySelector("#modal-kategoriya").textContent = "Kategoriya: " + m.kategoriya;
  modal.querySelector("#modal-narx").textContent = "Minimal summa: " + formatla(m.narx);
  modal.querySelector("#modal-daromad").textContent = "Taxminiy daromad: " + m.daromad + "% yiliga";
  modal.querySelector("#modal-holat").textContent = m.mavjud ? "Hozir mavjud" : "Hozircha mavjud emas";

  const teglar = modal.querySelector("#modal-teglar");
  teglar.innerHTML = "";               // faqat tozalash (foydalanuvchi matni yo‘q)
  m.teglar.forEach(t => {
    const span = document.createElement("span");
    span.className = "tegl";
    span.textContent = t;
    teglar.append(span);
  });
  modal.hidden = false;
}

function modalYop() {
  modal.hidden = true;
}

if (modal) {

    modal.addEventListener("click", e => {
    if (e.target === modal || e.target.closest("#modal-yopish")) modalYop();
  });
  // Escape tugmasi
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !modal.hidden) modalYop();
  });
}

const forma = document.querySelector("#aloqa-forma");

if (forma) {
  const qoidalar = {
    ism: v => v.trim() === "" ? "Ismingizni kiriting"
      : v.trim().length < 2 ? "Ism kamida 2 ta belgidan iborat bo‘lsin" : "",
    email: v => v.trim() === "" ? "Email kiriting"
      : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "Email formati noto‘g‘ri" : "",
    telefon: v => v.trim() === "" ? "Telefon raqamini kiriting"
      : !/^\+998\d{9}$/.test(v.trim()) ? "Format: +998XXXXXXXXX" : "",
    xabar: v => v.trim() === "" ? "Xabar yozing"
      : v.trim().length < 10 ? "Xabar kamida 10 ta belgi bo‘lsin"
      : v.trim().length > 500 ? "Xabar 500 belgidan oshmasin" : ""
  };
  const muvaffaqiyat = document.querySelector("#muvaffaqiyat");

  function tekshir(nom) {
    const maydon = forma.elements[nom];
    const xato = qoidalar[nom](maydon.value);
    document.querySelector("#xato-" + nom).textContent = xato;
    maydon.classList.toggle("xato", xato !== "");
    return xato === "";
  }

  forma.addEventListener("submit", e => {
    e.preventDefault();
    const hammasiTogri = Object.keys(qoidalar).map(tekshir).every(Boolean);
    if (hammasiTogri) {
      muvaffaqiyat.textContent = "Xabaringiz muvaffaqiyatli yuborildi. Rahmat!";
      forma.reset();
    } else {
      muvaffaqiyat.textContent = "";
    }
  });

  forma.addEventListener("input", e => {
    if (e.target.name in qoidalar) tekshir(e.target.name);
  });
}

const temaTugma = document.querySelector("#tema-tugma");

if (localStorage.getItem("tema") === "tun") document.body.classList.add("tun");

if (temaTugma) {
  temaTugma.addEventListener("click", () => {
    const tun = document.body.classList.toggle("tun");
    localStorage.setItem("tema", tun ? "tun" : "kun");
  });
}

const menyuTugma = document.querySelector("#menyu-tugma");
const menyu = document.querySelector("#menyu");

if (menyuTugma && menyu) {
  menyuTugma.addEventListener("click", () => {
    const ochiq = menyu.classList.toggle("ochiq");
    menyuTugma.setAttribute("aria-expanded", ochiq);
  });
}