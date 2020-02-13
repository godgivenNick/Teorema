$( document ).ready(function() {

function checkSizes(){
    $('header.header').each(function(){
        $('body').css({'padding-top':$(this).height()});
    });
}
checkSizes();

$(window).resize(checkSizes);
$('#bx-panel-hider,#bx-panel-expander').each(function(){
    $(this).bind('mousedown touchstart',function(){
        setTimeout(checkSizes,200);
    });
});


var client_width = document.documentElement.clientWidth; //     ширина окна

function is_lower_768(){
    return client_width < 768 ? true : false;
}


//  Слайдер главного разворота
if(document.querySelector('.bc-promo__main')){

    $('.bc-promo-galery').slick({
        infinite: true,
        centerMode: true,
        variableWidth: true,
        slidesToShow: 1,
        draggable: false,
        pauseOnHover: true,
        autoplay: true,
        accessibility: false,
        arrows: false,
    });


    var bc_promo_galery = document.querySelector('.bc-promo-galery');
    var bc_promo_map = document.querySelector('.bc-promo-map');


    //  показать мапу, которая под слайдером
    document.addEventListener('click', function(e){


        if(e.target.closest('.bc-promo__map')){
            var map_btn = e.target.closest('.bc-promo__map');
            if(!map_btn.classList.contains('active')){
                map_btn.classList.add('active');
                bc_promo_galery.classList.add('swipe');
            } else {
                map_btn.classList.remove('active');
                bc_promo_galery.classList.remove('swipe');

            }
        }
    });


    //  Поделиться в социалках
    document.addEventListener('click', function(e){

        if(e.target.closest('.bc-promo__social-icon')){
            var social = e.target.closest('.bc-promo__social');
            if(!social.classList.contains('active')){
                social.classList.add('active');
            } else {
                social.classList.remove('active');

            }
        } else if(!e.target.closest('.bc-promo__social')){
            document.querySelector('.bc-promo__social').classList.remove('active');
        }


    });

}





//  Слайдер с Арендаторами
$('.rent-slider__container').slick({
    infinite: true,
    slidesToShow: 8,
    slidesToScroll: 4,
    prevArrow: ".rent-slider-prev",
    nextArrow: ".rent-slider-next",
    swipeToSlide: true,
    responsive: [

        {
          breakpoint: 1366,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 3,
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
          }
        },
        {
            breakpoint: 640,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            }
        },
        {
            breakpoint: 425,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
        },
    ]

});


//  большая Галерея с фотками
if(document.querySelector('.bc-galery')){

    if ( is_lower_768() ) {

        document.querySelectorAll('.bc-galery-slide img').forEach(function(each){
            each.style.width = client_width + 'px';
            each.style.height = 'auto';
        });

    }


    $('.bc-galery-slider__container').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: ".bc-galery-slider__prev",
        nextArrow: ".bc-galery-slider__next",

        dots: true,
        dotsClass: 'bc-galery-slider__dots',
        appendDots: '.bc-galery-slider',
    });

    if( is_lower_768() ){
        var bc_galery_dots = document.querySelector('.bc-galery-slider .bc-galery-slider__dots');
        var dots_width;
        dots_width = window.getComputedStyle( bc_galery_dots ).width;
        bc_galery_dots.style.left = 'calc(50% - ' + parseInt(dots_width, 10) / 2 + 'px)';
    }
}


//  Дропдауны
if(document.querySelector('.n-dropdown')){

    $('.n-dropdown__heading').click(function(){

        var dd = $(this).closest('.n-dropdown');
        if(!dd.hasClass('show')){
            dd.addClass('show');
        } else {
            dd.removeClass('show');
        }

        dd.find('.n-dropdown__content').slideToggle();

    });

}


//
if(document.querySelector('.bc-desc')){

    var bc_text = document.querySelector('.bc-desc__content p');
    var bc_text_height = window.getComputedStyle(bc_text).height;

    var bc_text_max_height = '240px';
    if ( client_width < 768 ) {
        bc_text_max_height = '210px';
    }
    
    bc_text.style.height = bc_text_max_height;
    var bc_text_btn = document.querySelector('.bc-desc__show-btn');
    bc_text_btn.addEventListener('click', function(e){

        if(!e.target.classList.contains('_show')){
            e.target.classList.add('_show');
            e.target.innerHTML = 'Свернуть';
            bc_text.style.height = bc_text_height;
        } else {
            e.target.classList.remove('_show');
            e.target.innerHTML = 'Развернуть';
            bc_text.style.height = bc_text_max_height;

        }

    });

}



if(document.querySelector('.input-field')){


    Array.from(document.querySelectorAll('.input-field')).forEach(function(each){

        var input_field = each,
            input = each.querySelector('input') ? each.querySelector('input') : each.querySelector('textarea'),
            label = each.querySelector('.input-field__label'),
            error = each.querySelector('.input-field__label') ? each.querySelector('.input-field__label') : false,
            input_value;

        
        input.addEventListener('focus', function(e){

            input_field.classList.add('focused');

        });

        input.addEventListener('blur', function(e){

            input_value = input.value;
            
            if(input_value.length < 1) {
                input_field.classList.remove('focused');
            }

        });



    });

}


/**
 * 
 * Менюшечка родненькая
 * 
 */

function close_all_header_nodes(){

    var header_opened_btn;


    // 1 buttons
    if(document.querySelector('.header-top-btn.opened')){

        header_opened_btn = document.querySelector('.header-top-btn.opened');

        if(header_opened_btn.getAttribute('header-btn') == 'menu'){
            header_opened_btn.querySelector('.header-top-btn__title').innerHTML = 'Меню';
        }
        else if(header_opened_btn.getAttribute('header-btn') == 'filter'){
            header_opened_btn.querySelector('.header-top-btn__title').innerHTML = 'Найти помещение';
        }

        document.querySelector('.header-top-btn.opened').classList.remove('opened');
    }

    // 2 windows
    Array.from(document.querySelectorAll('[header-item]')).forEach(function(each){
        if(each.classList.contains('show')){
            each.classList.remove('show');
        }
    });


    // 3 body overflow
    document.body.style.overflowY = 'auto';
    document.body.style.height = 'auto';

    // 4    вернуть вывод БЦ
    document.querySelector('.header-bottom').style.display = 'flex';
};

document.addEventListener('click', function(e){

    if(e.target.closest('.header-top-btn')){

        var header_top_btn = e.target.closest('.header-top-btn'),
            header_top_btn_id = header_top_btn.getAttribute('header-btn') ? header_top_btn.getAttribute('header-btn') : '',
            opened = header_top_btn.classList.contains('opened') ? true : false;
        

        // открытие
        if(!opened){

            // 1    вырубить все предыдущие
            close_all_header_nodes();

            // 2    врубить жмякнутую кнопку
            header_top_btn.classList.add('opened');

            // 3    врубить нужную выпадаху
            if(document.querySelector('[header-item="' + header_top_btn_id + '"]')){
                document.querySelector('[header-item="' + header_top_btn_id + '"]').classList.add('show');
            }

            // 4    запретить скролить body
            document.body.style.overflowY = 'hidden';
            document.body.style.height = '100vh';

            // 5    отключить вывод БЦ
            document.querySelector('.header-bottom').style.display = 'none';
            
        } 

        // закрытие
        else if(opened){
            close_all_header_nodes();
        }
    }

    if(!e.target.closest('[header-item]') && !e.target.closest('.header-top-btn') && !e.target.closest('.select2-container') && !e.target.closest('.select2-selection__choice__remove')){
        close_all_header_nodes();
    }

});


// Инпут поле поиска в менюшке
var header_search = document.querySelector('.header-search');
header_search.querySelector('input').addEventListener('change', function(e){
    if(e.target.value.length > 0){
        header_search.querySelector('.header-search__btn').classList.add('ready');
    } else {
        header_search.querySelector('.header-search__btn').classList.remove('ready');
    }
});
header_search.querySelector('input').addEventListener('input', function(e){
    if(e.target.value.length > 0){
        header_search.querySelector('.header-search__btn').classList.add('ready');
    } else {
        header_search.querySelector('.header-search__btn').classList.remove('ready');
    }
});




//  слайдер для плитки клиентов в планировке
window.plan_clients_slider = function(){

    if( $( window ).width() > 1024 && $('.plan__clients').hasClass('slick-initialized') ){

        $('.plan__clients').slick('unslick');
        return;
    }


    if( $( window ).width() <= 1024 ){

        $('.plan__clients').slick({
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 2,
            arrows: false,
            dots: false,
            responsive: [

                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 5,
                    slidesToScroll: 2,
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                  }
                },
                {
                  breakpoint: 640,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                  }
                },
                {
                    breakpoint: 460,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 370,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 1,
                    }
                },
            ]
        });
    }
};

window.plan_clients_slider();
$(window).resize(function(){
    window.plan_clients_slider();
});



//
if(document.querySelector('.form-callback')){

    function callback_form_valid(){

    }

}




//  [ 12.02 ]


//  переключение табов + ползунок
window.calc_f_results_toddler = function(){

    // 1 шаг - инициализация
    var f_results_tab_container = $('.filter-result-tabs'),
        f_results_tab_toddler = f_results_tab_container.find('.filter-result-tabs__toddler');

    var f_results_tab_active = $('.filter-result-tabs__tab.active'),
        f_results_tab_active_width = f_results_tab_active.width(),
        f_results_tab_active_left = f_results_tab_active.position().left,
        f_results_tab_active_marginLeft = f_results_tab_active.css('margin-left');
    
    f_results_tab_toddler.css({
        'width' : f_results_tab_active_width,
        'left' : f_results_tab_active_left + parseInt(f_results_tab_active_marginLeft, 10) + 'px',
        'display' : 'block',
    });
};

window.f_results_click_handler = function(){

    // 2 шаг - обработка кликов
    $('.filter-result-tabs__tab').click(function(){

        if( !$(this).hasClass('active') ){

            //  убрать актив
            $('.filter-result-tabs__tab.active').removeClass('active');

            // добавить актив
            $(this).addClass('active');

            // переместить ползунок
            window.calc_f_results_toddler();
        } else {
            return;
        }
        

    });
};

setTimeout(function(){
    window.calc_f_results_toddler();
    window.f_results_click_handler();
}, 10);
$(window).resize(function(){
    window.calc_f_results_toddler();
});




//  [ 13.02 ]

//  Галерея в карточках бизнес-центров, стр. "Результат фильтрации по БЦ"

window.init_table_bc_galery_each = function(){

    $('.table-bc__galery').each(function(){
        $(this).slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
            dotsClass: 'table-bc__galery-dots',
            // appendDots: '.bc-galery-slider',
            responsive: [
        
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  }
                },
            ]
        });
    });

};
window.init_table_bc_galery_each();


//  END
});