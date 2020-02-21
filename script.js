/* ---------------------------- begin view ----------------------------- */

let view = {
  showTotalSum: function(totalSumToButton) {
    let button = document.querySelector(".accept-block__order-btn");
    button.insertAdjacentHTML("beforeEnd", totalSumToButton);
  },

  switchTab: function(changeTabArr) {
    const qs = document.querySelector.bind(document);

    changeTabArr.tabs.forEach(function(item) {
      item.classList.remove(changeTabArr.stylesArr.tabSelectStyle);
    });
    changeTabArr.forms.forEach(function(item) {
      item.classList.remove(changeTabArr.stylesArr.formSelectStyle);
    });
    qs(changeTabArr.typeArr.tab).classList.add(
      changeTabArr.stylesArr.tabSelectStyle
    );
    qs(changeTabArr.typeArr.block).classList.add(
      changeTabArr.stylesArr.formSelectStyle
    );
  },
  toggleTermsAndCondition: function(arr) {
    arr[0].style.display = arr[1][0];
    document.body.style.overflow = arr[1][1];
  },

  showTooltip: function(arr) {
    arr[0][1].style.display = arr[1];
  },
  inputMask: function() {},

  acceptOrder: function(arr) {
    arr[2];
  }
};

/* ----------------------------- end view ------------------------------ */

/* ---------------------------- begin model ---------------------------- */

let model = {
  totalSum: 0,
  tabs: document.querySelectorAll(".payment-method__tab"),
  forms: document.querySelectorAll(".main-form__type"),

  creditCardArr: {
    tab: ".credit-card-tab",
    block: ".creditcard-block"
  },

  giftCardArr: {
    tab: ".gift-card-tab",
    block: ".giftcard-block"
  },
  paypalArr: {
    tab: ".pay-pal-tab",
    block: ".paypal-block"
  },
  stylesArr: {
    tabSelectStyle: "payment-method__tab--select",
    formSelectStyle: "main-form__type--show"
  },

  terms: document.querySelector(".terms-and-conditions"),
  openTermsArr: ["block", "hidden"],
  closeTermsArr: ["none", "visible"],
  ccvvCvcArr: [
    document.querySelector("#cvv-cvc"),
    document.querySelector("#cvvCvcTooltip"),
    3
  ],
  validThruYyArr: [
    document.querySelector("#valid-thru-yy"),
    document.querySelector("#validThruTooltip"),
    2
  ],
  validThruMmArr: [
    document.querySelector("#valid-thru-mm"),
    document.querySelector("#validThruTooltip"),
    2
  ],
  cardNumberArr: [
    document.querySelector("#card-number"),
    document.querySelector("#cardnumberTooltip"),
    19
  ],
  cardholdersName: document.querySelector("#cardholders-name"),

  tooltipStatus: ["block", "none"],

  orderBtnArr: [
    document.querySelector(".accept-block__order-btn"),
    document.querySelector("#orderTooltip")
  ],
  accept: document.querySelector("#accept"),

  calculateTotalSum: function() {
    let prices = document.querySelectorAll("tr>td:last-child");
    for (i = 0; i < prices.length; i++) {
      this.totalSum += parseFloat(prices[i].innerHTML);
    }
    this.totalSum = " ( $" + this.totalSum + " )";
    return this.totalSum;
  },

  checkTab: function(selecedTab) {
    const qs = document.querySelector.bind(document);
    changeTabArr = {
      tabs: this.tabs,
      forms: this.forms,
      stylesArr: this.stylesArr
    };

    if (selecedTab === qs(this.creditCardArr.tab)) {

      changeTabArr.typeArr = this.creditCardArr;
    }
    if (selecedTab === qs(this.giftCardArr.tab)) {
      changeTabArr.typeArr = this.giftCardArr;
    }
    if (selecedTab === qs(this.paypalArr.tab)) {
      changeTabArr.typeArr = this.paypalArr;
    }

    return changeTabArr;
  },

  toggle: function(status) {
    if (status === "open") {
      toggleArr = [this.terms, this.openTermsArr];
    }
    if (status === "close") {
      toggleArr = [this.terms, this.closeTermsArr];
    }
    return toggleArr;
  },

  checkValue: function(e, field) {
    if (field === this.ccvvCvcArr[0]) {
      checkArr = this.ccvvCvcArr;
    } else if (field === this.validThruYyArr[0]) {
      checkArr = this.validThruYyArr;
    } else if (field === this.validThruMmArr[0]) {
      checkArr = this.validThruMmArr;
    } else if (field === this.cardNumberArr[0]) {
      checkArr = this.cardNumberArr;
    }

    if (checkArr[0].value.length < checkArr[2]) {
      if (!/\d/.test(e.key)) {
        e.preventDefault();
        showHideTooltipArr = [checkArr, this.tooltipStatus[0]];
      } else {
        showHideTooltipArr = [checkArr, this.tooltipStatus[1]];
      }
      return showHideTooltipArr;
    }
  },
  delimiterCounter: function() {
    if (
      (this.cardNumberArr[0].value.length + 1) % 5 === 0 &&
      this.cardNumberArr[0].value.length + 1 < 19
    ) {
      return (this.cardNumberArr[0].value += " ");
    }
  },
  message: function() {
    alert("Your order is accepted");
  },
  formChecker: function(e) {
    if (
      this.cardNumberArr[0].value.length < 19 ||
      this.validThruMmArr[0].value.length < 2 ||
      this.validThruYyArr[0].value.length < 2 ||
      this.ccvvCvcArr[0].value.length < 3 ||
      this.cardholdersName.value.length < 5 ||
      this.accept.checked == false
    ) {
      e.preventDefault();
      formArr = [this.orderBtnArr, this.tooltipStatus[0]];
    } else {
      formArr = [this.orderBtnArr, this.tooltipStatus[1], this.message()];
      e.preventDefault();
    }
    return formArr;
  }
};

/* ----------------------------- end model ----------------------------- */

/* -------------------------- begin controller ------------------------- */

let controller = {
  onLoad: function() {
    let result = model.calculateTotalSum();
    view.showTotalSum(result);
  },
  handleChangeTab: function(selecedTab) {
    let result = model.checkTab(selecedTab);
    console.log("результат возврата" + result);
    console.log("результат возврата" + result.tabs);
    view.switchTab(result);
  },
  handleOpenTermsAndCondition: function(action) {
    let result = model.toggle(action);
    view.toggleTermsAndCondition(result);
  },
  handleInputChange: function(e, field) {
    let showTooltipResult = model.checkValue(e, field);
    let inputMaskResult = model.delimiterCounter(e);
    view.showTooltip(showTooltipResult);
    view.inputMask(inputMaskResult);
  },
  handleClickOrder: function(e) {
    let result = model.formChecker(e);
    view.acceptOrder(result);
    view.showTooltip(result);
  }
};

/* --------------------------- end controller -------------------------- */

/* --------------------- anonymous initialize function ----------------- */
(function() {
  let app = {
    init: function() {
      this.main();
      this.event();
    },
    main: function() {},
    event: function() {
      const giftCardTab = document.querySelector(".gift-card-tab"),
        payPalTab = document.querySelector(".pay-pal-tab"),
        creditCardTab = document.querySelector(".credit-card-tab"),
        terms = document.querySelector("#terms"),
        cross = document.querySelector(".terms-and-conditions__cross"),
        cardNumber = document.querySelector("#card-number"),
        validThruMm = document.querySelector("#valid-thru-mm"),
        validThruYy = document.querySelector("#valid-thru-yy"),
        ccvvCvc = document.querySelector("#cvv-cvc"),
        orderBtn = document.querySelector(".accept-block__order-btn");

      giftCardTab.addEventListener("click", () => {
        controller.handleChangeTab(giftCardTab);
      });
      payPalTab.addEventListener("click", () => {
        controller.handleChangeTab(payPalTab);
      });
      creditCardTab.addEventListener("click", () => {
        controller.handleChangeTab(creditCardTab);
      });
      terms.addEventListener("click", () => {
        controller.handleOpenTermsAndCondition("open");
      });
      cross.addEventListener("click", () => {
        controller.handleOpenTermsAndCondition("close");
      });
      ccvvCvc.addEventListener("keypress", e => {
        controller.handleInputChange(e, ccvvCvc);
      });
      validThruYy.addEventListener("keypress", e => {
        controller.handleInputChange(e, validThruYy);
      });
      validThruMm.addEventListener("keypress", e => {
        controller.handleInputChange(e, validThruMm);
      });
      cardNumber.addEventListener("keypress", e => {
        controller.handleInputChange(e, cardNumber);
      });
      orderBtn.addEventListener("click", e => {
        controller.handleClickOrder(e);
      });
      window.onload = controller.onLoad;
    }
  };

  app.init();
})();
/* --------------------- anonymous initialize function ----------------- */
