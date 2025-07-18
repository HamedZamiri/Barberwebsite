
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login-btn");
  if (loginBtn) {
    loginBtn.addEventListener("click", login);
  }

  const togglePass = document.getElementById("toggle-pass");
  const passwordInput = document.getElementById("password");
  if (togglePass && passwordInput) {
    togglePass.addEventListener("click", () => {
      const isVisible = passwordInput.type === "text";
      passwordInput.type = isVisible ? "password" : "text";
      togglePass.src = isVisible ? "./icons/eye.png" : "./icons/eye(1).png";
    });
  }
});


function isPhone(input) {
  return /^09\d{9}$/.test(input); // شماره موبایل ایران
}

function login() {
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!phone || !password) {
    alert("لطفاً همه فیلدها را وارد کنید.");
    return;
  }

  if (!isPhone(phone)) {
    alert("شماره موبایل معتبر وارد کنید.");
    return;
  }
  
  // ورود به عنوان مدیر
if (phone === "09123456789" && password === "admin123") {
  localStorage.setItem("loggedIn", "true");
  localStorage.setItem("isAdmin", "true");
  localStorage.setItem("user", "مدیر سایت");
  localStorage.setItem("userPhone", phone);
  window.location.href = "manager.html";
  return;
}


  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(u => u.phone === phone && u.password === password);

  if (!user) {
    alert("کاربری با این شماره و رمز عبور یافت نشد.");
    return;
  }

  localStorage.setItem("loggedIn", "true");
  localStorage.setItem("isAdmin", "false");
  localStorage.setItem("user", user.name);
  localStorage.setItem("userPhone", user.phone);
  localStorage.setItem("userData", JSON.stringify(user));

  window.location.href = "index.html";
}