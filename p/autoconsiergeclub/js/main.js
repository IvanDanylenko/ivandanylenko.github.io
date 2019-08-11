function map() {
    var uluru = { lat: 50.451236, lng: 30.622053 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: uluru,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.LEFT_BOTTOM
        },
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        scaleControl: true,
        streetViewControl: false,
        fullscreenControl: false
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}

function scrollTo(target) {
    if ($(target).length) {
        $('html, body').animate({scrollTop: $(target).offset().top - ($('.main-wrapper').innerHeight() - $('.main-wrapper').height())}, 400);
        $('body').removeClass('menu-active');
        return false;
    }
}

var windowCenterX, windowCenterY;

function parallaxInit() {
    windowCenterX = Math.floor($(window).innerWidth() / 2);
    windowCenterY = Math.floor($(window).innerHeight() / 2);
}

function doParallax(mouseX, mouseY) {
    $('.b-decor').not('.m-static').each(function() {
        $(this).css({'transform': 'translate(' + (windowCenterX + mouseX) *0.015 + 'px, ' + (windowCenterY + mouseY) *0.015 + 'px)'});
    });
}

$(window).on('load resize', function () {
    parallaxInit();
});

$(document).on('mousemove', function (e) {
    doParallax(e.clientX, e.clientY);
});

$(window).on('scroll', function () {
    (function () {
        var hT = $('.b-homescreen').offset().top, hH = $('.b-homescreen').outerHeight(), wH = $(window).height(), wS = $(this).scrollTop();
        btn = $('.b-up');
        if (wS > hT + hH) {
            btn.addClass('active')
        } else if (wS < hT + hH) {
            btn.removeClass('active')
        }
    })();
});

$(document).on('ready', function () {
    if (document.getElementById('map')) {
        map();
    }
    if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
        new WOW().init();
        /*
        $('input[name="phone"]').inputmask({
            mask: '+380(99) 999-99-99',
            placeholder: '_',
            showMaskOnHover: false
        });
        */
    }

    $(document).on('click', 'form a.submit-btn', function () {
        $(this).closest('form').submit();
        return false;
    });

    $(document).on('focusin focusout', '[class*="input-"] input', function (e) {
        if (e.type === 'focusin') {
            $(this).parent().addClass('focus');
        } else {
            $(this).parent().removeClass('focus');
        }
    });

    $(document).on('swipe', '.menu-active .mobile-menu', function () {
        $('body').removeClass('menu-active');
    });

    $(document).on('click', '.menu-active .main-wrapper, .mobile-menu a', function () {
        var _this = $(this);
        $('body').removeClass('menu-active');
        if (_this.prop('tagName') === 'a' && _this.attr('href').indexOf('#') === 0) {
            return false;
        }        
    });

    $(document).on('click', '.b-header-menu-button', function () {
        $('body').addClass('menu-active');
        return false;
    });

    $(document).on('click', '.modal-close', function () {
        $.fancybox.close();
        return false;
    });

    $('.accordion').accordion({
        heightStyle: 'content'
    });

    $(document).tooltip();

    $('.b-cars-slider').slick({
        adaptiveHeight: true,
        infinite: false,
        fade: true,
        draggable: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        appendDots: $('.b-cars-slider-dots'),
        prevArrow: $('.b-cars-slider-prev'),
        nextArrow: $('.b-cars-slider-next')
    });

    $('.fancybox').fancybox({
        helpers: {overlay: {locked: false}},
        openEffect: 'none',
        closeEffect: 'none',
        padding: 0,
        margin: 15
    });

    $('a[href*="#modal"]').fancybox({
        autoSize: true,
        type: 'inline',
        //autoSize: false,
        //width: '100%',
        //height: 'auto',
        //closeBtn: false,
        padding: 0,
        margin: 0,
        scrolling: 'visible',
        fixed: false,
        autoCenter: false,
        helpers: {overlay: {locked: true}},
        beforeShow: function () {
            $('.fancybox-skin').css('background-color', 'transparent');
            $('.fancybox-skin').css('-webkit-box-shadow', 'none');
            $('.fancybox-skin').css('-moz-box-shadow', 'none');
            $('.fancybox-skin').css('box-shadow', 'none');
            $('.fancybox-skin .b-modal-catalog-size-tabs li').first().find('a').trigger('click');
            if (this.element.hasClass('video')) {
                var video_link = this.element.data('video');
                $('.modal-video-content').html('<iframe src="' + video_link + '" frameborder="0" allowfullscreen></iframe>');
            }
        },
        afterClose: function () {
            $('.callback-modal .required').parent().removeClass('error');
            $('.callback-modal .hidden').empty();
            $('.modal-video-content').empty();
        }
    }).click(function () {
        if (typeof($(this).data('from')) !== 'undefined') {
            $('<input/>', {name: 'from', value: $(this).data('from')}).appendTo('.callback-modal .hidden');
        }
        if ($(this).hasClass('data-get')) {
            var form = $(this).closest('.data-container');
            var error = false;
            form.find('.error').removeClass('error');
            form.find('.required').each(function () {
                if ($(this).val() === '') {
                    $(this).focus().parent().addClass('error');
                    error = true;
                }
            });
            if (error) {
                return false;
            }
            form.find('.data-source').clone().appendTo('.callback-modal .hidden');
        }
    });

    $('a[href*="#"]').not('a[href*="#modal"], a[href="#"]').click(function () {
        scrollTo($(this).attr("href"));
    });

    $(document).on('click', '.expand-btn', function () {
        var container = $(this).closest('.container');
        container.find('.expandable').slideDown();
        $(this).hide();
        return false;
    });

    $('.callback-form').submit(function () {
        var form = $(this);
        var error = false;

        if (typeof(form.data('thanks')) !== 'undefined') {
            var thanks = form.data('thanks');
        }
        else {
            var thanks = 'thanks.html';
        }

        form.find('.error').removeClass('error');
        form.find('.required').each(function() {
            if ($(this).val() === '') {
                $(this).focus().parent().addClass('error');
                error = true;
            }
        });
        if (error) {
            return false;
        }

        $.ajax({
            type: form.attr('method'),
            url: form.attr('action'),
            data: form.serialize(),
            success: function () {
                window.location.href = thanks;
            }
        });
        return false;
    });

    $(document).on('keyup', '.required', function () {
        $(this).parent().removeClass('error');
    });
});