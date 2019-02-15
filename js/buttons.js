'use strict';

let departure = $('.nav__btn_departure'),
    arrival = $('.nav__btn_arrival'),
    delay = $('.nav__btn_delayed'),
    btnColor = 'nav__btn_color';

/**
 * Очищает таблицу
 * @returns {void | * | jQuery}
 */
function clearTable() {
    return $('.table__row').detach();
}

//Вылет
departure.on('click', function (){
    departure.addClass(btnColor);
    arrival.removeClass(btnColor);
    delay.removeClass(btnColor);
    clearTable();
    getJSON(request.event.dep);
});

//Прилет
arrival.on('click', function (){
    arrival.addClass(btnColor);
    departure.removeClass(btnColor);
    delay.removeClass(btnColor);
    clearTable();
    getJSON(request.event.arr);
});

//Задержанные рейсы
delay.on('click', function (){
    delay.addClass('nav__btn_color');
    departure.removeClass('nav__btn_color');
    arrival.removeClass('nav__btn_color');
    clearTable();
    getJSONDelay(request.event.dep);
    getJSONDelay(request.event.arr);
});

//Создание таблицы
getJSON(request.event.dep);