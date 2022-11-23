"use strict";

//DOM
const userNameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const submitBtn = document.getElementById("btn-submit");

// click login
submitBtn.addEventListener("click", function (e) {
  e.preventDefault;
  // Lấy userArr từ localstorage
  const userArr = userArrDefine();
  let check = true;
  // Kiểm tra username và password đã đăng ký chưa
  userArr.forEach((user) => {
    if (
      user.username === userNameInput.value &&
      user.password === passwordInput.value
    ) {
      check = false;
      let currentUser = {};
      currentUser.username = userNameInput.value;
      currentUser.password = passwordInput.value;
      localStorage.setItem("CURRENT_USER", JSON.stringify(currentUser));
      alert("Đăng nhập thành công");
      window.location.href = "/index.html";
    }
  });
  // Thông báo chưa login
  if (check) {
    alert("Username hoặc Password chưa chính xác");
  }
});
