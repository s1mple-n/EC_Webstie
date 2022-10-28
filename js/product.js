const menuToggler = $('.menu-toggler')
const navLinks = $('.nav-links')

const productContainer = document.querySelector('.product-list')
const pageNum = document.querySelectorAll('.page-num')
const prevPage = document.querySelector('.page-prev')
const nextPage = document.querySelector('.page-next')
const slideImages = document.querySelectorAll('.slide-img')
const navBar = document.querySelector('.nav-bar')
const cartAmount = document.querySelector('#cart-amount')
const logoutBtn = document.querySelector('.sign-out')
const myCart = document.querySelector('#my-cart')
const cartItem = document.querySelector('#mycart-item')
const accountToggle = document.querySelector('.no-account')

var img_width = 800;
var img_height = 400;
var currentPage = 1;
var products;
var toFavList;
var idx = 0;


// Menu toggle
$(document).ready(() => {
    menuToggler.click(() => {
        navLinks.toggleClass('menu-active')
        menuToggler.toggleClass('menu-close')
    })
})

// Redirect to account page (login & signup)
accountToggle.addEventListener('click', () => {
    window.location.href = "../html/login.html";
})

// Logout button
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('login')
    window.location.reload();
})


// Create products
let createItem = (idx) => {
    let item = document.createElement('div');
    item.classList = 'item sell-item';
    item.innerHTML = `
    <div class="product" id="${idx.id}">
        <img class="product-img" src="${idx.img}" alt="">
        <p class="product-name">${idx.name}</p>
    </div>
    <div class="detail">
        <span class="price">${idx.price}</span>
        <i class="far fa-heart to-fav-list"></i>
    </div>
    `
    productContainer.append(item);
}

let getProductDesc = (list) => {
    let len = list.length;
    for (let i = 0; i < len; i++) {
        createItem(list[i]);
    }

    products = document.querySelectorAll('.product');
    products.forEach(product => {
        product.addEventListener('click', (e) => {
            window.location.href = `../html/detail.html?product=${e.currentTarget.id}`;
        });
    });

    toFavList = document.querySelectorAll('.to-fav-list');
    toFavList.forEach(item => {
        item.addEventListener('click', () => {
            if (item.classList.contains('far'))
                item.classList.replace('far', 'fas');
            else
                item.classList.replace('fas', 'far');
        });
    });
}


// Load account and products when page is fully loaded
window.addEventListener('load', () => {
    getProductDesc(page1);
    loadAccount();
})

function loadAccount() {
    let temp = localStorage.getItem('login') != null ? localStorage.getItem('login').split(';') : '0'
    if (temp[0] == '1') {
        navBar.classList.add('active')
        document.querySelector('#username').textContent = temp[1]
        loadMyCart();
    }
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

function createMyCartItem(idx) {
    let li = document.createElement('li');
    let items = localStorage.getItem(idx).split(';');

    li.innerHTML =
        `<img src="../img/products/Gaming-laptop/${idx.split('-')[1]}/${items[2].trim()}" alt="" />
        <span id="cart-item_name">${items[0]}</span>
        <span id="cart-item_quan">x${items[1]}</span>`
    return li;
}


//  Pagination
pageNum.forEach(page => {
    page.addEventListener('click', (e) => {
        let temp = parseInt(e.currentTarget.innerText);
        createPage(temp);
        currentPage = temp;
    });
});

prevPage.addEventListener('click', () => {
    if (currentPage <= 1)
        currentPage = 4;
    else
        currentPage--;
    createPage(currentPage)
});

nextPage.addEventListener('click', () => {
    if (currentPage >= 4)
        currentPage = 1;
    else
        currentPage++;
    createPage(currentPage)
});

function createPage(pageIdx) {
    pageNum.forEach(innerPage => {
        innerPage.classList.remove('active');
    });

    productContainer.innerHTML = '';

    switch (pageIdx) {
        case 1:
            getProductDesc(page1);
            break;

        case 2:
            getProductDesc(page2);
            break;

        case 3:
            getProductDesc(page3);
            break;

        case 4:
            getProductDesc(page1);
            break;
        case 5:
            getProductDesc(page2);
            break;
    }

    pageNum[pageIdx - 1].classList.add('active');
    setTimeout(() => {
        window.location.href = "../html/product.html#l-product";
    }, 100)
}


// Update product slider image's size when resize page
function updateSize() {
    img_width = featuredContainer.clientWidth;
    img_height = featuredContainer.clientHeight;

    slides.forEach(slide => {
        slide.style.width = `${img_width}px`;
        slide.style.height = `${img_height}px`;
    });

}

window.addEventListener('resize', updateSize);




// Redirect to myCart page
myCart.addEventListener('click', () => {
    if (navBar.classList.contains('active'))
        window.location.href = "../html/myCart.html"
    else
        window.location.href = "../html/login.html"
})