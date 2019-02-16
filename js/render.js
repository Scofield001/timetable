'use strict';

/**
 * Показывает все рейсы
 * @param schedule {array} принимает список рейсов
 */
function render(schedule) {
    let tableFilter = $('.table');
    for (let i in schedule) {
        let tr = $('<tr>', {class: 'table__row'}),

            info = {
                flightNum: schedule[i].thread.number,       //Номер рейса
                direction: schedule[i].departure,           //Направление (вылет / прилет)
                route: schedule[i].thread.title,            //Маршрут
                company: schedule[i].thread.carrier.title,  //Имя перевозчика
                time: schedule[i].departure,
                delay: schedule[i].is_fuzzy,                //Опоздание
            };
        tableFilter.append(tr);

        for (let j in info) {
            let td = $('<td>', {class: 'table__col'});

            // Т.к в объекте время находится в разных местах, нужно сделать проверку на пустое свойство
            if (schedule[i].departure !== null) {
                info.time = schedule[i].departure.split('T')[0];
            } else if (info.direction === null) {
                info.direction = schedule[i].arrival;
            } else if (info.time === null) {
                info.time = schedule[i].arrival.split('T')[0];
            }

            //Проверка на задержку рейса
            /*TODO: Из полученных данных, все рейсы не задержаны,
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
}

/**
 * Выводит только задержанные рейсы
 * @param schedule {array} принимает список рейсов
 */
function renderDelay(schedule) {
    let tableFilter = $('.table');

    for (let i in schedule) {
        let tr = $('<tr>', {class: 'table__row'}),

            info = {
                flightNum: schedule[i].thread.number,       //Номер рейса
                direction: schedule[i].departure,           //Направление (вылет / прилет)
                route: schedule[i].thread.title,            //Маршрут
                company: schedule[i].thread.carrier.title,  //Имя перевозчика
                time: schedule[i].departure,
                delay: schedule[i].is_fuzzy,                //Опоздание
            };
        tableFilter.append(tr);

        //TODO: Получаем только задержанные рейсы
        if (!info.delay) continue;

        for (let j in info) {
            let td = $('<td>', {class: 'table__col'});

            if (schedule[i].departure !== null) {
                info.time = schedule[i].departure.split('T')[0];
            } else if (info.direction === null) {
                info.direction = schedule[i].arrival;
            } else if (info.time === null) {
                info.time = schedule[i].arrival.split('T')[0];
            }

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
            info.direction = info.direction.split('T').pop().replace(/:\d+\+\d+:\d+/g, '');
            tr.append(td);
        }
    }
}
