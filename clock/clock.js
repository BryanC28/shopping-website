const hour = document.getElementById('hour');
const minute = document.getElementById('minute');
const second = document.getElementById('second');
const day = document.getElementById('day');

var monthName = [
    'January', 'February', 'March',
    'April', 'May', 'June',
    'July', 'August', 'September',
    'October', 'November', 'December'
];

var dayName = [
    'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday', 'Sunday'
]

const clock = setInterval(function time() {
    let today = new Date();
    let d = today.getDate();
    let m = today.getMonth();
    let y = today.getFullYear();
    let h = today.getHours();
    let min = today.getMinutes();
    let s = today.getSeconds();

    day.innerHTML = `${dayName[today.getDay()]} ${d} ${monthName[m]} ${y} `;
    hour.textContent = h < 10 ? '0' + h : h
    minute.innerHTML = min < 10 ? '0' + min : min
    second.innerHTML = s < 10 ? '0' + s : s
})

document.getElementById('calender').addEventListener('click', function () {
    document.querySelector('.box').innerHTML = `
        <h1> Hello world </h1>`;
})

document.getElementById('clock').addEventListener('click', function () {
   console.log('Clock');
   window.location.reload();
})


