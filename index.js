let timerEl = document.getElementById("timer-el")
let workBtn = document.getElementById("work-btn")
let playBtn = document.getElementById("play-btn")
let resetBtn = document.getElementById("reset-btn")
let bodyEl = document.getElementById("body")

let isPaused = true
let isWorking = isPlaying = hasEnded = false

let milisec= hours = minutes = seconds = secondsOutput = minutesOutput = totalSeconds = totalMinutes = 0
printTimer()
let startTime
let endTime
let currentTime
let timerID 
let lastRan
let elapsedTime
let timeCompare


function updateTimerWork(){
    timerEl.style.color = "#23990e"
    milisec = (Date.now() - startTime)
    seconds = milisec / 1000
    minutes = seconds / 60
    hours = minutes / 60
    secondsOutput = (totalSeconds + (seconds % 60)) % 60
    minutesOutput = (totalMinutes + (minutes % 60)) % 60
    printTimer()
}  

function printTimer(){
    let output = pad(Math.trunc(hours)) + ":" + pad(Math.trunc(minutesOutput)) + ":" + pad(Math.trunc(secondsOutput))
    timerEl.textContent = output
}


function updateTimerPlay(){
    timerEl.style.color = "#7d0202"
    if(milisec > 0){
        elapsedTime = (Date.now() - timeCompare)
        milisec = (startTime - Date.now())
        seconds = milisec / 1000
        minutes = seconds / 60
        hours = minutes / 60    
        secondsOutput = ((seconds % 60)) % 60
        minutesOutput = ((minutes % 60)) % 60
        printTimer()
    } else{
        milisec = 0
        hasEnded = true
        stop()
        turnRed()
        playBtn.textContent = "Start Playing"
        printTimer()
    }
}


function playStart(){
    isPaused = false
    if(isPlaying === true){
        playingPause()
    }

    if(isWorking === true){
        clearInterval(timerID)
        isWorking = false
    }
    
    if(isPaused == false && isPlaying == false){
        isPlaying = true
        if(lastRan == "working"){
            totalSeconds += seconds
            totalMinutes += minutes
        } else if(lastRan == "playing"){
            totalSeconds -= elapsedTime / 1000
            totalMinutes -= totalSeconds / 60
            console.log(totalSeconds)
        }
        lastRan = "playing"
        timeCompare = (new Date()).getTime()
        startTime = Date.now() + (totalSeconds * 1000)
        timerID = setInterval(updateTimerPlay, 1)
        playBtn.textContent = "Pause Play"
        workBtn.textContent = "Start Working"
    } 
}

function workStart(){
    isPaused = false

    if(hasEnded === true){
        hasEnded = false
        reset()
        isPaused = false
    }
    if(isWorking === true){
        workingPause()
    }
    console.log("hotdog")
    if(isPlaying === true){
        clearInterval(timerID)
        isPlaying = false
    }

    if(isPaused == false && isWorking == false){
        isWorking = true
        if(lastRan == "working"){
            totalSeconds += seconds
            totalMinutes += minutes
        } else if(lastRan == "playing"){
            turnNormal()
            totalSeconds -= elapsedTime / 1000
            totalMinutes -= totalSeconds / 60
            console.log(totalSeconds)
        }
        lastRan = "working"
        startTime = (new Date()).getTime()
        timerID = setInterval(updateTimerWork, 1)
        workBtn.textContent = "Pause Work"
        playBtn.textContent = "Start Playing"
    } 
}

function workingPause(){
    stop()
    workBtn.textContent = "Resume Work"
}

function playingPause(){
    stop()
    playBtn.textContent = "Resume Play"
}

function stop(){
    timerEl.style.color = "#232b2b"
    isPaused = true
    isWorking = false
    isPlaying = false
    clearInterval(timerID)
}

function reset(){
    stop()
    elapsedTime = milisec = seconds = minutes = hours = minutesOutput = secondsOutput = totalMinutes = totalSeconds = 0
    turnNormal()
    workBtn.textContent = "Start Working"
    playBtn.textContent = "Start Playing"
    printTimer()
}




//Pads extra 0s to numbers less than 10
function pad(num){
    num = num.toString()
    if(num < 10){
        num = "0" + num
    } 
    return num
}

function turnNormal(){
    bodyEl.style.backgroundColor = '#FAF9F6'
}

function turnRed(){
    bodyEl.style.backgroundColor = '#ff8178'
}