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

//<------------------------------------------- Calculate Section ------------------------------------------->
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



//<------------------------------------------- Timer Section ------------------------------------------->

document.addEventListener('DOMContentLoaded', function() {
    let isRunning = false;
    let timer;
    let timeLeft;
    let startTime;

    function parseTimeFromDisplay() {
        const minutes = parseInt(document.getElementById('minutes_display').innerText) || 0;
        const seconds = parseInt(document.getElementById('seconds_display').innerText) || 0;
        return (minutes * 60) + seconds;
    }

    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById('minutes_display').innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds_display').innerText = seconds < 10 ? '0' + seconds : seconds;
    }

    document.getElementById('start').addEventListener('click', function() {
        if (!isRunning) {
            timeLeft = parseTimeFromDisplay();
            startTime = timeLeft;

            timer = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateDisplay();
                } else {
                    clearInterval(timer);
                    alert("Time's up! Take a break.");
                }
            }, 1000);
            isRunning = true;
        }
    });

    document.getElementById('pause').addEventListener('click', function() {
        clearInterval(timer);
        isRunning = false;
    });

    document.getElementById('reset').addEventListener('click', function() {
        clearInterval(timer);
        timeLeft = startTime;
        updateDisplay();
        isRunning = false;
    });

    function validateTimeInput(element) {
        let value = element.innerText.replace(/[^0-9]/g, '');
        if (value.length > 2) value = value.slice(0, 2);
        if (element.id === 'seconds_display' && value > 59) value = '59';
        element.innerText = value.length === 1 ? '0' + value : value;
    }

    document.getElementById('minutes_display').addEventListener('input', function() {
        validateTimeInput(this);
    });

    document.getElementById('seconds_display').addEventListener('input', function() {
        validateTimeInput(this);
    });

    // Initialize the display with the default time
    timeLeft = 20 * 60;
    updateDisplay();
});

//<------------------------------------------- Drag Section ------------------------------------------->

var isLocked = true; 

document.addEventListener("DOMContentLoaded", function() {
    
    setPositionFromLocalStorage("calculate");
    setPositionFromLocalStorage("notepad");
    setPositionFromLocalStorage("calendar_section");
    setPositionFromLocalStorage("search");
    setPositionFromLocalStorage("outline");
    setPositionFromLocalStorage("timer");

    dragElement(document.getElementById("calculate"));
    dragElement(document.getElementById("notepad"));
    dragElement(document.getElementById("calendar_section"));
    dragElement(document.getElementById("search"));
    dragElement(document.getElementById("outline"));
    dragElement(document.getElementById("timer"));

    window.addEventListener('resize', function() {  // **Added**
        adjustPositionsOnResize("calculate");
        adjustPositionsOnResize("notepad");
        adjustPositionsOnResize("calendar_section");
        adjustPositionsOnResize("search");
        adjustPositionsOnResize("outline");
        adjustPositionsOnResize("timer");
    }); // **Added**

   

    var lockButton = document.getElementById("inpLock");
    lockButton.addEventListener('click', function() {
        isLocked = !isLocked;
        toggleCursor();
        
        let button = this;
        if (isLocked){
            button.style.backgroundImage = "url('/images/lock.png')";
        }else{
            button.style.backgroundImage = "url('/images/unlock.png')";
        }

    });


});

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    elmnt.onmousedown = function(e) {
        if (isLocked) return;
        if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
            return;  
        }

        e.preventDefault();
        elmnt.style.transition = 'none';
       

        elmnt.style.zIndex = "1000";

        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    };

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
      }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        elmnt.style.top = Math.max(0, (elmnt.offsetTop - pos2)) + "px";
        elmnt.style.left = Math.max(0, (elmnt.offsetLeft - pos1)) + "px";
    }
    function closeDragElement() {
        elmnt.style.zIndex = "";
        document.onmouseup = null;
        document.onmousemove = null;

        snapToX(elmnt);
        var topPercentage = elmnt.offsetTop / window.innerHeight;
        var leftPercentage = elmnt.offsetLeft / window.innerWidth;
        localStorage.setItem(elmnt.id + "_top", topPercentage);
        localStorage.setItem(elmnt.id + "_left", leftPercentage);
    }

}
function snapToX(elmnt) {
    const width = window.innerWidth;  // **Changed**
    const left1 = (width / 4) - (elmnt.offsetWidth / 2) - 125;  // **Changed**
    const centerX = (width / 2) - (elmnt.offsetWidth / 2);  // **Changed**
    const right1 = (3 * width / 4) - (elmnt.offsetWidth / 2) + 125;  // **Changed**

    var snapPoints = [left1, centerX, right1];
    var threshold = 50;  
    var currentLeft = elmnt.offsetLeft;
    var closestPoint = snapPoints.reduce(function(prev, curr) {
        return (Math.abs(curr - currentLeft) < Math.abs(prev - currentLeft) ? curr : prev);
    });

    
    if (Math.abs(closestPoint - currentLeft) <= threshold) {
        elmnt.style.left = closestPoint + "px"; 
    }
}

function savePositionToLocalStorage(elmnt) {  // **Added**
    const topPercentage = elmnt.offsetTop / window.innerHeight;  // **Added**
    const leftPercentage = elmnt.offsetLeft / window.innerWidth;  // **Added**
    localStorage.setItem(elmnt.id + "_top", topPercentage);  // **Added**
    localStorage.setItem(elmnt.id + "_left", leftPercentage);  // **Added**
}


function setPositionFromLocalStorage(elementId) {
    var elmnt = document.getElementById(elementId);
    var topPercentage = localStorage.getItem(elementId + "_top");
    var leftPercentage = localStorage.getItem(elementId + "_left");

    if (topPercentage && leftPercentage) {
        elmnt.style.position = "absolute";
        elmnt.style.top = (parseFloat(topPercentage) * window.innerHeight) + "px";
        elmnt.style.left = (parseFloat(leftPercentage) * window.innerWidth) + "px";
    }
}

function adjustPositionsOnResize(elementId) {
    setPositionFromLocalStorage(elementId);
}

function toggleCursor() {
    if (!isLocked){
        var elements = document.querySelectorAll('.locked')
    }else{
        var elements = document.querySelectorAll('.draggable');
    }   
    
    elements.forEach(function(elmnt) {
        if (isLocked) {
            elmnt.classList.add('locked');
            elmnt.classList.remove('draggable');
        } else {
            elmnt.classList.add('draggable');
            elmnt.classList.remove('locked');
        }
    });
}



