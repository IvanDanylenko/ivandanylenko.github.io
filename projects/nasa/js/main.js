$(document).ready(function () {
    if(window.innerWidth > 1024) {
        var scene = document.getElementsByClassName('paralax-1')[0];
        var parallax = new Parallax(scene);

        var scene = document.getElementsByClassName('paralax-2')[0];
        var parallax = new Parallax(scene);

        var scene = document.getElementsByClassName('paralax-3')[0];
        var parallax = new Parallax(scene);

        var scene = document.getElementsByClassName('paralax-4')[0];
        var parallax = new Parallax(scene);

        var scene = document.getElementsByClassName('paralax-5')[0];
        var parallax = new Parallax(scene);

        var scene = document.getElementsByClassName('paralax-6')[0];
        var parallax = new Parallax(scene);

        var scene = document.getElementsByClassName('paralax-7')[0];
        var parallax = new Parallax(scene);


        var rellax = new Rellax('.rellax');

    }
    AOS.init();

    var ts;
    $(window).on('touchstart', function (e) {
        ts = $(document).scrollTop();
    });

    if(window.innerWidth > 1024){

        var animTop = false;
        flagScroll = false;


        var nScroll = 6;
        $(window).scroll(function () {
            let scroll = $(this).scrollTop();

            if(scroll > 0){
                $('.top-rocket').addClass('active');
            } else {
                $('.top-rocket').removeClass('active');
            }

            $('.top-rocket').css('transform', 'translate(-'+scroll/15.5+'%, -'+scroll/25+'%) rotate(-34.5deg)');
            $('.waves-2').css('transform', 'translate(-'+scroll/70+'%, -'+scroll/60+'%)');
            $('.waves-3').css('transform', 'translate(-'+scroll/60+'%, -'+scroll/90+'%) rotate(7deg)');


            if(scroll < 850){
                $('.b-wave').css('transform', 'translate(-'+scroll/150+'%, -'+scroll/100+'%)');
                $('.b-wave').css('opacity', 1);
            } else {
                nScroll == 0 ? scroll/120 : nScroll;
                $('.b-wave').css('transform', 'translate(-'+nScroll+'%, -'+scroll/70+'%)');
                $('.b-wave').css('opacity', 2.9 - (scroll*3) / 2500);
                $('.waves').css('opacity', 1.8 - (scroll*3) / 2500);
            }



                $('.top-block .inner-block').css('opacity', 1 - scroll / 550);



        });



    }
    if(window.innerWidth > 600) {
        var stars = $('.star-solo').length;
        var comets = $('.comet').length;

        setInterval(function () {
            var random = randomInteger(0, stars);

            $('.star-solo').eq(random).addClass('animate');

            setTimeout(function () {
                $('.star-solo').eq(random).removeClass('animate');
            }, 1000);

        }, 5000);


        setInterval(function () {
            var random = randomInteger(0, stars);

            $('.comet').eq(random).addClass('animate');

            setTimeout(function () {
                $('.comet').eq(random).removeClass('animate');
            }, 7000);

        }, 5000);

        function randomInteger(min, max) {
            // случайное число от min до (max+1)
            let rand = min + Math.random() * (max + 1 - min);
            return Math.floor(rand);
        }
    }

    $(window).resize(function() {
        var bLazy = new Blazy();
    });
    var bLazy = new Blazy();
});



