const menuToggler = $('.menu-toggler')
const navLinks = $('.nav-links')

const showcaseImage = document.getElementById('showcase-img')
const slideImages = document.querySelectorAll('.slide-img')
const navBar = document.querySelector('.nav-bar')
const cartAmount = document.querySelector('#cart-amount')
const sliderContainer = document.querySelector('.slider')
const slides = document.querySelectorAll('.slide')
const btnNextSlide = document.querySelector('#nextSlide')
const btnPrevSlide = document.querySelector('#prevSlide')
const logoutBtn = document.querySelector('.sign-out')
const myCart = document.querySelector('#my-cart')
const cartItem = document.querySelector('#mycart-item')
const accountToggle = document.querySelector('.no-account')
const featuredContainer = document.querySelector('.featured-1')

var img_width = 800;
var img_height = 400;
var slideIdx = 0;
var idx = 0,
    imagesLength = slideImages.length;



$(document).ready(() => {
    menuToggler.click(() => {
        navLinks.toggleClass('menu-active')
        menuToggler.toggleClass('menu-close')
    })
})


accountToggle.addEventListener('click', () => {
    window.location.href = "../html/login.html";
})


logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('login')
    window.location.reload();
})



setInterval(function autoSlide() {
    idx++;
    idx = (idx >= imagesLength ? 0 : idx);
    changeColorAndImg(slideImages[idx].getAttribute('src'), slideImages[idx].getAttribute('alt'));
}, 3500);


slideImages.forEach(slideImg => {
    slideImg.addEventListener('click', (e) => {
        changeColorAndImg(e.currentTarget.getAttribute('src'), e.currentTarget.getAttribute('alt'));
    });
});

function changeColorAndImg(src, newColor) {
    showcaseImage.setAttribute('src', src);
    document.documentElement.style.setProperty('--primary-color', newColor);
}



window.addEventListener('load', () => {
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


function updateSize() {
    img_width = featuredContainer.clientWidth;
    img_height = featuredContainer.clientHeight;

    slides.forEach(slide => {
        slide.style.width = `${img_width}px`;
        slide.style.height = `${img_height}px`;
    });

    sliderContainer.style.width = `${slides.length * img_width}px`;
    sliderContainer.style.height = `${img_height}px`;
}

window.addEventListener('resize', updateSize);

function nextSlide() {
    updateSize();
    if (slideIdx < slides.length - 1)
        slideIdx++;
    else
        slideIdx = 0;
    slideTransform();
}

function prevSlide() {
    updateSize();
    if (slideIdx === 0)
        slideIdx = slides.length - 1;
    else
        slideIdx--;
    slideTransform();
}

function slideTransform() {
    sliderContainer.style.transform = `translateX(-${slideIdx * img_width}px)`;
}

btnNextSlide.addEventListener('click', () => {
    nextSlide();
});

btnPrevSlide.addEventListener('click', () => {
    prevSlide();
});

setInterval(() => {
    nextSlide();
}, 3000);


myCart.addEventListener('click', () => {
    if (navBar.classList.contains('active'))
        window.location.href = "../html/myCart.html"
    else
        window.location.href = "../html/login.html"
})