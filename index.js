const body = document.body,
    h1 = document.querySelector("h1"),
    [, isLocalTime, isShowYear, isShowMS, is24hour, color, backgroundColor, fontSize] =
        document.getElementsByTagName("input");
function reflesh() {
    const dateTime = new Date();
    let time = "";
    if (isLocalTime.checked) {
        // 現地時間にチェックが入ってる時
        if (isShowYear.checked) {
            // `(年)/(月)/(日) (曜日)
            time = `${[
                dateTime.getFullYear(),
                `0${dateTime.getMonth() + 1}`.slice(-2),
                `0${dateTime.getDate()}`.slice(-2),
            ].join("/")} ${`${"日月火水木金土"[dateTime.getDay()]}曜日`}`;
        }
        if (is24hour.checked) {
            time += `0${dateTime.toLocaleTimeString("ja")}`.slice(-8);
        } else {
            time += [
                `0${dateTime.getHours() % 12}`.slice(-2),
                `0${dateTime.getMinutes()}`.slice(-2),
                `0${dateTime.getSeconds()}`.slice(-2),
            ].join(":");
        }
        if (isShowMS.checked)
            time += `.${`00${dateTime.getMilliseconds()}`.slice(-3)}`;
        if (!is24hour.checked)
            time += dateTime.toLocaleTimeString("en").slice(-3);
    } else {
        // 世界標準時にチェックが入ってる時
        if (isShowYear.checked) {
            // (年)/(月)/(日) (曜日)
            time += `${[
                dateTime.getUTCFullYear(),
                `0${dateTime.getUTCMonth() + 1}`.slice(-2),
                `0${dateTime.getUTCDate()}`.slice(-2),
            ].join("/")} ${"日月火水木金土"[dateTime.getUTCDay()]}曜日 `;
        }
        if (is24hour.checked) {
            // (時)/(分)/(秒)
            time += [
                `0${dateTime.getUTCHours()}`.slice(-2),
                `0${dateTime.getUTCMinutes()}`.slice(-2),
                `0${dateTime.getUTCSeconds()}`.slice(-2),
            ].join(":");
        } else {
            time += [
                `0${dateTime.getUTCHours() % 12}`.slice(-2),
                `0${dateTime.getUTCMinutes()}`.slice(-2),
                `0${dateTime.getSeconds()}`.slice(-2),
            ].join(":");
        }
        if (isShowMS.checked)
            time += `.${`00${dateTime.getUTCMilliseconds()}`.slice(-3)}`;
        if (!is24hour.checked)
            time += dateTime.toLocaleTimeString("en").slice(-3);
    }
    h1.textContent = time;
    h1.style.fontSize = `${fontSize.value}px`;
    body.style.color = color.value;
    body.style.backgroundColor = backgroundColor.value;
    requestAnimationFrame(reflesh);
}
requestAnimationFrame(reflesh);
