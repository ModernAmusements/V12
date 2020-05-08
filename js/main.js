let ua = navigator.userAgent
if (ua.indexOf("Chrome/") != -1) {
    document.documentElement.classList.add('chrome')
} else if (ua.indexOf("Firefox/") != -1) {
    document.documentElement.classList.add('firefox')
}

let css = `
    html {
        --pointer - move - line - color: #03f;
    }
    html.inverted {
        --pointer - move - line - color: #f3a;

      /*--background-color: #101214;
      --foreground-color-rgb: 250,255,240;*/

      /*--background-color: #131310;
      --foreground-color-rgb: 210,230,255;*/

      /*--background-color: #111;
      --foreground-color-rgb: 255,255,255;*/

      --background-color: #111;
      --foreground-color-rgb: 255,254,245;

      --foreground-color-a: 0.8;
      --base-grid-color1: rgba(240,155,255, 0.1);
      --base-grid-color2: rgba(240,155,255, 0.05);
    }
    html.size-mode-relative {
      --fontSize: calc(100vw / 80);
      --hrThickness: 0.17rem;
    }
    .settings c:nth-child(2n+2) {
        font - feature - settings:'ss02' 1;
      user-select:none;
    }
    .baselineBeacon {
        height: var(--baseline);
      overflow: hidden;
      display: none;
      position: absolute;
    }
    .pointerMoveLine {
        height: 1px;
      pointer-events: none;
      visibility: hidden;
      position: absolute;
      left:0; top:0; right:0;
      background: var(--pointer-move-line-color);
      transform: translate3d(0,0,0);
      opacity:0.4;
    }
    .pointerMoveLine.active {visibility:visible; }
    .pointerMoveLine.pressed {
        opacity:0.8;
      box-shadow:
        0 1px 0 0 var(--pointer-move-line-color),
        0 -1px 0 0 var(--pointer-move-line-color);
    }
    `.trim()
let style = document.createElement('style')
style.appendChild(document.createTextNode(css))
document.head.appendChild(style)
let link = document.createElement('link')
link.rel = "stylesheet"
link.href = "../raster.debug.css"
document.head.appendChild(link)


let baselineBeacon = document.createElement('div')
baselineBeacon.className = 'baselineBeacon'
baselineBeacon.innerText = 'x'
document.body.appendChild(baselineBeacon)

function fmtnum(n) {
    let s = n.toFixed(2)
    if (s.substr(-3) == '.00') {
        s = s.substr(0, s.length - 3)
    }
    return s
}

function setLabel(id, value) {
    let label = document.getElementById(id)
    label && (label.innerText = value)
}

let tapevent = 'PointerEvent' in window ? 'pointerdown' : 'click'

function bindTapableOption(msgname, fn) {
    let label = document.getElementById(msgname + '-msg')
    label && label.parentElement.addEventListener(tapevent, fn)
}

let baseline = 0

function updateComputedValueLabels() {
    let cs = getComputedStyle(baselineBeacon)
    baseline = parseFloat(cs.height)
    let fontSize = parseFloat(cs.fontSize)
    let lineHeight = parseFloat(cs.lineHeight)
    setLabel('baseline-value-msg', fmtnum(baseline) + ' dp')
    setLabel('fontsize-value-msg', fmtnum(fontSize) + ' dp')
    setLabel('lineheight-value-msg', fmtnum(lineHeight) + ' dp')
}

function updateDebugModeLabel() {
    let on = document.body.classList.contains('debug')
    setLabel('debug-mode-msg', on ? 'On' : 'Off')
}

function updateBaseGridLabel() {
    let on = document.body.classList.contains('show-base-grid')
    setLabel('base-grid-msg', on ? 'On' : 'Off')
    togglePointerLine(on)
}

function updateInvertedLabel() {
    let on = document.documentElement.classList.contains('inverted')
    setLabel('inverted-msg', on ? 'On' : 'Off')
}

function updateSizeModeLabel() {
    let rel = document.documentElement.classList.contains('size-mode-relative')
    setLabel('size-mode-msg', rel ? 'Viewport' : 'Constant')
}

function toggleDebugMode() {
    document.body.classList.toggle('debug')
    updateDebugModeLabel()
}

function toggleBaseGrid() {
    document.body.classList.toggle('show-base-grid')
    updateBaseGridLabel()
}

function toggleInvertedMode() {
    document.documentElement.classList.toggle('inverted')
    updateInvertedLabel()
}

function toggleSizeMode() {
    document.documentElement.classList.toggle('size-mode-relative')
    updateSizeModeLabel()
    updateComputedValueLabels()
    setTimeout(updateComputedValueLabels, 10)
}



let pointerMoveLine = null

function togglePointerLine(on) {
    document.removeEventListener("mousemove", movePointerLine)
    document.removeEventListener("mousedown", pointerLineMouseDown)
    document.removeEventListener("mouseup", pointerLineMouseUp)
    if (on) {
        if (!pointerMoveLine) {
            pointerMoveLine = document.createElement('div')
            pointerMoveLine.className = 'pointerMoveLine'
            document.body.appendChild(pointerMoveLine)
        }
        document.addEventListener("mousemove", movePointerLine)
        document.addEventListener("mousedown", pointerLineMouseDown)
        document.addEventListener("mouseup", pointerLineMouseUp)
        pointerMoveLine.classList.add("active")
    } else if (pointerMoveLine) {
        pointerMoveLine.classList.remove("active")
    }
}

function pointerLineMouseDown() {
    pointerMoveLine.classList.add("pressed")
}

function pointerLineMouseUp() {
    pointerMoveLine.classList.remove("pressed")
}

function movePointerLine(ev) {
    let y = ev.pageY + (baseline / 4)
    y = y - y % (baseline / 2)
    pointerMoveLine.style.transform = `translate3d(0,${y - 0.5}px,0)`
}


bindTapableOption('debug-mode', toggleDebugMode)
bindTapableOption('base-grid', toggleBaseGrid)
bindTapableOption('inverted', toggleInvertedMode)
bindTapableOption('size-mode', toggleSizeMode)

function handleKeyPress(key) {
    switch (key) {
        case "d": case "D": toggleDebugMode(); return true
        case "g": case "G": toggleBaseGrid(); return true
        case "i": case "I": toggleInvertedMode(); return true
        case "s": case "S": toggleSizeMode(); return true
    }
    return false
}

document.addEventListener('keypress', ev => {
    if (!ev.metaKey && !ev.ctrlKey && !ev.altKey && handleKeyPress(ev.key)) {
        ev.preventDefault()
        ev.stopPropagation()
    }
}, { passive: false, capture: true })


let resizeTimer = null
window.addEventListener('resize', ev => {
    if (resizeTimer === null) {
        resizeTimer = setTimeout(() => {
            resizeTimer = null
            updateComputedValueLabels()
        }, 100)
    }
})


// main
updateDebugModeLabel()
updateBaseGridLabel()
updateInvertedLabel()
updateSizeModeLabel()

updateComputedValueLabels()












if ($(window).width() > 700) {



    $(".load").click(function () {
        $(".load").css("opacity", "0");
        setTimeout(function () {
            $(".load").css("display", "none");
        }, 2000);

    });



    var $win = $(window),
        w = 0, h = 0,
        rgb = [],
        getWidth = function () {
            w = $win.width();
            //h = $win.height();
        };

    $win.resize(getWidth).mousemove(function (e) {

        // rgb = [
        //     Math.round(e.pageX/w * 250),
        //     0,
        //     250
        // ];

        var xxx = Math.round(e.pageX / w * 400);

        // $(document.body).css('color','rgb('+rgb.join(',')+')');
        // $(document.body).css('-webkit-text-stroke','rgb('+rgb.join(',')+')');
        $('#glyph').attr("style", "font-variation-settings: 'wght'" + xxx);
        // console.log(xxx);

    }).resize();




    $(".load").click(function () {
        $(".all").css("filter", "none");

    });






    $(document).on('input', '.slider2', function () {

        valeurdemonslider = $(this).val();

        $(this).closest('.typo').find('.test').css("letter-spacing", valeurdemonslider + "px");

    });




    $(document).on('input', '.slider1', function () {

        valeurdemonslider = $(this).val();

        $(this).closest('.typo').find('.test').css("font-size", valeurdemonslider + "pt");

    });





    var tourneornot = 0;

    $(".bouton").click(function () {

        if (tourneornot === 0) {

            $(".yolo").css("display", "block");
            $(".partie_typo").css("transform", "perspective(1000px) rotateY(-270deg)");
            document.getElementById("about").innerHTML = "Typefaces";
            tourneornot = 1;

            mytimer2 = setTimeout(function () {
                $(".partie_typo").css("opacity", "0");
            }, 2000);

            clearTimeout(mytimer);
        }

        else {

            $(".partie_typo").css("opacity", "1");
            mytimer = setTimeout(function () {
                $(".yolo").css("display", "none");
            }, 1500);


            $(".partie_typo").css("transform", "perspective(0) rotateY(0)");
            document.getElementById("about").innerHTML = "About";
            tourneornot = 0;

            clearTimeout(mytimer2);
        }
    });



    $(".home").click(function () {
        if (tourneornot == 1) {
            $(".partie_typo").css("transform", "perspective(0) rotateY(0)");
            document.getElementById("about").innerHTML = "About";
            tourneornot = 0;
        }
        else { }

    });

    $('#select').change(function () {
        location.href = $(this).val();
    });



    $(".onglet").click(function () {
        $(".onglet").removeClass("onglet_active");
        $(".onglet").addClass("onglet_inactive");
        $(this).removeClass("onglet_inactive");
        $(this).addClass("onglet_active");
    });
    $(".third").click(function () {
        $(".firstco").css("display", "none");
        $(".secondco").css("display", "none");
        $(".thirdco").css("display", "block");
    });

    $(".second").click(function () {
        $(".firstco").css("display", "none");
        $(".secondco").css("display", "block");
        $(".thirdco").css("display", "none");
    });

    $(".first").click(function () {
        $(".firstco").css("display", "block");
        $(".secondco").css("display", "none");
        $(".thirdco").css("display", "none");
    });







}

else {





    $(document).on('input', '.slider2', function () {

        valeurdemonslider = $(this).val();

        $(this).closest('.typo').find('.test').css("letter-spacing", valeurdemonslider + "px");

    });




    $(document).on('input', '.slider1', function () {

        valeurdemonslider = $(this).val();

        $(this).closest('.typo').find('.test').css("font-size", valeurdemonslider + "pt");

    });






    var tourneornot = 0;

    $(".bouton").click(function () {

        if (tourneornot === 0) {
            $(".partie_typo").css("transform", "perspective(1000px) rotateY(-90deg)");
            document.getElementById("about").innerHTML = "Typefaces";
            setTimeout(function () {
                $(".yolo").css("opacity", "1");
            }, 2000);

            tourneornot = 1;
        }

        else {
            $(".partie_typo").css("transform", "perspective(0) rotateY(0)");
            document.getElementById("about").innerHTML = "About";
            $(".yolo").css("opacity", "0");
            tourneornot = 0;
        }
    });



    $(".home").click(function () {
        if (tourneornot == 1) {
            $(".partie_typo").css("transform", "perspective(0) rotateY(0)");
            document.getElementById("about").innerHTML = "About";
            $(".yolo").css("opacity", "0");
            tourneornot = 0;

        }
        else { }

    });

    $('#select').change(function () {
        location.href = $(this).val();
    });








}


