function secToText(seconds) {
    const min = ~~(seconds / 60);
    const sec = seconds % 60;
    return `${min.pad(2)} : ${sec.pad(2)}`;
}

function textToSec(text) {
    const time = text.split(" : ");
    return time[0] * 60 + Number(time[1]);
}

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

export { secToText, textToSec, getAvertage };
