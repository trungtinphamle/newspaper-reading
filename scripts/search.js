"use strict";
//DOM
const queryInput = document.getElementById("input-query");
const submitBtn = document.getElementById("btn-submit");
const newsContainer = document.getElementById("news-container");
const prevBtn = document.getElementById("btn-prev");
const numBtn = document.getElementById("page-num");
const nextBtn = document.getElementById("btn-next");

// Lấy dữ liệu từ Search
submitBtn.addEventListener("click", function (e) {
  e.preventDefault;
  if (queryInput.value.replace(" ", "") === "") {
    alert("Nhập từ khóa khác rỗng");
  } else {
    const query = queryInput.value;
    pagePosition(1, 5, query);
  }
});
// Hàm getData để tải dữ liệu về và hiện lên màn hình
async function getData(page, pageSize, query) {
  try {
    const data = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&page=${page}&pageSize=${pageSize}&q=${query}&apiKey=e39dbf71a2854e81a5aba47c170bc0e6`
    );
    if (!data.ok) throw new Error(`Problem ${data.status}`); // nếu tải dữ liệu lỗi -> catch
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

// Hàm xác định thông tin trang hiển thị và nút previous,number,next
async function pagePosition(page, pageSize, query) {
  const totalResults = await getData(page, pageSize, query);
  // Xác định tổng số trang để hiển thị
  const numPages =
    totalResults % pageSize === 0
      ? totalResults / pageSize
      : Math.floor(totalResults / pageSize) + 1;
  // Ẩn và hiện nút previous, next
  nextBtn.style.visibility = page >= numPages ? "hidden" : "visible";
  prevBtn.style.visibility = page <= 1 ? "hidden" : "visible";
  // click nút next
  nextBtn.addEventListener("click", function (e) {
    e.preventDefault;
    page++;
    getData(page, pageSize, query);
    nextBtn.style.visibility = page >= numPages ? "hidden" : "visible";
    prevBtn.style.visibility = page <= 1 ? "hidden" : "visible";
  });
  // click nút previous
  prevBtn.addEventListener("click", function (e) {
    e.preventDefault;
    page--;
    getData(page, pageSize, query);
    nextBtn.style.visibility = page >= numPages ? "hidden" : "visible";
    prevBtn.style.visibility = page <= 1 ? "hidden" : "visible";
  });
}
