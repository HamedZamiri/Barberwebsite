const weekDays = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'];
const persianMonths = [
  '', 'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
];

// تبدیل میلادی به شمسی
function toJalali(gy, gm, gd) {
  const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  let jy = (gy <= 1600) ? 0 : 979;
  gy -= (gy <= 1600) ? 621 : 1600;
  const gy2 = (gm > 2) ? (gy + 1) : gy;
  let days = (365 * gy) + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) +
    Math.floor((gy2 + 399) / 400) - 80 + gd + g_d_m[gm - 1];

  jy += 33 * Math.floor(days / 12053); days %= 12053;
  jy += 4 * Math.floor(days / 1461); days %= 1461;
  if (days > 365) {
    jy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }

  const jm = (days < 186) ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30);
  const jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));
  return [jy, jm, jd];
}

const container = document.getElementById("container");

for (let i = 0; i < 7; i++) {
  const date = new Date();
  date.setDate(date.getDate() + i);

  const [jy, jm, jd] = toJalali(date.getFullYear(), date.getMonth() + 1, date.getDate());
  const weekday = weekDays[date.getDay()];
  const isFriday = weekday === "جمعه";

  const post = document.createElement("div");
  post.className = isFriday ? "post1" : "post";

  post.innerHTML = `
    <div class="${isFriday ? "time1" : "time"}">${weekday}</div>
    <div class="content">
      <div class="section day">
        <h1>${jd}</h1>
        <p>${persianMonths[jm]}</p>
      </div>
      <div class="divider"></div>
      <div class="section money">
        <h1>۰</h1>
        <p>تومان (جمع کل)</p>
      </div>
      <div class="divider"></div>
      <div class="section btn-book5">
      <a href="#" class="open-reservation">
        <img src="${isFriday ? './icons/plus (2).png' : './icons/plus.png'}" alt="ثبت نوبت">
      </a>
      <p>ثبت نوبت</p>
    </div>
    
    </div>
  `;

  container.appendChild(post);
}
  // المان‌ها برای باکس و overlay
  const box = document.getElementById("reservation-box");
  const overlay = document.getElementById("overlay");
  const handle = document.querySelector(".handle-bar");

  // باز کردن باکس با delegation روی container
  container.addEventListener("click", function(event) {
    const target = event.target.closest(".open-reservation");
    if (target) {
      event.preventDefault();
      box.classList.add("active");
      overlay.classList.add("active");
    }
  });

  // بستن باکس و overlay
  function closeBox() {
    box.classList.remove("active");
    overlay.classList.remove("active");
  }

  overlay.addEventListener("click", closeBox);

  // درگ برای بستن باکس
  let startY = 0;
  let isDragging = false;

  function startDrag(e) {
    isDragging = true;
    startY = e.touches ? e.touches[0].clientY : e.clientY;

    document.addEventListener("touchmove", onDrag);
    document.addEventListener("mousemove", onDrag);
    document.addEventListener("touchend", stopDrag);
    document.addEventListener("mouseup", stopDrag);
  }

  function onDrag(e) {
    if (!isDragging) return;
    const currentY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaY = currentY - startY;

    if (deltaY > 0) {
      box.style.transform = `translateY(${deltaY}px)`;
    }
  }

  function stopDrag(e) {
    if (!isDragging) return;
    isDragging = false;

    const endY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
    const deltaY = endY - startY;

    if (deltaY > 100) {
      closeBox();
    }

    box.style.transform = "translateY(0)";

    document.removeEventListener("touchmove", onDrag);
    document.removeEventListener("mousemove", onDrag);
    document.removeEventListener("touchend", stopDrag);
    document.removeEventListener("mouseup", stopDrag);
  }

  handle.addEventListener("touchstart", startDrag);
  handle.addEventListener("mousedown", startDrag);