const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const monthName = ["January","February","March","April","May","June","July","August","September","October","November","December"];

let currentTime = new Date()
let month = monthName[currentTime.getMonth()]
let year = currentTime.getFullYear()
let dayNum = currentTime.getDate()
let day = weekday[currentTime.getDay()];


document.getElementById("time").innerHTML = day + ", " + month + " " + dayNum + ", " + year 
