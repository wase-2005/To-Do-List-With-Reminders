let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const reminderInput = document.getElementById('reminderInput');
    const taskText = taskInput.value.trim();
    const reminderTime = reminderInput.value;

    if (taskText === '') return;

    const task = {
        id: Date.now(),
        text: taskText,
        reminder: reminderTime ? new Date(reminderTime) : null,
        completed: false
    };

    tasks.push(task);
    taskInput.value = '';
    reminderInput.value = '';
    renderTasks();

    if (task.reminder) {
        setReminder(task);
    }
}

function setReminder(task) {
    const now = new Date();
    const timeUntilReminder = task.reminder - now;

    if (timeUntilReminder > 0) {
        setTimeout(() => {
            if (!task.completed) {
                alert(`Reminder: ${task.text}`);
            }
        }, timeUntilReminder);
    }
}

function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        const taskContent = document.createElement('span');
        taskContent.innerHTML = `${task.text}${task.reminder ? `<br><small>Reminder: ${task.reminder.toLocaleString()}</small>` : ''}`;
        
        const buttons = document.createElement('div');
        
        const toggleBtn = document.createElement('input');
        toggleBtn.type = 'checkbox';
        toggleBtn.checked = task.completed;
        toggleBtn.onclick = () => toggleTask(task.id);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => deleteTask(task.id);
        
        buttons.appendChild(toggleBtn);
        buttons.appendChild(deleteBtn);
        
        li.appendChild(taskContent);
        li.appendChild(buttons);
        taskList.appendChild(li);
    });
}

document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});
