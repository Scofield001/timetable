'use strict';

/**
 * Фильтрует табло по запросу
 * @param $table {array} Таблица
 */
function filterTable($table) {
    let $filters = $table.find('.table__col'),
        $rows = $table.find('.table__row');

    $rows.each(function () {
        let valid = true;
        $(this).find('td').each(function (colIndex) {
            if ($filters.eq(colIndex).find('input').val()) {
                if ($(this).html().toLowerCase().indexOf(
                    $filters.eq(colIndex).find('input').val().toLowerCase()) === -1) {
                    valid = valid && false;
                }
            }
        });

        //Если в строке нет значения, соответствующего запросу, то она удаляется
        (!valid) ? $(this).addClass('table__row_display') : $(this).removeClass('table__row_display');
    });
}

$('.table__input').on('input', function () {
    filterTable($(this).parents('table'));
});