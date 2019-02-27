'use strict';

let date = new Date(),
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    today = `${year}-${month}-${day}`,

//Собираем ключевые значения для отправки запроса
    request = {
        station: 's9600213', // Шереметево
        date: today,
        transportType: 'plane',
        event: {dep: 'departure',
                arr: 'arrival'},
    };

//Создаем функцию, чтобы не дублировать запрос
/**
 * Формаирует ссылку для отправки запроса
 * @param key {string} Ключ
 * @param event {string} событие
 * @returns {string} возвращает ссылку
 */
function getUrl(key, event) {
    return 'https://api.rasp.yandex.net/v3.0/schedule/' +
        '?apikey=' + key +
        '&station=' + request.station +
        '&date=' + request.date +
        '&transport_types=' + request.transportType +
        '&event=' + event;
}

//Проверка ссылок
// console.log(getUrl('ключ', request.event.dep));
// console.log(getUrl('ключ', request.event.arr));

/**
 * Отправляет запрос
 * @param event{string} принимает событие
 * @return {array} возвращает список рейсов
 */
function getJSON(event) {
    $.ajax({
        //Не пускает
        // url: getUrl('ваш ключ', request.event.dep),
        url: 'responses/' + event + '.json',
        dataType: 'json',
        cache: false,
        method: 'get',
        success: function(data){
            render(data.schedule);
        }
    });
}

/**
 * Отправляет запрос
 * @param event{string} принимает событие
 * @return {array} возвращает список рейсов
 */
function getJSONDelay(event) {
    $.ajax({
        // url: getUrl('ваш ключ', request.event.dep),
        url: 'responses/' + event + '.json',
        dataType: 'json',
        cache: false,
        method: 'get',
        success: function(data){
            renderDelay(data.schedule);
        }
    });
}