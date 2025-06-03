// function register() {
//   const name = document.getElementById("name").value.trim();
//   const email = document.getElementById("phone").value.trim();
//   const password = document.getElementById("password").value.trim();

//   if (!name || !phone || !password) {
//     alert("لطفاً همه فیلدها را وارد کنید.");
//     return;
//   }

//   let users = JSON.parse(localStorage.getItem("users") || "[]");
//   if (users.find(u => u.phone === phone)) {
//     alert("این شماره قبلاً ثبت‌نام شده است.");
//     return;
//   }

//   users.push({ name, phone, password });
//   localStorage.setItem("users", JSON.stringify(users));

//   alert("ثبت‌نام با موفقیت انجام شد.");
//   window.location.href = "login.html";
// }

// const passwordInput = document.getElementById("password");
// const togglePass = document.getElementById("toggle-pass");

// let isVisible = false;

// document.addEventListener("DOMContentLoaded", () => {
//   const signupForm = document.getElementById("signup-form");
//   if (signupForm) {
//     signupForm.addEventListener("submit", signup);
//   }
// });

// function isPhone(input) {
//   return /^09\d{9}$/.test(input);
// }

// function signup(e) {
//   e.preventDefault();

//   const name = document.getElementById("name").value.trim();
//   const phone = document.getElementById("phone").value.trim();
//   const password = document.getElementById("password").value.trim();

//   if (!name || !phone || !password) {
//     alert("همه فیلدها الزامی هستند.");
//     return;
//   }

//   if (!isPhone(phone)) {
//     alert("شماره موبایل معتبر وارد کنید.");
//     return;
//   }

//   const users = JSON.parse(localStorage.getItem("users") || "[]");

//   // چک نکن که تکراری نباشه؟
//   if (users.find(u => u.phone === phone)) {
//     alert("این شماره قبلاً ثبت‌نام شده.");
//     return;
//   }

//   const newUser = { name, phone, password };
//   users.push(newUser);
//   localStorage.setItem("users", JSON.stringify(users));

//   // لاگین فوری بعد از ثبت‌نام
//   localStorage.setItem("loggedIn", "true");
//   localStorage.setItem("user", name);
//   localStorage.setItem("userPhone", phone);
//   localStorage.setItem("userData", JSON.stringify(newUser));
//   localStorage.setItem("isAdmin", "false");

//   window.location.href = "index.html";
// }

function register() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value.trim();

  // اعتبارسنجی شماره موبایل
  if (!/^09\d{9}$/.test(phone)) {
    alert("لطفاً شماره موبایل معتبر وارد کنید (مثال: 09123456789)");
    return;
  }

  if (!name || !phone || !password) {
    alert("لطفاً همه فیلدها را وارد کنید.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "[]");
  if (users.find(u => u.phone === phone)) {
    alert("این شماره قبلاً ثبت‌نام شده است.");
    return;
  }

  const newUser = {
    name: name,
    phone: phone,
    password: password
  };
  

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("userData", JSON.stringify(newUser)); // خیلی مهم
  

  alert("ثبت‌نام با موفقیت انجام شد.");
  window.location.href = "login.html";
}

const passwordInput = document.getElementById("password");
const togglePass = document.getElementById("toggle-pass");

let isVisible = false;
togglePass.addEventListener("click", () => {
  isVisible = !isVisible;
  passwordInput.type = isVisible ? "text" : "password";
  togglePass.src = isVisible ? "./icons/eye(1).png" : "./icons/eye.png";
});
