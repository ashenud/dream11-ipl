var jquery = document.createElement('script');
var sweet = document.createElement('script');
jquery.src = "https://code.jquery.com/jquery-3.4.1.min.js";
sweet.src = "https://cdn.jsdelivr.net/npm/sweetalert2@10";
document.getElementsByTagName('head')[0].appendChild(jquery);
document.getElementsByTagName('head')[0].appendChild(sweet);

var intervalObj = null;
intervalObj = setInterval(scrollDown, 1000);

if (window.jQuery) {
    scrollDown();
} else {
    setTimeout(function() {
        scrollDown();
    }, 5000);
}

function scrollDown() {

    var t = parseInt($(".df-transfer__head").first().first().first().text());
    var total = parseFloat($(".df-transfer__head span:nth-child(2)").first().first().first().text());
    var e = $(".df-pitch__wrap")[0];
    var f = $(".df-contest__box.df-teamPreview")[0];
    var g = $(".df-contest__box.df-teamPreview").length;

    $(".df-pitch__wrap").animate({
        scrollTop: e.scrollHeight
    });


    var contestHeight = f.scrollHeight;
    var windowHeight = (contestHeight * t) + 400;

    if (e.scrollHeight > windowHeight) {
        clearInterval(intervalObj);

        var r = getRemainingTransferCount(),
            o = getTotalNumberOfMatches(),
            used = 110 - r,
            points_per_change = getPointsPreChange(used).toFixed(2);
            l = 2 * (o - 1) - (110 - r),
            diff = l > 0 ? "+" + l : l,
            m = (o - 1),
            rm = (60-m),
            m2 = 2 * (o - 1),
            dif_dis = "number of transfers made if 2 transfers are utilized per game = " + m2 + " (from " + m + " games excluding the first game)";


        var team = $(".df-overlay__title")[0].firstElementChild.innerText;

        var data = '{"team":"' + team + '","total":"' + total + '","remaining_matches":"' + rm + '","remaining_transfers":' + r + ',"used_transfers":' + used + ',"difference":"' + diff + '","points_per_change":"' + points_per_change + '","best_performance":' + getBestPerformance() + ',"average_performance":' + getAverageformance().toFixed(2) + '}';

        var jsonData = JSON.parse(data);

        console.log(jsonData);

        Swal.fire({
            title: "<b>" + jsonData.team + "</b>",
            html: "<table style='width:100%'>" +
                        "<tr>" +
                            "<th style='text-align: left;'>Total Points</th>" +
                            "<td style='text-align: right;'>" + jsonData.total + "</td>" +
                        "</tr>" +
                        "<tr>" +
                            "<th style='text-align: left;'>Remaining Matches</th>" +
                            "<td style='text-align: right;'>" + jsonData.remaining_matches + "</td>" +
                        "</tr>" +
                        "<tr>" +
                            "<th style='text-align: left;'>Remaining Transfers</th>" +
                            "<td style='text-align: right; font-weight: bold; color: red;'>" + jsonData.remaining_transfers + "</td>" +
                        "</tr>" +
                        "<tr>" +
                            "<th style='text-align: left;'>Used Transfers</th>" +
                            "<td style='text-align: right;'>" + jsonData.used_transfers + "</td>" +
                        "</tr>" +
                        "<tr>" +
                            "<td></td>" +
                        "</tr>" +
                        "<tr>" +
                            "<td colspan='2' style='text-align: center; font-size: 9px;' >" + dif_dis + "</td>" +
                        "</tr>" +
                        "<tr>" +
                            "<th style='text-align: left;'>Difference</th>" +
                            "<td style='text-align: right;'>" + jsonData.difference + "</td>" +
                        "</tr>" +
                        "<tr>" +
                            "<th style='text-align: left;'>Best Performance</th>" +
                            "<td style='text-align: right;'>" + jsonData.best_performance + "</td>" +
                        "</tr>" +
                        "<tr>" +
                            "<th style='text-align: left;'>Average Performance</th>" +
                            "<td style='text-align: right;'>" + jsonData.average_performance + "</td>" +
                        "</tr>" +
                        "<tr>" +
                            "<th style='text-align: left;'>Points Per a Change</th>" +
                            "<td style='text-align: right;'>" + jsonData.points_per_change + "</td>" +
                        "</tr>" +
                    "</table>"+
                    "<div style='text-align: center;     margin: 20px 0 -25px 0;'>"+
                        "<a style='text-decoration: none;color: #2778c4;' href='http://facebook.com/ashen.lk' target='_blank'> &#169; ashen </a>"+
                    "</div>",
            confirmButtonText: "Close",
        });

    }

}

function getRemainingTransferCount() {
    var e = 0;
    return (

        $(".df-transfer__overall").each(function() {
            e += parseInt($(this).first().text())
        }),
        110 - e
    );
}

function getTotalNumberOfMatches() {
    var e = 0;
    return (

        $(".df-cmo__fix-lft ul").each(function() {
            e += $(this).children().length
        }),
        e
    );
}

function getBestPerformance() {
    var e = [];
    return (
        $(".df-contest__pitch-num span").each(function() {
            e.push(parseInt($(this).text()));
        }),
        Math.max.apply(Math, e)
    );
}

function getAverageformance() {
    var e = 0;
    var f = 0;
    var a = 0
    return (
        $(".df-contest__pitch-num span").each(function() {
            e += parseInt($(this).text());
            f++;
        }),
        a = e / f
    );
}

function getPointsPreChange(used) {
    var e = 0;
    var a = 0
    return (
        $(".df-contest__pitch-num span").each(function() {
            e += parseInt($(this).text());
        }),
        a = e / used
    );
}