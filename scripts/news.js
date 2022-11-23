"use strict";
//DOM
const newsContainer = document.getElementById("news-container");
const prevBtn = document.getElementById("btn-prev");
const numBtn = document.getElementById("page-num");
const nextBtn = document.getElementById("btn-next");

// Hàm getData
async function getData(page, pageSize, category) {
  try {
    const data = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&page=${page}&pageSize=${pageSize}&category=${category}&apiKey=e39dbf71a2854e81a5aba47c170bc0e6`
    );
    if (!data.ok) throw new Error(`Problem ${data.status}`);
    const dataJson = await data.json();
    const articleData = await dataJson.articles;
    renderArticles(articleData); // hiển thị dữ liệu
    numBtn.innerHTML = page; // số trong numBtn = page
    return await dataJson.totalResults; // return tổng số bài viết tải xuống
  } catch (err) {
    console.error(err);
  }
}

// Hàm hiển thị
function renderArticles(articleData) {
  newsContainer.innerHTML = "";
  articleData.forEach((article) => {
    const vanBan = ` <div class="card flex-row flex-wrap">
      <div class="card mb-3">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img
              src=${article.urlToImage}
              class="card-img"
              alt=${article.title}
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">
                ${article.title}
              </h5>
              <p class="card-text">
                ${article.description}
              </p>
              <a
                href=${article.url}
                class="btn btn-primary"
                >View</a
              >
            </div>
          </div>
        </div>
      </div>
      </div>`;
    newsContainer.insertAdjacentHTML("beforeend", vanBan);
  });
}

// Hàm xác định số trang hiển thị
async function pagePosition(page, pageSize, category) {
  const totalResults = await getData(page, pageSize, category);
  // Xác định số trang để hiển thị
  const numPages =
    totalResults % pageSize === 0
      ? totalResults / pageSize
      : Math.floor(totalResults / pageSize) + 1;
  // Ẩn hiện nút next, previous
  nextBtn.style.visibility = page >= numPages ? "hidden" : "visible";
  prevBtn.style.visibility = page <= 1 ? "hidden" : "visible";
  // click nút Next
  nextBtn.addEventListener("click", function (e) {
    e.preventDefault;
    page++;
    getData(page, pageSize, category);
    nextBtn.style.visibility = page >= numPages ? "hidden" : "visible";
    prevBtn.style.visibility = page <= 1 ? "hidden" : "visible";
  });
  // click nút Previous
  prevBtn.addEventListener("click", function (e) {
    e.preventDefault;
    page--;
    getData(page, pageSize, category);
    nextBtn.style.visibility = page >= numPages ? "hidden" : "visible";
    prevBtn.style.visibility = page <= 1 ? "hidden" : "visible";
  });
}

//Khi load trang news lên
window.addEventListener("load", function () {
  newsContainer.innerHTML = "";
  const settingData = JSON.parse(localStorage.getItem("SETTING"));
  console.log(settingData);
  if (settingData === null) {
    pagePosition(1, 10, "general");
  } else {
    pagePosition(1, settingData.pageSize, settingData.category);
  }
});
