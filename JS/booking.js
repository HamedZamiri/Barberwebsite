// // در ابتدای profile.js یا reserve.js
// if (!localStorage.getItem("loggedIn")) {
//   window.location.href = "login.html";
// }


// document.addEventListener("DOMContentLoaded", () => {
//     const dateSelect = document.getElementById("date");
//     const timeSelect = document.getElementById("time");
  
//     if (!dateSelect || !timeSelect) return;
  
//     const allSlots = JSON.parse(localStorage.getItem("availableSlots") || "[]");
  
//     // استخراج تاریخ‌های یکتا
//     const uniqueDates = [...new Set(allSlots.map(s => s.date))];
  
//     // پر کردن select تاریخ
//     uniqueDates.forEach(date => {
//       const option = document.createElement("option");
//       option.textContent = date;
//       option.value = date;
//       dateSelect.appendChild(option);
//     });
  
//     // وقتی تاریخ انتخاب شد → ساعت‌ها رو پر کن
//     dateSelect.addEventListener("change", () => {
//       timeSelect.innerHTML = '<option disabled selected>انتخاب ساعت</option>';
  
//       const selectedDate = dateSelect.value;
//       const matchingSlots = allSlots.filter(slot => slot.date === selectedDate);
  
//       matchingSlots.forEach(slot => {
//         const option = document.createElement("option");
//         option.textContent = slot.time;
//         option.value = slot.time;
//         timeSelect.appendChild(option);
//       });
//     });
//   });

//   document.addEventListener("DOMContentLoaded", () => {
//     const isLoggedIn = localStorage.getItem("loggedIn") === "true";
//     const isAdmin = localStorage.getItem("isAdmin") === "true";
  
//     if (!isLoggedIn || isAdmin) {
//       alert("برای رزرو نوبت لطفاً وارد حساب کاربری‌ات شو.");
//       window.location.href = "login.html";
//       return;
//     }
  
//     // ادامه‌ی بارگذاری نوبت‌ها
//     const dateSelect = document.getElementById("date");
//     const timeSelect = document.getElementById("time");
  
//     const allSlots = JSON.parse(localStorage.getItem("availableSlots") || "[]");
  
//     const uniqueDates = [...new Set(allSlots.map(s => s.date))];
  
//     uniqueDates.forEach(date => {
//       const option = document.createElement("option");
//       option.textContent = date;
//       option.value = date;
//       dateSelect.appendChild(option);
//     });
  
//     dateSelect.addEventListener("change", () => {
//       timeSelect.innerHTML = '<option disabled selected>انتخاب ساعت</option>';
//       const selectedDate = dateSelect.value;
//       const matchingSlots = allSlots.filter(slot => slot.date === selectedDate);
  
//       matchingSlots.forEach(slot => {
//         const option = document.createElement("option");
//         option.textContent = slot.time;
//         option.value = slot.time;
//         timeSelect.appendChild(option);
//       });
//     });
//   });
  
//   const isLoggedIn = localStorage.getItem("loggedIn") === "true";
// const isAdmin = localStorage.getItem("isAdmin") === "true";

// if (!isLoggedIn || (window.location.pathname.includes("manager") && !isAdmin)) {
//   alert("لطفاً ابتدا وارد شوید.");
//   window.location.href = "login.html";
// }


// document.getElementById("booking-form")?.addEventListener("submit", function (e) {
//   e.preventDefault(); // جلوگیری از ری‌لود صفحه

//   const service = document.getElementById("service").value;
//   const date = document.getElementById("date").value;
//   const time = document.getElementById("time").value;
//   const phone = document.getElementById("phone").value;
//   const user = localStorage.getItem("user") || "کاربر ناشناس";

//   if (!service || !date || !time || !phone) {
//     alert("لطفاً همه فیلدها را پر کنید.");
//     return;
//   }

//   const newAppointment = {
//     user,
//     phone,
//     service,
//     date,
//     time,
//     createdAt: new Date().toISOString()
//   };

//   // گرفتن آرایه فعلی نوبت‌ها یا ساختن جدید
//   const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");
//   appointments.push(newAppointment); // اضافه کردن نوبت جدید
//   localStorage.setItem("appointments", JSON.stringify(appointments)); // ذخیره نهایی

//   alert("✅ نوبت شما با موفقیت ثبت شد!");
//   this.reset(); // پاک کردن فرم
// });

document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  if (!isLoggedIn || isAdmin) {
    alert("برای رزرو نوبت لطفاً وارد حساب کاربری شوید.");
    window.location.href = "login.html";
    return;
  }

  const dateSelect = document.getElementById("date");
  const timeSelect = document.getElementById("time");
  const bookingForm = document.getElementById("booking-form");

  function loadDates() {
    const allSlots = JSON.parse(localStorage.getItem("availableSlots") || "[]");
    const uniqueDates = [...new Set(allSlots.map(slot => slot.date))];

    dateSelect.innerHTML = '<option disabled selected>انتخاب تاریخ</option>';
    uniqueDates.forEach(date => {
      const option = document.createElement("option");
      option.value = date;
      option.textContent = date;
      dateSelect.appendChild(option);
    });

    timeSelect.innerHTML = '<option disabled selected>ابتدا تاریخ را انتخاب کنید</option>';
  }

  loadDates();

  dateSelect.addEventListener("change", () => {
    const selectedDate = dateSelect.value;
    const allSlots = JSON.parse(localStorage.getItem("availableSlots") || "[]");
    const matchingTimes = allSlots.filter(slot => slot.date === selectedDate);

    timeSelect.innerHTML = '<option disabled selected>انتخاب ساعت</option>';
    matchingTimes.forEach(slot => {
      const option = document.createElement("option");
      option.value = slot.time;
      option.textContent = slot.time;
      timeSelect.appendChild(option);
    });
  });

  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const service = document.getElementById("service").value;
    const date = dateSelect.value;
    const time = timeSelect.value;
    const phone = localStorage.getItem("userPhone");
    const user = localStorage.getItem("user") || "کاربر ناشناس";

    if (!service || !date || !time || !phone) {
      alert("لطفاً تمام فیلدها را کامل کنید.");
      return;
    }

    const newAppointment = {
      user,
      phone,
      service,
      date,
      time,
      createdAt: new Date().toISOString()
    };

    // ذخیره نوبت در appointments
    const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    appointments.push(newAppointment);
    localStorage.setItem("appointments", JSON.stringify(appointments));

    // حذف تایم رزرو شده از availableSlots
    let availableSlots = JSON.parse(localStorage.getItem("availableSlots") || "[]");
    availableSlots = availableSlots.filter(slot => !(slot.date === date && slot.time === time));
    localStorage.setItem("availableSlots", JSON.stringify(availableSlots));

    alert("✅نوبت شما ثبت شد , میتونی در قسمت پروفایل نوبتت رو مشاهده کنی !");

    bookingForm.reset();
    loadDates(); // ری‌لود تاریخ‌ها و ساعات بعد از حذف تایم
  });
});
