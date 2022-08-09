import { secToText, textToSec, getAvertage } from "./timeConvert.js";

export default function btnIncFuncCC(e) {
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