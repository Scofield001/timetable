'use strict';

let departure = $('.nav__btn_departure'),
    arrival = $('.nav__btn_arrival'),
    delay = $('.nav__btn_delayed'),
    clicked = 'nav__btn_color';

/**
 * Очищает таблицу
 * @returns {void | * | jQuery}
 */
function clearTable() {
    return $('.table__row').detach();
}

/**
 * Добавляет класс нажатой кнопке
 * @param btn {jQuery} нажатая кнопка
 * @param unClick1 {jQuery} другая кнопка
 * @param unClick2 {jQuery} другая кнопка
 */
function btnClick(btn, unClick1, unClick2) {
    btn.addClass(clicked);
    unClick1.removeClass(clicked);
    unClick2.removeClass(clicked);
}

//Вылет
departure.on('click', function (){
    btnClick(departure, arrival, delay);
    clearTable();
    getJSON(request.event.dep);
});

//Прилет
arrival.on('click', function (){
    btnClick(arrival, departure, delay);
    clearTable();
    getJSON(request.event.arr);
});

//Задержанные рейсы
delay.on('click', function (){
    btnClick(delay, departure, arrival);
    clearTable();
    getJSONDelay(request.event.dep);
    getJSONDelay(request.event.arr);
});

//Создание таблицы
getJSON(request.event.dep);