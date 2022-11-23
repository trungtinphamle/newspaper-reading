"use strict";
// DOM
const pageSizeInput = document.getElementById("input-page-size");
const categoryInput = document.getElementById("input-category");
const submitBtn = document.getElementById("btn-submit");

// click Save setting
submitBtn.addEventListener("click", function (e) {
  e.preventDefault;
  if (
    // Không bỏ trống ô pageSize input
    Math.floor(Number(pageSizeInput.value)) < 1 ||
    pageSizeInput.value.trim() === ""
  ) {
    alert("News per page phải lớn hơn hoặc bằng 1 và không để trống");
  } else {
    const settingData = {};
    settingData.pageSize = Math.floor(Number(pageSizeInput.value));
    settingData.category = categoryInput.value.toLowerCase();
    localStorage.setItem("SETTING", JSON.stringify(settingData)); // lưu setting vào local storage
    alert("Save Settings thành công, chuyển đến trang News");
    window.location.href = "/pages/news.html"; // chuyển đến trang News
  }
});
