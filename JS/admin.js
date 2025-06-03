document.addEventListener("DOMContentLoaded", () => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin) {
      alert("دسترسی غیرمجاز. لطفاً به‌عنوان مدیر وارد شوید.");
      window.location.href = "login.html";
      return;
    }
  
    // ادامه‌ی پنل مدیریت
    renderTimeSlots();
  });
  
  const addBtn = document.getElementById("add-slot-btn");
  const dateInput = document.getElementById("slot-date");
  const timeInput = document.getElementById("slot-time");
  const slotList = document.getElementById("slots-list");
  
  addBtn?.addEventListener("click", () => {
    const date = dateInput.value;
    const time = timeInput.value;
    if (!date || !time) {
      alert("لطفاً تاریخ و ساعت را وارد کنید.");
      return;
    }
  
    const newSlot = { date, time };
    const stored = JSON.parse(localStorage.getItem("availableSlots") || "[]");
    stored.push(newSlot);
    localStorage.setItem("availableSlots", JSON.stringify(stored));
  
    dateInput.value = "";
    timeInput.value = "";
  
    renderTimeSlots();
  });
  
  function renderTimeSlots() {
    const stored = JSON.parse(localStorage.getItem("availableSlots") || "[]");
    slotList.innerHTML = "";
  
    if (stored.length === 0) {
      slotList.innerHTML = "<p>هنوز زمانی ثبت نشده است.</p>";
      return;
    }
  
    stored.forEach((slot, index) => {
      const li = document.createElement("li");
      li.textContent = `تاریخ: ${slot.date} | ساعت: ${slot.time}`;
  
      const delBtn = document.createElement("button");
      delBtn.textContent = "حذف";
      delBtn.onclick = () => {
        stored.splice(index, 1);
        localStorage.setItem("availableSlots", JSON.stringify(stored));
        renderTimeSlots();
      };
  
      li.appendChild(delBtn);
      slotList.appendChild(li);
    });
  }
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
const isAdmin = localStorage.getItem("isAdmin") === "true";

if (!isLoggedIn || (window.location.pathname.includes("manager") && !isAdmin)) {
  alert("لطفاً ابتدا وارد شوید.");
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
});

$(function () {
  $("#slot-date").persianDatepicker({
    format: 'YYYY/MM/DD',
    autoClose: true,
    initialValue: false
  });
});

  