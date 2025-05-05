"use strict";
const body = document.body,
    h1 = document.querySelector("h1"),
    [
        ,
        isLocalTime,
        isShowYear,
        isShowMS,
        is24hour,
        color,
        backgroundColor,
        fontSize,
    ] = document.getElementsByTagName("input");
function reflesh() {
    const dateTime = new Date();
    const utc = isLocalTime.checked ? "" : "UTC";
    let time = "";
    if (isShowYear.checked) {
        // `(年)/(月)/(日) (曜日)
        time = `${[
            dateTime[`get${utc}FullYear`](),
            `0${dateTime[`get${utc}Month`]() + 1}`.slice(-2),
            `0${dateTime[`get${utc}Date`]()}`.slice(-2),
        ].join("/")} ${`${"日月火水木金土"[dateTime[`get${utc}Day`]()]}曜日`}`;
    }
    time += [
        `0${is24hour.checked
                ? dateTime[`get${utc}Hours`]()
                : dateTime[`get${utc}Hours`]() % 12
        }`.slice(-2),
        `0${dateTime[`get${utc}Minutes`]()}`.slice(-2),
        `0${dateTime[`get${utc}Seconds`]()}`.slice(-2),
    ].join(":");
    if (isShowMS.checked) {
        time += `.${`00${dateTime[`get${utc}Milliseconds`]()}`.slice(-3)}`;
    }
    if (!is24hour.checked) {
        time += ` ${dateTime[`get${utc}Hours`]() < 12 ? "AM" : "PM"}`;
    }
    h1.textContent = time;
    h1.style.fontSize = `${fontSize.value}px`;
    body.style.color = color.value;
    body.style.backgroundColor = backgroundColor.value;
    requestAnimationFrame(reflesh);
}
requestAnimationFrame(reflesh);
