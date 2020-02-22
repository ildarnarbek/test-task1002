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
  toggleTermsAndCondition: function(toggleArr) {
    toggleArr.terms.style.display = toggleArr.styles.display;
    document.body.style.overflow = toggleArr.styles.overflow;
  },

  showTooltip: function(tooltipArr) {
    tooltipArr.tooltipId.style.display = tooltipArr.status;
  },
  inputMask: function() {},

  acceptOrder: function(arr) {
    arr.alert;
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
  openTermsArr: { display: "block", overflow: "hidden" },
  closeTermsArr: { display: "none", overflow: "visible" },

  ccvvCvcArr: {
    fieldId: document.querySelector("#cvv-cvc"),
    tooltipId: document.querySelector("#cvvCvcTooltip"),
    maxLength: 3
  },
  validThruYyArr: {
    fieldId: document.querySelector("#valid-thru-yy"),
    tooltipId: document.querySelector("#validThruTooltip"),
    maxLength: 2
  },
  validThruMmArr: {
    fieldId: document.querySelector("#valid-thru-mm"),
    tooltipId: document.querySelector("#validThruTooltip"),
    maxLength: 2
  },
  cardNumberArr: {
    fieldId: document.querySelector("#card-number"),
    tooltipId: document.querySelector("#cardnumberTooltip"),
    maxLength: 19
  },
  cardholdersName: document.querySelector("#cardholders-name"),

  tooltipStatus: {
    on: "block",
    off: "none"
  },

  orderBtnArr: {
    fieldId: document.querySelector(".accept-block__order-btn"),
    tooltipId: document.querySelector("#orderTooltip")
  },
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
    switch (selecedTab) {
      case qs(this.creditCardArr.tab):
        changeTabArr.typeArr = this.creditCardArr;
        break;
      case qs(this.giftCardArr.tab):
        changeTabArr.typeArr = this.giftCardArr;
        break;
      case qs(this.paypalArr.tab):
        changeTabArr.typeArr = this.paypalArr;
        break;
    }
    return changeTabArr;
  },

  toggleTermsAndCondition: function(status) {
    switch (status) {
      case "open":
        toggleArr = { terms: this.terms, styles: this.openTermsArr };
        break;
      case "close":
        toggleArr = { terms: this.terms, styles: this.closeTermsArr };
        break;
    }
    return toggleArr;
  },

  checkValue: function(e, field) {
    tooltipArr = {
      fieldId: "",
      tooltipId: "",
      maxLength: ""
    };
    if (field === this.ccvvCvcArr.fieldId) {
      tooltipArr = this.ccvvCvcArr;
    } else if (field === this.validThruYyArr.fieldId) {
      tooltipArr = this.validThruYyArr;
    } else if (field === this.validThruMmArr.fieldId) {
      tooltipArr = this.validThruMmArr;
    } else if (field === this.cardNumberArr.fieldId) {
      tooltipArr = this.cardNumberArr;
    }

    if (tooltipArr.fieldId.value.length < tooltipArr.maxLength) {
      if (!/\d/.test(e.key)) {
        e.preventDefault();
        tooltipArr.status = this.tooltipStatus.on;
      } else {
        tooltipArr.status = this.tooltipStatus.off;
      }
      return tooltipArr;
    }
  },
  delimiterCounter: function() {
    if (
      (this.cardNumberArr.fieldId.value.length + 1) % 5 === 0 &&
      this.cardNumberArr.fieldId.value.length + 1 < 19
    ) {
      return (this.cardNumberArr.fieldId.value += " ");
    }
  },
  message: function() {
    alert("Your order is accepted");
  },
  formChecker: function(e) {
    formArr = {
      tooltipId: this.orderBtnArr.tooltipId,
      status: ""
    };

    if (
      this.cardNumberArr.fieldId.value.length < this.cardNumberArr.maxLength ||
      this.validThruMmArr.fieldId.value.length < this.validThruMmArr.maxLength ||
      this.validThruYyArr.fieldId.value.length < this.validThruYyArr.maxLength ||
      this.ccvvCvcArr.fieldId.value.length < this.ccvvCvcArr.maxLength ||
      this.cardholdersName.value.length < 5 ||
      this.accept.checked == false
    ) {
      e.preventDefault();
      formArr.status = this.tooltipStatus.on;
    } else {
      formArr.status = this.tooltipStatus.off;
      formArr.alert = this.message();
    }
    e.preventDefault();

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
    view.switchTab(result);
  },
  handleOpenTermsAndCondition: function(action) {
    let result = model.toggleTermsAndCondition(action);
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
