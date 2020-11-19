let students = JSON.parse(localStorage.getItem('students'));
if (!students) {
    students = [{"id":1,"name":"Автушко Даниил","value":null},{"id":2,"name":"Александрович Илья","value":null},{"id":3,"name":"Алексеев Михаил","value":null},{"id":4,"name":"Аношка Даниил","value":null},{"id":5,"name":"Арико Владислав","value":null},{"id":6,"name":"Бруёк Илья","value":null},{"id":7,"name":"Василенко Богдан","value":null},{"id":8,"name":"Волосюк Даниил","value":null},{"id":9,"name":"Ганисевский Владислав","value":null},{"id":10,"name":"Говша Арсений","value":null},{"id":11,"name":"Голомбевский Андрей","value":null},{"id":12,"name":"Гордынец Илья","value":null},{"id":13,"name":"Жуков Владислав","value":null},{"id":14,"name":"Заводник Владислав","value":null},{"id":15,"name":"Калашников Никита","value":null},{"id":16,"name":"Карач Евгений","value":null},{"id":17,"name":"Китурко Роман","value":null},{"id":18,"name":"Перегуд Дмитрий","value":null},{"id":19,"name":"Прокатень Артем","value":null},{"id":20,"name":"Сахута Данила","value":null},{"id":21,"name":"Сукач Роман","value":null},{"id":22,"name":"Тарас Максим","value":null}];
    localStorage.setItem('students', JSON.stringify(students));
}

update(students);

document.getElementById('addButton').addEventListener('click', addStudent);
document.getElementById('clearRadio').addEventListener('click', (e) => {
    sendAlert('Вы действительно хотите очистить все данные о посещаемости?', 'Очистить', clearRadio, e);
});

document.addEventListener('keydown', (e) => {
    if (e.keyCode == 13 && e.target.tagName == 'INPUT' && e.target.type == 'text') {
        if (e.target.name == 'studentName'){
            addStudent();
        } else if (e.target.name.includes('student-')) {
            save(e);
        }
    }
});

document.getElementById('copyStuds').addEventListener('click', () => {
    document.getElementById('copyDropdown').classList.toggle('show');
});

if (!ClipboardJS.isSupported()) {
    document.getElementById('#copyStuds').parentNode.style = "display: none";
} else {
    let cb1 = new ClipboardJS('#copyAsText', {
        text: function() {
            let total = '1820';
            let flag = true;
            for (let i = 0; i < students.length; i++) {
                if (students[i].value === "ПН") {
                    flag = false;
                    total += '\n'+students[i].name.split(' ')[0];
                } else if (students[i].value === "УВ") {
                    flag = false;
                    total += '\n'+students[i].name.split(' ')[0] + ' ув';
                }
            }
            if (flag) total += '\nВсе есть';
            return total;
        }
    });
    cb1.on('success', () => {
        document.getElementById('copyDropdown').classList.remove('show');
        // alert('Пропуски скопированы в буфер обмена :)');
    })
    cb1.on('error', () => {
        alert('Не удалось скопировать данные :(');
    })

    let cb2 = new ClipboardJS('#copyForGoogleSheets', {
        text: function() {
            let total = '';
            for (let i = 0; i < students.length; i++) {
                if (students[i].value === "ПН") total += 'н\n';
                else if (students[i].value === "УВ") total += 'у\n';
                else if (students[i].value === "Есть") total += '.\n';
                else total += '\n';
            }
            return total.slice(0, -1);
        }
    });
    cb2.on('success', () => {
        document.getElementById('copyDropdown').classList.remove('show');
        // alert('Пропуски скопированы в буфер обмена :)');
    })
    cb2.on('error', () => {
        alert('Не удалось скопировать данные :(');
    })
}


function update(array) {
    // Очистка
    let list = document.getElementById('list');
    while(list.firstChild) {
        list.removeChild(list.firstChild);
    }


    for(let i = 0; i < array.length; i++) {
        let newDiv = document.createElement('li');
        newDiv.classList.add('studItem');
        newDiv.innerHTML = 
        `<div class="info">
            <div>${array[i].id}</div>
            <input type="text" name="student-${array[i].id}" value="${array[i].name}" disabled>
        </div>
        <div class="buttons">
            <form name="student${array[i].id}">
                <input type="radio" name="status${array[i].id}" id="rb1-${array[i].id}" value="Есть" ${array[i].value == "Есть" ? 'checked':''}>
                <label for="rb1-${array[i].id}">Есть</label>
                <input type="radio" name="status${array[i].id}" id="rb2-${array[i].id}" value="УВ" ${array[i].value == "УВ" ? 'checked':''}>
                <label for="rb2-${array[i].id}">УВ</label>
                <input type="radio" name="status${array[i].id}" id="rb3-${array[i].id}" value="ПН"${array[i].value == "ПН" ? 'checked':''}>
                <label for="rb3-${array[i].id}">ПН</label>
            </form>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" uId="${array[i].id}" class="save-butt" width="20px" height="20px" viewBox="0 0 612 612" style="display: none" xml:space="preserve">
                <g>
                    <g id="_x32__13_">
                        <g>
                            <path d="M363.375,191.25c10.557,0,19.125-8.568,19.125-19.125v-76.5c0-10.557-8.568-19.125-19.125-19.125     s-19.125,8.568-19.125,19.125v76.5C344.25,182.682,352.818,191.25,363.375,191.25z M535.5,0h-459C34.253,0,0,34.253,0,76.5v459     C0,577.747,34.253,612,76.5,612h459c42.247,0,76.5-34.253,76.5-76.5v-459C612,34.253,577.747,0,535.5,0z M153,38.25h306v172.125     c0,10.557-8.568,19.125-19.125,19.125h-267.75c-10.557,0-19.125-8.568-19.125-19.125V38.25z M573.75,535.5     c0,21.133-17.117,38.25-38.25,38.25h-459c-21.133,0-38.25-17.117-38.25-38.25v-459c0-21.133,17.117-38.25,38.25-38.25h38.25     V229.5c0,21.114,17.117,38.25,38.25,38.25h306c21.133,0,38.25-17.136,38.25-38.25V38.25h38.25c21.133,0,38.25,17.136,38.25,38.25     V535.5z"></path>
                        </g>
                    </g>
                </g>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" uId="${array[i].id}" class="edit-butt" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 612 612" xml:space="preserve">
                <g>
                    <g id="_x39__36_">
                        <g>
                            <path d="M155.104,345.551L72.866,512.053c-6.904,18.742,8.09,35.534,26.833,26.832l166.387-82.295     c7.172-1.396,14.134-4.169,19.68-9.734l295.558-295.768c14.841-14.841,14.841-38.919,0-53.779l-67.167-67.225     c-14.841-14.841-38.9-14.841-53.741,0L164.838,325.852C159.292,331.417,156.5,338.379,155.104,345.551z M473.841,70.418     c7.421-7.421,19.45-7.421,26.871,0l40.296,40.334c7.421,7.42,7.421,19.469,0,26.89l-40.296,40.334l-66.211-68.18L473.841,70.418z      M406.196,138.121l67.645,66.747L258.876,419.966c-25.188-25.207-60.033-60.071-67.167-67.225L406.196,138.121z M225.407,440.238     l-102.739,62.232c-9.372,4.342-17.768-4.646-13.407-13.426l62.194-102.815L225.407,440.238z M573.75,229.5v306     c0,20.999-20.77,38.479-41.75,38.479H76.003c-20.98,0-38.001-17.021-38.001-38.021V79.656c0-21,17.519-41.406,38.499-41.406h306     V0h-306C34.521,0,0,37.657,0,79.656v456.303C0,577.957,34.023,612,76.003,612H532c41.979,0,80-34.502,80-76.5v-306H573.75z"></path>
                        </g>
                    </g>
                </g>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" uId="${array[i].id}" class="del-butt" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 753.23 753.23" xml:space="preserve">
                <g>
                    <g id="_x34__19_">
                        <g>
                            <path d="M494.308,659.077c12.993,0,23.538-10.546,23.538-23.539V353.077c0-12.993-10.545-23.539-23.538-23.539     s-23.538,10.545-23.538,23.539v282.461C470.77,648.531,481.314,659.077,494.308,659.077z M635.538,94.154h-141.23V47.077     C494.308,21.067,473.24,0,447.23,0H306c-26.01,0-47.077,21.067-47.077,47.077v47.077h-141.23     c-26.01,0-47.077,21.067-47.077,47.077v47.077c0,25.986,21.067,47.077,47.077,47.077v423.692     c0,51.996,42.157,94.153,94.154,94.153h329.539c51.996,0,94.153-42.157,94.153-94.153V235.385     c26.01,0,47.077-21.091,47.077-47.077V141.23C682.615,115.221,661.548,94.154,635.538,94.154z M306,70.615     c0-12.993,10.545-23.539,23.538-23.539h94.154c12.993,0,23.538,10.545,23.538,23.539v23.539c-22.809,0-141.23,0-141.23,0V70.615z      M588.461,659.077c0,25.986-21.066,47.076-47.076,47.076H211.846c-26.01,0-47.077-21.09-47.077-47.076V235.385h423.692V659.077z      M612,188.308H141.23c-12.993,0-23.538-10.545-23.538-23.539s10.545-23.539,23.538-23.539H612     c12.993,0,23.538,10.545,23.538,23.539S624.993,188.308,612,188.308z M258.923,659.077c12.993,0,23.539-10.546,23.539-23.539     V353.077c0-12.993-10.545-23.539-23.539-23.539s-23.539,10.545-23.539,23.539v282.461     C235.384,648.531,245.93,659.077,258.923,659.077z M376.615,659.077c12.993,0,23.538-10.546,23.538-23.539V353.077     c0-12.993-10.545-23.539-23.538-23.539s-23.539,10.545-23.539,23.539v282.461C353.077,648.531,363.622,659.077,376.615,659.077z"></path>
                        </g>
                    </g>
                </g>
            </svg>
        </div>`;
        switch(array[i].value) {
            case null:
                newDiv.classList.add('null'); break;
            case 'УВ':
                newDiv.classList.add('yv'); break;
            case 'ПН':
                newDiv.classList.add('pn'); break;
            case 'Есть':
                newDiv.classList.add('yes'); break;
            default:
                newDiv.classList.add('null');
        }
        newDiv.querySelector('svg[class=edit-butt]').addEventListener('click', edit);
        newDiv.querySelector('svg[class=del-butt]').addEventListener('click', (e) => {
            sendAlert('Вы действительно хотите удалить эту запись?', 'Удалить', del, e);
        });
        newDiv.querySelector('svg[class=save-butt]').addEventListener('click', save);

        newDiv.querySelectorAll('form input').forEach(item => item.addEventListener('click', clearOnDoubleClick ) );
        newDiv.querySelector(`form[name=student${array[i].id}]`).addEventListener('change', change);

        document.getElementById('list').appendChild(newDiv);

    }
}

function change(e) {
    // Изменение стилизации в DOM
    let pathN = 0;
    while(e.path[pathN].tagName !== 'LI') pathN++;

    e.path[pathN].classList.remove('yes', 'yv', 'pn', 'null');
    switch (e.target.id[2]) {
        case '1': e.path[pathN].classList.add('yes'); break;
        case '2': e.path[pathN].classList.add('yv'); break;
        case '3': e.path[pathN].classList.add('pn'); break;
    }

    // Сохранение изменений в localStorage
    for (let i = 0; i < students.length; i++) {
        if (students[i].id == e.target.id.slice(4)) {
            students[i].value = e.target.value;

            localStorage.setItem(`students`, JSON.stringify(students));
            break;
        }
    }
}

function edit(e) {
    // Изменение имени
    let targ = e.target;
    while(targ.tagName != 'svg') {
        targ = targ.parentNode;
    }
    let nameElem = targ.parentNode.parentNode.querySelector('.info input');

    targ.parentNode.querySelector('svg[class=save-butt]').style.display = "inline";
    targ.style.display = "none";
    nameElem.removeAttribute('disabled');
}

function save(e) {
    let targ = e.target;
    if (e.target.tagName == 'INPUT' && e.target.type == 'text'){
        targ = e.target.parentNode.parentNode.querySelector('.buttons svg[class=save-butt]');
    }
    while(targ.tagName != 'svg') {
        targ = targ.parentNode;
    }
    let nameElem = targ.parentNode.parentNode.querySelector('.info input');

    // Максимальная длина имени 25
    if (nameElem.value.length > 25) nameElem.value = nameElem.value.slice(0, 25);

    for (let i = 0; i < students.length; i++) {
        if (students[i].id == targ.getAttribute('uid')) {
            students[i].name = nameElem.value;

            localStorage.setItem(`students`, JSON.stringify(students));
            break;
        }
    }

    targ.parentNode.querySelector('svg[class=edit-butt]').style.display = "inline";
    targ.style.display = "none";
    nameElem.setAttribute('disabled', 'disabled');
}

function del(e) {
    let targ = e.target;
    while(targ.tagName != 'svg') {
        targ = targ.parentNode;
    }

    let curId = targ.getAttribute('uid');
    for (let i = 0; i < students.length; i++) {
        if (students[i].id == curId) {
            students.splice(i, 1);
            localStorage.setItem(`students`, JSON.stringify(students));
            
            update(students);
            break;
        }
    }
}

function addStudent() {
    let newName = document.querySelector('.menu input[type=text]').value;
    if (newName.length < 3) return;
    
    
    students.push({id: students.length == 0 ? 1 : students[students.length-1].id+1, name: newName, value: null});
    localStorage.setItem(`students`, JSON.stringify(students));
    document.querySelector('.menu input[type=text]').value = '';
    update(students);
}

function clearRadio(e) {
    for (let i = 0; i < students.length; i++) {
        students[i].value = null;
    }
    localStorage.setItem(`students`, JSON.stringify(students));
    update(students);
}

function sendAlert(text='Вы действительно хотите удалить эту запись?', button2='Удалить', callback2, params) {
    let div = document.createElement('div');
    div.classList.add('newAlert');
    div.innerHTML = `
        <p>${text}</p>
        <div class="buttons">
            <input type="button" class="cancel" value="Отмена">
            <input type="button" class="confirm" value="${button2}">
        </div>`;

    document.getElementById('alert').appendChild(div);
    document.getElementById('alert').classList.add('alert');

    div.querySelector('.buttons .cancel').addEventListener('click', closeAlert);
    div.parentNode.addEventListener('click', closeAlert);
    div.querySelector('.buttons .confirm').addEventListener('click', () => {
        closeAlert();
        callback2(params);
    });

    function closeAlert() {
        let list = document.getElementById('alert');
        list.classList.remove('alert');
        while(list.firstChild) {
            list.removeChild(list.firstChild);
        }
    }
}

// Удаление отметки по двойному клику
let clickStartDate;
let target;
function clearOnDoubleClick(e) {
    if (!clickStartDate) {
        clickStartDate = true;
        target = e.target;
        return setTimeout(() => {clickStartDate = null; target = null}, 250);
    }

    if (clickStartDate && e.target === target) {
        clickStartDate = null;
        target = null;

        // Изменяем стилизацию
        e.target.checked = false;

        let pathN = 0;
        while(e.path[pathN].tagName !== 'LI') pathN++;
        e.path[pathN].classList.remove('yes', 'yv', 'pn');
        e.path[pathN].classList.add('null');


        // Сохранение изменений в localStorage
        let id = e.target.id.split('-')[1];
        for (let i = 0; i < students.length; i++) {
            if (students[i].id == id) {
                students[i].value = null;
                localStorage.setItem(`students`, JSON.stringify(students));
                break;
            }
        }
    }

}