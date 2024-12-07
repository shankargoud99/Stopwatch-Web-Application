let timerInterval;
let elapsedTime = 0;
let isRunning = false;

const timeDisplay = document.getElementById('time-display');
const startPauseBtn = document.getElementById('start-pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsList = document.getElementById('laps-list');

function formatTime(ms) {
    const milliseconds = ms % 1000;
    const seconds = Math.floor(ms / 1000) % 60;
    const minutes = Math.floor(ms / (1000 * 60)) % 60;
    const hours = Math.floor(ms / (1000 * 60 * 60));

    return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds
        .toString()
        .padStart(3, '0')}`;
}

function updateTimeDisplay() {
    timeDisplay.textContent = formatTime(elapsedTime);
}

function startPauseHandler() {
    if (isRunning) {
        clearInterval(timerInterval);
        startPauseBtn.textContent = 'Start';
        lapBtn.disabled = true;
    } else {
        const startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateTimeDisplay();
        }, 10);
        startPauseBtn.textContent = 'Pause';
        lapBtn.disabled = false;
    }
    isRunning = !isRunning;
}

function resetHandler() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isRunning = false;
    updateTimeDisplay();
    startPauseBtn.textContent = 'Start';
    lapBtn.disabled = true;
    lapsList.innerHTML = '';
}

function lapHandler() {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
    lapsList.appendChild(lapItem);
}

startPauseBtn.addEventListener('click', startPauseHandler);
resetBtn.addEventListener('click', resetHandler);
lapBtn.addEventListener('click', lapHandler);
updateTimeDisplay();
