let startTime, updatedTime, difference;
let interval, isRunning = false;
let laps = [];

// DOM elements
const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsDiv = document.getElementById('laps');
const container = document.querySelector('.container');

// Format time to display in stopwatch
function formatTime(ms) {
    const date = new Date(ms);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

// Start the stopwatch
startBtn.addEventListener('click', function () {
    if (!isRunning) {
        startTime = new Date().getTime() - (difference || 0);
        interval = setInterval(updateDisplay, 10);
        isRunning = true;
        container.classList.add('running'); // Start teddy animation
    }
});

// Pause the stopwatch
pauseBtn.addEventListener('click', function () {
    if (isRunning) {
        clearInterval(interval);
        isRunning = false;
        container.classList.remove('running'); // Stop teddy animation
    }
});

// Reset the stopwatch
resetBtn.addEventListener('click', function () {
    clearInterval(interval);
    isRunning = false;
    difference = 0;
    display.textContent = '00:00:00.000';
    laps = [];
    lapsDiv.innerHTML = '';  // Clear laps
    container.classList.remove('running'); // Stop teddy animation
});

// Track lap times
lapBtn.addEventListener('click', function () {
    if (isRunning) {
        const lapTime = difference;
        laps.push(lapTime);
        displayLaps();
    }
});

// Update the display with current time
function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    display.textContent = formatTime(difference);
}

// Display lap times
function displayLaps() {
    lapsDiv.innerHTML = '';  // Clear previous lap list
    laps.forEach((lap, index) => {
        const lapDiv = document.createElement('div');
        lapDiv.classList.add('lap');
        lapDiv.textContent = `Lap ${index + 1}: ${formatTime(lap)}`;
        lapsDiv.appendChild(lapDiv);
    });
}
