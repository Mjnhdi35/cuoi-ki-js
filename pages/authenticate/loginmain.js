document.querySelectorAll('.info-item .btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.container').classList.toggle('log-in');
    });
});

function register(event) {
    event.preventDefault();
    let username = document.getElementById('regUsername').value.trim();
    let password = document.getElementById('regPassword').value.trim();
    let email = document.getElementById('regEmail').value.trim();
    let fullName = document.getElementById('regFullName').value.trim();
    let regMessage = document.getElementById('regMessage');

    let lowerCaseLeter = /[a-z]/g;
    let upperCaseLeter = /[A-Z]/g;
    let numbers = /[0-9]/g;

    regMessage.style.color = 'red';
    if (!username || !password || !email || !fullName) {
        regMessage.innerText = 'Vui Long Nhap Day Du Cac Truong';
        return;
    }
    if (password.length < 8) {
        regMessage.innerText = 'Vui Long Nhap Toi Thieu 8 Ki Tu';
        return;
    }
    if (!lowerCaseLeter.test(password)) {
        regMessage.innerText = 'Mat Khau Phai Co Chu Thuong';
        return;
    }
    if (!upperCaseLeter.test(password)) {
        regMessage.innerText = 'Mat Khau Phai Co Chu In Hoa';
        return;
    }
    if (!numbers.test(password)) {
        regMessage.innerText = 'Mat Khau Phai Co So';
    }
    let user = {
        username: username,
        password: password,
        fullName: fullName,
        email: email
    };
    let users = localStorage.getItem('users')
        ? JSON.parse(localStorage.getItem('users'))
        : {};

    if (users[user]) {
        regMessage.innerText = 'Da ton tai ten nguoi dung';
    } else {
        users[username] = user;
        localStorage.setItem('users', JSON.stringify(users));
        regMessage.innerText = 'Dang ki thanh cong ';
        regMessage.style.color = 'green';
    }
}
function logined(event) {
    event.preventDefault();
    let username = document.getElementById('regUsername').value.trim();
    let password = document.getElementById('regPassword').value.trim();
    let loginMessage = document.getElementById('loginMessage');

    let users = localStorage.getItem('users')
        ? JSON.parse(localStorage.getItem('users'))
        : {};
    let storeUser = users[username];

    if (storeUser && storeUser.password === password) {
        localStorage.setItem('loggedInUser', JSON.stringify(storeUser));
        window.location.href = '../../main.html';
    } else {
        loginMessage.innerText = 'Tai Khoan Hoac Mat Khau Khong Dung';
        loginMessage.style.color = 'red';
    }
}
