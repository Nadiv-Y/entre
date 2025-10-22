const divHtmlCard = $(".coins-cards");

async function creatCardCoins() {
  try {
    const resCoins = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false",
      { method: "GET" }
    );
    const coins = await resCoins.json();
    console.log(coins);
    for (const { name, id, symbol } of coins) {
      const cardCoin = ` <div class="coin">
          <div class="card shadow-sm">
            <div class="card-body">
              <h3 class="card-title titel-${id}">${symbol.toUpperCase()}</h3>
              <p class="card-text">${name}</p>

              <div class="form-check form-switch switch">
                <input class="form-check-input" type="checkbox" role="switch" 
                 id="switchCheck-${id}"data-id="switchCheck-${id}">
              </div>

              <button class="btn btn-primary more-info-btn" 
                      type="button" 
                      data-id="${id}">
                More Info
              </button>
            </div>

            <div class="collapse-area collapse" id="collapse-${id}" style="display:none;">
              <div class="card-body border-top" id="collapse1-${id}">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </div>`;

      divHtmlCard.append(cardCoin);
      displaySwitchsFromLocalStorage(`switchCheck-${id}`);
    }
  } catch (error) {
    console.log("הבקשה לא הצליחה");
    console.log(error);
  }
}

creatCardCoins();

$(document).on("click", ".more-info-btn", async function () {
  try {
    const clickTimeNow = Date.now();
    const coinId = $(this).data("id");

    const divCollapse = $(`#collapse-${coinId}`);
    if (divCollapse.is(":visible")) {
      divCollapse.slideUp();
      return;
    }
    divCollapse.slideDown();
    const infoCoinFromLocalStorage = JSON.parse(localStorage.getItem(coinId));
    console.log(infoCoinFromLocalStorage);

    if (infoCoinFromLocalStorage) {
      const lastClickTime = infoCoinFromLocalStorage.clickTime;
      console.log(lastClickTime);
      if (clickTimeNow - lastClickTime < 2000) {
        divCollapse.append(infoCoinFromLocalStorage.info);
        return;
      }
    }
    divCollapse.html(`
  <div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
  `);
    const resinfo = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}`,
      { method: "GET" }
    );
    const info = await resinfo.json();
    console.log(info);
    divCollapse.find(".spinner-border").remove();
    const contentMorInfo = `<div><img src="${info.image.small}"/> ${info.market_data.current_price.eur}€  |  ${info.market_data.current_price.ils}₪   | ${info.market_data.current_price.usd}$</div>`;
    divCollapse.append(contentMorInfo);
    localStorage.setItem(
      `${coinId}`,
      JSON.stringify({ info: contentMorInfo, clickTime: clickTimeNow })
    );
  } catch (error) {
    console.log(error);
  }
});

let arr5switchs = localStorage.getItem("arr5switchs")
  ? JSON.parse(localStorage.getItem("arr5switchs"))
  : [];
$(document).on("click", ".form-check-input", function () {
  const switchId = $(this).data("id");
  console.log(switchId);

  if ($(this).prop("checked")) {
    if (arr5switchs.length < 5) {
      arr5switchs.push(switchId);
      localStorage.setItem("arr5switchs", JSON.stringify(arr5switchs));
    } else {
      $(this).prop("checked", false);
      openLimitModal(arr5switchs, $(this).data("id"));
    }
  } else {
    let arr5switchsFilter = arr5switchs.filter((id) => id != switchId);
    localStorage.setItem("arr5switchs", JSON.stringify(arr5switchsFilter));
    arr5switchs = arr5switchsFilter;
  }
});

function displaySwitchsFromLocalStorage(switchId) {
  if (arr5switchs.includes(switchId)) {
    $(`#${switchId}`).prop("checked", true);
  }
}

function openLimitModal(arr5switchs, id) {
  const modalEl = document.getElementById("myModal");
  const modal = new bootstrap.Modal(modalEl);
  $(modalEl).data("triggerSwitch", id);
  modal.show();

  const modalBody = $(".modal-body");
  modalBody.empty();

  for (const switchId of arr5switchs) {
    const btnSwitch = $(`#${switchId}`).closest(".form-switch").clone(true);
    const nameId = switchId.slice(12);
    const nameCoin = $(`.titel-${nameId}`).clone(true);
    const wrapper = $('<div class="grid-item">');

    wrapper.append(nameCoin, btnSwitch);
    modalBody.append(wrapper);
  }
}

$(document).on("click", ".modal-save-change", modalSaveChange);

function modalSaveChange() {
  const newArr = [];

  $(".modal-body .form-check-input").each(function () {
    const switchId = $(this).data("id");
    if ($(this).prop("checked")) {
      newArr.push(switchId);
    }
  });

  arr5switchs = newArr;

  $(".form-check-input").each(function () {
    const switchId = $(this).data("id");
    $(this).prop("checked", newArr.includes(switchId));
  });

  const modalEl = $("#myModal");
  const triggerSwitch = modalEl.data("triggerSwitch");

  if (
    arr5switchs.length < 5 &&
    triggerSwitch &&
    !arr5switchs.includes(triggerSwitch)
  ) {
    $(`#${triggerSwitch}`).prop("checked", true);
    arr5switchs.push(triggerSwitch);
    localStorage.setItem("arr5switchs", JSON.stringify(arr5switchs));
  }
}


$(".search").on("click", filtercardscoin);

function filtercardscoin() {
  const valFilter = $(".filter").val().trim().toLowerCase();

  $('.card').each(function() {
    const titel = $(this).find('.card-title').text().trim().toLowerCase();
    if (titel.startsWith(valFilter)) {
      $(this).removeClass('hidden');
    } else {
      $(this).addClass('hidden');    
    }
  });
}

