# TaskMate

## Team Details

> ### **Team Blaze**
>> - **Team Lead** : Abhinesh Gangwar ( Front-End )
> 
>> - **Team Member** : Deepanshi Agarwal ( Front-End )
>
>> - **Team Member** : Aayushe Saini ( Back-End )
> 
>> - **Team Member** : Utkarsh Tyagi ( Back-End )

> **Course** : BTech
>
> **Semester** : 2
>
> **College** : Graphic Era Deemed To Be University 

## Overview
**TaskMate** is a web-based task management application built with Flask (Python) for the backend and JavaScript/HTML/CSS for the frontend. It allows users to create tasks with deadlines, add subtasks, track progress, and interact with an AI-powered chat assistant for task insights.

## Features
- **Task Creation & Management**: Add, edit, and delete tasks with names and deadlines
- **Subtasks**: Break down tasks into smaller, manageable subtasks with individual completion tracking
- **Progress Tracking**: Visual progress bars and status indicators (Pending, In Progress, Completed)
- **Deadline Management**: Color-coded deadline states (Overdue, Due Today, Due Soon, Upcoming)
- **AI Task Assistant**: Intelligent chat bot with badges for clear conversation context
  - Task summaries and overviews
  - Smart recommendations (next task suggestion)
  - Progress updates and task details
  - Natural language queries
- **Statistics Dashboard**: Real-time overview of total, pending, and completed tasks
- **Dark Mode Support**: Toggle between light and dark themes with persistent preference storage
- **Professional UI/UX**:
  - Modern gradient designs and smooth animations
  - Responsive design for all device sizes
  - Hover effects and interactive elements
  - Color-coded status and deadline badges
  - Chat message badges for clear user/AI distinction
- **Theme Persistence**: Automatic system dark mode detection and user preference saving

## Technology Stack
- **Backend**: Python Flask
- **Frontend**: 
  - HTML5 (semantic structure)
  - CSS3 (CSS Variables, Gradients, Animations, Responsive Design)
  - Vanilla JavaScript (DOM manipulation, event handling)
- **Styling Features**:
  - CSS Variables for theme management (light/dark mode)
  - Gradient backgrounds and button effects
  - Smooth transitions and animations
  - Flexbox and CSS Grid layouts
- **Storage**: In-memory task storage (ready for database integration)
- **Design Pattern**: Modern UI with professional color schemes

## Project Structure
```
TaskMate/
├── app.py                 
├── database.py            
├── static/
│   └── script.js          
│   └── styles.css         
│   └── icon.jpg
├── templates/
│   └── index.html
```

## Installation & Setup

### Prerequisites
- Python 3.7+
- Flask (`pip install flask`)

### Live Demo Link
- **https://task.abhinesh.me/** [^1]
[^1]: Might take about 50-60 seconds to load

### Explanation Video
- **[Click Me](https://drive.google.com/file/d/1HMLbKwNDyFUu1btTQgoGs0jIAqRDSGDB/view?usp=drivesdk)**

### Running the Application on your System
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
1. **Adding Tasks**: 
   - Enter task name and select deadline
   - Click "+ Add Task" button
   - Task appears in Pending Tasks section

2. **Managing Subtasks**: 
   - Click "Add Subtask" for any pending task
   - Enter subtask name and press Enter or click button
   - Click ✔ button to mark subtask as complete

3. **Task Operations**:
   - **Edit Task**: Click "✎ Edit Task" to modify name or deadline
   - **Mark Complete**: Click "✓ Mark as Completed" (only for tasks without subtasks)
   - **Delete Task**: Click "🗑 Delete Task" to remove (with confirmation)

4. **Task Assistant Chat**:
   - Type your query in the chat input
   - Get instant responses with badges showing "You" and "Task AI"
   - Try queries like:
     - "Give me a summary of my tasks"
     - "What should I do next?"
     - "How many tasks are left?"
     - "Tell me about [task name]"

5. **Dark Mode**:
   - Click the 🌙/☀️ button in the header to toggle themes
   - Preference is automatically saved and applied on next visit
   - System dark mode preference is respected by default

## Database Integration
The project includes a `database.py` file that sets up SQLite tables for tasks and subtasks. Currently, the application uses in-memory storage for simplicity. Future enhancements could integrate persistent database storage.

## Future Enhancements
- User authentication and multi-user support
- Database persistence with SQLite/PostgreSQL
- Email notifications for deadlines
- Advanced AI chat with NLP
- Task categories, tags, and priority levels
- Recurring tasks and reminders
- Task analytics and insights
- Export functionality (PDF, CSV)
- Collaborative task sharing
- Mobile native app version

## Submission Notes
This submission demonstrates core task management functionality with a focus on:
- Clean, intuitive user interface
- Real-time progress tracking

## Final Round Enhancements (Round 2)
This final submission includes significant UI/UX improvements and feature additions:

### Visual Design Enhancements
- **Modern Color Scheme**: Updated gradients and professional color palette (purple-based theme)
- **Dark Mode Implementation**: Full-featured dark mode with CSS Variables for seamless theme switching
- **Enhanced Animations**: Smooth transitions, hover effects, and slide-in animations
- **Improved Typography**: Better font sizing, weights, and letter-spacing for readability
- **Advanced Shadows**: Depth-based shadow system for visual hierarchy
- **Responsive Layout**: Mobile-first design with breakpoints for tablets and phones

### UI/UX Features
- **Chat Message Badges**: Clear identification of user vs. AI messages
- **Status Color Coding**: Visual indicators for task status and deadline urgency
- **Interactive Elements**: Hover effects on cards, buttons, and panels
- **Progress Visualization**: Enhanced progress bars with gradient styling
- **Header Customization**: Theme-aware header text that changes with dark mode toggle
- **Button Variety**: Contextual button styling (complete, edit, delete with appropriate colors)

### Technical Improvements
- **CSS Variables System**: Dynamic theme system supporting multiple color schemes
- **LocalStorage Integration**: Persistent dark mode preference
- **System Preference Detection**: Automatic dark mode based on OS settings
- **Performance Optimization**: Smooth 0.3s transitions for theme switching
- **Accessibility**: Focus states, proper color contrast, and semantic HTML

### Code Quality
- **Well-Structured CSS**: Organized variables, mobile-first approach
- **JavaScript Best Practices**: Modular functions, event handling, DOM manipulation
- **HTML Semantics**: Proper use of semantic elements
- **Comments & Documentation**: Clear code organization for maintainability
- Interactive chat assistant
- Modular code structure ready for expansion
