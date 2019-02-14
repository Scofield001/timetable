'use strict';

//Вылет
$('.nav__btn_departure').on('click', function (){
    $('.nav__btn_departure').addClass('nav__btn_color');

    $('.nav__btn_arrival').removeClass('nav__btn_color');
    $('.nav__btn_delayed').removeClass('nav__btn_color');

    $('.table__row').detach();
    getJSON(request.event.dep);
});

//Прилет
$('.nav__btn_arrival').on('click', function (){
    $('.nav__btn_arrival').addClass('nav__btn_color');

    $('.nav__btn_departure').removeClass('nav__btn_color');
    $('.nav__btn_delayed').removeClass('nav__btn_color');

    $('.table__row').detach();
    getJSON(request.event.arr);

});

//Задержанные рейсы
$('.nav__btn_delayed').on('click', function (){
    $('.nav__btn_delayed').addClass('nav__btn_color');

    $('.nav__btn_departure').removeClass('nav__btn_color');
    $('.nav__btn_arrival').removeClass('nav__btn_color');

    $('.table__row').detach();
    getJSONDelay(request.event.dep);
    getJSONDelay(request.event.arr);
});

//Создание таблицы
getJSON(request.event.dep);