let creditCardTab = document.querySelector(".credit-card-tab"),
  giftCardTab = document.querySelector(".gift-card-tab"),
  payPalTab = document.querySelector(".pay-pal-tab"),
  creditcardBlock = document.querySelector(".creditcard-block"),
  giftcardBlock = document.querySelector(".giftcard-block"),
  paypalBlock = document.querySelector(".paypal-block");

creditCardTab.onclick = function() {
  console.log("клик на кредит кард");
  creditCardTab.classList.add("select");
  giftCardTab.classList.remove("select");
  payPalTab.classList.remove("select");
  creditcardBlock.classList.add("show");
  giftcardBlock.classList.remove("show");
  paypalBlock.classList.remove("show");
};
giftCardTab.onclick = function() {
  console.log("клик на гифт кард");
  giftCardTab.classList.add("select");
  payPalTab.classList.remove("select");
  creditCardTab.classList.remove("select");
  giftcardBlock.classList.add("show");
  creditcardBlock.classList.remove("show");
  paypalBlock.classList.remove("show");
};
payPalTab.onclick = function() {
  console.log("клик на пейпал");
  payPalTab.classList.add("select");
  giftCardTab.classList.remove("select");
  creditCardTab.classList.remove("select");
  paypalBlock.classList.add("show");
  creditcardBlock.classList.remove("show");
  giftcardBlock.classList.remove("show");
  console.log();
};

// Значение в Place order

let price1 = document.querySelector(".price-item-1").innerHTML;
let price2 = document.querySelector(".price-item-2").innerHTML;
let priceShip1 = document.querySelector(".price-shipping-1").innerHTML;
price1 = parseInt(price1.replace(/\D+/g, "")) / 100;
price2 = parseInt(price2.replace(/\D+/g, "")) / 100;
priceShip1 = parseInt(priceShip1.replace(/\D+/g, "")) / 100;
totalSum = price1 + price2 + priceShip1;
totalSumToButton = "($" + totalSum + " )";
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
    cardnumberTooltip.style.display = "block";
  } else {
    cardnumberTooltip.style.display = "none";
  }
});

validThruMm.addEventListener("keypress", e => {
  if (!/\d/.test(e.key)) {
    e.preventDefault();
    validThruTooltip.style.display = "block";
  } else {
    validThruTooltip.style.display = "none";
  }
});
validThruYy.addEventListener("keypress", e => {
  if (!/\d/.test(e.key)) {
    e.preventDefault();
    validThruTooltip.style.display = "block";
  } else {
    validThruTooltip.style.display = "none";
  }
});
ccvvCvc.addEventListener("keypress", e => {
  if (!/\d/.test(e.key)) {
    e.preventDefault();
    cvvCvcTooltip.style.display = "block";
  } else {
    cvvCvcTooltip.style.display = "none";
  }
});

let terms = document.querySelector("#terms");
let termsAndConditions = document.querySelector(".termsAndConditions");

terms.onclick = function() {
  // termsAndConditions.style.display= 'block';
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
    orderTooltip.style.display = "block";
  } else {
    orderTooltip.style.display = "none";
  }
});
