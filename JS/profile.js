
document.addEventListener("DOMContentLoaded", function () {
  // بررسی لاگین
  if (localStorage.getItem("loggedIn") !== "true") {
    alert("لطفاً ابتدا وارد حساب کاربری خود شوید");
    window.location.href = "login.html";
    return;
  }

  // دریافت اطلاعات کاربر از localStorage
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  // نمایش اطلاعات در فرم
  document.getElementById("p-name").value = userData.name || "";
  document.getElementById("p-phone").value = userData.phone || "";

  // هندل ذخیره تغییرات فرم
  document.getElementById("profile-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const newName = document.getElementById("p-name").value.trim();
    const newPhone = document.getElementById("p-phone").value.trim();

    if (!newName || !newPhone) {
      alert("لطفاً تمام فیلدها را پر کنید");
      return;
    }

    // اعتبارسنجی شماره موبایل
    if (!/^09\d{9}$/.test(newPhone)) {
      alert("شماره موبایل باید 11 رقمی و با 09 شروع شود");
      return;
    }

    // به‌روزرسانی اطلاعات
    userData.name = newName;
    userData.phone = newPhone;

    // ذخیره در localStorage
    localStorage.setItem("userData", JSON.stringify(userData));

    // در صورت نیاز، اطلاعات برای مقاصد دیگر هم به‌روزرسانی شود
    localStorage.setItem("user", newName);

    alert("تغییرات با موفقیت ذخیره شد");
  });
});

function loadUserAppointments() {
  const appointmentsContainer = document.getElementById("user-appointments");
  const userPhone = localStorage.getItem("userPhone");

  const allAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
  const userAppointments = allAppointments.filter(app => app.phone === userPhone);

  appointmentsContainer.innerHTML = "";

  if (userAppointments.length === 0) {
    appointmentsContainer.innerHTML = "<p>شما هنوز نوبتی ثبت نکرده‌اید.</p>";
    return;
  }

  userAppointments.forEach(app => {
    const card = document.createElement("div");
    card.classList.add("appointment-card");

    card.innerHTML = `
      <h3>✅ ${app.service}</h3>
      <p><strong>تاریخ:</strong> ${app.date}</p>
      <p><strong>ساعت:</strong> ${app.time}</p>
      <p><strong>ثبت‌شده:</strong> ${new Date(app.createdAt).toLocaleDateString('fa-IR')}</p>
    `;

    appointmentsContainer.appendChild(card);
  });
}

loadUserAppointments();


loadUserAppointments();
