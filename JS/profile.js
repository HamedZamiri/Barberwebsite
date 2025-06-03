
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
