/**
 * Created by hanguyen on 12/4/2016.
 */
$(document).ready(function () {
    find_item_code();
    find_plan();
});

function find_plan() {
    $(document).on('change', '.mrk_select_client', function () {
        $('.mrk_plan_list').html("");
        $('.mrk_plan_item_code_list').html("");
        var client_id = $('.mrk_select_client').val();
        $.ajax({
            type: "POST",
            url: '/index.php?r=stock/find-plan',
            data: {'client_id': client_id},
            dataType: "json"
        }).done(function (response) {
            if (response.status == "success") {
                $('.mrk_plan_list').html(response.html);
                hide_error();
            } else {
                show_error(response.message);
            }

        });
    })
}


function find_item_code() {
    $(document).on('change', '.mrk_select_plan', function () {
        var mode = 'client';
        var client_id = $('.mrk_select_client').val();
        var plan_id = $('.mrk_select_plan').val();
        $.ajax({
            type: "POST",
            url: '/index.php?r=stock/get-item-code-list',
            data: {'mode': mode, 'plan_id': plan_id,'client_id':client_id},
            dataType: "json"
        }).done(function (response) {
            if (response.status == "success") {
                $('.mrk_plan_item_code_list').html(response.html);
                hide_error();
            } else {
                show_error(response.message);
            }

        });
    })
}
