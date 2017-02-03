/**
 * Created by hanguyen on 12/4/2016.
 */
$(document).ready(function () {
    check_lock();
    update_item_code();
});

function check_lock() {
    $(document).on('click', '.mrk_check_lock', function () {
        var element = $(this).data('element');
        if ($(element).prop('disabled')) {
            $(element).prop('disabled', false);
        } else {
            $(element).prop('disabled', true);
        }

    });
}

function update_item_code() {
    var btn_add = false;
    $(document).on('click', '.mrk_add_item_code', function () {
        if (btn_add) {
            return false;
        } else {
            btn_add = true;
        }
        var item_code_list = {};
        for($i=1;$i<3;$i++) {
            if($i==1){
                var property_name = 'export';
                var class_object= $('.mrk_number_export');
            }else{
                var property_name = 'import';
                var class_object= $('.mrk_number_import');
            }

            class_object.each(function (index, value) {
                var item_code_id = $(this).data('item-code');
                var client_id = $(this).data('client');
                var plan_item_code_id = $(this).data('plan-item-code');
                var client_name = $(this).data('client-name');
                var plan_lot_no = $(this).data('plan-lot-no');
                var item_code_name = $(this).data('item-name');
                var number_item_code = $(this).val();
                var item_key = 'item_code_' + item_code_id;
                if (!item_code_list.hasOwnProperty(item_key)) {
                    item_code_list[item_key] = {}
                }

                item_code_list[item_key][property_name] = {
                    'item_code_id': item_code_id,
                    'client_id': client_id,
                    'plan_item_code_id': plan_item_code_id,
                    'number_item_code': number_item_code,
                    'client_name': client_name,
                    'plan_lot_no': plan_lot_no,
                    'item_code_name': item_code_name
                }
            });
        }

        var plan_id = $('.mrk_select_plan').val();
        var client_id=0;
        if($('.mrk_select_client').length > 0){
            client_id = $('.mrk_select_client').val();
        }
        $.ajax({
            type: "POST",
            url: '/index.php?r=stock/create',
            data: {
                'plan_id': plan_id,
                'client_id': client_id,
                'item_code_list': JSON.stringify(item_code_list),
            },
            dataType: "json"
        }).done(function (response) {
            btn_add = false;
            if (response.status == "success") {
                window.location.href = response.url;
            } else {
                show_error(response.message);
            }
        });
    });
}

function show_error(message) {
    $('.mrk_error').html(message).show();
}

function hide_error() {
    $('.mrk_error').html('').hide();
}