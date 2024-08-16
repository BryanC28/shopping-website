// localStorage.clear();
document.querySelectorAll('.info-item .btn').forEach(function
    (button) {
    button.addEventListener('click', function () {
        document.querySelector('.container').classList.toggle('log-in');
    });
});

function register(event) {
    event.preventDefault();
    let username = document.getElementById('regUsername').value.trim();
    let password = document.getElementById('regPassword').value.trim();
    let Email = document.getElementById('regEmail').value.trim();
    let fullName = document.getElementById('regFullName').value.trim();
    let regMessage = document.getElementById('regMessage');

    let lowerCaseLetter = /[a-z]/g;
    let upperCaseLetter = /[A-Z]/g;
    let numbers = /[0-9]/g;

    regMessage.style.color = 'white';
    regMessage.style.fontWeight = "bold";
    regMessage.style.background = 'red';
    regMessage.style.width = '100%';
    regMessage.style.textAlign = 'center';
    if (!username || !password || !Email || !fullName) {
        regMessage.innerText = "Please fill in all field!!!!";
        return;
    }
    // checkpassword
    if (password.length < 8) {
        regMessage.innerText = "Password must be at least 8 charaters!";
        return;
    }
    if (!lowerCaseLetter.test(password)) {
        regMessage.innerText = "Password must contain a lowercase letter!";
        return;
    }
    if (!upperCaseLetter.test(password)) {
        regMessage.innerText = "Password must contain a uppercase letter!";
        return;
    }
    if (!numbers.test(password)) {
        regMessage.innerText = "Password must contain a number!";
        return;
    }

    let user = {
        username: username,
        fullName: fullName,
        password: password,
        Email: Email,
    };

    // console.log(user.fullName);
    // console.log(user.username);
    // console.log(user.password);
    // console.log(user.Email);
    // regMessage.innerText = "Register successful!";
    // regMessage.style.color = "black";
    // regMessage.style.fontSize = "25px"

    let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : {};
    if (users[username]) {
        regMessage.innerText = "Username already exists!";
    } else {
        users[username] = user;
        localStorage.setItem('users', JSON.stringify(users));
        regMessage.innerText = "Register successful!";
        regMessage.style.background = 'black'
        regMessage.style.color = "#00e600";
        regMessage.style.fontWeight = "bold";
    }




}

function login(event) {
    event.preventDefault();
    let username = document.getElementById('loginUsername').value.trim();
    let password = document.getElementById('loginPassword').value.trim();
    let loginMessage = document.getElementById('loginMessage');

    loginMessage.style.color = 'white';
    loginMessage.style.fontWeight = "bold";
    loginMessage.style.background = 'red';
    loginMessage.style.width = '100%';
    loginMessage.style.textAlign = 'center';
    let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')): {};
    let storeUser = users[username];

    if(storeUser && storeUser.password == password){
        window.location.href = '/index.html';
    }else{
        loginMessage.innerText = 'Invalid username or password';
    }
    // window.location.href = '/index.html';
}
