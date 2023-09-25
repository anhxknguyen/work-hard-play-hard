let timerEl = document.getElementById("timer-el")
let workBtn = document.getElementById("work-btn")
let hours = 0
let minutes = 0
let seconds = 0
let isPaused = true
let isRunning = false
let output = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds)
timerEl.textContent = output
var timerID = null


//Starts counting up when workStart button pressed
function workStart(){
    isPaused = false
    workBtn.textContent = "Pause"
    if(isRunning === true){
        pause()
        isRunning = false
    }
    if(isRunning === false && isPaused ===false){
        isRunning = true
        timerID = setInterval(increment, 1000)
    }
}

//pauses the timer
function pause(){
    isPaused = true
    workBtn.textContent = "Resume Working"
    clearInterval(timerID)
}

//increments the timer by 1 second
function increment(){
    if(isPaused === false){
        seconds += 1
        if(seconds === 60){
            seconds = 0
            minutes += 1
        }
        if(minutes === 60){
            minutes = 0
            hours += 1
        }
        output = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds)
        timerEl.textContent = output
    }  
}

//Pads extra 0s to numbers less than 10
function pad(num){
    num = num.toString()
    if(num < 10){
        num = "0" + num
    } 
    return num
}

