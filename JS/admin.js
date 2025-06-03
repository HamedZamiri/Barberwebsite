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
  function loadAllAppointmentsForAdmin() {
    const container = document.getElementById("admin-appointments");
    const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");
  
    container.innerHTML = "";
  
    if (appointments.length === 0) {
      container.innerHTML = "<p>هیچ نوبتی ثبت نشده است.</p>";
      return;
    }
  
    appointments.forEach((app, index) => {
      const card = document.createElement("div");
      card.classList.add("appointment-card");
  
      card.innerHTML = `
        <h3>👤 ${app.user}</h3>
        <p><strong>شماره:</strong> ${app.phone}</p>
        <p><strong>خدمت:</strong> ${app.service}</p>
        <p><strong>تاریخ:</strong> ${app.date}</p>
        <p><strong>ساعت:</strong> ${app.time}</p>
        <p><strong>ثبت:</strong> ${new Date(app.createdAt).toLocaleDateString("fa-IR")}</p>
        <button class="delete-appointment-btn" data-index="${index}">حذف نوبت</button>
      `;
  
      container.appendChild(card);
    });
  
    // حذف نوبت
    const deleteButtons = document.querySelectorAll(".delete-appointment-btn");
    deleteButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.getAttribute("data-index");
        const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");
        appointments.splice(index, 1);
        localStorage.setItem("appointments", JSON.stringify(appointments));
        loadAllAppointmentsForAdmin(); // بازخوانی
      });
    });
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (isAdmin) {
      loadAllAppointmentsForAdmin();
    }
  });
  

  