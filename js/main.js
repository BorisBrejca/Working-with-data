const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];

checkDataInLocalStorage();
checkEmptyList ();

form.addEventListener('submit', addTask);
tasksList.addEventListener('click' ,deleteTask)
tasksList.addEventListener('click' ,doneTask)

// Функции
function addTask (e) {
    // Отменяем отправку формы  
    e.preventDefault()

    // Возвращаем значение из Инпута (taskInput) - Записываем в переменную
    const taskText = taskInput.value

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    }

    tasks.push(newTask)
    addToLocalStorage()

    // Рендерим задачу на страницу
    renderTask(newTask)

    // Очищаем поле ввода и возвращаем фокус
    taskInput.value =""
    taskInput.focus()

    checkEmptyList ()
}

function deleteTask(e) {

    // Проверяем если клик был по удалить
    if(e.target.dataset.action !== 'delete') return

    const parentNodeLi = e.target.closest('.list-group-item');

    // Определяем ID задачи
    const id = Number(parentNodeLi.id);

    // Удаляем задачу через фильтрацию массива
    tasks = tasks.filter( (task) => task.id !== id);

    parentNodeLi.remove()
    
    checkEmptyList ()
    addToLocalStorage()
}

function doneTask(e) {
    if(e.target.dataset.action !== "done") return

    const parentNodeLi = e.target.closest('.list-group-item ');

    // Обработка done задачи для Local Storage
    const id = Number(parentNodeLi.id);
    const task = tasks.find( (task) => task.id === id )
    task.done = !task.done

    const taskTitle = parentNodeLi.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done')
    addToLocalStorage()
}

function checkEmptyList () {
    if (tasks.length === 0){

        const emptyHTML = `<li id="emptyList" class="list-group-item empty-list">
                                <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
                                <div class="empty-list__title">Список дел пуст</div>
                            </li>`
                            
        tasksList.insertAdjacentHTML('afterbegin' , emptyHTML)

        }
        
        if (tasks.length > 0) {
            const emptyListEl = document.querySelector('#emptyList');
            emptyListEl ? emptyListEl.remove() : null
        }
}

function addToLocalStorage() {
    localStorage.setItem('tasks' , JSON.stringify(tasks))
}

function checkDataInLocalStorage() {
    
    if (localStorage.getItem('tasks')){
        tasks = JSON.parse(localStorage.getItem('tasks'))
        tasks.forEach((task) => renderTask(task))
    }

}

function renderTask(task){
            // Формируем Css класс 
            const cssClass = task.done ? "task-title task-title--done" : "task-title";   

            const taskHtml = `<li  id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
                <span class="${cssClass}">${task.text}</span>
                <div class="task-item__buttons">
                    <button type="button" data-action="done" class="btn-action">
                        <img src="./img/tick.svg" alt="Done" width="18" height="18">
                    </button>
                    <button type="button" data-action="delete" class="btn-action">
                        <img src="./img/cross.svg" alt="Done" width="18" height="18">
                    </button>
                </div>
                            </li>`
    
            //   Добавляем разметку на страницу 
            tasksList.insertAdjacentHTML('beforeend' , taskHtml)
}






