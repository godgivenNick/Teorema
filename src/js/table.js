
//  открывает таблицу сравнения, закрывает таблицу заявки
function open_compare(){
    $('.table-compare').fadeIn();
    close_order();
}
//  закрывает таблицу сравнения
function close_compare(){
    $('.table-compare').fadeOut();
}

//  открывает таблицу Заявки, закрывает таблицу сравнения
function open_order(){
    $('.table-order').fadeIn();
    close_compare();
}
//  закрывает таблицу Заявки
function close_order(){
    $('.table-order').fadeOut();
}


//  открыть Сравнение по клику на лейбл соответствующей колонки шапки таблицы (тока если у нее есть класс '.active')
$('.table-head__compare.active').click(function(){
    open_compare();
});

//  открыть Заявку по клику на лейбл соответствующей колонки шапки таблицы (тока если у нее есть класс '.active')
$('.table-head__order.active').click(function(){
    open_order();
});


//  закрыть Сравнение через крестик
$('.table-compare__header-close').click(function(){
    close_compare();
});
//  закрыть Заявку через крестик
$('.table-order__header-close').click(function(){
    close_order();
});


/**
 *  Пояснения по логике работы таблицы
 * 
 *  [ 1 ] Добавление в Сравнение
 *  
 *  Када юзер жмякает на добавить в сравнение ( свг-иконка ):
 *      -- добавляем класс 'active' для этой иконки ==> '.table-room__compare-btn.active' ( убираем при повторном клике )
 *      -- добавляем класс 'active' для лейбла шапки ==> '.table-head__compare.active'
 * 
 * 
 *  [ 2 ] Добавление в Заявку
 *  
 *  Када юзер жмякает на добавить в заявку ( кнопка справа ):
 *      -- добавляем класс 'active' для этой кнопки ==> '.table-room__order-btn.active' ( убираем при повторном клике )
 *      -- добавляем класс 'active' для лейбла шапки ==> '.table-head__order.active'
 * 
 */



//  показать карту в таблице помещений
$('.table-room__onmap').click(function(){

    var table_map_btn = $(this),
        table_map = $(this).closest('.table-room').find('.table-room__map');

    if(!table_map_btn.hasClass('active')){
        var table_plan_btn = $(this).closest('.table-room').find('.table-room__onplan'),
            table_plan = $(this).closest('.table-room').find('.table-room__plan');

        if(table_plan_btn.hasClass('active')){
            table_plan_btn.removeClass('active');
            table_plan.css({'opacity' : '0'});
        }

        table_map_btn.addClass('active');
        table_map_btn.find('span').text('Скрыть карту');
        table_plan.css({'display' : 'none', 'opacity' : '1'});

        table_map.fadeIn();

    } else {
        table_map_btn.removeClass('active');
        table_map_btn.find('span').text('На карте');
        table_map.fadeOut();
    }
});


//  показать планировку в таблице помещений
$('.table-room__onplan').click(function(){
    var table_plan_btn = $(this),
        table_plan = $(this).closest('.table-room').find('.table-room__plan'), 
        table_plan_btn_text_default = $(this).attr('floor');

    if(!table_plan_btn.hasClass('active')){
        var table_map_btn = $(this).closest('.table-room').find('.table-room__onmap'),
            table_map = $(this).closest('.table-room').find('.table-room__map');

        if(table_map_btn.hasClass('active')){
            table_map_btn.removeClass('active');
            table_map.css({'opacity' : '0'});
        }

        table_plan_btn.addClass('active');
        table_plan_btn.find('span').text('Скрыть');
        table_map.css({'display' : 'none', 'opacity' : '1'});

        table_plan.fadeIn();

    } else {
        table_plan_btn.removeClass('active');
        table_plan_btn.find('span').text(table_plan_btn_text_default + ' этаж');
        table_plan.fadeOut();

    }
});


//  дропдаун для таблицы Заявка
$('.table-order-form__select select').select2({
    placeholder: "Удобное время для звонка",
    dropdownParent: $('.table-order-form__select'),
});
$('.table-order-form__select select').on('select2:opening select2:closing', function( event ) {
    var $searchfield = $(this).parent().find('.select2-search__field');
    $searchfield.prop('disabled', true);
});

//  дропдаун для сортировки помещений
$('.table__sort-select select').select2({
    placeholder: "Сортировать",
    dropdownParent: $('.table__sort-select'),
});
$('.table__sort-select select').on('select2:opening select2:closing', function( event ) {
    var $searchfield = $(this).parent().find('.select2-search__field');
    $searchfield.prop('disabled', true);
});



//  отображение мобильной версии названия помещения для таблиц Помещения
window.redo_office_name = function(container){

    var breakpoint_width = $('.table-room__name[data-mobile-width]').attr('data-mobile-width');

    // < 768
    if( $( window ).width() < breakpoint_width ){

        $('[data-mobile-loc]').each(function(){

            var this_id = $(this).attr('data-mobile-loc'),
                this_bro = $('[data-desktop-loc="' + this_id + '"]');

            if( $(this).text() == '' ){
            
                $(this).attr('href', this_bro.attr('href'));
                $(this).text(this_bro.text());

                // обнуляю бро
                this_bro.text('');
                this_bro.attr('href', '');

            } else {
                return;
            }

        });

    }


    // >= 768
    if( $( window ).width() >= breakpoint_width ){
        
        $('[data-desktop-loc]').each(function(){

            var this_id = $(this).attr('data-desktop-loc'),
                this_bro = $('[data-mobile-loc="' + this_id + '"]');

            if( $(this).text() == '' ){

                $(this).attr('href', this_bro.attr('href'));
                $(this).text(this_bro.text());
    
                // обнуляю бро
                this_bro.text('');
                this_bro.attr('href', '');

            } else {
                return;
            }

        });

    } 
};


window.redo_office_name();
$(window).resize(function(){
    window.redo_office_name();
});




//  13.02

//  показать карту в таблице бизнес-центров
$('.table-bc__onmap').click(function(){

    var table_map_btn = $(this),
        table_map = $(this).closest('.table-bc').find('.table-bc__map');

    if(!table_map_btn.hasClass('active')){

        table_map_btn.addClass('active');
        table_map_btn.find('span').text('Скрыть карту');

        table_map.fadeIn();

    } else {
        table_map_btn.removeClass('active');
        table_map_btn.find('span').text('На карте');
        table_map.fadeOut();
    }
});