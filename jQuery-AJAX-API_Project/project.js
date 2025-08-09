document.querySelector(".searchBox").addEventListener("keyup", searchItems);
document.querySelector(".about").addEventListener("click", showAbout);
document.querySelector(".liveReports").addEventListener("click", showReports);
document.querySelector(".home").addEventListener("click", showCards);
document.querySelector('.home').addEventListener('click', getData);
document.querySelector('.home').addEventListener('click', addCards);



function searchItems(event) {
  const inputValue = event.target.value;
  const names = document.querySelectorAll(".coinName");
  const card = document.querySelector(".card");
  for (const name of names) {
    if (!name.innerText.toLowerCase().startsWith(inputValue.toLowerCase())) {
      card.style.display = "none";
    } else {
      card.style.display = "grid";
    }
  }
}

function showAbout(event) {
  const aboutdiv = document.querySelector(".aboutDiv");
  aboutdiv.style.display = "block";
  if (!document.querySelector(".aboutSection")) {
    const div = document.createElement("div");
    div.className = "aboutSection";
    const h2 = document.createElement("h2");
    h2.className = "aboutHeader";
    h2.innerText = "ABOUT";
    const p = document.createElement("p");
    p.className = "aboutContent";
    p.innerText = `"Sagittis sit donec fermentum egestas tincidunt aliquet. Et pellentesque sed odio sodales. Laoreet diam malesuada nunc in aliquam. Tincidunt luctus arcu sed suspendisse amet. Ut sollicitudin in pellentesque congue sem. Id orci sit cursus arcu pellentesque donec. Ut turpis nunc purus egestas. Nulla volutpat vitae mauris bibendum mi dui. Scelerisque viverra et velit mattis. Ipsum facilisis commodo dignissim nulla nec venenatis sit. Volutpat pretium pulvinar nulla libero a scelerisque tellus vitae. Scelerisque auctor massa a sit id iaculis viverra dictum. Suspendisse quisque accumsan pretium sed.
                    Aenean massa mauris dictum nec. Ullamcorper nam porttitor gravida proin erat nam nibh laoreet vitae. Est aliquet habitasse cursus aliquam pretium maecenas. Neque etiam neque in in in cursus tortor quisque ipsum. Tempor feugiat a vel facilisis. Sit turpis arcu consequat ut tellus nulla nunc amet. Ac quam amet suspendisse cras diam donec. Cursus a faucibus mauris pretium elit nulla augue nisi. Adipiscing eleifend urna arcu quis bibendum nibh sed viverra. Penatibus sit in eget gravida gravida imperdiet ipsum. Aenean sed senectus enim ac viverra sem. Et mauris erat arcu nunc posuere venenatis amet. Feugiat cursus mi suspendisse ornare. Et massa senectus congue porttitor auctor gravida. Duis lobortis."`;

    div.append(h2, p);
    aboutdiv.appendChild(div);
  }
  eventush(event);

  const cardArea = document.querySelector(".cardsArea");
  cardArea.style.display = "none";
}

function showReports(event) {
  eventush(event);
}
function showCards(event) {
  eventush(event);
  const cardArea = document.querySelector(".cardsArea");
  cardArea.style.display = "block";
  const aboutArea = document.querySelector(".aboutDiv");
  aboutArea.style.display = "none";
}

function eventush(event) {
  const isClass = document.querySelector(".currentPage");
  isClass.classList.remove("currentPage");
  event.srcElement.classList = "currentPage " + event.srcElement.className;

  // const isShowen = document.querySelector(".showMe");
  // isShowen.classList.remove('showMe');

  // event.srcElement.classList = "showMe " + event.srcElement.className;
}

const coinName = [];

function getData() {
    event.preventDefault();
    fetch('https://api.coingecko.com/api/v3/coins/list')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); 
        })
        .then(names => {
            for (const name of names) {
                coinName.push(name.name);
            }
        })
        .catch(err => {
            console.error('שגיאה בשליפת הנתונים:', err);
        });
}

function addCards(event){
    document.querySelector(".cardsArea").display="flex";

    
    //הכרטיס עצמו
    let newCard = document.createElement("div");
    newCard.className = "card";
     
    //שם המטבע
    let coinName = document.createElement("h2");
    coinName.textContent = "ABCD";
    coinName.className = "coinName";

    //טוגל
    let label = document.createElement("label");
    label.className = "switch"
    let input = document.createElement("input");
    input.type = "checkbox"
    let span = document.createElement("span");
    span.className = "slider round"
    label.append(input, span);

    //כינוי המטבע
    let coinNickname = document.createElement("p");
    coinNickname.textContent = "ABCD";
    // coinName.textContent = document.querySelector('#formInfo').value
    coinNickname.className = "coinNickname";

    //מידע נוסף
    let moreInfo = document.createElement("div");
    moreInfo.className = "moreInfo";
     let collapsible = document.createElement("button");
    collapsible.type = "button";
    collapsible.innerText = "More Information";
    collapsible.className = "collapsible";
    

    //תוכן כרטיס מידע נוסף
    let content = document.createElement("div");
    content.className = "content";
    // <div class="img"></div>
    let coin = document.createElement("div");
    coin.className = "coin";
    let USD = document.createElement("div");
    USD.className = "USD";
    let USDName = document.createElement("p");
    USDName.textContent = "USD";
    USDName.className = "USDName";
    let USDAmount = document.createElement("p");
    // coinName.textContent = document.querySelector('#formInfo').value
    USDAmount.className = "USDAmount";
    USD.append(USDName, USDAmount);
    let EUR = document.createElement("div");
    EUR.className = "EUR";
    let EURName = document.createElement("p");
    EURName.textContent = "EUR";
    EURName.className = "EURName";
    let EURAmount = document.createElement("p");
    // coinName.textContent = document.querySelector('#formInfo').value
    EURAmount.className = "EURAmount";
    EUR.append(EURName, EURAmount);
    let ILS = document.createElement("div");
    ILS.className = "ILS";
    let ILSName = document.createElement("p");
    ILSName.textContent = "ILS";
    ILSName.className = "ILSName";
    let ILSAmount = document.createElement("p");
    // coinName.textContent = document.querySelector('#formInfo').value
    ILSAmount.className = "ILSAmount";
    ILS.append(ILSName, ILSAmount);
    coin.append(USD, EUR, ILS);
    content.append(coin);
    moreInfo.append(collapsible, content);
    newCard.append(coinName, label, coinNickname, moreInfo);
    document.querySelector(".cardsArea").append(newCard);

    collapsible.addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "flex") {
      content.style.display = "none";
    } else {
      content.style.display = "flex"; 
    }
  });

}

