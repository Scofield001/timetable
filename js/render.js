'use strict';

let table = $('.table');

/**
 * Показывает все рейсы
 * @param schedule {array} принимает список рейсов (вылет / прилет)
 */
function render(schedule) {
    //Строки
    for (let i in schedule) {
        renderRow(schedule, i);
    }
}

/**
 * Создает строки
 * @param schedule {array} принимает список рейсов из render()
 * @param i {int} принимает итерацию из render()
 */
function renderRow(schedule, i) {
    let tr = $('<tr>', {class: 'table__row'}),
        info = {
            flightNum: schedule[i].thread.number,       //Номер рейса
            direction: schedule[i].departure,           //Время вылета
            route: schedule[i].thread.title,            //Маршрут
            company: schedule[i].thread.carrier.title,  //Имя перевозчика
            time: schedule[i].departure,                //Время прилета(условно)
            delay: schedule[i].is_fuzzy,                //Опоздание
        };
    table.append(tr);

    //Ячейки
    for (let j in info) {
        let td = $('<td>', {class: 'table__col'});

        // Т.к в объекте время находится в разных местах, нужно сделать проверку на пустое свойство
        if (schedule[i].departure !== null) {
            //Убираем лишние данные времени
            info.time = schedule[i].departure.split('T')[0];
        } else if (info.direction === null) {
            info.direction = schedule[i].arrival;
        } else if (info.time === null) {
            info.time = schedule[i].arrival.split('T')[0];
        }

        //Добавляем модификатор маршрутам
        if (info[j] === info.route) {
            td.addClass('table__col_font');
        }

        //Проверка на задержку рейса и Добавляем модификатор примечаниям
        /*Из полученных данных, все рейсы не задержаны,
                поэтому протестировал вручную на локальном json изменив is_fuzzy на true.*/
        switch (info[j]) {
            case true:
                td.addClass('table__col_color').text('Задержан');
                break;
            case false:
                td.text(`Ожидается в ${info.direction}`);
                break;
            default:
                td.text(info[j])
        }
        //Меняем формат времени
        info.direction = info.direction.split('T').pop().replace(/:\d+\+\d+:\d+/g, '');
        tr.append(td);
    }
}

/**
 * Выводит только задержанные рейсы
 * @param schedule {array} принимает список рейсов
 */
function renderDelay(schedule) {
    for (let i in schedule) {
        if (!schedule[i].is_fuzzy) continue;
        renderRow(schedule, i);
    }
}

