
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
$('.table-order-form__select select').each(function(){
    $(this).select2({
        placeholder: "Удобное время для звонка",
        dropdownParent: $(this).closest('.table-order-form__select'),
    });
});
$('.table-order-form__select select').on('select2:opening select2:closing', function( event ) {
    var $searchfield = $(this).parent().find('.select2-search__field');
    $searchfield.prop('disabled', true);
});


//  дропдаун для сортировки помещений
$('.table__sort-select select').each(function(){
    $(this).select2({
        placeholder: "Сортировать",
        dropdownParent: $(this).closest('.table__sort-select'),
    });
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


//  Открытие списка помещений в таблицы Бизнес-центров ( открыт может быть только один лист с помещениями)


//  хранит дефолтные значения в каждой кнопке "показать свободные помещения от ... до ..."
var table_bc_btn_arr = {};

$('.table-bc__show-btn').each(function(){


    // переменные для последующей логики
    var table_bc_id = $(this).closest('.table-bc').attr('data-table-bc-id'),
        show_room_table_btn = $(this),
        show_room_table_btn_HTML = $(this).html(),
        show_room_table_btn_TRANSITION = $(this).css('transition-duration'),

        show_room_table_btn_COUNT_VALUE = $(this).find('.table-bc__show-btn--amount').text(),
        show_room_table_btn_COUNT_HTML = `<span class="table-bc__show-btn--amount">${show_room_table_btn_COUNT_VALUE}</span>`;


        table_bc_btn_arr[table_bc_id] = {
            'html' : show_room_table_btn_HTML,
            'count': show_room_table_btn_COUNT_VALUE,
        };


    
    //  Открыли выгрузку по БЦ-1 ==> Открыли выгрузку по БЦ-2 && Закрыли выгрузку по БЦ-1

    //  обработка клика
    show_room_table_btn.click(function(){

        var bc_table = $(this).closest('.table-bc'),
            bc_table_room = bc_table.find('.table__table-bc-room');

        if(!$(this).hasClass('active')){

            if(document.querySelector('.table-bc__show-btn.active')){
                // если какая-та таблица уже была открыта

                var opened_btn = $('.table-bc__show-btn.active'),
                    opened_btn_table = opened_btn.closest('.table-bc'),
                    opened_btn_table_id = opened_btn_table.attr('data-table-bc-id'),
                    opened_btn_room = opened_btn_table.find('.table__table-bc-room'),

                    opened_btn_count_value = table_bc_btn_arr[opened_btn_table_id]['count'],
                    opened_btn_html = table_bc_btn_arr[opened_btn_table_id]['html'];

                    opened_btn.removeClass('active');
                    opened_btn.html(opened_btn_html);
                    opened_btn.find('.table-bc__show-btn--amount').text(opened_btn_count_value);
                    opened_btn_room.fadeOut();
            }

            // жмякнутая кнопка
            $(this).addClass('active');
            bc_table_room.fadeIn();

            show_room_table_btn.html('СКРЫТЬ' + show_room_table_btn_COUNT_HTML);

        } else {

            $(this).removeClass('active');
            bc_table_room.fadeOut();
            setTimeout(function(){
                show_room_table_btn.html(show_room_table_btn_HTML);
            }, show_room_table_btn_TRANSITION.split('s')[0] * 1000 );
        }
        

    });

});
