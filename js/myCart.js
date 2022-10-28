const menuToggler = $('.menu-toggler')
const navLinks = $('.nav-links')
const navBar = document.querySelector('.nav-bar')
const accountToggle = document.querySelector('.no-account')
const logoutBtn = document.querySelector('.sign-out')
const itemCartContainer = document.querySelector('.cart-items-container')
const btnPay = document.querySelector('.btn-pay')
const totalPrice = document.querySelector('#price')
const btnCloseConfirmForm = document.querySelector('.btn-purchase.btn-close')
const btnConfirmPurchase = document.querySelector('.btn-purchase.btn-confirm')
const confirmPurchaseForm = document.querySelector('.confirm-payment')
const purchaseThankForm = document.querySelector('.thank-purchase')
const btnContinueShopping = document.querySelector('.btn-continue')
const phoneNum = document.querySelector('#phoneNumber')
const bankAcc = document.querySelector('#bankAccount')
const errMsgContainer = document.querySelector('.display-error')
const errMsg = document.querySelector('#error')
const btnCloseErrMsg = document.querySelector('#btn-close-err')


var sumOfTotalPrice = 0;
var btnDeletes;
var checkBoxes;
var btnDecreases;
var btnIncreases;

$(document).ready(() => {
    menuToggler.click(() => {
        navLinks.toggleClass('menu-active')
        menuToggler.toggleClass('menu-close')
    })
})


accountToggle.addEventListener('click', () => {
    window.location.href = "../html/login.html";
})

window.addEventListener('load', () => {
    loadAccount();
})

function loadAccount() {
    let temp = localStorage.getItem('login') != null ? localStorage.getItem('login').split(';') : '0'
    if (temp[0] == '1') {
        navBar.classList.add('active')
        document.querySelector('#username').textContent = temp[1]
    }
}

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('login')
    window.location.href = "../html/home.html";
})

window.onload = loadCartItems();

function loadCartItems() {
    let items = [];
    let temp = Object.keys(localStorage);

    for (item of temp)
        if (item != 'login' && item != 'signup')
            items.push(item);

    for (item of items)
        itemCartContainer.append(createCartItem(item))

    btnDeletes = itemCartContainer.querySelectorAll('.btn-delete')
    checkBoxes = itemCartContainer.querySelectorAll('input[type="checkbox"]')
    btnDecreases = itemCartContainer.querySelectorAll('.btn-decrease')
    btnIncreases = itemCartContainer.querySelectorAll('.btn-increase')

    btnDeletes.forEach(btn => {
        btn.addEventListener('click', (e) => {
            let firstChild = btn.parentElement.parentElement.firstElementChild;
            let curCheckbox = firstChild.firstElementChild.firstElementChild;
            let unitPrice = firstChild.nextElementSibling.textContent
            let quan = firstChild.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.value;

            if (curCheckbox.checked)
                sumOfTotalPrice -= parseInt(unitPrice.replace(',', '').substr(1)) * parseInt(quan)

            totalPrice.textContent = `$ ${sumOfTotalPrice.toLocaleString()}`;
            localStorage.removeItem(firstChild.parentElement.getAttribute('id'))
            firstChild.parentElement.remove()
        })
    })

    checkBoxes.forEach(checkbox => {
        checkbox.addEventListener('click', (e) => {
            let curParent = checkbox.parentElement.parentElement;
            let unitPrice = curParent.nextElementSibling.textContent
            let quan = curParent.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.value;

            if (checkbox.checked)
                sumOfTotalPrice += parseInt(unitPrice.replace(',', '').substr(1)) * parseInt(quan)
            else {
                sumOfTotalPrice -= parseInt(unitPrice.replace(',', '').substr(1)) * parseInt(quan)
            }

            totalPrice.textContent = `$ ${sumOfTotalPrice.toLocaleString()}`;
        })
    })

    btnDecreases.forEach(btnDecrease => {
        btnDecrease.addEventListener('click', () => {
            let nextSib = btnDecrease.nextElementSibling
            let oldQuan = parseInt(nextSib.value)
            let newQuan = oldQuan;

            let parent = btnDecrease.parentElement.parentElement
            let curCheckBok = parent.firstElementChild.firstElementChild.firstElementChild
            let unitPrice = parent.firstElementChild.nextElementSibling.textContent

            newQuan = (newQuan > 1) ? --newQuan : 1
            nextSib.value = newQuan

            sumOfTotalPrice = parseInt(totalPrice.textContent.replace(',', '').substr(2))
            if (curCheckBok.checked) {
                sumOfTotalPrice -= parseInt(unitPrice.replace(',', '').substr(1)) * parseInt(oldQuan - newQuan)
            }

            totalPrice.textContent = `$ ${sumOfTotalPrice.toLocaleString()}`
        })
    })

    btnIncreases.forEach(btnIncrease => {
        btnIncrease.addEventListener('click', (e) => {
            let preSib = btnIncrease.previousElementSibling
            let oldQuan = parseInt(preSib.value)
            let newQuan = oldQuan

            let parent = btnIncrease.parentElement.parentElement
            let curCheckBok = parent.firstElementChild.firstElementChild.firstElementChild
            let unitPrice = parent.firstElementChild.nextElementSibling.textContent

            newQuan = (newQuan < 99) ? ++newQuan : 99
            preSib.value = newQuan

            sumOfTotalPrice = parseInt(totalPrice.textContent.replace(',', '').substr(2))
            if (curCheckBok.checked) {
                sumOfTotalPrice += parseInt(unitPrice.replace(',', '').substr(1)) * parseInt(newQuan - oldQuan)
            }

            totalPrice.textContent = `$ ${sumOfTotalPrice.toLocaleString()}`
        })
    })

}

function createCartItem(item) {
    let cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.setAttribute('id', item)

    let temp = localStorage.getItem(item).split(';');
    let idx = item.split('-')[1];

    cartItem.innerHTML =
        `<div class="cart-item__product">
            <div class="cart-item__check-box">
                <input type="checkbox"">
            </div>
            <div class="cart-item__product-overview">
                <img src="../img/products/Gaming-laptop/${idx}/${temp[2].trim()}" alt="">
                <div class="product-overview__product-name">${temp[0]}</div>
            </div>
        </div>

        <div class="cart-item__unit-price">${products[idx - 1]['newPrice']}</div>

        <div class="cart-item__quantity">
            <button class="btn btn-decrease">
                <i class="fas fa-minus"></i>
            </button>
            <input type="text" maxlength="2" disabled value="${temp[1]}">
            <button class="btn btn-increase">
               <i class="fas fa-plus"></i>
            </button>
        </div>

         <div class="cart-item__delete">
            <button class="btn-delete">
                <i class="fas fa-times-circle"></i>
            </button>
        </div>`

    return cartItem;
}

function isNotChecked() {
    return Array.from(checkBoxes).every(checkbox => {
        return !checkbox.checked
    })
}

function removePurchasedItems() {
    checkBoxes.forEach(checkbox => {
        if (checkbox.checked)
            localStorage.removeItem(checkbox.parentElement.parentElement.parentElement.getAttribute('id'));
    })
}

function popUpMsg(msg) {
    errMsgContainer.classList.toggle('active')
    errMsg.textContent = msg
}

function validatePhoneAndBankAccount() {
    let phone = phoneNum.value;
    let acc = bankAcc.value;

    if (!/^0\d{9,10}$/.test(phone)) {
        popUpMsg('Phone number must begin with 0 followed by 9 or 10 digits!')
        return false;
    }

    if (!/^(\d{4}\s){2}\d{4}$/.test(acc)) {
        popUpMsg('Bank account should be like xxxx xxxx xxxx where x is digit')
        return false;
    }

    return true;
}

function haveProduct() {
    let items = Object.keys(localStorage)
    for (item of items)
        if (/^item-\d$/.test(item))
            return true
    return false
}

btnPay.addEventListener('click', () => {
    if (isNotChecked()) {
        checkBoxes.forEach(checkbox => {
            checkbox.click();
        })
    }

    if (haveProduct())
        confirmPurchaseForm.classList.toggle('active')
    else
        popUpMsg('Your cart is empty!')
})

btnCloseErrMsg.addEventListener('click', () => {
    errMsgContainer.classList.toggle('active');
})

btnCloseConfirmForm.addEventListener('click', () => {
    confirmPurchaseForm.classList.toggle('active')
});

btnContinueShopping.addEventListener('click', () => {
    purchaseThankForm.classList.toggle('active');
    window.location.href = "../html/home.html"
})

btnConfirmPurchase.addEventListener('click', () => {
    if (validatePhoneAndBankAccount()) {

        confirmPurchaseForm.classList.toggle('active');

        removePurchasedItems();

        purchaseThankForm.classList.toggle('active');
    }

})