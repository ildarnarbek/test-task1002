let creditCard = document.querySelector('.credit-card'),
giftCard = document.querySelector('.gift-card'),
payPal = document.querySelector('.pay-pal');

creditCard.onclick= function(){
    console.log('клик на кредит кард');
    creditCard.classList.add('select');
    giftCard.classList.remove('select');
    payPal.classList.remove('select');
    document.querySelector('.creditcard').classList.add('show');
    document.querySelector('.giftcard').classList.remove('show');
    document.querySelector('.paypal').classList.remove('show');
}
giftCard.onclick= function(){
    console.log('клик на гифт кард');
     giftCard.classList.add('select');
    payPal.classList.remove('select');
    creditCard.classList.remove('select');
    document.querySelector('.giftcard').classList.add('show');
    document.querySelector('.creditcard').classList.remove('show');
    document.querySelector('.paypal').classList.remove('show');
}
payPal.onclick= function(){
    console.log('клик на пейпал');
    payPal.classList.add('select');
    giftCard.classList.remove('select');
    creditCard.classList.remove('select');
    document.querySelector('.paypal').classList.add('show');
    document.querySelector('.creditcard').classList.remove('show');
    document.querySelector('.giftcard').classList.remove('show');
    console.log()
}


// Значение в Place order

   let price1 = document.querySelector('.price-item-1').innerHTML;
   let price2 = document.querySelector('.price-item-2').innerHTML;
   let priceShip1 = document.querySelector('.price-shipping-1').innerHTML;
   price1 = parseInt (price1.replace(/\D+/g,""))/100;
   price2 = parseInt (price2.replace(/\D+/g,""))/100;
   priceShip1 = parseInt (priceShip1.replace(/\D+/g,""))/100;
   totalSum= price1+price2+priceShip1;
   totalSumToButton = "($"+totalSum+")";
   document.querySelector('.order-btn').insertAdjacentHTML("beforeEnd", totalSumToButton);




let cardNumber = document.querySelector('#card-number'),
validThruMm = document.querySelector('#valid-thru-mm'),
validThruYy = document.querySelector('#valid-thru-yy'),
cardholdersName = document.querySelector('#cardholders-name'),
ccvvCvc = document.querySelector('#cvv-cvc');
orderBtn = document.querySelector('.order-btn') 


// Отмена ввода не цифр+разделитель
cardnumberTooltip = document.querySelector('#cardnumberTooltip');
validThruTooltip = document.querySelector('#validThruTooltip');
cvvCvcTooltip = document.querySelector('#cvvCvcTooltip');
orderTooltip = document.querySelector('#orderTooltip');





let delimiterСounter=0;

cardNumber.addEventListener('keypress', e => {
    if (cardNumber.value == "") {
        delimiterСounter=0;
    }
    if (delimiterСounter==4 && cardNumber.value.length <19){
        delimiterСounter=0;
        cardNumber.value +=" ";
    }
    delimiterСounter++;

    if(!/\d/.test(e.key))
        {e.preventDefault();
        delimiterСounter --;
        cardnumberTooltip.style.display = 'block'
    }
        else {
            cardnumberTooltip.style.display = 'none';
        }
});




validThruMm.addEventListener('keypress', e => {
    if(!/\d/.test(e.key))
    {e.preventDefault();
    validThruTooltip.style.display = 'block'
}
    else {
        validThruTooltip.style.display = 'none';
    }    
});
validThruYy.addEventListener('keypress', e => {
    if(!/\d/.test(e.key))
    {e.preventDefault();
    validThruTooltip.style.display = 'block'
}
    else {
        validThruTooltip.style.display = 'none';
    }
});
ccvvCvc.addEventListener('keypress', e => {
    if(!/\d/.test(e.key))
    {e.preventDefault();
        cvvCvcTooltip.style.display = 'block'
}
    else {
        cvvCvcTooltip.style.display = 'none';
    }
});


let terms = document.querySelector('#terms');
let termsAndConditions = document.querySelector ('.termsAndConditions')


terms.onclick = function() {
    // termsAndConditions.style.display= 'block';
    termsAndConditions.style.display = (termsAndConditions.style.display == 'block') ? 'none' : 'block';
}


accept = document.querySelector('#accept')


// Проверка полей
orderBtn.addEventListener('click', e => {
    if(cardNumber.value.length < 19||validThruMm.value.length<2||validThruYy.value.length<2||ccvvCvc.value.length<3||accept.checked == false)
    {e.preventDefault();
        orderTooltip.style.display = 'block'
}
    else {
        orderTooltip.style.display = 'none';
    }    
});