from flask import Flask, render_template, request, jsonify
from datetime import datetime

app = Flask(__name__)

tasks = []
task_id_counter = 1

def get_status(task):
    if task["subtasks"]:
        done = sum(1 for st in task["subtasks"] if st["completed"])
        if done == 0:
            return "Pending"
        elif done < len(task["subtasks"]):
            return "In Progress"
        else:
            return "Completed"
    return "Completed" if task["completed"] else "Pending"

def get_deadline_state(deadline):
    days_left = (deadline - datetime.now()).days
    if days_left < 0:
        return "Overdue"
    elif days_left == 0:
        return "Due Today"
    elif days_left <= 2:
        return "Due Soon"
    return "Upcoming"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/add_task", methods=["POST"])
def add_task():
    global task_id_counter
    data = request.json
    task = {
        "id": task_id_counter,
        "name": data["name"],
        "deadline": data["deadline"],
        "subtasks": [],
        "completed": False
    }
    task_id_counter += 1
    tasks.append(task)
    return jsonify({"status": "success"})

@app.route("/add_subtask", methods=["POST"])
def add_subtask():
    data = request.json
    for task in tasks:
        if task["id"] == data["task_id"]:
            task["subtasks"].append({
                "name": data["name"],
                "completed": False
            })
    return jsonify({"status": "success"})

@app.route("/toggle_subtask", methods=["POST"])
def toggle_subtask():
    data = request.json
    for task in tasks:
        if task["id"] == data["task_id"]:
            task["subtasks"][data["index"]]["completed"] = True
            if all(st["completed"] for st in task["subtasks"]):
                task["completed"] = True
    return jsonify({"status": "success"})

@app.route("/toggle_task", methods=["POST"])
def toggle_task():
    data = request.json
    for task in tasks:
        if task["id"] == data["task_id"] and not task["subtasks"]:
            task["completed"] = True
    return jsonify({"status": "success"})

@app.route("/get_tasks")
def get_tasks():
    enriched = []
    for task in tasks:
        deadline = datetime.strptime(task["deadline"], "%Y-%m-%d")
        enriched.append({
            **task,
            "status": get_status(task),
            "deadline_state": get_deadline_state(deadline)
        })
    return jsonify(enriched)

@app.route("/chat", methods=["POST"])
def chat():
    message = request.json["message"].lower()
    pending = [t for t in tasks if not t["completed"]]
    if "summary" in message:
        return jsonify({
            "reply": f"Total: {len(tasks)}, Pending: {len(pending)}, Completed: {len(tasks) - len(pending)}"
        })
    if "what should i do" in message or "next task" in message:
        if not pending:
            return jsonify({"reply": "All tasks are completed 🎉"})
        nearest = min(pending, key=lambda t: t["deadline"])
        return jsonify({"reply": f"Work on '{nearest['name']}' next. Deadline: {nearest['deadline']}"})
    if "tasks left" in message:
        return jsonify({"reply": f"{len(pending)} tasks remaining."})
    return jsonify({"reply":"I can help with task summary, progress, or deadlines."})
import os
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)