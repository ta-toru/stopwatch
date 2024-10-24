let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCount = 0;
const offsetValue = 100; // 任意の数字（例：100）

const display = document.getElementById("display");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const laps = document.getElementById("laps");

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10);
        running = true;

        startButton.style.display = "none"; // 開始ボタンを非表示
        stopButton.style.display = "inline"; // 停止ボタンを表示
        lapButton.style.display = "inline"; // ラップボタンを表示
        resetButton.style.display = "none"; // リセットボタンを非表示
        lapButton.classList.remove("disabled"); // ラップボタンを有効にする
    }
}

function stopTimer() {
    clearInterval(tInterval);
    running = false;

    // 現在の時間を取得
    const currentMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const currentSeconds = Math.floor((difference % (1000 * 60)) / 1000);
    const currentMilliseconds = Math.floor((difference % 1000) / 10); // ミリ秒を小数点以下として取得

    // 合計を計算
    const total = currentMinutes + currentSeconds; // 小数点以下を加算
    const magicNumber = offsetValue - total; // 任意の数字から引く

    // 表示を更新
    display.innerHTML = `${(currentMinutes < 10 ? "0" : "")}${currentMinutes}:${(currentSeconds < 10 ? "0" : "")}${currentSeconds}.${magicNumber}`; // 分:秒.magicnumber形式で表示

    startButton.style.display = "inline"; // 開始ボタンを表示
    stopButton.style.display = "none"; // 停止ボタンを非表示
    lapButton.style.display = "none"; // ラップボタンを非表示
    resetButton.style.display = "inline"; // リセットボタンを表示
    lapButton.classList.add("disabled"); // ラップボタンを無効にする
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = "00:00.00"; // 初期表示を分と秒、ミリ秒のみに変更
    laps.innerHTML = ""; // ラップタイムをリセット
    lapCount = 0; // ラップカウントをリセット

    startButton.style.display = "inline"; // 開始ボタンを表示
    stopButton.style.display = "none"; // 停止ボタンを非表示
    lapButton.style.display = "inline"; // ラップボタンを非表示
    resetButton.style.display = "none"; // リセットボタンを非表示
    lapButton.classList.add("disabled"); // ラップボタンを無効にする
}

function lapTimer() {
    if (running) { // ストップウォッチが動いているときだけラップを記録
        lapCount++;
        const lapTime = formatTime(difference);
        const lapDiv = document.createElement("div");
        lapDiv.innerHTML = `ラップ ${lapCount}: ${lapTime}`;
        laps.insertBefore(lapDiv, laps.firstChild); // 新しいラップを先頭に追加
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    display.innerHTML = formatTime(difference);
}

function formatTime(time) {
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return (minutes < 10 ? "0" : "") + minutes + ":" +
           (seconds < 10 ? "0" : "") + seconds + "." +
           (milliseconds < 10 ? "0" : "") + milliseconds;
}

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);
lapButton.addEventListener("click", lapTimer);

// 初期状態でラップボタンを無効にする
lapButton.classList.add("disabled");
