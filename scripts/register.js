"use strict";
// DOM
const firstNameInput = document.getElementById("input-firstname");
const lastNameInput = document.getElementById("input-lastname");
const userNameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const passwordConfirmInput = document.getElementById("input-password-confirm");
const submitBtn = document.getElementById("btn-submit");

// Khi tải lại trang
window.addEventListener("load", function () {
  console.log(userArrDefine());
});

//localStorage.removeItem("USER_ARRAY");

// Hàm validate
function validate(userData) {
  let check = true;
  // check user name
  const userArr = userArrDefine();
  userArr.forEach((user) => {
    if (userData.userName === user.username) {
      check = false;
      alert("Username đã được sử dụng");
    }
  });
  // firstName input không để trống
  if (userData.firstName.trim() === "") {
    check = false;
    alert("First Name không để trống");
  }
  // lastName input không để trống
  if (userData.lastName.trim() === "") {
    check = false;
    alert("Last Name không để trống");
  }
  // userName input không để trống
  if (userData.userName.trim() === "") {
    check = false;
    alert("User Name không để trống");
  }
  // check password và password confirm
  if (userData.password !== userData.passwordConfirm) {
    check = false;
    alert("Password confirm khác password");
  }
  // check password ít nhất 8 ký tự
  if (userData.password.length < 8) {
    check = false;
    alert("Password cần ít nhất 8 ký tự");
  }
  //return
  return check;
}

// Hàm chuyển dữ liệu từ JS Object sang Class Instance
function parseUser(userData) {
  const data = new User(
    userData.firstName,
    userData.lastName,
    userData.userName,
    userData.password
  );
  return data;
}

// click Register
submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const userData = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    userName: userNameInput.value.toLowerCase(),
    password: passwordInput.value,
    passwordConfirm: passwordConfirmInput.value,
  };
  // Validate Userdata trước khi lưu vào LocalStorage
  if (validate(userData)) {
    const data = parseUser(userData);
    const userArr = userArrDefine();
    userArr.push(data);
    localStorage.setItem("USER_ARRAY", JSON.stringify(userArr));
    alert("Khởi tạo User thành công và chuyển đến màn hình Login");
    window.location.href = "/pages/login.html"; // Chuyển đến màn hình login
  }
});

//render userArr
function render(userArr) {
  userArr.forEach((user) => {
    const un = document.createElement("div");
    un.innerHTML = user.username;
    document.querySelector("form").append(un);
  });
}
