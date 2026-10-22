import { useState } from 'react'

function TaskForm({ onAddTask }) {
  const [text, setText] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (!text.trim()) return
    onAddTask(text)
    setText('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="new-task">New task</label>
      <input id="new-task" value={text} onChange={(event) => setText(event.target.value)} placeholder="Add a task" />
      <button type="submit">Add</button>
    </form>
  )
}

export default TaskForm
