/**
 * Created by hanguyen on 11/23/2016.
 */
var plan_break_time_edit_object ='';
var plan_holiday_edit_object ='';
$(document).ready(function () {
    calculate_plan_time();
    update_plan();
    add_break_time();
    edit_break_time();
    add_holiday();
    edit_holiday();
    delete_row();
});

function add_break_time(){
    var mrk_add_brk = false;
    $('.mrk_add_break_time').on('click',function(){
        if (!mrk_add_brk) {
            mrk_add_brk = true;
        } else {
            return false;
        }
        var start_time = $('#breaktime_start').val();
        var end_time = $('#breaktime_end').val();
        var html = "<tr data-start-time='"+start_time+"' data-end-time='"+end_time+"'>"+
        "<td>"+start_time+"</td>"+
        "<td>"+end_time+"</td>"+
        "<td>"+
            "<input type='button' value='Xóa' style='margin: 0px 0px 0px 5px'"+
        "class='btn btn-default btn-sm mrk_delete_row'>"+
            "<input type='button' value='sửa' style='margin: 0px 0px 0px 5px'"+
        "class='btn btn-default btn-sm mrk_edit_break_time_row'>"+
        "</td>"+
        "</tr>";
        if(plan_break_time_edit_object==''){
            $('.mrk_table_break_time tbody').append(html);
        }else{
            plan_break_time_edit_object.replaceWith(html);
        }
        plan_break_time_edit_object = '';
        $('#breaktime_start').val('');
        $('#breaktime_end').val('');
        mrk_add_brk = false;
    });
}

function edit_break_time(){
    $(document).on('click','.mrk_edit_break_time_row',function(){
        plan_break_time_edit_object = $(this).parent().parent();
        var start_time = plan_break_time_edit_object.data('start-time');
        var end_time = plan_break_time_edit_object.data('end-time');
        $('#breaktime_start').val(start_time);
        $('#breaktime_end').val(end_time);
    });
}

function add_holiday(){
    var mrk_add_holiday = false;
    $('.mrk_add_holiday').on('click',function(){
        if (!mrk_add_holiday) {
            mrk_add_holiday = true;
        } else {
            return false;
        }
        var start_time = $('#holiday_start').val();
        var end_time = $('#holiday_end').val();
        var html = "<tr data-start-time='"+start_time+"' data-end-time='"+end_time+"'>"+
            "<td>"+start_time+"</td>"+
            "<td>"+end_time+"</td>"+
            "<td>"+
            "<input type='button' value='Xóa' style='margin: 0px 0px 0px 5px'"+
            "class='btn btn-default btn-sm mrk_delete_row'>"+
            "<input type='button' value='sửa' style='margin: 0px 0px 0px 5px'"+
            "class='btn btn-default btn-sm mrk_edit_holiday_row'>"+
            "</td>"+
            "</tr>";
        if(plan_holiday_edit_object==''){
            $('.mrk_table_holiday tbody').append(html);
        }else{
            plan_holiday_edit_object.replaceWith(html);
        }
        plan_holiday_edit_object = '';
        $('#holiday_start').val('');
        $('#holiday_end').val('');
        mrk_add_holiday = false;
    });
}

function edit_holiday(){
    $(document).on('click','.mrk_edit_holiday_row',function(){
        plan_holiday_edit_object = $(this).parent().parent();
        var start_time = plan_holiday_edit_object.data('start-time');
        var end_time = plan_holiday_edit_object.data('end-time');
        $('#holiday_start').val(start_time);
        $('#holiday_end').val(end_time);
    });
}

function delete_row(){
    $(document).on('click','.mrk_delete_row',function(){
        $(this).parent().parent().remove();
    });
}

function update_plan(){
    var mrk_update_plan = false;
    $('#btn_submit_plan').on('click', function () {
        if (!mrk_update_plan) {
            mrk_update_plan = true;
        } else {
            //return false;
        }
        var data = build_plan_data();
        if(parseInt($('#plan_id').val()) == 0){
            var url = '/index.php?r=plan/create';
        }else{
            var url = '/index.php?r=plan/update&id='+parseInt($('#plan_id').val());
        }
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            dataType: "json"
        }).done(function (data) {
            mrk_update_plan = false;
            if(data.status =="success"){
                window.location.href = data.url;
            }else{
                var html = "<p style='font-weight: bold;font-size: 16px;color: red'>"+data.message+"</p>";
            }
            $('.mrk_result_calculate_plan_end_time').html(html);
        });
    });
}

function calculate_plan_time(){
    var mrk_calculate_plan = false;
    $('#btn_calculate_plan').on('click', function () {
        if (!mrk_calculate_plan) {
            mrk_calculate_plan = true;
        } else {
            return false;
        }
        var data = build_plan_data();
        $.ajax({
            type: "POST",
            url: '/index.php?r=plan/calculate',
            data: data,
            //dataType: "json"
        }).done(function (data) {
            mrk_calculate_plan = false;
            if(data.status =="success"){
                var html = "<p style='font-weight: bold;font-size: 16px;'> Plan kết thúc ở PMD đầu tiên vào lúc: "+data.plan_end_time+"</p><p style='font-weight: bold;font-size: 16px;'> Plan kết thúc ở PMD cuối cùng vào lúc: "+data.plan_end_time_at_last_client+"</p>";
            }else{
                var html = "<p style='font-weight: bold;font-size: 16px;color: red'>"+data.message+"</p>";
            }
            $('.mrk_result_calculate_plan_end_time').html(html);
        });
    });
}
function build_plan_data(){
    var break_time_list = {};
    var count_break_time = 0;
    $('.mrk_table_break_time tbody tr').each(function (index, value) {
        break_time_list[count_break_time] = {
            'start_time': $(this).data('start-time'),
            'end_time': $(this).data('end-time'),
        };
        count_break_time++;
    });

    var holiday_list = {};
    var count_holiday = 0;
    if($('.mrk_table_holiday').length > 0) {
        $('.mrk_table_holiday tbody tr').each(function (index, value) {
            holiday_list[count_holiday] = {
                'start_time': $(this).data('start-time'),
                'end_time': $(this).data('end-time'),
            };
            count_holiday++;
        });
    }

    var _csrf_backend = $('#_csrf-backend').val();
    var plan_id = $('#plan_id').val();

    var plan_start_at = $('#plan_start_at').val();
    var product_model_id = $('.mrk_select_product_model').val();
    var plan_pcs = $('#plan_pcs').val();
    var plan_lot_no = $('#lot_no').val();
    var data = {
        '_csrf-backend': _csrf_backend,
        'plan_id': plan_id,
        'product_model_id': product_model_id,
        'plan_pcs': plan_pcs,
        'plan_lot_no': plan_lot_no,
        'plan_start_at': plan_start_at,
        'break_time_list': JSON.stringify(break_time_list),
        'holiday_list': JSON.stringify(holiday_list),
    };
    return data;
}