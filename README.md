# TaskMate

## Team Details

### Team Blaze

- **Team Lead** : Abhinesh Gangwar ( Front-End )
- **Team Member** : Deepanshi Agarwal ( Front-End )
- **Team Member** : Aayushe Saini ( Back-End )
- **Team Member** : Utkarsh Tyagi ( Back-End )

## Overview
**TaskMate** is a web-based task management application built with Flask (Python) for the backend and JavaScript/HTML/CSS for the frontend. It allows users to create tasks with deadlines, add subtasks, track progress, and interact with an AI-powered chat assistant for task insights.

## Features
- **Task Creation**: Add tasks with names and deadlines
- **Subtasks**: Break down tasks into smaller, manageable subtasks
- **Progress Tracking**: Visual progress bars and status indicators
- **Deadline Management**: Color-coded deadline states (Overdue, Due Today, Due Soon, Upcoming)
- **Task Assistant**: AI chat bot that provides task summaries, recommendations, and progress updates
- **Statistics Dashboard**: Overview of total, pending, and completed tasks
- **Responsive Design**: Clean, modern UI with gradient themes

## Technology Stack
- **Backend**: Python Flask
- **Frontend**: HTML5, CSS3, JavaScript
- **Database**: SQLite (schema defined, integration pending)
- **Styling**: Custom CSS with modern design patterns

## Project Structure
```
TaskMate/
├── app.py                 
├── database.py            
├── static/
│   ├── script.js          
│   └── styles.css         
    └── icon.jpg
└── templates/
    └── index.html
```

## Installation & Setup

### Prerequisites
- Python 3.7+
- Flask (`pip install flask`)

### Live Demo Link
- **https://task.abhinesh.me/**

### Running the Application
1. Clone or download the project files
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   pip install flask
   ```
4. Run the application:
   ```bash
   python app.py
   ```
5. Open your browser and visit `http://localhost:5000`

## Usage
1. **Adding Tasks**: Enter task name and deadline, click "Add Task"
2. **Managing Subtasks**: For each task, add subtasks using the input field
3. **Marking Complete**: Click the checkmark button next to subtasks to complete them
4. **Task Assistant**: Use the chat interface to ask questions like:
   - "Give me a summary of my tasks"
   - "What should I do next?"
   - "How many tasks are left?"

## Database Integration
The project includes a `database.py` file that sets up SQLite tables for tasks and subtasks. Currently, the application uses in-memory storage for simplicity. Future enhancements could integrate persistent database storage.

## Future Enhancements
- User authentication and multi-user support
- Database persistence
- Email notifications for deadlines
- Advanced AI chat features
- Mobile-responsive improvements
- Task categories and tags

## Round 1 Submission Notes
This submission demonstrates core task management functionality with a focus on:
- Clean, intuitive user interface
- Real-time progress tracking
- Interactive chat assistant
- Modular code structure ready for expansion

## License
This project is developed as part of a coding challenge submission.</content>