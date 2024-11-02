let renderData = [];
axios
  .get(
    "https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json"
  )
  .then(function (response) {
    renderData = response.data.data;
    listInit(renderData);
  });
//篩選功能
function listInit(renderData) {
  const ticketList = document.querySelector(".ticketCard-area");
  const filterSection = document.querySelector(".regionSearch");
  const cardCount = document.querySelector("#searchResult-text");
  filterSection.addEventListener("change", function (e) {
    let ticketCardAreaContent = "";
    let searchItemNum = 0;
    let searchAreaInfo;
    renderData.forEach(function (item) {
      let content = `<li class="ticketCard">
                <div class="ticketCard-img">
                    <a href="#">
                        <img src="${item.imgUrl}"
                            alt="">
                    </a>
                    <div class="ticketCard-region">${item.area}</div>
                    <div class="ticketCard-rank">${item.rate}</div>
                </div>
                <div class="ticketCard-content">
                    <div>
                        <h3>
                            <a href="#" class="ticketCard-name">${item.name}</a>
                        </h3>
                        <p class="ticketCard-description">
                            ${item.description}
                        </p>
                    </div>
                    <div class="ticketCard-info">
                        <p class="ticketCard-num">
                            <span><i class="fas fa-exclamation-circle"></i></span>
                            剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
                        </p>
                        <p class="ticketCard-price">
                            TWD <span id="ticketCard-price">${item.price}</span>
                        </p>
                    </div>
                </div>
            </li>`;
      if (e.target.value == item.area) {
        ticketCardAreaContent += content;
        searchItemNum += 1;
        searchAreaInfo = item.area;
      } else if (e.target.value == "全部地區") {
        ticketCardAreaContent += content;
        searchItemNum += 1;
        searchAreaInfo = item.area;
      }
    });
    // 篩選結果提示訊息
    if (e.target.value == "全部地區" || e.target.value == searchAreaInfo) {
      cardCount.textContent = `本次搜尋共 ${searchItemNum} 筆資料`;
    } else {
      cardCount.textContent = `查無此筆資料`;
    }
    ticketList.innerHTML = ticketCardAreaContent;
  });
}
//---------------------------------
//輸入欄監聽
const addTicketData = document.querySelector("#ticketName");
const addTicketImg = document.querySelector("#ticketImgUrl");
const addTicketRegion = document.querySelector("#ticketRegion");
const addTicketPrice = document.querySelector("#ticketPrice");
const addTicketNum = document.querySelector("#ticketNum");
const addTicketRate = document.querySelector("#ticketRate");
const addTicketDescription = document.querySelector("#ticketDescription");
//按鈕監聽
const addTicketBtn = document.querySelector("#addTicket");
// 點擊取值+儲存
addTicketBtn.addEventListener("click", function (e) {
  let object = {};
  if (addTicketData.value == "") {
    alert("請填寫套票名稱");
    return;
  } else if (addTicketImg.value == "") {
    alert("請填寫圖片網址");
    return;
  } else if (addTicketRegion.value == "") {
    alert("請填寫地區");
    return;
  } else if (addTicketPrice.value == "") {
    alert("請填寫套票金額");
    return;
  } else if (addTicketNum.value == "") {
    alert("請填寫組數");
    return;
  } else if (addTicketRate.value == "") {
    alert("請填寫評分");
    return;
  } else if (addTicketDescription.value == "") {
    alert("請填寫套票描述");
    return;
  } else {
    object.id = renderData.length;
    object.name = addTicketData.value;
    object.imgUrl = addTicketImg.value;
    object.area = addTicketRegion.value;
    object.description = addTicketDescription.value;
    object.group = addTicketNum.value;
    object.price = addTicketPrice.value;
    object.rate = addTicketRate.value;
    renderData.push(object);
    listInit();
    addTicketData.value = "";
    addTicketImg.value = "";
    addTicketRegion.value = "";
    addTicketDescription.value = "";
    addTicketNum.value = "";
    addTicketPrice.value = "";
    addTicketRate.value = "";
  }
});

const itemsQuantity = document.querySelector("#searchResult-text");
itemsQuantity.textContent;