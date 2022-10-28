const backToHomePage = document.querySelector('#back-to-homepage')

const usernameLogin = document.querySelector('#username')
const passLogin = document.querySelector('#password')
const btnLogin = document.querySelector('#btnLogin')
const showPassLogin = document.querySelector('#sp-login')

const usernameSignup = document.querySelector('#username-signup')
const passSignup = document.querySelector('#password-signup')
const btnSignup = document.querySelector('#btnSignup')
const showPassSignup = document.querySelector('#sp-signup')
const confirmPass = document.querySelector('#password-confirm')

var isValidUserName = true
var isValidPass = true
var isValidPassConfirm = true

// suppose that website already has 2 users
const users = [{
        username: 'ttin234',
        password: '1234567A',
        accountName: 'ttin234123'
    },
    {
        username: 'mdat234',
        password: '1234567A',
        accountName: 'mdat234'
    },
    {
        username: 'mhuy234',
        password: '1234567A',
        accountName: 'mhuy234'
    },
    {
        username: 'ttrang234',
        password: '1234567A',
        accountName: 'ttrang234'
    },
    {
        username: 'tngan234',
        password: '1234567A',
        accountName: 'tngan234'
    }
]

backToHomePage.addEventListener('click', () => {
    window.location.href = "../html/home.html";
});


showPassLogin.addEventListener('click', () => {
    if (passLogin.getAttribute('type') === "password") {
        passLogin.setAttribute('type', 'text')
        showPassLogin.classList.replace('fa-eye-slash', 'fa-eye')
    } else {
        passLogin.setAttribute('type', 'password')
        showPassLogin.classList.replace('fa-eye', 'fa-eye-slash')
    }
});



function updateUsersAccount() {
    let temp = localStorage.getItem('signup');
    if (temp == null)
        return;

    let accounts = temp.split('-');

    accounts.forEach(account => {
        let temp = account.split(';')
        users.push({
            username: temp[0],
            password: temp[1],
            accountName: temp[0]
        })
    })
}

btnLogin.addEventListener('click', () => {

    updateUsersAccount();

    let validUserName = false,
        validPass = false;

    let userName = usernameLogin.value;
    let pass = passLogin.value;
    let parentElem = passLogin.parentElement;
    let parentUserElem = usernameLogin.parentElement;
    let name = '';

    let isCorrectPass = users.some((user) => {
        return user.password == pass;
    })

    let isCorrectUserName = users.some((user) => {
        return user.username === userName;
    })


    if (userName === '') {
        parentUserElem.classList.add('raise-error');
        parentUserElem.parentElement.lastElementChild.innerText = '(*) Please fill in this field!';
        validUserName = false;
    } else if (!isCorrectUserName) {
        parentUserElem.classList.add('raise-error');
        parentUserElem.parentElement.lastElementChild.innerText = '(*) Username not found!';
        validUserName = false;
    } else {
        parentUserElem.classList.remove('raise-error');
        parentUserElem.parentElement.lastElementChild.innerText = '';

        users.forEach(user => {
            if (user.username === userName)
                name = user.accountName;
        })

        validUserName = true;
    }

    if (pass === '') {
        parentElem.classList.add('raise-error');
        parentElem.parentElement.lastElementChild.innerText = '(*) Please fill in this field!';
        validPass = false;
    } else if (!isCorrectPass) {
        parentElem.classList.add('raise-error');
        parentElem.parentElement.lastElementChild.innerText = '(*) Incorrect Password!';
        validPass = false;
    } else {
        parentElem.classList.remove('raise-error');
        parentElem.parentElement.lastElementChild.innerText = '';
        validPass = true;
    }

    if (validUserName && validPass) {
        localStorage.setItem('login', `1;${name}`);

        // Return to previous tab
        window.history.go(-1);
    }

});



confirmPass.addEventListener('blur', () => {
    let pass = passSignup.value;
    let cfPass = confirmPass.value;

    let parentElem = confirmPass.parentElement;

    if (cfPass === '') {
        parentElem.classList.add('raise-error')
        parentElem.parentElement.lastElementChild.innerText = "(*) Please fill in this field!";
        isValidPassConfirm = false;
    } else if (pass != cfPass) {
        parentElem.classList.add('raise-error')
        parentElem.parentElement.lastElementChild.innerText = "(*) Password doesn't match!";
        isValidPassConfirm = false;
    } else {
        parentElem.classList.remove('raise-error')
        parentElem.parentElement.lastElementChild.innerText = "";
        isValidPassConfirm = true;
    }
});