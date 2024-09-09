const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const monthName = ["January","February","March","April","May","June","July","August","September","October","November","December"];

let currentTime = new Date();
let month = monthName[currentTime.getMonth()];
let year = currentTime.getFullYear();
let dayNum = currentTime.getDate();
let day = weekday[currentTime.getDay()];

const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const second = document.getElementById("second");

const time = setInterval(function time() {
    let greeting = "";
    let check = currentTime.getHours();

    if (check < 12){
        greeting = "Good Morning "
    }
    else if (check < 18){
        greeting = "Good Afternoon "
    }
    else{
        greeting = "Good Evening "
    }
    document.getElementById("greeting").innerHTML = greeting + " Angelo,";
    document.getElementById("time").innerHTML = "Today is " + day + " " + month + " " + dayNum + ".";

    const dateNow = new Date()
    let hr = dateNow.getHours();
    let min = dateNow.getMinutes();
    let sec = dateNow.getSeconds();

    hr = hr % 12;
    if (!hr) {
        hr = 12;
    }

    hr = hr.toString().padStart(2, "0");
    min = min.toString().padStart(2, "0");
    sec = sec.toString().padStart(2, "0");
    
    const timeString = `${hr}:${min}:${sec}`;

    hour.textContent = hr;
    minute.textContent = min;
    second.textContent = sec;
}, 1000);



//<------------------------------------------- CALENDAR SECTION ------------------------------------------->

const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");


let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();


const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), 
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), 
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), 
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { 
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { 
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${monthName[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon => { 
    icon.addEventListener("click", () => { 

        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) { 
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear();
            currMonth = date.getMonth(); 
        } else {
            date = new Date(); 
        }
        renderCalendar();
    });
});


//<------------------------------------------- NOTE PAD SECTION ------------------------------------------->

display_saved_note();
var button = document.getElementById("clear");
button.addEventListener("click", clear);
var button = document.getElementById("save");
button.addEventListener("click", save);


function clear() {
    document.getElementById("area").value = "";   
}

function save() {
    var area = document.getElementById("area");
    localStorage.setItem("note", area.value);
    
}

function display_saved_note() {
    let result = localStorage.getItem("note");
    
    if(result === null) {
        result = "No note saved";
    }
    document.getElementById('area').value = result;
}

//<-------------------------------------------  SECTION ------------------------------------------->
if(localStorage.getItem("numDays")){
    UpdateDays();
    displaySavedDate();
}

document.getElementById("dateSubmit").onclick = dateInput;

function dateInput(){
    const inputDate = document.getElementById("myDate");
    let date1 = new Date();  
    let date2 = new Date(inputDate.value);

    date2.setDate(date2.getDate()+1)
    date2.setHours(0, 0, 0, 0);

    calculate(date1, date2);
    displaySavedDate();
}

function UpdateDays() {
    let date1 = new Date();  
    let date2 = new Date(localStorage.getItem("date2"));
    console.log(date2);
    calculate(date1, date2);
}

function displaySavedDate() {
    let result1 = localStorage.getItem("numDays");
    let result2 = localStorage.getItem("numDays2");
   
    document.getElementById("daysLeft").innerHTML = result1
    document.getElementById("daysLeft2").innerHTML = result2
   
}

function calculate(x,y){
    let Difference_In_Days = parseInt(1 + ((y-x) / 86_400_000));

    if (x.getTime() >= y.getTime()){
        Difference_In_Days = 0;
    }
    
    localStorage.setItem("date2", y.getUTCFullYear() + "-" + (y.getUTCMonth()+1) + "-" + (y.getUTCDate()));
    localStorage.setItem("numDays", Difference_In_Days + " days until");
    localStorage.setItem("numDays2", monthName[y.getUTCMonth()] + " " + (y.getUTCDate()) + ", " + y.getUTCFullYear());
}


