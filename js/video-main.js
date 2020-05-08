/*Controls*/
$(document).ready(function () {
    $(".btn-toggle, .btn-gallery, .btn-gallery-2").on("click", function () {
        var s = $(this).data("toggle");
        $(s).toggleClass("popup-visible"),
            $("body").toggleClass("noscroll"),
            $(".master-close").show();
    }),
        $(".btn-close, .btn-toggle-close").on("click", function () {
            $(".popup").removeClass("popup-visible"),
                $("body").removeClass("noscroll"),
                $(".master-close").hide();
        }),
        $(".master-close").on("click", function () {
            $(".popup").removeClass("popup-visible"),
                $("body").removeClass("noscroll"),
                $(this).hide();
        }),


        /* Video 1 + Controlls
        */

        $(".btn-gallery").on("click", function () {
            $("#video").hasClass("popup-visible")
                ? $("#video video").get(0).play()
                : $("#video video").get(0).pause();
        }),
        $(".btn-gallery--video").on("click", function () {
            $("#video video").get(0).play(), $(this).hide();
        }),
        $(".btn-close--video").on("click", function () {
            $("#video video").get(0).pause(), $(".btn-gallery--video").show();
        }),
        $(".popup-gallery--video").on("click", function () {
            $(".popup").removeClass("popup-visible"),
                $("body").removeClass("noscroll"),
                $(".master-close").hide(),
                $("#video video").get(0).pause(),
                $(".btn-gallery--video").show();
        }),


        /* CGI + Controlls
        
        $(".btn-gallery-2").on("click", function () {
            $("#movie2").hasClass("popup-visible")
                ? $("#movie2 video").get(0).play()
                : $("#movie2 video").get(0).pause();
        }),
        $(".btn-gallery--movie2").on("click", function () {
            $("#movie2 video").get(0).play(), $(this).hide();
        }),
        $(".btn-close--video").on("click", function () {
            $("#movie2 video").get(0).pause(), $(".btn-gallery--movie2").show();
        }),
        $(".popup-gallery--movie2").on("click", function () {
            $(".popup").removeClass("popup-visible"),
                $("body").removeClass("noscroll"),
                $(".master-close").hide(),
                $("#movie2 video").get(0).pause(),
                $(".btn-gallery--movie2").show();
        }),


        */




        (function ($) {
            "use strict";
            $("a[href^='#']").on("click", function (s) {
                s.preventDefault();
                var o = this.hash;
                $("html, body").animate(
                    { scrollTop: $(this.hash).offset().top + 0 },
                    300,
                    function () { }
                );
            });
        })


            (jQuery),
        /*Switch*/
        $(window).on("touchmove scroll", function () {
            var s = $(window).scrollTop(),
                o = $(".switch-indicator-1").offset(),
                e = $(".switch-indicator-2").offset(),
                i = $(".switch-indicator-3").offset(),
                t = $(".switch-indicator-4").offset(),
                c = $(".switch-indicator-5").offset(),
                l = $(".switch-indicator-6").offset(),
                b = $(".switch-indicator-7").offset();
            s < o.top &&
                ($(".switch").removeClass("switch-active"),
                    $(".switch-1").addClass("switch-active")),
                s >= o.top &&
                ($(".switch").removeClass("switch-active"),
                    $(".switch-2").addClass("switch-active")),
                s >= e.top &&
                ($(".switch").removeClass("switch-active"),
                    $(".switch-3").addClass("switch-active")),
                s >= i.top &&
                ($(".switch").removeClass("switch-active"),
                    $(".switch-4").addClass("switch-active")),
                s >= t.top &&
                ($(".switch").removeClass("switch-active"),
                    $(".switch-5").addClass("switch-active")),
                s >= c.top &&
                ($(".switch").removeClass("switch-active"),
                    $(".switch-6").addClass("switch-active")),
                s >= l.top &&
                ($(".switch").removeClass("switch-active"),
                    $(".switch-7").addClass("switch-active")),
                s >= b.top &&
                ($(".switch").removeClass("switch-active"),
                    $(".switch-8").addClass("switch-active"));
        }),


        $(document).keyup(function (s) {
            27 === s.keyCode &&
                ($(".popup").removeClass("popup-visible"),
                    $("body").removeClass("noscroll"),
                    $(".master-close").hide(),
                    $(".btn-gallery--video").show(),
                    $("#video video").get(0).pause());
        });

});


function myFunction() {
    var elmnt = document.getElementById("about");
    elmnt.scrollTop = 0;
}

$(document).ready(function () {
    $('.materialboxed').materialbox();
});