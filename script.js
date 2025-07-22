document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addBtn = document.getElementById("addBtn");
    const taskList = document.getElementById("taskList");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    function renderTasks() {
        taskList.innerHTML = ""; 
        tasks.forEach(task => {
            const li = document.createElement("li");
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <div class="checkbox ${task.completed ? 'checked' : ''}">${task.completed ? '✔' : ''}</div>
                <span class="task-text">${task.name}</span>
                <button class="delete-btn">✖</button>
            `;
            li.querySelector(".checkbox").addEventListener("click", () => {
                task.completed = !task.completed;
                saveTasks();
                renderTasks(); 
            });
            li.querySelector(".delete-btn").addEventListener("click", () => {
                tasks = tasks.filter(t => t.id !== task.id);
                saveTasks();
                renderTasks();
            });
            taskList.appendChild(li);
        });
    }
    addBtn.addEventListener("click", () => {
        const name = taskInput.value.trim();
        if (name) {
            tasks.push({ id: Date.now(), name, completed: false });
            saveTasks();
            taskInput.value = "";
            renderTasks();
        }
    });
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addBtn.click();
    });
    renderTasks(); 
});