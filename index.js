const COLOR1 = '#1652f0'
const COLOR2 = '#cf0e0e'

document.documentElement.style.setProperty('--COLOR1', COLOR1);
document.documentElement.style.setProperty('--COLOR2', COLOR2);

const btnMain = document.getElementById("btn-main");
btnMain.addEventListener("click", btnMainFunc);
btnMain.style.backgroundColor = COLOR1;

const currentSide = document.getElementById("currentSide");
currentSide.textContent = 'Side 1'
currentSide.style.color = COLOR1;

const avgSide1 = document.getElementById("avgSide1");
avgSide1.style.color = COLOR1;
const avgSide2 = document.getElementById("avgSide2");
avgSide2.style.color = COLOR2;

const btnTest = document.getElementById("btn-test");
btnTest.addEventListener("click", btnTestFunc);

const logContainer = document.getElementById("logContainer");
const blinCount = document.getElementById("blinCount");

let startTime;
let timerId;
let totalBlinCount=0

// let temp = 0;

function btnMainFunc() {
    console.log(btnMain.textContent);
    if (btnMain.textContent === "START" || btnMain.textContent === "PAUSE") {
        btnMain.textContent = "00 : 00";
        startTime = new Date();
        timerId = setInterval(timer, 1000);
    } else {
        clearInterval(timerId);
        let logColor = COLOR1
        let avgTarget
        if (currentSide.textContent === 'Side 1') {
            logColor = 'log1'
            // logColor = COLOR1
            currentSide.textContent = 'Side 2'
            btnMain.style.backgroundColor = COLOR2
            currentSide.style.color = COLOR2
            avgTarget = avgSide1
            ++totalBlinCount
            blinCount.textContent = 'Total: ' + totalBlinCount
        } else {
            logColor = 'log2'
            // logColor = COLOR2
            currentSide.textContent = 'Side 1'
            btnMain.style.backgroundColor = COLOR1
            currentSide.style.color = COLOR1
            avgTarget = avgSide2
        }
        log(btnMain.textContent, logColor);
        avgTarget.textContent = getAvertage('.'+logColor)
        btnMain.textContent = "PAUSE";
    }
}

function timer() {
    const newTime = new Date();
    const a = Math.floor((newTime.getTime() - startTime.getTime()) / 1000);
    // const min = Math.floor(a / 60);
    // const sec = a % 60;
    // btnMain.textContent = `${min.pad(2)} : ${sec.pad(2)}`;
    btnMain.textContent = secToText(a)
}

function log(time, logColor) {
    // temp++;
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
    const list = document.querySelectorAll(className)
    console.log(list)
    let allTimeSum = 0
    list.forEach ((el) => {
        // const time = el.textContent.split(' : ')
        
        allTimeSum += textToSec(el.textContent)
        console.log('sec',allTimeSum);
    })
    return secToText(Math.floor(allTimeSum / list.length))
}

function secToText(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.pad(2)} : ${sec.pad(2)}`;
}

function textToSec(text) {
    const time = text.split(' : ')
    return time[0]*60 + Number(time[1]);
}

function btnTestFunc() {
    logContainer.insertAdjacentHTML('afterbegin', '<div>test 1</div>')
    logContainer.insertAdjacentHTML('afterbegin', '<div>test 2</div>')
    logContainer.insertAdjacentHTML('afterbegin', '<div>test 3</div>')
}