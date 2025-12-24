function showChatHelp() {
    const box = document.getElementById("chatBox");
    box.innerHTML = `
        <div class="msg bot">
            👋 Hi! I’m your Task Assistant.<br><br>
            Try asking:<br>
            • Give me a summary of my tasks<br>
            • What should I do next?<br>
            • How many tasks are left?
        </div>
    `;
}
function toggleCompleted() {
    const box = document.getElementById("completedTasks");
    box.style.display = box.style.display === "none" ? "block" : "none";
}
async function fetchTasks() {
    const pending = document.getElementById("pendingTasks");
    const completed = document.getElementById("completedTasks");
    pending.innerHTML = "<p>Loading...</p>";
    completed.innerHTML = "";
    try {
        const res = await fetch("/get_tasks");
        const tasks = await res.json();
        const total = tasks.length;
        const completedCount = tasks.filter(t => t.status === "Completed").length;
        const pendingCount = total - completedCount;
        document.getElementById("totalCount").innerText = total;
        document.getElementById("pendingCount").innerText = pendingCount;
        document.getElementById("completedCount").innerText = completedCount;
        pending.innerHTML = "";
        completed.innerHTML = "";
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete Task";
        deleteBtn.className = "danger";
        deleteBtn.onclick = () => deleteTask(task.id);

div.appendChild(deleteBtn);
        tasks.forEach(task => {
            const div = document.createElement("div");
            div.className = "task";
            const header = document.createElement("div");
            header.className = "task-header";
            const title = document.createElement("strong");
            title.innerText = task.name;
            const status = document.createElement("span");
            status.className =
                "status " + task.status.toLowerCase().replace(" ", "-");
            status.innerText = task.status;
            const badge = document.createElement("span");
            badge.className =
                "badge " + task.deadline_state.toLowerCase().replace(" ", "-");
            badge.innerText = task.deadline_state;
            header.append(title, status, badge);
            div.appendChild(header);
            div.innerHTML += `<div class="deadline">Deadline: ${task.deadline}</div>`;
            let progress = task.subtasks.length ? Math.round(
                      (task.subtasks.filter(s => s.completed).length / task.subtasks.length) *100): task.completed? 100: 0;
            div.innerHTML += `
                <div class="progress">
                    <div class="progress-bar" style="width:${progress}%">
                        ${progress}%
                    </div>
                </div>
            `;
            task.subtasks.forEach((st, idx) => {
                const stDiv = document.createElement("div");
                stDiv.className = "subtask";
                stDiv.innerHTML = `• ${st.name}
                    ${
                        st.completed
                            ? `<span class="done">✔</span>`
                            : `<button onclick="markSubtask(${task.id},${idx})">✔</button>`
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
                const btn = document.createElement("button");
                btn.innerText = "Add Subtask";
                btn.onclick = () => addSubtask(task.id);
                div.append(input, btn);
            }
            task.status === "Completed"
                ? completed.appendChild(div)
                : pending.appendChild(div);
        });
    } catch (err) {
        console.error("Fetch error:", err);
        pending.innerHTML = "<p>Error loading tasks</p>";
    }
}
async function addTask() {
    const name = taskName.value.trim();
    const deadline = taskDeadline.value;
    if (!name || !deadline) {
        alert("Enter task name and deadline");
        return;
    }
    await fetch("/add_task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, deadline })
    });
    taskName.value = "";
    taskDeadline.value = "";
    taskName.focus();
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
async function deleteTask(id) {
    if (!confirm("Delete this task and all its subtasks?")) return;

    await fetch("/delete_task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task_id: id })
    });

    fetchTasks();
}
async function sendChat() {
    const input = document.getElementById("chatInput");
    const msg = input.value.trim();
    if (!msg) return;
    const box = document.getElementById("chatBox");
    box.innerHTML += `<div class="msg user">You: ${msg}</div>`;

    const res = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg })
    });

    const data = await res.json();
    box.innerHTML += `<div class="msg bot">Task AI: ${data.reply}</div>`;
    box.scrollTop = box.scrollHeight;
    input.value = "";
}

document.addEventListener("DOMContentLoaded", () => {
    showChatHelp();
    fetchTasks();

    document.getElementById("chatInput").addEventListener("keydown", e => {
        if (e.key === "Enter") sendChat();
    });

    document.getElementById("taskName").addEventListener("keydown", e => {
        if (e.key === "Enter") addTask();
    });
});
