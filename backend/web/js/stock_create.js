/**
 * Created by hanguyen on 12/4/2016.
 */
$(document).ready(function () {
    find_item_code();
});

function find_item_code() {
    $(document).on('change', '.mrk_select_plan', function () {
        var mode = 'plan';
        var plan_id = $('.mrk_select_plan').val();
        $.ajax({
            type: "POST",
            url: '/index.php?r=stock/get-item-code-list',
            data: {'mode': mode, 'plan_id': plan_id},
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
