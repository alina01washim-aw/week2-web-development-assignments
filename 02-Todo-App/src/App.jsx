
import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [filter, setFilter] = useState('All')

  function addTask(e) {
    e.preventDefault()

    if (!newTask.trim()) return

    const task = {
      id: Date.now(),
      text: newTask.trim(),
      completed: false,
    }

    setTasks([...tasks, task])
    setNewTask('')
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Pending') return !task.completed
    if (filter === 'Completed') return task.completed
    return true
  })

  const completedCount = tasks.filter((task) => task.completed).length
  const pendingCount = tasks.length - completedCount

  return (
    <main className="todo-app">
      <header className="app-header">
        <div className="logo">♡</div>
        <p className="eyebrow">A LITTLE MORE ORGANIZED</p>
        <h1>My To-Do List</h1>
        <p className="subtitle">
          Small steps make big things happen.
        </p>
      </header>

      <section className="todo-card">
        <form className="task-form" onSubmit={addTask}>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            aria-label="New task"
          />
          <button type="submit" className="add-button">
            + Add Task
          </button>
        </form>

        <div className="task-stats">
          <div className="stat">
            <span className="stat-number">{tasks.length}</span>
            <span>Total</span>
          </div>
          <div className="stat">
            <span className="stat-number">{pendingCount}</span>
            <span>Pending</span>
          </div>
          <div className="stat">
            <span className="stat-number">{completedCount}</span>
            <span>Completed</span>
          </div>
        </div>

        <div className="task-toolbar">
          <h2>Your tasks</h2>

          <div className="filters">
            {['All', 'Pending', 'Completed'].map((item) => (
              <button
                key={item}
                type="button"
                className={filter === item ? 'filter active' : 'filter'}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="task-list">
          {filteredTasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">♡</div>
              <h3>{tasks.length === 0 ? 'Nothing here yet!' : 'No tasks found'}</h3>
              <p>
                {tasks.length === 0
                  ? 'Add your first task and get started.'
                  : 'Try selecting a different filter.'}
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                className={task.completed ? 'task completed' : 'task'}
                key={task.id}
              >
                <button
                  type="button"
                  className="check-button"
                  onClick={() => toggleTask(task.id)}
                  aria-label={
                    task.completed ? 'Mark as pending' : 'Mark as completed'
                  }
                >
                  {task.completed ? '✓' : ''}
                </button>

                <span className="task-text">{task.text}</span>

                <button
                  type="button"
                  className="delete-button"
                  onClick={() => deleteTask(task.id)}
                  aria-label={`Delete ${task.text}`}
                  title="Delete task"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>

        <footer className="card-footer">
          <span>One task at a time ♡</span>
          <span>{pendingCount} left to do</span>
        </footer>
      </section>

      <p className="page-footer">MADE WITH CARE · ONE DAY AT A TIME</p>
    </main>
  )
}

export default App