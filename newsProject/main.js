const API_KEY = `2dca3a19f2b04aa286cc75e28f353484`;

let newsList = [];
let url = new URL(
  `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
);

let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

// menu 클릭 이벤트
const menus = document.querySelectorAll(".menus button");
// forEach => Array(배열)의 매서드를 각 배열 요소에 대해 제공된 함수를 한번씩 실행
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);
// console.log("menu:" , menus);

const getNews = async () => {
  // 코드 리펙토링
  // const response = await fetch(url);
  // const data = await response.json();
  // newsList = data.articles;
  // render();

  // 에러 핸들링
  try {
    url.searchParams.set("page", page);
    url.searchParams.set("pageSize", pageSize);

    const response = await fetch(url);
    const data = await response.json();
    // API에 에러가 있을 경우
    if (response.status === 200) {
      // 검색 결과에 맞는 데이터가 없을 경우
      if (data.articles.length === 0) {
        throw new Error("No result for this search");
      }
      newsList = data.articles;
      console.log(data);
      totalResults = data.totalResults;
      render();
      pageNationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};

const getLatestNews = async () => {
  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
  );

  // 코드 리펙토링으로 인한 주석
  // const response = await fetch(url);
  // const data = await response.json();
  // newsList = data.articles;
  // render();

  // console.log("eee", newsList);

  getNews();
};

// 카테고리별 뉴스 가져오기
const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase().trim();

  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
  );

  // 코드 리펙토링으로 인한 주석
  // const response = await fetch(url);
  // const data = await response.json();
  // newsList = data.articles;
  // render();

  // console.log("Ddd", data);

  getNews();
};

// 검색한 뉴스 가져오기
const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;

  console.log("keyword", keyword);

  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`
  );

  // 코드 리펙토링으로 인한 주석
  // const response = await fetch(url);
  // const data = await response.json();
  // newsList = data.articles;
  // render();

  // console.log("keyword data", data);

  getNews();
};

const render = () => {
  const newsHTML = newsList
    .map(
      (news) => `
          <div class="row news-content ">
        <div class="col-lg-4">
          <img class="news-img-size" src="${news.urlToImage}" alt="뉴스이미지">
        </div>
        <div class="col-lg-8 news-box">
          <h2 class="news-title">
          ${news.title}
          </h2>
          <p class="news-preview-content">
            ${news.description}
          </p>
          <div class="news-sub-info">
            ${news.source.name} * ${news.publishedAt}
          </div> 
        </div>
      </div>
    `
    )
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

// 에러 발생시 UI
const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
  ${errorMessage}
  </div>`;

  document.getElementById("news-board").innerHTML = errorHTML;
};

// 페이지네이션
const pageNationRender = () => {
  // totalPage
  const totalPages = Math.ceil(totalResults / pageSize);
  // pageGroup
  const pageGroup = Math.ceil(page / groupSize); // ceil 반올림
  // lastPage
  let lastPage = pageGroup * groupSize;

  if (lastPage > totalPages) {
    lastPage = totalPages;
  }
  if(lastPage === 0) {

  }
  // firstPage
  const firstPage =
    lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

  let paginationHTML = `<li class="page-item ${page <= firstPage ? "disabled" :""}" onclick="movePage(${page-1})">
    <a class="page-link" href="#">
      Previous
    </a>
  </li>
`;

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += ` <li class="page-item ${
      i === page ? "active" : ""
    }" onclick="movePage(${i})" ><a class="page-link">${i}</a></li>`;
  }

  paginationHTML += `<li class="page-item ${page === lastPage ? "disabled" : ""}" onclick="movePage(${page+1})">
  <a class="page-link" href="#">Next</a></li>
`;
  
  document.querySelector(".pagination").innerHTML = paginationHTML;
};
const movePage = (pageNum) => {
  console.log("click", pageNum);
  page = pageNum;
  getNews();
};

getLatestNews();
