(function(){
let creditCardTab = document.querySelector(".credit-card-tab"),
  giftCardTab = document.querySelector(".gift-card-tab"),
  payPalTab = document.querySelector(".pay-pal-tab"),
  creditcardBlock = document.querySelector(".creditcard-block"),
  giftcardBlock = document.querySelector(".giftcard-block"),
  paypalBlock = document.querySelector(".paypal-block");

function switchTab(selectedTab, showForm) {
  let tabs = document.querySelectorAll(".payment-method__tab");
  let types = document.querySelectorAll(".main-form__type");
  tabs.forEach(function(item) {
    item.classList.remove("payment-method__tab--select");
  });
  types.forEach(function(item) {
    item.classList.remove("main-form__type--show");
  });
  selectedTab.classList.add("payment-method__tab--select");
  showForm.classList.add("main-form__type--show");
}

creditCardTab.addEventListener("click", function() {
  switchTab(creditCardTab, creditcardBlock);
});
giftCardTab.addEventListener("click", function() {
  switchTab(giftCardTab, giftcardBlock);
});
payPalTab.addEventListener("click", function() {
  switchTab(payPalTab, paypalBlock);
});


let prices = document.querySelectorAll("tr>td:last-child"),
  totalSum = 0;
for (i = 0; i < prices.length; i++) {
  totalSum += parseFloat(prices[i].innerHTML);
}
totalSumToButton = "( $" + totalSum + " )";
document
  .querySelector(".accept-block__order-btn")
  .insertAdjacentHTML("beforeEnd", totalSumToButton);


let cardNumber = document.querySelector("#card-number"),
  validThruMm = document.querySelector("#valid-thru-mm"),
  validThruYy = document.querySelector("#valid-thru-yy"),
  cardholdersName = document.querySelector("#cardholders-name"),
  ccvvCvc = document.querySelector("#cvv-cvc"),
  orderBtn = document.querySelector(".accept-block__order-btn"),
  cardnumberTooltip = document.querySelector("#cardnumberTooltip"),
  validThruTooltip = document.querySelector("#validThruTooltip"),
  cvvCvcTooltip = document.querySelector("#cvvCvcTooltip"),
  orderTooltip = document.querySelector("#orderTooltip");


function checkValue(e, tooltip, field, maxlenght) {
  if (field.value.length < maxlenght) {
    if (!/\d/.test(e.key)) {
      e.preventDefault();
      tooltip.style.display = "block";
    } else {
      tooltip.style.display = "none";
    }
  }
}

cardNumber.addEventListener("keypress", e => {
  if (
    (cardNumber.value.length + 1) % 5 === 0 &&
    cardNumber.value.length + 1 < 19
  ) {
    cardNumber.value += " ";
  }
  checkValue(e, cardnumberTooltip, cardNumber, 19);
});

validThruMm.addEventListener("keypress", e => {
  checkValue(e, validThruTooltip, validThruMm, 2);
});
validThruYy.addEventListener("keypress", e => {
  checkValue(e, validThruTooltip, validThruYy, 2);
});

ccvvCvc.addEventListener("keypress", e => {
  checkValue(e, cvvCvcTooltip, ccvvCvc, 3);
});

let terms = document.querySelector("#terms"),
  termsAndConditions = document.querySelector(".terms-and-conditions"),
  cross = document.querySelector(".terms-and-conditions__cross"),
  accept = document.querySelector("#accept");

terms.addEventListener("click", function() {
  termsAndConditions.style.display = "block";
  document.body.style.overflow = "hidden";
});

cross.addEventListener("click", function(){
  termsAndConditions.style.display = "none";
  document.body.style.overflow = "visible";
});


orderBtn.addEventListener("click", e => {
  if (
    cardNumber.value.length < 19 ||
    validThruMm.value.length < 2 ||
    validThruYy.value.length < 2 ||
    ccvvCvc.value.length < 3 ||
    cardholdersName.value.length < 5 ||
    accept.checked == false
  ) {
    e.preventDefault();
    orderTooltip.style.display = "block";
  } else {
    orderTooltip.style.display = "none";
    e.preventDefault();
    alert("Your order is accepted");
  }
});
})();