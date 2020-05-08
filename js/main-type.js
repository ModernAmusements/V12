let wght2 = 800;
let slnt2 = 0;
let ital2 = 0.5;
document
    .getElementById("fontSizeSlider")
    .addEventListener("input", function () {
        if (window.innerWidth > 767.98) {
            document.getElementById("controls-result").style.fontSize =
                document.getElementById("fontSizeSlider").value + "vw";
            document.getElementById("fontSizeResult").innerHTML =
                document.getElementById("fontSizeSlider").value + "vw";
        } else {
            document.getElementById("controls-result").style.fontSize =
                document.getElementById("fontSizeSlider").value * 2 + "vw";
            document.getElementById("fontSizeResultSm").innerHTML =
                Math.floor(document.getElementById("fontSizeSlider").value * 2) + "vw";
        }
    });


document.getElementById("wghtSlider").addEventListener("input", function () {
    wght2 = document.getElementById("wghtSlider").value;
    document.getElementById(
        "controls-result"
    ).style.fontVariationSettings = `'wght' ${wght2}, 'slnt' ${slnt2}, 'CRSV' ${ital2}`;
    document.getElementById("wghtResult").innerHTML = document.getElementById(
        "wghtSlider"
    ).value;
});


document.getElementById("slntSlider").addEventListener("input", function () {
    slnt2 = document.getElementById("slntSlider").value;
    document.getElementById(
        "controls-result"
    ).style.fontVariationSettings = `'wght' ${wght2}, 'slnt' ${slnt2}, 'CRSV' ${ital2}`;
    document.getElementById("slntResult").innerHTML = document.getElementById(
        "slntSlider"
    ).value;
});

