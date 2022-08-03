const COLOR1 = "#1652f0";
const COLOR2 = "#cf0e0e";

const sound1 = new Audio("Beep_Computer_04.mp3");
sound1.preload = "auto";

document.documentElement.style.setProperty("--COLOR1", COLOR1);
document.documentElement.style.setProperty("--COLOR2", COLOR2);

const btnMain = document.getElementById("btn-main");
btnMain.addEventListener("click", btnMainFunc);
btnMain.style.backgroundColor = COLOR1;

const currentSide = document.getElementById("currentSide");
currentSide.textContent = "Side 1";
currentSide.style.color = COLOR1;

const avgSide1 = document.getElementById("avgSide1");
avgSide1.style.color = COLOR1;
const avgSide2 = document.getElementById("avgSide2");
avgSide2.style.color = COLOR2;

const btnTest = document.getElementById("btn-test");
btnTest.addEventListener("click", btnTestFunc);

const logContainer = document.getElementById("logContainer");
const blinCount = document.getElementById("blinCount");

const btnInc = document.getElementById("btn-inc");
btnInc.addEventListener("click", btnIncFunc);
const btnDec = document.getElementById("btn-dec");
btnDec.addEventListener("click", btnIncFunc);
const btnUndo = document.getElementById("btn-undo");
btnUndo.addEventListener("click", btnIncFunc);
const btnDeleteFirst = document.getElementById("btn-delete-first");
btnDeleteFirst.addEventListener("click", btnIncFunc);

let startTime;
let timerId;
let totalBlinCount = 0;
let signalDelay;

function btnMainFunc() {
    console.log(btnMain.textContent);
    // TODO упростить условие
    // if (btnMain.textContent === "START" || btnMain.textContent === "PAUSE") {
    if (!btnMain.textContent.includes(":")) {
        btnMain.textContent = "00 : 00";
        startTime = new Date();
        signalDelay = 0;
        timerId = setInterval(timer, 1000);
    } else {
        clearInterval(timerId);
        let logColor = COLOR1;
        let avgTarget;
        if (currentSide.textContent === "Side 1") {
            logColor = "log1";
            // logColor = COLOR1
            currentSide.textContent = "Side 2";
            btnMain.style.backgroundColor = COLOR2;
            currentSide.style.color = COLOR2;
            avgTarget = avgSide1;
            ++totalBlinCount;
            blinCount.textContent = "Total: " + totalBlinCount;
        } else {
            logColor = "log2";
            // logColor = COLOR2
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
    // const min = Math.floor(a / 60);
    // const sec = a % 60;
    // btnMain.textContent = `${min.pad(2)} : ${sec.pad(2)}`;
    btnMain.textContent = secToText(sec);

    let avgSec;
    if (currentSide.textContent === "Side 1") {
        avgSec = textToSec(avgSide1.textContent);
    } else {
        avgSec = textToSec(avgSide2.textContent);
    }
    // if (avgSec && sec >= avgSec && !(sec%5)) {
    if (avgSec && sec >= avgSec) {
        if (!(signalDelay % 5)) {
            Signal("test");
        }
        signalDelay++;
    }
}

function log(time, logColor) {
    const e = document.createElement("div");
    e.classList = logColor;
    // e.style.color = logColor
    e.textContent = time;
    // logContainer.insertBefore(e, logContainer.firstChild)
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
        // const time = el.textContent.split(' : ')
        allTimeSum += textToSec(el.textContent);
    });
    return secToText(Math.trunc(allTimeSum / list.length));
}

function secToText(seconds) {
    // const min = Math.floor(seconds / 60);
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

function Signal(mode) {
    let audio;
    switch (mode) {
        case "test":
            audio = sound1;
            break;
    }
    audio.play();
}

function btnTestFunc() {
    logContainer.insertAdjacentHTML("afterbegin", "<div>test 1</div>");
    logContainer.insertAdjacentHTML("afterbegin", "<div>test 2</div>");
    logContainer.insertAdjacentHTML("afterbegin", "<div>test 3</div>");
}
