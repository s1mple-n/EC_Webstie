const menuToggler = $('.menu-toggler');
const navLinks = $('.nav-links');
const showCase = document.querySelector('.showcase');
const content = document.querySelector('.content');
const moreDetail = document.querySelector('#more-detail');
const specs = document.querySelector('#spec');
const myCart = document.querySelector('#my-cart');
const cartItem = document.querySelector('#mycart-item')
const cartAmount = document.querySelector('#cart-amount')
const navBar = document.querySelector('.nav-bar');
const accountToggle = document.querySelector('.no-account');
const logoutBtn = document.querySelector('.sign-out');

var mainImgSlide;
var imgSlide;
var btnIncrease;
var btnDecrease;
var btnToCart;
var btnBuy;
var quantity;
var curQuantity = 1;

accountToggle.addEventListener('click', () => {
    window.location.href = "../html/login.html";
})

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('login')
    window.location.reload();
})

function loadAccount() {
    let temp = localStorage.getItem('login') != null ? localStorage.getItem('login').split(';') : '0'
    if (temp[0] == '1') {
        navBar.classList.add('active')
        document.querySelector('#username').textContent = temp[1]
        loadMyCart();
    }
}


var loadProductDetail = () => {
    let curProductID = new URLSearchParams(window.location.search).get('product');
    showCase.append(createShowCase(curProductID));
    content.append(createContent(curProductID));
    specs.append(getSpecifications(curProductID))
    moreDetail.append(getProductDetail(curProductID))
    loadAccount()

    mainImgSlide = document.querySelectorAll('.main-img');
    imgSlide = document.querySelectorAll('.img-slide');
    btnIncrease = document.querySelector('.btn-increase');
    btnDecrease = document.querySelector('.btn-decrease');
    btnToCart = document.querySelector('.btn-to-cart');
    btnBuy = document.querySelector('.btn-buy')
    quantity = document.querySelector('#quantity');
}

function loadMyCart() {
    let items = Object.keys(localStorage)

    if (items.length > 0) {

        let cartItemsLen = 0;
        for (item of items)
            if (item != 'login' && item != 'signup')
                cartItemsLen++;

        if (cartItemsLen != 0)
            myCart.classList.replace('no-items', 'have-items');

        cartAmount.textContent = cartItemsLen;
    }

    for (i of items)
        if (i == 'login' || i == 'signup')
            continue;
        else
            cartItem.prepend(createMyCartItem(i))
}

function createShowCase(idx) {
    let showCaseDiv = document.createElement('div');
    showCaseDiv.innerHTML =
        `
            <div class="showcase__img">
                <img class="main-img active-slide" src="../img/products/Gaming-laptop/${idx}/${products[idx - 1]['showCaseImgs'][0]}" alt="">
                <img class="main-img" src="../img/products/Gaming-laptop/${idx}/${products[idx - 1]['showCaseImgs'][1]}" alt="">
                <img class="main-img" src="../img/products/Gaming-laptop/${idx}/${products[idx - 1]['showCaseImgs'][2]}" alt="">
                <img class="main-img" src="../img/products/Gaming-laptop/${idx}/${products[idx - 1]['showCaseImgs'][3]}" alt="">
                <img class="main-img" src="../img/products/Gaming-laptop/${idx}/${products[idx - 1]['showCaseImgs'][4]}" alt="">
            </div>

            <div class="showcase__img--slider">
                <img class="img-slide" id="1" src="../img/products/Gaming-laptop/${idx}/${products[idx - 1]['showCaseImgs'][0]}" alt="">
                <img class="img-slide" id="2" src="../img/products/Gaming-laptop/${idx}/${products[idx - 1]['showCaseImgs'][1]}" alt="">
                <img class="img-slide" id="3" src="../img/products/Gaming-laptop/${idx}/${products[idx - 1]['showCaseImgs'][2]}" alt="">
                <img class="img-slide" id="4" src="../img/products/Gaming-laptop/${idx}/${products[idx - 1]['showCaseImgs'][3]}" alt="">
                <img class="img-slide" id="5" src="../img/products/Gaming-laptop/${idx}/${products[idx - 1]['showCaseImgs'][4]}" alt="">
            </div>
        `

    return showCaseDiv;
}

function createContent(idx) {
    let contentDiv = document.createElement('div');

    contentDiv.innerHTML =
        `
        <div class="product__name">${products[idx - 1]['productName']}</div>

        <div class="product__rating">
            <span class="rate">
                <span id="total-rate">${products[idx - 1]['rate']}</span>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
            </span>

            <span class="review">
                <span id="review-amount">${products[idx - 1]['reviews']}</span> Reviews
            </span>

            <span class="sold">
                <span id="sold-amount">${products[idx - 1]['sold']}</span> Sold
            </span>
        </div>

        <div class="product__desc">

            <div class="overview">
                <h3>Features:</h3>

                <ul class="details">
                    <li>
                        <i class="fas fa-laptop-code"></i>
                        <span title="Screen">${products[idx - 1]['screen']}</span>
                    </li>

                    <li>
                        <i class="fas fa-microchip"></i>
                        <span title="Processor">${products[idx - 1]['processor']}</span>
                    </li>

                    <li>
                        <i class="fas fa-memory"></i>
                        <span title="Memory">${products[idx - 1]['memory']}</span>
                    </li>

                    <li>
                        <i class="fas fa-hdd"></i>
                        <span title="Hard Drive">${products[idx - 1]['hardDrive']}</span>
                    </li>
                </ul>
            </div>

            <a href="#spec" class="btn-overview">More Detail</a>
        </div>

        <div class="product__price">
            <div class="old-price">
                Old price: <span id="old-price">${products[idx - 1]['oldPrice']}</span>
            </div>

            <div class="new-price">
                New price: <span id="new-price">${products[idx - 1]['newPrice']}</span>
            </div>
        </div>

        <div class="payment">
            <span class="quantity-info">
                <button disabled class="btnFunction btn-decrease">
                    <i class="fas fa-minus"></i>
                </button>
                <input type="text" id="quantity" value="1" minlength="1" maxlength="2">
                <button class="btnFunction btn-increase">
                    <i class="fas fa-plus"></i>
                </button>
            </span>

            <span class="payment-btn">
                <button type="submit" class="btn btn-to-cart">add to cart
                    <i class="fas fa-shopping-cart"></i>
                </button>
                <button type="submit" class="btn btn-buy">buy now</button>
            </span>
        </div>

        <div class="share">
            <span class="share-title">Share to:</span>
            <span class="social-media">
                <i class="fab fa-facebook-f"></i>
                <i class="fab fa-instagram"></i>
                <i class="fab fa-twitter"></i>
            </span>
        </div>
    `

    return contentDiv;
}

window.onload = loadProductDetail();

imgSlide.forEach(img => {
    img.addEventListener('click', (e) => {
        mainImgSlide.forEach(mainImg => {
            mainImg.classList.remove('active-slide');
        });
        mainImgSlide[e.currentTarget.id - 1].classList.add('active-slide');
    })
})

let quantityChange = () => {
    if (curQuantity >= 99)
        btnIncrease.disabled = true;
    else if (curQuantity < 2)
        btnDecrease.disabled = true;
    else {
        btnIncrease.disabled = false;
        btnDecrease.disabled = false;
    }
    quantity.value = curQuantity;
}

btnIncrease.addEventListener('click', () => {
    if (curQuantity <= 99)
        curQuantity++;
    else
        curQuantity = 99;
    quantityChange();
});

btnDecrease.addEventListener('click', () => {
    if (curQuantity > 1)
        curQuantity--;
    else
        curQuantity = 1;
    quantity.value = curQuantity;
    quantityChange();
});

quantity.addEventListener('keydown', (e) => {
    let key = e.keyCode
    if (quantity.value == '00')
        quantity.value = '1'

    if ((key != 8 && !(key >= 48 && key <= 57)) || quantity.value.length > 2)
        e.preventDefault();
})

btnToCart.addEventListener('click', () => {

    if (localStorage.getItem('login') == null) {
        window.location.href = "../html/login.html"
    }

    let curProductID = new URLSearchParams(window.location.search).get('product');
    myCart.classList.replace('no-items', 'have-items')

    let cartQuan = parseInt(quantity.value)

    let temp = localStorage.getItem('item-' + curProductID)

    if (temp != null) {
        localStorage.setItem('item-' + curProductID, `${products[curProductID - 1]['productName']};${parseInt(temp.split(';')[1]) + cartQuan};
        ${products[curProductID - 1]['showCaseImgs'][0]}`)

        temp = localStorage.getItem('item-' + curProductID)
        let quan = temp.split(';')[1]

        updateQuantity(curProductID, quan)
    } else {
        localStorage.setItem('item-' + curProductID, `${products[curProductID - 1]['productName']};${cartQuan};
        ${products[curProductID - 1]['showCaseImgs'][0]}`)
        cartItem.prepend(createMyCartItem('item-' + curProductID))
    }

    let itemQuan = 0
    let items = Object.keys(localStorage)

    for (item of items)
        if (/item-.+/.test(item))
            itemQuan++;

    cartAmount.textContent = itemQuan;
});

btnBuy.addEventListener('click', () => {
    btnToCart.click();
    if (localStorage.getItem('login') != null)
        window.location.href = "../html/myCart.html"
})

function createMyCartItem(idx) {
    let li = document.createElement('li');

    li.setAttribute('id', 'item' + idx.split('-')[1])

    let items = localStorage.getItem(idx).split(';');

    li.innerHTML =
        `<img src="../img/products/Gaming-laptop/${idx.split('-')[1]}/${items[2].trim()}" alt="" />
        <span id="cart-item_name">${items[0]}</span>
        <span id="cart-item_quan">x${items[1]}</span>`
    return li;
}

function updateQuantity(idx, newQuan) {
    document.querySelector(`#mycart-item li#item${idx} #cart-item_quan`).textContent = `X${newQuan}`
}

function getSpecifications(idx) {
    let table = document.createElement('table');
    table.setAttribute('cellpadding', '0');
    table.setAttribute('cellspacing', '0');
    table.innerHTML = `
            <tr>
              <td>Brand</td>
              <td>${products[idx - 1]['brand']}</td>
            </tr>

            <tr>
              <td>Model</td>
              <td>${products[idx - 1]['productName']}</td>
            </tr>

            <tr>
                <td>CPU</td>
                <td>${products[idx - 1]['processor']}</td>
            </tr>

            <tr>
                <td>RAM</td>
                <td>${products[idx - 1]['memory']}</td>
            </tr>

            <tr>
                <td>GPU</td>
                <td>${products[idx - 1]['gpu']}</td>
            </tr>

            <tr>
                <td>Hard Drive</td>
                <td>${products[idx - 1]['hardDrive']}</td>
            </tr>

            <tr>
              <td>Screen Resolution</td>
              <td>${products[idx - 1]['screen']}</td>
            </tr>

            <tr>
              <td>Connections</td>
              <td>${products[idx - 1]['connection']}</td>
            </tr>

            <tr>
              <td>KeyBoard</td>
              <td>${products[idx - 1]['keyBoard']}</td>
            </tr>

            <tr>
              <td>Weight</td>
              <td>${products[idx - 1]['weight']}</td>
            </tr>

            <tr>
              <td>Battery</td>
              <td>${products[idx - 1]['battery']}</td>
            </tr>

            <tr>
              <td>OS</td>
              <td>Windows 10 Home</td>
            </tr>`
    return table;
}

function getProductDetail(idx) {

    let wrapper = document.createElement('div');

    wrapper.innerHTML = `
        <h3>About this product:</h3>
        <img src="../img/products/Gaming-laptop/${idx}/${products[idx - 1]['showCaseImgs'][5]}"/>
        <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora officia natus, itaque consequuntur cum earum esse. Velit praesentium omnis sapiente numquam magni! Commodi, rerum! Qui, esse explicabo dolore architecto, distinctio molestiae excepturi a pariatur fugiat, repudiandae deserunt. Earum expedita illo provident minus dignissimos eius assumenda laudantium. Repellat, sunt. Dicta, harum,Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora officia natus, itaque consequuntur cum earum esse. Velit praesentium omnis sapiente numquam magni! Commodi, rerum!
        <br>
        <br>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora officia natus, itaque consequuntur cum earum esse. Velit praesentium omnis sapiente numquam magni! Commodi, rerum! Qui, esse explicabo dolore architecto, distinctio molestiae excepturi a pariatur fugiat, repudiandae deserunt. Earum expedita illo provident minus dignissimos eius assumenda laudantium. Repellat, sunt. Dicta, harum,Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora officia natus, itaque consequuntur cum earum esse. Velit praesentium omnis sapiente numquam magni! Commodi, rerum!
        </p>
        <img src="../img/products/Gaming-laptop/${idx}/${products[idx - 1]['showCaseImgs'][6]}"/>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora officia natus, itaque consequuntur cum earum esse. Velit praesentium omnis sapiente numquam magni! Commodi, rerum! Qui, esse explicabo dolore architecto, distinctio molestiae excepturi a pariatur fugiat, repudiandae deserunt. Earum expedita illo provident minus dignissimos eius assumenda laudantium. Repellat, sunt. Dicta, harum,Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora officia natus, itaque consequuntur cum earum esse. Velit praesentium omnis sapiente numquam magni! Commodi, rerum!</p>
        <img src="../img/products/Gaming-laptop/${idx}/${products[idx - 1]['showCaseImgs'][7]}"/>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora officia natus, itaque consequuntur cum earum esse. Velit praesentium omnis sapiente numquam magni! Commodi, rerum! Qui, esse explicabo dolore architecto, distinctio molestiae excepturi a pariatur fugiat, repudiandae deserunt. Earum expedita illo provident minus dignissimos eius assumenda laudantium. Repellat, sunt. Dicta, harum,Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora officia natus, itaque consequuntur cum earum esse. Velit praesentium omnis sapiente numquam magni! Commodi, rerum!</p>
        <h3>Quick Review:</h3>
        <iframe ${products[idx - 1]['video']}></iframe>
    `
    return wrapper
}

myCart.addEventListener('click', () => {
    if (navBar.classList.contains('active'))
        window.location.href = "../html/myCart.html"
    else
        window.location.href = "../html/login.html"
})

// Menu toggle 
$(document).ready(() => {
    menuToggler.click(() => {
        navLinks.toggleClass('menu-active')
        menuToggler.toggleClass('menu-close')
    })
})