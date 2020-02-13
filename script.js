let creditCardTab = document.querySelector(".credit-card-tab"),
  giftCardTab = document.querySelector(".gift-card-tab"),
  payPalTab = document.querySelector(".pay-pal-tab"),
  creditcardBlock = document.querySelector(".creditcard-block"),
  giftcardBlock = document.querySelector(".giftcard-block"),
  paypalBlock = document.querySelector(".paypal-block");

function switchTab(selectedTab, showForm) {
  let tabs = document.querySelectorAll(".payment-type");
  let types = document.querySelectorAll(".type");
  for (let i = 0; i < 3; i++) {
    tabs[i].classList.remove("select");
    selectedTab.classList.add("select");
    types[i].classList.remove("show");
    showForm.classList.add("show");
  }
}

creditCardTab.addEventListener("click", function() {
  return switchTab(creditCardTab, creditcardBlock);
});
giftCardTab.addEventListener("click", function() {
  return switchTab(giftCardTab, giftcardBlock);
});
payPalTab.addEventListener("click", function() {
  return switchTab(payPalTab, paypalBlock);
});

// Значение в Place order
let prices = document.querySelectorAll('tr>td:last-child'),
    totalSum=0;
for(i=0; i<prices.length ; i++ ){
    totalSum+= parseFloat(prices[i].innerHTML);
}
totalSumToButton = "( $" + totalSum + " )";
document
  .querySelector(".order-btn")
  .insertAdjacentHTML("beforeEnd", totalSumToButton);



let cardNumber = document.querySelector("#card-number"),
  validThruMm = document.querySelector("#valid-thru-mm"),
  validThruYy = document.querySelector("#valid-thru-yy"),
  cardholdersName = document.querySelector("#cardholders-name"),
  ccvvCvc = document.querySelector("#cvv-cvc"),
  orderBtn = document.querySelector(".order-btn");

// Отмена ввода не цифр+разделитель
cardnumberTooltip = document.querySelector("#cardnumberTooltip");
validThruTooltip = document.querySelector("#validThruTooltip");
cvvCvcTooltip = document.querySelector("#cvvCvcTooltip");
orderTooltip = document.querySelector("#orderTooltip");

let delimiterСounter = 0;


function hideElement(element) {
    element.style.display = "none";
}

function showlement(element) {
    element.style.display = "block";
}


cardNumber.addEventListener("keypress", e => {
  if (cardNumber.value == "") {
    delimiterСounter = 0;
  }
  if (delimiterСounter == 4 && cardNumber.value.length < 19) {
    delimiterСounter = 0;
    cardNumber.value += " ";
  }
  delimiterСounter++;

  if (!/\d/.test(e.key)) {
    e.preventDefault();
    delimiterСounter--;
    showlement(cardnumberTooltip);
  } else {
    hideElement(cardnumberTooltip);
  }
});

validThruMm.addEventListener("keypress", e => {
  if (!/\d/.test(e.key)) {
    e.preventDefault();
    showlement(validThruTooltip);
  } else {
    hideElement(validThruTooltip);
  }
});
validThruYy.addEventListener("keypress", e => {
  if (!/\d/.test(e.key)) {
    e.preventDefault();
    showlement(validThruTooltip);
  } else {
    hideElement(validThruTooltip);
  }
});
ccvvCvc.addEventListener("keypress", e => {
  if (!/\d/.test(e.key)) {
    e.preventDefault();
    showlement(cvvCvcTooltip);
  } else {
    hideElement(cvvCvcTooltip);
  }
});

let terms = document.querySelector("#terms");
let termsAndConditions = document.querySelector(".termsAndConditions");

terms.onclick = function() {
  termsAndConditions.style.display =
    termsAndConditions.style.display == "block" ? "none" : "block";
};

accept = document.querySelector("#accept");

// Проверка полей
orderBtn.addEventListener("click", e => {
  if (
    cardNumber.value.length < 19 ||
    validThruMm.value.length < 2 ||
    validThruYy.value.length < 2 ||
    ccvvCvc.value.length < 3 ||
    accept.checked == false
  ) {
    e.preventDefault();
    showlement(orderTooltip);
  } else {
    hideElement(orderTooltip);
  }
});
