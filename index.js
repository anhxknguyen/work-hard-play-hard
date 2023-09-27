/*let timerEl = document.getElementById("timer-el")
let workBtn = document.getElementById("work-btn")
let playBtn = document.getElementById("play-btn")
let resetBtn = document.getElementById("reset-btn")
let bodyEl = document.getElementById("body")
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
    }
    if(isPlaying === false && isPaused === false){
        isWorking = false
        isPlaying = true
        timerID = setInterval(decrement, 1000)
    }
}

//pauses the working timer
function workingPause(){
    stop()
    workBtn.textContent = "Resume Working"
}

//pauses the playing timer
function playingPause(){
    stop()
    playBtn.textContent = "Resume Playing"
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
            bodyEl.style.backgroundColor = '#ff8178'
            resetBtn.style.backgroundColor = '#e64d43'
            resetBtn.style.color = 'white'
            seconds = 0
            updateTimer()
            stop()
            setTimeout(timeout, 2000)
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


function timeout(){
    if(confirm("Time to work! Press okay to reset.")){
        reset()
    }
}
//resets the timer
function reset(){
    stop()
    hours = minutes = seconds = 0
    bodyEl.style.backgroundColor = '#FAF9F6'
    resetBtn.style.backgroundColor = '#d5ceb3'
    resetBtn.style.color = '#232b2b'
    workBtn.textContent = "Start Working"
    playBtn.textContent = "Start Playing"
    updateTimer()
}

function updateTimer(){
    output = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds)
    timerEl.textContent = output
}

function stop(){
    isPaused = true
    isWorking = isPlaying = false
    clearInterval(timerID)
}
*/

let timerEl = document.getElementById("timer-el")
let workBtn = document.getElementById("work-btn")
let playBtn = document.getElementById("play-btn")
let resetBtn = document.getElementById("reset-btn")
let bodyEl = document.getElementById("body")

let isPaused = true
let isWorking = false

let hours = minutes = seconds = secondsOutput = minutesOutput = totalSeconds = totalMinutes = 0
printTimer()
let startTime
let currentTime
let elapsedTime
let timerID


function updateTimer(){
    seconds = Math.floor((Date.now() - startTime) / 100)
    minutes = Math.floor(seconds / 60)
    hours = Math.floor(minutes / 60)
    secondsOutput = (totalSeconds + (seconds % 60)) % 60
    minutesOutput = (totalMinutes + (minutes % 60)) % 60
    printTimer()
}  

function printTimer(){
    let output = pad(hours) + ":" + pad(minutesOutput) + ":" + pad(secondsOutput)
    timerEl.textContent = output
}

function workStart(){
    isPaused = false
    if(isWorking === true){
        workingPause()
    }
    if(isPaused == false && isWorking == false){
        isWorking = true
        totalSeconds += seconds
        totalMinutes += minutes
        startTime = (new Date()).getTime()
        timerID = setInterval(updateTimer, 100)
        workBtn.textContent = "Pause Work"
    } 
}

function workingPause(){
    stop()
    workBtn.textContent = "Resume Working"
}

function stop(){
    isPaused = true
    isWorking = false
    clearInterval(timerID)
}





//Pads extra 0s to numbers less than 10
function pad(num){
    num = num.toString()
    if(num < 10){
        num = "0" + num
    } 
    return num
}

