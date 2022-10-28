const backToHomePage = document.querySelector('#back-to-homepage')

const usernameSignup = document.querySelector('#username-signup')
const passSignup = document.querySelector('#password-signup')
const btnSignup = document.querySelector('#btnSignup')
const showPassSignup = document.querySelector('#sp-signup')
const confirmPass = document.querySelector('#password-confirm')

var isValidUserName = true
var isValidPass = true
var isValidPassConfirm = true


backToHomePage.addEventListener('click', () => {
    window.location.href = "./home.html";
});



showPassSignup.addEventListener('click', () => {
    if (passSignup.getAttribute('type') === "password") {
        passSignup.setAttribute('type', 'text')
        showPassSignup.classList.replace('fa-eye-slash', 'fa-eye')
    }
    else {
        passSignup.setAttribute('type', 'password')
        showPassSignup.classList.replace('fa-eye', 'fa-eye-slash')
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


passSignup.addEventListener('blur', () => {
    let pass = passSignup.value;
    // pass must contain a number, a uppercase latter, at least 8 characters and no whitespace allow
    let passwordRegex = /(?=.*\d)(?=.*[A-Z])(?=^\S+$).{8}/

    let parentElem = passSignup.parentElement;

    if (pass === '') {
        parentElem.classList.add('raise-error')
        parentElem.parentElement.lastElementChild.innerText = "(*) Please fill in this field!"
        isValidPass = false;
    }
    else if (!passwordRegex.test(pass)) {
        parentElem.classList.add('raise-error')
        parentElem.parentElement.lastElementChild.innerText = '(*) Password must at least 8 characters, contain a digit and an uppercase'
        isValidPass = false;
    }
    else {
        parentElem.classList.remove('raise-error')
        parentElem.parentElement.lastElementChild.innerText = ''
        isValidPass = true;
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
    }
    else if (pass != cfPass) {
        parentElem.classList.add('raise-error')
        parentElem.parentElement.lastElementChild.innerText = "(*) Password doesn't match!";
        isValidPassConfirm = false;
    }
    else {
        parentElem.classList.remove('raise-error')
        parentElem.parentElement.lastElementChild.innerText = "";
        isValidPassConfirm = true;
    }
});

usernameSignup.addEventListener('blur', () => {
    let userName = usernameSignup.value;
    let parentElem = usernameSignup.parentElement;

    // Only letters and digits are allowed, at least 4, at most 8 character
    let userNameRegex = /(?=^\S+$)([A-Za-z0-9]){5,8}$/

    let userNames = []
    for (user of users)
        userNames.push(user.username);

    let temp = [];
    if (localStorage.getItem('signup') != null)
        temp = localStorage.getItem('signup').split('-');

    for (i of temp)
        userNames.push(i.split(';')[0]);

    let isExistsUserName = false;

    for (i of userNames)
        if (userName == i) {
            isExistsUserName = true;
            break;
        }

    if (userName === '') {
        parentElem.classList.add('raise-error');
        parentElem.parentElement.lastElementChild.innerText = '(*) Please fill in this field!';
        isValidUserName = false;
    }
    else if (!userNameRegex.test(userName)) {
        parentElem.classList.add('raise-error');
        parentElem.parentElement.lastElementChild.innerText = '(*) Username must at least 5 letters and no special characters allowed'
        isValidUserName = false;
    }
    else if (isExistsUserName) {
        parentElem.classList.add('raise-error');
        parentElem.parentElement.lastElementChild.innerText = '(*) Username already existed!';
        isValidUserName = false;
    }
    else if (!isExistsUserName) {
        parentElem.classList.remove('raise-error');
        parentElem.parentElement.lastElementChild.innerText = '';
        isValidUserName = true;
    }
});

btnSignup.addEventListener('click', () => {
    [usernameSignup, passSignup, confirmPass].forEach(i => {
        i.focus();
        i.blur();
    })

    if (isValidUserName && isValidPass && isValidPassConfirm) {
        let temp = localStorage.getItem('signup');
        if (temp == null)
            localStorage.setItem('signup', `${usernameSignup.value};${passSignup.value}`)
        else
            localStorage.setItem('signup', `${temp}-${usernameSignup.value};${passSignup.value}`)

        localStorage.setItem('login', `1;${usernameSignup.value}`);

        // Return to previous tab
        window.history.go(-1);
    }
})