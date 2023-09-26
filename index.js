let timerEl = document.getElementById("timer-el")
let workBtn = document.getElementById("work-btn")
let playBtn = document.getElementById("play-btn")
let hours = 0
let minutes = 0
let seconds = 0
let isPaused = true
let isWorking = false
let isPlaying = false
let output = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds)
timerEl.textContent = output
var timerID = null


//Starts counting up when workStart button pressed
function workStart(){
    isPaused = false
    if(isPlaying === true){
        clearInterval(timerID)
        isPlaying = false
    }
    workBtn.textContent = "Pause Work"
    playBtn.textContent = "Start Playing"

    if(isWorking === true){
        workingPause()
        isWorking = false
    }
    if(isWorking === false && isPaused ===false){
        isPlaying = false
        isWorking = true
        timerID = setInterval(increment, 1000)
    }
}

function playStart(){
    isPaused = false
    if(isWorking === true){
        clearInterval(timerID)
        isWorking = false
    }
    playBtn.textContent = "Pause Play"
    workBtn.textContent = "Start Working"
    
    if(isPlaying === true){
        playingPause()
        isPlaying = false
    }
    if(isPlaying === false && isPaused === false){
        isWorking = false
        isPlaying = true
        timerID = setInterval(decrement, 1000)
    }
}

//pauses the working timer
function workingPause(){
    isPaused = true
    workBtn.textContent = "Resume Working"
    clearInterval(timerID)
}

//pauses the playing timer
function playingPause(){
    isPaused = true
    playBtn.textContent = "Resume Playing"
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
        updateTimer()
    }  
}

//decrements the timer by 1 second
function decrement(){
    if(isPaused === false){ //only runs if timer is not on pause
        seconds -= 1
        if(seconds < 0 && (minutes > 0 || hours > 0)){ //decrease minutes by 1 if there are minutes available. Sets seconds to 59 (counting down)
            seconds = 59
            minutes -= 1
        } else if(seconds < 0 && minutes === 0 && hours === 0){ //does not run the rest of the code if there is no time left to decrement.
            seconds = 0
            updateTimer()
            alert("Time to work!")
            reset()
            return
        } 
        if(minutes < 0 && hours > 0){ //decrease hours by 1 if there are extra hours. Minutes and seconds set to 59.
            minutes = 59
            seconds = 59
            hours -= 1
        }
        updateTimer()
    }  
}

//resets the timer
function reset(){
    isPaused = true
    hours = minutes = seconds = 0
    clearInterval(timerID)
    workBtn.textContent = "Start Working"
    playBtn.textContent = "Start Playing"
    updateTimer()
}

function updateTimer(){
    output = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds)
    timerEl.textContent = output
}

//Pads extra 0s to numbers less than 10
function pad(num){
    num = num.toString()
    if(num < 10){
        num = "0" + num
    } 
    return num
}

