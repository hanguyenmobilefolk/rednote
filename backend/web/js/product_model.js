/**
 * Created by hanguyen on 10/13/2016.
 */
var clientItemcodesJsonObj = {};
$(document).ready(function () {
    if(parseInt($('#mrk_product_model_id').val())  >0){
        clientItemcodesJsonObj = $.parseJSON($('#div_contain_itemcode_data').html());
        buid_form_data();
    }


    $('.mrk_add_itemcode').on('click', function () {
        var div_contain_client = "#" + $(this).data('parent-row');
        var itemcode_name = $('select.mrk_select_itemcode option:selected', div_contain_client).text();
        var itemcode_id = $('.mrk_select_itemcode', div_contain_client).val();
        var itemcode_number = $('.mrk_input_itemcode_number', div_contain_client).val();
        var new_row = generate_item_code_new_row(itemcode_id, itemcode_name, itemcode_number);
        $('.mrk_table_itemcode_list', div_contain_client).append(new_row);
        reset_form_add_item_code(div_contain_client);
    });

    $('.mrk_add_client').on('click', function () {
        var div_contain_client = "#" + $(this).data('parent-row');
        var client_name = $('select.mrk_select_client option:selected', div_contain_client).text();
        var client_id = $('.mrk_select_client', div_contain_client).val();
        var priority = $('.mrk_priority', div_contain_client).val();
        var delay_time = $('.mrk_delay_time', div_contain_client).val();
        var client_type = $('.mrk_client_type', div_contain_client).val();
        var client_key = "client_" + client_id;
        var edit_client_id = parseInt($('.mrk_edit_client_id',div_contain_client).val());
        if (edit_client_id > 0){
            //check client exist
            if (client_id != edit_client_id && clientItemcodesJsonObj.hasOwnProperty(client_key)) {
                alert(client_name + " đã được chọn.Vui lòng chọn PMD khác!");
                return false;
            }
        }else{
            //check client exist
            if (clientItemcodesJsonObj.hasOwnProperty(client_key)) {
                alert(client_name + " đã được chọn.Vui lòng chọn PMD khác!");
                return false;
            }
        }

        var item_code_list = {};
        var item_code_display_list = [];
        $('.mrk_table_itemcode_list tbody tr', div_contain_client).each(function (index, value) {
            var item_code_id = $(this).data('itemcode-id');
            var item_code_name = $(this).data('itemcode-name');
            var item_code_number = $(this).data('itemcode-number');
            item_code_list[item_code_id] = {
                'item_code_id': item_code_id,
                'item_code_name': item_code_name,
                'item_code_number': item_code_number
            };
            item_code_display_list.push(item_code_name + "(" + item_code_number + ")");
        });
        item_code_display_list = item_code_display_list.join(', ');

        //xoa client cu, truoc khi thay client moi
        if (edit_client_id > 0 && client_id != edit_client_id ){
            delete clientItemcodesJsonObj["client_" + edit_client_id];
        }

        var client_value = {
            'client_type': client_type,
            'client_id': client_id,
            'client_name': client_name,
            'priority': priority,
            'delay_time': delay_time,
            'item_code_list': item_code_list
        };
        clientItemcodesJsonObj[client_key] = client_value;


        var new_row = generate_client_new_row(client_id, client_name, priority,delay_time,item_code_display_list,div_contain_client);

        if (edit_client_id > 0){
            $('.mrk_edit_client_id',div_contain_client).val(0);
            $('#tr_client_'+edit_client_id, div_contain_client).replaceWith(new_row);
        }else{
            $('.mrk_table_client_list', div_contain_client).append(new_row);
        }

        reset_form_add_client(div_contain_client);
    });

    $(document).on("click", '.mrk_delete_itemcode_row', function () {
        $(this).parent().parent().remove();
    });

    $(document).on("click", '.mrk_delete_client_row', function () {
        delete clientItemcodesJsonObj["client_" + $(this).data('client-id')];
        $(this).parent().parent().remove();
    });

    $(document).on("click", '.mrk_edit_client_row', function () {
        var client_object = clientItemcodesJsonObj["client_" + $(this).data('client-id')];
        var parent_id = $(this).data('parent-id');
        $('.mrk_select_client', parent_id).val(client_object.client_id);
        $('.mrk_priority', parent_id).val(client_object.priority);
        $('.mrk_delay_time', parent_id).val(client_object.delay_time);
        $.each(client_object.item_code_list, function (index, value) {
            var new_row = generate_item_code_new_row(value.item_code_id, value.item_code_name, value.item_code_number);
            $('.mrk_table_itemcode_list', parent_id).append(new_row);
        });
        $('.mrk_edit_client_id',parent_id).val(client_object.client_id);
    });

    var mrk_submit_product_mode = false;
    $('#btn_submit_product_model').on('click',function(){
        if (!mrk_submit_product_mode){
            mrk_submit_product_mode = true;
        }else{
            return false;
        }
        var _csrf_backend = $('#_csrf-backend').val();
        var model_name = $('#model_name').val();
        var model_code = $('#model_code').val();


        var url ='';
        var product_model_id = parseInt($('#mrk_product_model_id').val());
        if(product_model_id > 0){
            url ='index.php?r=product-model/update&id='+product_model_id;
        }else{
            url ='index.php?r=product-model/create';
        }

        var data = {
            '_csrf-backend': _csrf_backend,
            'product_model_id': product_model_id,
            'model_name':model_name,
            'model_code': model_code,
            'client_itemCodes': JSON.stringify(clientItemcodesJsonObj)
        };
        $.post(url, data, function (response) {
            mrk_submit_product_mode = false;

            if(response.status =='success'){
                window.location.href = response.url;
            }else{
                var error = '';
                $.each(response.message, function (index, value) {
                    error+='<p>'+value+'</p>';
                });
                $('.alert_error').html(error);
                return false;
            }
        });
    });

});

function reset_form_add_item_code(parent_id) {
    $('.mrk_select_itemcode', parent_id).val(0);
    $('.mrk_input_itemcode_number', parent_id).val('');
}

function reset_form_add_client(parent_id) {
    $('.mrk_select_client', parent_id).val(0);
    $('.mrk_priority', parent_id).val('');
    $('.mrk_delay_time', parent_id).val('');
    $('.mrk_table_itemcode_list tbody', parent_id).html('');

}

function generate_item_code_new_row(itemcode_id, itemcode_name, itemcode_number) {
    return "<tr data-itemcode-name='" + itemcode_name + "' data-itemcode-id='" + itemcode_id + "' data-itemcode-number='" + itemcode_number + "'>" +
        "<td>" + itemcode_name + "</td>" +
        "<td>" + itemcode_number + "</td>" +
        "<td><input type='button' value='Xóa' class='btn btn-default btn-sm mrk_delete_itemcode_row'></td>" +
        "</tr>";
}

function generate_client_new_row(client_id, client_name, priority,delay_time,item_code_display_list,parent_id){
    return "<tr id='tr_client_"+client_id+"'>" +
        "<td>" + client_name + "</td>" +
        "<td>" + priority + "</td>" +
        "<td>" + delay_time + "</td>" +
        "<td>" + item_code_display_list + "</td>" +
        "<td>" +
        "<input type='button' value='Xóa' style='margin: 10px 0px 0px 5px' class='btn btn-default btn-sm mrk_delete_client_row' data-client-id='" + client_id + "'>" +
        "<input type='button' value='sửa' style='margin: 10px 0px 0px 5px' class='btn btn-default btn-sm mrk_edit_client_row' data-client-id='" + client_id + "' data-parent-id='" + parent_id + "' >" +
        "</td>" +
        "</tr>";
}

function buid_form_data(){
    $.each(clientItemcodesJsonObj, function (index, value) {
        var item_code_display_list = [];
        $.each(value.item_code_list, function (item_code_index, item_code_value) {
            item_code_display_list.push(item_code_value.item_code_name + "(" + item_code_value.item_code_number + ")");
        });
        item_code_display_list = item_code_display_list.join(', ');
        var parent_id = '';
        switch (value.client_type){
            case 'line_1':
                parent_id = '#line_1_form_group';
                break;
            case 'line_2':
                parent_id = '#line_2_form_group';
                break;
            case 'line_3':
                parent_id = '#line_3_form_group';
                break;
        }
        var new_row = generate_client_new_row(value.client_id, value.client_name, value.priority, value.delay_time, item_code_display_list, parent_id);
        $('.mrk_table_client_list', parent_id).append(new_row);
    });
}