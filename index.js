const timerEl = document.getElementById("timer-el")
const workBtn = document.getElementById("work-btn")
const playBtn = document.getElementById("play-btn")
const resetBtn = document.getElementById("reset-btn")
const bodyEl = document.getElementById("body")
const workTxt = document.getElementById("work-text")
const playTxt = document.getElementById("play-text")
let isPaused = true
let isWorking = isPlaying = hasEnded = false
let milisec= seconds = minutes = hours = secondsOutput = minutesOutput = totalSeconds = totalMinutes = 0
let startTime
let endTime
let currentTime
let timerID 
let lastRan
let elapsedTime
let timeCompare

//localStorage related variables
let timeArr = [milisec, seconds, minutes, hours]
let timeOutputsArr = [secondsOutput, minutesOutput]
let totalTimeArr = [totalSeconds, totalMinutes]

const timeLocalStorage = JSON.parse(localStorage.getItem("time"))
const timeOutputsLocalStorage = JSON.parse(localStorage.getItem("timeOutputs"))
const totalTimeLocalStorage = JSON.parse(localStorage.getItem("totalTime"))
//const lastRanLocalStorage = localStorage.getItem("lastRan")

//if there is time in local storage
if(timeLocalStorage){
    timeArr = timeLocalStorage
    milisec = timeArr[0]
    seconds = timeArr[1]
    minutes = timeArr[2]
    hours = timeArr[3]
}

if(timeOutputsLocalStorage){
    timeOutputsArr = timeOutputsLocalStorage
    secondsOutput = timeOutputsArr[0]
    minutesOutput = timeOutputsArr[1]
}

//if(lastRanLocalStorage){
//    lastRan = lastRanLocalStorage
//}

if(totalTimeLocalStorage){
    totalTimeArr = totalTimeLocalStorage
    totalSeconds = totalTimeArr[0]
    totalMinutes = totalTimeArr[1]
}

printTimer()


//Play Button Event
playBtn.addEventListener("click", () => {
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
        updateTotalTimes()
        lastRan = "playing"
        //localStorage.setItem("lastRan", lastRan)
        timeCompare = (new Date()).getTime()
        startTime = Date.now() + (totalSeconds * 1000)
        timerID = setInterval(updateTimerPlay, 1)
        playBtn.textContent = "Pause Play"
        workBtn.textContent = "Start Working"
    } 
})

//Work Button Event
workBtn.addEventListener("click", () => {
    isPaused = false

    if(hasEnded === true){
        hasEnded = false
        reset()
        isPaused = false
    }
    if(isWorking === true){
        workingPause()
    }

    if(isPlaying === true){
        clearInterval(timerID)
        isPlaying = false
    }

    if(isPaused == false && isWorking == false){
        isWorking = true
        updateTotalTimes()
        lastRan = "working"
        //localStorage.setItem("lastRan", lastRan)
        turnNormal()
        startTime = (new Date()).getTime()
        timerID = setInterval(updateTimerWork, 1)
        workBtn.textContent = "Pause Work"
        playBtn.textContent = "Start Playing"
    } 
})

//Update timer while playing
function updateTimerPlay(){
    playTxt.style.color = timerEl.style.color = "#7d0202"
    workTxt.style.color = "#232b2b"
    if(milisec > 0){
        elapsedTime = (Date.now() - timeCompare)
        milisec = (startTime - Date.now())
        seconds = milisec / 1000
        minutes = seconds / 60
        hours = minutes / 60    
        secondsOutput = ((seconds % 60)) % 60
        minutesOutput = ((minutes % 60)) % 60
        printTimer()
        timeArr = [milisec, seconds, minutes, hours]
        timeOutputsArr = [secondsOutput, minutesOutput]
        localStorage.setItem("time", JSON.stringify(timeArr))
        localStorage.setItem("timeOutputs", JSON.stringify(timeOutputsArr))
    } else{
        milisec = 0
        hasEnded = true
        stop()
        turnRed()
        playBtn.textContent = "Start Playing"
        printTimer()
    }
}

//Update timer while working
function updateTimerWork(){
    workTxt.style.color = timerEl.style.color = "#23990e"
    playTxt.style.color = "#232b2b"
    milisec = (Date.now() - startTime)
    seconds = milisec / 1000
    minutes = seconds / 60
    hours = minutes / 60
    secondsOutput = (totalSeconds + (seconds % 60)) % 60
    minutesOutput = (totalMinutes + (minutes % 60)) % 60
    timeArr = [milisec, seconds, minutes, hours]
    timeOutputsArr = [secondsOutput, minutesOutput]
    localStorage.setItem("time", JSON.stringify(timeArr))
    localStorage.setItem("timeOutputs", JSON.stringify(timeOutputsArr))
    printTimer()
}  

function stop(){
    playTxt.style.color = workTxt.style.color = timerEl.style.color = "#232b2b"
    isPaused = true
    isWorking = false
    isPlaying = false
    clearInterval(timerID)
}

function workingPause(){
    stop()
    workBtn.textContent = "Resume Work"
}

function playingPause(){
    stop()
    playBtn.textContent = "Resume Play"
}

function printTimer(){
    let output = pad(Math.trunc(hours)) + ":" + pad(Math.trunc(minutesOutput)) + ":" + pad(Math.trunc(secondsOutput))
    timerEl.textContent = output
}


resetBtn.addEventListener("click", reset)

function reset(){
    stop()
    elapsedTime = milisec = seconds = minutes = hours = minutesOutput = secondsOutput = totalMinutes = totalSeconds = 0
    turnNormal()
    localStorage.clear()
    workBtn.textContent = "Start Working"
    playBtn.textContent = "Start Playing"
    printTimer()
}

window.unload = () => {
    stop()
    updateTotalTimes()
}

function updateTotalTimes(){
    if(lastRan == "working"){
        totalSeconds += seconds
        totalMinutes += minutes
        totalTimeArr = [totalSeconds, totalMinutes]
        localStorage.setItem("totalTime", JSON.stringify(totalTimeArr))
    } else if(lastRan == "playing"){
        totalSeconds -= elapsedTime / 1000
        totalMinutes -= elapsedTime / 1000 / 60
        totalTimeArr = [totalSeconds, totalMinutes]
        localStorage.setItem("totalTime", JSON.stringify(totalTimeArr))
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

function turnNormal(){
    bodyEl.style.backgroundColor = '#FAF9F6'
}

function turnRed(){
    bodyEl.style.backgroundColor = '#ff8178'
}