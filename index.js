const COLOR1 = "#1652f0";
const COLOR2 = "rgb(252,10,79)";

const minuteSound = new Audio("1.mp3");
const beforeAvgSound = new Audio("2.mp3");
const avgSound = new Audio("3.mp3");
// alertSound.preload = "auto";
const lastSound = new Audio("4.mp3");

document.documentElement.style.setProperty("--COLOR1", COLOR1);
document.documentElement.style.setProperty("--COLOR2", COLOR2);

const btnMain = document.getElementById("btn-main");
btnMain.addEventListener("click", btnMainFunc);
// btnMain.style.backgroundColor = COLOR1;

const currentSide = document.getElementById("currentSide");
// currentSide.textContent = "Side 1";
currentSide.style.color = COLOR1;

const avgSide1 = document.getElementById("avgSide1");
avgSide1.style.color = COLOR1;
const avgSide2 = document.getElementById("avgSide2");
avgSide2.style.color = COLOR2;

// const btnTest = document.getElementById("btn-test");
// btnTest.addEventListener("click", btnTestFunc);
const btnTest = document.getElementsByClassName("footer")[0];
btnTest.addEventListener("click", btnTestFunc);

const logContainer = document.getElementById("logContainer");
const blinCount = document.getElementById("blinCount");
const totalTimeOut = document.getElementById("totalTime");

const btnInc = document.getElementById("btn-inc");
btnInc.addEventListener("click", btnIncFunc);
const btnDec = document.getElementById("btn-dec");
btnDec.addEventListener("click", btnIncFunc);
const btnUndo = document.getElementById("btn-undo");
btnUndo.addEventListener("click", btnIncFunc);
const btnDeleteFirst = document.getElementById("btn-delete-first");
btnDeleteFirst.addEventListener("click", btnIncFunc);

let startTime;
let totalTime;
let timerId;
let totalBlinCount = 0;
let signalDelay;
let firstRun = true;
let lastSecAlert;
let beforeAvgSecAlert;

function btnMainFunc() {
    if (!btnMain.textContent.includes(":")) {
        if (firstRun) {
            firstRun = false;
            btnMain.classList.remove("gradient");
            blinCount.textContent = ""
            btnMain.style.backgroundColor = COLOR1;
            currentSide.textContent = "Side 1";
            totalTime = new Date();
        }
        btnMain.textContent = "00 : 00";
        startTime = new Date();
        signalDelay = 0;
        lastSecAlert = true;
        beforeAvgSecAlert = true;
        timerId = setInterval(timer, 1000);
    } else {
        clearInterval(timerId);
        let logColor = COLOR1;
        let avgTarget;
        if (currentSide.textContent === "Side 1") {
            logColor = "log1";
            currentSide.textContent = "Side 2";
            btnMain.style.backgroundColor = COLOR2;
            currentSide.style.color = COLOR2;
            avgTarget = avgSide1;
            ++totalBlinCount;
            blinCount.textContent = `Total: ${totalBlinCount}`;
        } else {
            logColor = "log2";
            currentSide.textContent = "Side 1";
            btnMain.style.backgroundColor = COLOR1;
            currentSide.style.color = COLOR1;
            avgTarget = avgSide2;
        }
        log(btnMain.textContent, logColor);
        avgTarget.textContent = getAvertage("." + logColor);
        btnMain.textContent = "PAUSE";
    }
}

function timer() {
    const newTime = new Date();
    const sec = Math.floor((newTime.getTime() - startTime.getTime()) / 1000);
    btnMain.textContent = secToText(sec);
    const totalSec = Math.trunc((newTime.getTime() - totalTime.getTime()) / 1000);
    totalTimeOut.textContent = `${secToText(totalSec)}`

    let avgSec;
    let secondLastSec;
    if (currentSide.textContent === "Side 1") {
        avgSec = textToSec(avgSide1.textContent);
        secondLastSec = logContainer.getElementsByClassName("log1")[0];
    } else {
        avgSec = textToSec(avgSide2.textContent);
        secondLastSec = logContainer.getElementsByClassName("log2")[0];
    }

    if (secondLastSec) {
        if (!(sec % 60)) {
            // beep every minute
            Signal(minuteSound);
            return
        }

        if (avgSec && sec >= avgSec) {
            // beep every 5 seconds after average
            if (!(signalDelay % 5)) {
                Signal(avgSound);
                signalDelay++;
                return
            }
            signalDelay++;
        }

        if (beforeAvgSecAlert && avgSec > 15 && sec >= avgSec - 15) {
            // signal 15 seconds before the average
            Signal(beforeAvgSound);
            beforeAvgSecAlert = false;
            return
        }

        const lastSec = +textToSec(secondLastSec.textContent);
        if (lastSecAlert && lastSec && sec >= lastSec) {
            // signal once the last time exceeded
            Signal(lastSound);
            lastSecAlert = false;
            return
        }
    }
}

function log(time, logColor) {
    const e = document.createElement("div");
    e.classList = logColor;
    e.textContent = time;
    logContainer.prepend(e);
}

Number.prototype.pad = function (digits) {
    for (var n = this.toString(); n.length < digits; n = 0 + n);
    return n;
};

function getAvertage(className) {
    const list = document.querySelectorAll(className);
    if (!list.length) {
        return "00 : 00";
    }
    let allTimeSum = 0;
    list.forEach((el) => {
        allTimeSum += textToSec(el.textContent);
    });
    return secToText(Math.trunc(allTimeSum / list.length));
}

function secToText(seconds) {
    const min = ~~(seconds / 60);
    const sec = seconds % 60;
    return `${min.pad(2)} : ${sec.pad(2)}`;
}

function textToSec(text) {
    const time = text.split(" : ");
    return time[0] * 60 + Number(time[1]);
}

function btnIncFunc(e) {
    const first = logContainer.firstChild;
    if (!first) return;
    if (e.target === btnDec) {
        let sec = +textToSec(first.textContent) - 10;
        if (sec < 0) sec = 0;
        first.textContent = secToText(sec);
    } else if (e.target === btnInc) {
        const sec = +textToSec(first.textContent) + 10;
        first.textContent = secToText(sec);
    } else if (e.target === btnDeleteFirst) {
        logContainer.lastChild.remove();
    } else {
        //undo btnUndo
        first.remove();
    }
    avgSide1.textContent = getAvertage(".log1");
    avgSide2.textContent = getAvertage(".log2");
}

function Signal(audio) {
    // let audio;
    // switch (mode) {
    //     case "test":
    //         audio = sound1;
    //         break;
    // }
    audio.play();
}

function btnTestFunc() {
    // logContainer.insertAdjacentHTML("afterbegin", "<div>test 1</div>");
    // logContainer.insertAdjacentHTML("afterbegin", "<div>test 2</div>");
    // logContainer.insertAdjacentHTML("afterbegin", "<div>test 3</div>");
    logContainer.innerHTML = '<div class="log2">00 : 10</div><div class="log1">00 : 12</div><div class="log2">00 : 04</div><div class="log1">00 : 04</div>';
    avgSide1.textContent = getAvertage(".log1");
    avgSide2.textContent = getAvertage(".log2");
}
