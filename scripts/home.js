"use strict";

// DOM
const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const messageWelcome = document.getElementById("welcome-message");
const logoutBtn = document.getElementById("btn-logout");

// Hiện trang Home khi load
window.addEventListener("load", function () {
  // khi chưa đăng nhập
  if (localStorage.getItem("CURRENT_USER") === null) {
    mainContent.style.display = "none";
    loginModal.style.display = "block";
  } else {
    // khi đã đăng nhập
    loginModal.style.display = "none";
    mainContent.style.display = "block";
    const currentUser = currentUserDefine();
    const userArr = userArrDefine();
    // Hàm check
    function check(user) {
      return user.username === currentUser.username;
    }
    messageWelcome.innerHTML = `Welcome ${userArr.find(check).firstname}`;
  }
});

// click log out
logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("CURRENT_USER");
  window.location.href = "/pages/login.html";
});
