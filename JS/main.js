document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  if (!isLoggedIn) {
    window.location.href = "login.html";
  }
});
const isLoggedIn = localStorage.getItem("loggedIn") === "true";
const isAdmin = localStorage.getItem("isAdmin") === "true";

if (!isLoggedIn || (window.location.pathname.includes("manager") && !isAdmin)) {
  alert("لطفاً ابتدا وارد شوید.");
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.clear();
      alert("با موفقیت خارج شدید.");
      window.location.href = "login.html";
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.clear();
      alert("با موفقیت خارج شدید.");
      window.location.href = "login.html";
    });
  }
});
