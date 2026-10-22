import { useMemo, useState } from 'react'
import './App.css'
import TaskCounter from './components/TaskCounter.jsx'
import TaskForm from './components/TaskForm.jsx'
import TaskList from './components/TaskList.jsx'
import inboxIcon from './assets/inbox_icon.png'
import calendarIcon from './assets/calendar_icon.png'
import upcomingIcon from './assets/upcoming_icon.png'

const starterTasks = [
  { id: 1, text: 'Call Mom', completed: false },
  { id: 2, text: 'Buy the new issue of Scientific American', completed: false },
  { id: 3, text: 'Return the textbook to Josie', completed: false },
  { id: 4, text: 'Buy the new album by Rake', completed: false },
  { id: 5, text: 'Buy a gift card for Dad', completed: false },
]

function App() {
  const [tasks, setTasks] = useState(starterTasks)
  const [filter, setFilter] = useState('all')
  const visibleTasks = useMemo(() => {
    if (filter === 'active') return tasks.filter((task) => !task.completed)
    if (filter === 'completed') return tasks.filter((task) => task.completed)
    return tasks
  }, [filter, tasks])
  const completedCount = tasks.filter((task) => task.completed).length

  function addTask(text) {
    const trimmedText = text.trim()
    if (!trimmedText) return
    setTasks((currentTasks) => [...currentTasks, { id: Date.now(), text: trimmedText, completed: false }])
  }

  function toggleTask(id) {
    setTasks((currentTasks) => currentTasks.map((task) => (
      task.id === id ? { ...task, completed: !task.completed } : task
    )))
  }

  function deleteTask(id) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id))
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <button className="menu-button" type="button" aria-label="Open menu"><span /><span /><span /></button>
        <label className="quick-find"><span className="search-symbol" aria-hidden="true" /><input type="search" placeholder="Quick Find" aria-label="Quick Find" /></label>
        <TaskCounter total={tasks.length} completed={completedCount} />
      </header>
      <div className="workspace">
        <aside className="sidebar" aria-label="Task lists">
          <div className="nav-item nav-item-selected"><img src={inboxIcon} alt="" /><span>Inbox</span><small>{tasks.length}</small></div>
          <div className="nav-item"><img src={calendarIcon} alt="" /><span>Today</span><small>{tasks.filter((task) => !task.completed).length}</small></div>
          <div className="nav-item"><img src={upcomingIcon} alt="" /><span>Upcoming</span></div>
        </aside>
        <section className="content" aria-labelledby="inbox-title">
          <div className="content-heading"><h1 id="inbox-title">Inbox</h1><TaskForm onAddTask={addTask} /></div>
          <div className="filters" aria-label="Filter tasks">
            {['all', 'active', 'completed'].map((filterName, index) => (
              <span key={filterName}>{index > 0 && <span className="filter-separator">|</span>}<button className={filter === filterName ? 'filter-button active' : 'filter-button'} type="button" onClick={() => setFilter(filterName)}>{filterName[0].toUpperCase() + filterName.slice(1)}</button></span>
            ))}
          </div>
          <TaskList tasks={visibleTasks} onToggleTask={toggleTask} onDeleteTask={deleteTask} />
        </section>
      </div>
    </main>
  )
}

export default App
