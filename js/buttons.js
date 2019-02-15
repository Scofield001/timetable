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

//Вылет
departure.on('click', function (){
    departure.addClass(clicked);
    arrival.removeClass(clicked);
    delay.removeClass(clicked);
    clearTable();
    getJSON(request.event.dep);
});

//Прилет
arrival.on('click', function (){
    arrival.addClass(clicked);
    departure.removeClass(clicked);
    delay.removeClass(clicked);
    clearTable();
    getJSON(request.event.arr);
});

//Задержанные рейсы
delay.on('click', function (){
    delay.addClass(clicked);
    departure.removeClass(clicked);
    arrival.removeClass(clicked);
    clearTable();
    getJSONDelay(request.event.dep);
    getJSONDelay(request.event.arr);
});

//Создание таблицы
getJSON(request.event.dep);