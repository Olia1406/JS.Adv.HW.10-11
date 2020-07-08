let inps = document.querySelectorAll('input');
// це масив, в який просто записується логін, пароль і емейл
let arr = [];
let f1 = document.querySelector('.fm');
let table = document.querySelector('table');
// функція, що додає дані юзера в таблицю
function addUser() {
    for (let i = 0; i < inps.length; i++) {
        arr.push(inps[i].value);
    }
    event.preventDefault();
    f1.reset();
    // дані беруться з arr i додаються через функцію render()
    render();
    //потім масив з даними стає пустим; тут будуть нові логін, пароль і емейл
    arr = [];
}
// зараз є лише 1 tr з заголовку таблиці, але ф-ція рендер створить ще
let trs = document.getElementsByTagName('tr');
let userIndex;
userIndex = trs.length - 1;
function render() {
    userIndex++;
    let ttr = document.createElement('tr');
    // генерує з даними і кнопками(та ще й повішеними на них ф-ціями)
    ttr.innerHTML = `<tr>
                     <td>${userIndex}</td>
                     <td>${arr[0]}</td>
                     <td>${arr[1]}</td>
                     <td>${arr[2]}</td>
                     <td><button class = "edit" onclick = "editUser()">edit</button></td> 
                     <td><button class = "delete" onclick ="deleteUser()" >delete</button></td>                   
                     </tr>`;
    table.appendChild(ttr);
}
// ф-ція, що видаляє юзера
function deleteUser() {
    let eventTg = event.target;
    // видаляє весь батьківський елемент юзера,у якого клікнули на кн delete
    eventTg.parentElement.parentElement.remove();
    // міняється номер...
    for (let i = eventTg.parentElement.parentElement.children[0].textContent; i < trs.length; i++) {
        trs[i].children[0].textContent = (+trs[i].children[0].textContent - 1).toString();
    }
    userIndex = trs.length - 1;
    f1.reset();
}
let btnAdd = document.querySelector('.add');
let btnSave = document.querySelector('.save');
let index;
// редагує юзера
function editUser() {
    let eventTg = event.target;
    for (let i = 0; i < inps.length; i++) {
        // в поля записуються дані з того рядка таблиці, у якому клікнули на кн edit
        inps[i].value = eventTg.parentElement.parentElement.children[i + 1].textContent;
        btnAdd.style.display = 'none';
        btnSave.style.display = 'block';
    }
    index = +eventTg.parentElement.parentElement.children[0].textContent;
}
function saveEditUser() {
    for (let i = 1; i < trs.length; i++) {
        if (+trs[i].children[0].textContent == index) {
            // в рядки передаються оновлені дані з полів
            trs[i].children[1].textContent = inps[0].value;
            trs[i].children[2].textContent = inps[1].value;
            trs[i].children[3].textContent = inps[2].value;
        }
    }
    btnAdd.style.display = 'block';
    btnSave.style.display = 'none';
    event.preventDefault();
    f1.reset();
}
