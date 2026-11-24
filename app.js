const WA = "93787861544";
const TG = "Nexify_Telegram";
const CATS = {s:"⭐ استارز تلگرام", p:"💎 تلگرام پریمیوم", u:"🎮 یوسی پابجی"};
const ITEMS = [
  ["s","50 استارز تلگرام","85","فقط با آیدی تلگرام بدون رمز",0],
  ["s","100 استارز تلگرام","165","تحویل فوری ۵ تا ۱۵ دقیقه",1],
  ["s","250 استارز تلگرام","400","مناسب حمایت و هدیه در تلگرام",0],
  ["s","500 استارز تلگرام","780","قیمت اقتصادی و تضمینی",0],
  ["s","1000 استارز تلگرام","1,520","ویژه کانال‌ها و کاربران پرمصرف",0],
  ["p","تلگرام پریمیوم ۳ ماهه","1,150","فعالسازی رسمی (گیفت) بدون رمز",0],
  ["p","تلگرام پریمیوم ۶ ماهه","1,650","فعالسازی قانونی با ضمانت کامل",1],
  ["p","تلگرام پریمیوم ۱۲ ماهه","2,850","به‌صرفه‌ترین بسته سالانه",0],
  ["u","60 یوسی پابجی موبایل","85","شارژ قانونی و آنی با UID",0],
  ["u","325 یوسی پابجی موبایل","420","مناسب رویال پس • تحویل ۵ دقیقه",1],
  ["u","660 یوسی پابجی موبایل","820","شارژ مستقیم بدون خطر بن",0],
  ["u","1800 یوسی پابجی موبایل","2,100","بسته ویژه پابجی‌بازها با UID",0]
];

let cur = null;

function render(cat) {
  const g = document.getElementById("grid");
  g.innerHTML = ITEMS.map((x, i) => {
    if (cat !== "a" && x[0] !== cat) return "";
    const hot = x[4] ? '<span class="hot">پرفروش</span>' : "";
    return `<article class="card ${x[0]}">
      <div class="ct"><span class="tag">${CATS[x[0]]}</span>${hot}</div>
      <h3>${x[1]}</h3>
      <p>${x[3]}</p>
      <div class="pr"><span>قیمت بسته:</span><b>${x[2]} افغانی</b></div>
      <button class="ord" onclick="openM(${i})">ثبت سفارش</button>
    </article>`;
  }).join("");
}

function filterCat(cat, btn) {
  document.querySelectorAll(".tb").forEach(b => b.classList.remove("on"));
  if (btn) btn.classList.add("on");
  render(cat);
}

function openM(i) {
  cur = ITEMS[i];
  document.getElementById("mTitle").textContent = "سفارش: " + cur[1];
  document.getElementById("mPrice").textContent = "مبلغ: " + cur[2] + " افغانی";
  const lbl = document.getElementById("mLbl");
  const inp = document.getElementById("mId");
  if (cur[0] === "u") {
    lbl.textContent = "آیدی عددی پابجی (UID):";
    inp.placeholder = "مثلاً 5123456789";
  } else {
    lbl.textContent = "آیدی تلگرام (Username):";
    inp.placeholder = "مثلاً @username";
  }
  inp.value = "";
  document.getElementById("mNote").value = "";
  document.getElementById("modal").classList.add("open");
}

function closeM() {
  document.getElementById("modal").classList.remove("open");
}

function sendOrder(via) {
  const id = document.getElementById("mId").value.trim();
  if (!id) {
    alert("لطفاً آیدی تلگرام یا UID پابجی را وارد کنید.");
    return;
  }
  const pay = document.getElementById("mPay").value;
  const note = document.getElementById("mNote").value.trim();
  const idLabel = cur[0] === "u" ? "UID پابجی" : "آیدی تلگرام";
  let msg = `سلام نکسیفای، سفارش جدید دارم:\n` +
            `بسته: ${cur[1]}\n` +
            `قیمت: ${cur[2]} افغانی\n` +
            `${idLabel}: ${id}\n` +
            `پرداخت: ${pay}`;
  if (note) msg += `\nتوضیح: ${note}`;

  if (via === "wa") {
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank");
  } else {
    if (navigator.clipboard) navigator.clipboard.writeText(msg).catch(()=>{});
    window.open(`https://t.me/${TG}?text=${encodeURIComponent(msg)}`, "_blank");
  }
  closeM();
}

render("a");