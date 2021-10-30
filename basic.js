function scrollToBottom() {
    var e = document.getElementsByClassName("df-pitch__area")[0],
        t = parseInt(document.getElementsByClassName("df-transfer__head")[0].firstElementChild.firstElementChild.innerText),
        n = setInterval(function() {
            if ((e.scrollTo(0, e.scrollHeight), document.getElementsByClassName("df-contest__box df-teamPreview").length == t)) {
                clearInterval(n);
                var r = getRemainingTransferCount(),
                    o = getTotalNumberOfMatches(),
                    l = 2 * (o - 1) - (110 - r);
                console.log("Team: ", document.getElementsByClassName("df-overlay__title")[0].firstElementChild.innerText),
                    console.log("Number of remaining transfers = ", r),
                    console.log("Number of used transfers = ", 110 - r),
                    console.log("Number of transfers made if 2 transfers are utilized per game = " + 2 * (o - 1) + " (from " + (o - 1) + " games excluding the first game)"),
                    console.log("Difference: ", l > 0 ? "+" + l : l),
                    console.log("Best Performance: " + getBestPerformance() + " Points");
            }
        }, 0);
}


function getRemainingTransferCount() {
    var e = 0;
    return (
        document.querySelectorAll(".df-transfer__overall").forEach((t) => {
            e += parseInt(t.firstElementChild.innerText);
        }),
        110 - e
    );
}

function getTotalNumberOfMatches() {
    var e = 0;
    return (
        document.querySelectorAll(".df-cmo__fix-lft ul").forEach((t) => {
            e += t.childNodes.length;
        }),
        e
    );
}

function getBestPerformance() {
    var e = [];
    return (
        document.querySelectorAll(".df-contest__pitch-num span").forEach((t) => {
            e.push(parseInt(t.innerText));
        }),
        Math.max.apply(Math, e)
    );
}
scrollToBottom();