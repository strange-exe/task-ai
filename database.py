import sqlite3

db = sqlite3.connect("database.db")
cur = db.cursor()

cur.execute("""
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    deadline TEXT,
    completed INTEGER
)
""")

cur.execute("""
CREATE TABLE subtasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_id INTEGER,
    name TEXT,
    completed INTEGER
)
""")

db.commit()
db.close()
