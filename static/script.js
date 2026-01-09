let editingTaskId = null;

/* Dark Mode Management */
function initDarkMode() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (isDarkMode || (isDarkMode === null && prefersDark)) {
        document.body.classList.add('dark-mode');
        updateThemeToggle(true);
    } else {
        document.body.classList.remove('dark-mode');
        updateThemeToggle(false);
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    updateThemeToggle(isDarkMode);
}

function updateThemeToggle(isDarkMode) {
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
        toggle.textContent = isDarkMode ? '☀️' : '🌙';
    }
}

function showChatHelp() {
    const box = document.getElementById("chatBox");
    const msgDiv = document.createElement("div");
    msgDiv.className = "msg bot";
    msgDiv.innerHTML = `
        <span class="msg-badge">Task AI</span>
        <div>👋 Hi! I'm your Task Assistant.<br><br>
        Try asking:<br>
        • Give me a summary of my tasks<br>
        • What should I do next?<br>
        • How many tasks are left?</div>
    `;
    box.appendChild(msgDiv);
}
async function fetchTasks() {
    const pending = document.getElementById("pendingTasks");
    const completed = document.getElementById("completedTasks");
    pending.innerHTML = "";
    completed.innerHTML = "";
    const res = await fetch("/get_tasks");
    const tasks = await res.json();
    const total = tasks.length;
    const completedCount = tasks.filter(t => t.status === "Completed").length;
    const pendingCount = total - completedCount;
    document.getElementById("totalCount").innerText = total;
    document.getElementById("pendingCount").innerText = pendingCount;
    document.getElementById("completedCount").innerText = completedCount;
    tasks.forEach(task => {
        const div = document.createElement("div");
        div.className = "task";
        if (editingTaskId === task.id) {
            div.innerHTML = `
                <input id="edit-name-${task.id}" value="${task.name}" placeholder="Task name">
                <input id="edit-deadline-${task.id}" type="date" value="${task.deadline}">
                <button style="background: linear-gradient(135deg, #16A34A, #22C55E);" onclick="saveEdit(${task.id})">Save</button>
                <button style="background: linear-gradient(135deg, #6B7280, #9CA3AF);" onclick="cancelEdit()">Cancel</button>
            `;
        } 
        else {
            const header = document.createElement("div");
            header.className = "task-header";
            const title = document.createElement("strong");
            title.innerText = task.name;
            const status = document.createElement("span");
            status.className = "status " + task.status.toLowerCase().replace(" ", "-");
            status.innerText = task.status;
            const badge = document.createElement("span");
            badge.className = "badge " + task.deadline_state.toLowerCase().replace(" ", "-");
            badge.innerText = task.deadline_state;
            header.append(title, status, badge);
            div.appendChild(header);
            div.innerHTML += `<div class="deadline">Deadline: ${task.deadline}</div>`;
            let progress = 0;
            if (task.subtasks.length > 0) {
                const done = task.subtasks.filter(s => s.completed).length;
                progress = Math.round((done / task.subtasks.length) * 100);
            } else {
                progress = task.completed ? 100 : 0;
            }

            div.innerHTML += `
                <div class="progress">
                    <div class="progress-bar" style="width:${progress}%">
                        ${progress}%
                    </div>
                </div>
            `;

            /* Subtasks */
            task.subtasks.forEach((st, idx) => {
                const stDiv = document.createElement("div");
                stDiv.className = "subtask";
                stDiv.innerHTML = `
                    • ${st.name}
                    ${
                        st.completed
                            ? `<span class="done">✔</span>`
                            : `<button onclick="markSubtask(${task.id}, ${idx})">✔</button>`
                    }
                `;
                div.appendChild(stDiv);
            });

            if (!task.completed) {
                const input = document.createElement("input");
                input.placeholder = "Add subtask";
                input.id = `st-${task.id}`;
                input.addEventListener("keydown", e => {
                    if (e.key === "Enter") addSubtask(task.id);
                });
                const addBtn = document.createElement("button");
                addBtn.innerText = "Add Subtask";
                addBtn.onclick = () => addSubtask(task.id);
                div.append(input, addBtn);
            }

            if (!task.completed && task.subtasks.length === 0) {
                const completeBtn = document.createElement("button");
                completeBtn.innerText = "Mark as Completed";
                completeBtn.style.background = "linear-gradient(135deg, #16A34A, #22C55E)";
                completeBtn.onclick = () => markTaskCompleted(task.id);
                div.appendChild(completeBtn);
            }

            const editBtn = document.createElement("button");
            editBtn.innerText = "Edit Task";
            editBtn.style.background = "linear-gradient(135deg, #667eea, #764ba2)";
            editBtn.onclick = () => startEdit(task.id);

            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Delete Task";
            deleteBtn.style.background = "linear-gradient(135deg, #DC2626, #EF4444)";
            deleteBtn.onclick = () => deleteTask(task.id);
            div.append(editBtn, deleteBtn);
        }

        task.status === "Completed"
            ? completed.appendChild(div)
            : pending.appendChild(div);
    });
}

function startEdit(id) {
    editingTaskId = id;
    fetchTasks();
}

function cancelEdit() {
    editingTaskId = null;
    fetchTasks();
}

async function saveEdit(id) {
    const name = document.getElementById(`edit-name-${id}`).value.trim();
    const deadline = document.getElementById(`edit-deadline-${id}`).value;

    if (!name || !deadline) {
        alert("Name and deadline required");
        return;
    }

    await fetch("/edit_task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task_id: id, name, deadline })
    });
    editingTaskId = null;
    fetchTasks();
}

async function addSubtask(id) {
    const input = document.getElementById(`st-${id}`);
    if (!input || !input.value.trim()) return;
    await fetch("/add_subtask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task_id: id, name: input.value })
    });
    fetchTasks();
}

async function markSubtask(id, index) {
    await fetch("/toggle_subtask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task_id: id, index })
    });
    fetchTasks();
}

async function markTaskCompleted(id) {
    await fetch("/toggle_task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task_id: id })
    });
    fetchTasks();
}

async function deleteTask(id) {
    if (!confirm("Delete this task?")) return;
    await fetch("/delete_task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task_id: id })
    });
    fetchTasks();
}

async function addTask() {
    const name = taskName.value.trim();
    const deadline = taskDeadline.value;
    if (!name || !deadline) {
        alert("Please enter both task name and deadline");
        return;
    }
    await fetch("/add_task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, deadline })
    });
    taskName.value = "";
    taskDeadline.value = "";
    fetchTasks();
}

document.addEventListener("DOMContentLoaded", () => {
    initDarkMode();
    showChatHelp();
    fetchTasks();
});

async function sendChat() {
    const input = document.getElementById("chatInput");
    if (!input || !input.value.trim()) return;
    const box = document.getElementById("chatBox");
    
    const userMsg = document.createElement("div");
    userMsg.className = "msg user";
    userMsg.innerHTML = `<span class="msg-badge">You</span><div>${input.value}</div>`;
    box.appendChild(userMsg);
    
    const res = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input.value })
    });
    
    const data = await res.json();
    const botMsg = document.createElement("div");
    botMsg.className = "msg bot";
    botMsg.innerHTML = `<span class="msg-badge">Task AI</span><div>${data.reply.replace(/\n/g, "<br>")}</div>`;
    box.appendChild(botMsg);
    
    box.scrollTop = box.scrollHeight;
    input.value = "";
}