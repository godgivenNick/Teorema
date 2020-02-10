
    $('.filter__map-btn').click(function(){
        $('.filter-bc__wrap').slideToggle();
    });

    $('[filter-select="district"] .filter-main__select').select2({
        closeOnSelect : false,
        placeholder : "Район",
        allowHtml: true,
        allowClear: true,
        dropdownParent: $('[filter-select="district"]'),
    });
    
    $('[filter-select="bc"] .filter-main__select').select2({
        closeOnSelect : false,
        placeholder : "Бизнес-центр",
        allowHtml: true,
        allowClear: true,
        dropdownParent: $('[filter-select="bc"]'),
    });

    $('[filter-select="district"] .filter-main__select, [filter-select="bc"] .filter-main__select').on('select2:opening select2:closing', function( event ) {
        var $searchfield = $(this).parent().find('.select2-search__field');
        $searchfield.prop('disabled', true);
    });
    


    document.querySelector('.filter').style.pointerEvents = 'auto';
    document.querySelector('.filter').style.visibility = 'visible';
    document.querySelector('.filter').style.zIndex = '1';
    document.querySelector('.filter').style.display = 'none';


/* Range цены и площади */

    var filter_sqr = $('[filter-range="sqr"]'),
        min_sqr = filter_sqr.attr('min'),
        max_sqr = filter_sqr.attr('max'),
        filter_sqr_min = $(filter_sqr).find('[min]'),
        filter_sqr_max = $(filter_sqr).find('[max]'),
        filter_sqr_range = $(filter_sqr).find('.filter-main__input-range');
    
    filter_sqr_range.slider({
        range: true,
        min: 0,
        max: max_sqr,
        values: [ min_sqr, max_sqr ],
        slide: function( event, ui ) {
            filter_sqr_min.val(ui.values[ 0 ]);
            filter_sqr_max.val(ui.values[ 1 ]);
        }
    });

    $(filter_sqr).find('[min]').attr("placeholder", min_sqr);
    $(filter_sqr).find('[max]').attr("placeholder", max_sqr);
    
    
    filter_sqr_min.val( $( ".filter-main__input-range" ).slider( "values", 0 ) );
    filter_sqr_max.val($( ".filter-main__input-range" ).slider( "values", 1 ) );
        
    filter_sqr_min.change(function() {
    
        var this_val = $(this).val();
        $('[filter-range="sqr"] .filter-main__input-range').slider( "values", 0, this_val);

    });
    filter_sqr_max.change(function() {
    
        var this_val = $(this).val();
        $('[filter-range="sqr"] .filter-main__input-range').slider( "values", 1, this_val);

    });

    var filter_range_rent = document.getElementById('filter_range_rent_value');
        filter_range_rent_values = JSON.parse(filter_range_rent.getAttribute('value')),
        filter_range_rent_length = filter_range_rent_values.length;
        
    filter_range_rent_value.innerHTML = filter_range_rent_values[0];
    filter_range_rent_value.addEventListener('click', function(e){

        var this_inner = e.target.innerHTML;
        var this_inner_id = filter_range_rent_values.indexOf(this_inner);
        var next_id = +this_inner_id + 1;
        if(next_id == filter_range_rent_length){
            next_id = 0;
        }

        filter_range_rent_value.innerHTML = filter_range_rent_values[next_id];

    });
    



    var filter_price = $('[filter-range="price"]'),
        min_price = filter_price.attr('min'),
        max_price = filter_price.attr('max'),
        filter_price_min = $(filter_price).find('[min]'),
        filter_price_max = $(filter_price).find('[max]'),
        filter_price_range = $(filter_price).find('.filter-main__input-range');
        
    
    filter_price_range.slider({
        range: true,
        min: 0,
        max: max_price,
        values: [ min_price, max_price ],
        slide: function( event, ui ) {
            filter_price_min.val(ui.values[ 0 ]);
            filter_price_max.val(ui.values[ 1 ]);
        }
    });

    $(filter_price).find('[min]').attr("placeholder", min_price);
    $(filter_price).find('[max]').attr("placeholder", max_price);
    
    filter_price_min.val( $( ".filter-main__input-range" ).slider( "values", 0 ) );
    filter_price_max.val($( ".filter-main__input-range" ).slider( "values", 1 ) );
        
    filter_price_min.change(function() {
    
        var this_val = $(this).val();
        $('[filter-range="price"] .filter-main__input-range').slider( "values", 0, this_val);

    });
    filter_price_max.change(function() {
    
        var this_val = $(this).val();
        $('[filter-range="price"] .filter-main__input-range').slider( "values", 1, this_val);

    });
/* Range цены и площади */