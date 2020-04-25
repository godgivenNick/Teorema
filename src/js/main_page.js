$( document ).ready(function() {

    // Один раз объявляем функцию, потом используем так, как в примере
    jQuery.fn.exists = function() {
        return $(this).length;
    }

    // 1
    //  Добавляю класс "main-page" для body

    if( $('.main-promo').exists() ){
        $('body').addClass('main-page');
    }

    var client_width = document.documentElement.clientWidth;

    //  Promo -- галерея
    if( $('.main-promo-galery').exists() ){

        $('.main-promo-galery__container').slick({
            infinite: true,
            centerMode: true,
            slidesToShow: 1,
            draggable: false,
            accessibility: false,
            arrows: true,

            speed: 600,
            fade: true,

            prevArrow: ".main-promo-galery__prev",
            nextArrow: ".main-promo-galery__next",

            dots: true,
            dotsClass: 'main-promo-galery__dots',
            appendDots: '.main-promo-galery__ctrls',
        });


        //  Для мобилок фотки сначала скролятся по горизонтали, а потом происходит смена слайда ( да будет проклят Вадик и его идеи )
        if ( client_width < 768 ) {

            setTimeout(scroll_slide_img, 1000);

            $('.main-promo-galery__container').on('afterChange', function(event, slick, currentSlide, nextSlide){
                setTimeout(scroll_slide_img, 1000);
            });

        }


        function scroll_slide_img(){

            $('.main-promo-galery-slide.scrolled .main-promo-galery-slide__img img').css({
                'transform' : `translateX(0px)`,
                'transition' : `0s`,

            });
            $('.main-promo-galery-slide.scrolled').removeClass('scrolled');

            var main_promo_active_slide = $('.main-promo-galery-slide.slick-active'),
                main_promo_active_slide_IMG = main_promo_active_slide.find('.main-promo-galery-slide__img img'),
                main_promo_active_slide_IMG_WIDTH = main_promo_active_slide_IMG.width(),
                main_promo_active_slide_IMG_GAP = main_promo_active_slide_IMG_WIDTH - client_width;


            main_promo_active_slide_IMG.css({
                'transform' : `translateX(-${main_promo_active_slide_IMG_GAP}px)`,
                'transition' : '3.5s ease-in-out',
            });

            main_promo_active_slide.addClass('scrolled');

            setTimeout(function(){
                // $('.main-promo-galery__container').slick('slickNext');
            }, 4500);


        }

    }


    //  как сделать перелистывание слайда!?!??!
    // https://api.jquery.com/animate/ 




    if( $('.main-selling').exists() ){

        setTimeout(function(){
            // не спрашивай зачем здесь это ^_^
            $('[data-tab-container-id="main_sale_2"]').css({
                'display' : 'none',
            });
        }, 500)


        $('.main-selling-list').each(function(){

            var selling_container = $(this).find('.main-selling-list__container'),
                prev = $(this).find('.main-selling-list__prev'),
                next = $(this).find('.main-selling-list__next'),
                ctrls = $(this).find('.main-selling-list__ctrls'),
                ggg = 0;


            if ( client_width < 768 ) {

                $(this).find('.main-selling-list__container').slick({
                infinite: false,
                slidesToShow: 2,
                draggable: false,
                accessibility: false,
                arrows: true,
        
                speed: 600,
        
                prevArrow: prev,
                nextArrow: next,
        
                dots: true,
                dotsClass: 'main-selling-list__dots',
                appendDots: ctrls,
        
                responsive: [
                    {
                        breakpoint: 460,
                        settings: {
                          slidesToShow: 1,
                          slidesToScroll: 1,
                          infinite: true,
                        }
                    },
                ]
            });
            }


            $(window).resize(function(){

                if ( client_width >= 768 ) {
                    $(this).find('.main-selling-list__container').slick('unslick');
                }
                
            });


        });

    
    }


});